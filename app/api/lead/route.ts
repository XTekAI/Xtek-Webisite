import { NextRequest, NextResponse } from 'next/server';

// Keep this in sync with the `source` value every form sends — the CRM (Airtable) keys its
// "Form Source" field off these exact strings, so they must never change here without changing
// them in the forms too.
const FORMS = new Set([
    'contact_form',
    'next_horizon_quote',
    'landing_contact_form',
    'blog_index_newsletter',
    'blog_post_newsletter',
    'blog_page_newsletter',
]);

const ALLOWED_HOSTS = new Set(['xtekai.com', 'www.xtekai.com', 'landing.xtekai.com', 'localhost', 'landing.localhost']);

// Character caps per field, so a submission can never carry megabytes of text. Any field not
// listed here (e.g. the consent-proof text fields, which we generate ourselves) falls back to a
// generous 2000-char default below.
const MAX: Record<string, number> = {
    name: 120,
    businessName: 160,
    organization: 160,
    email: 160,
    phone: 40,
    sector: 120,
    preferredLanguage: 10,
    description: 3000,
    message: 3000,
};

// A payload from one of our own forms has ~20-25 keys; this just rejects anything stuffed with
// junk fields before we bother doing anything else with it.
const MAX_FIELDS = 60;

// Cloudflare's official "always pass" Turnstile test secret. Used only when TURNSTILE_SECRET_KEY
// is not configured and we are not in production — see .env.example.
const DEV_TURNSTILE_SECRET = '1x0000000000000000000000000000000AA';

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status });

/**
 * The hostname of the site that sent this request. Origin is sent by browsers on same-origin
 * fetch POSTs too, so this is reliable; Referer is a fallback for the rare client that strips
 * Origin (some privacy extensions and older browsers).
 */
function resolveHost(req: NextRequest): string {
    for (const raw of [req.headers.get('origin'), req.headers.get('referer')]) {
        if (!raw) continue;
        try {
            return new URL(raw).hostname;
        } catch {
            /* not a valid absolute URL — try the next candidate */
        }
    }
    return '';
}

export async function POST(req: NextRequest) {
    // 1) Only accept requests that say they came from one of our own sites.
    const host = resolveHost(req);
    if (!ALLOWED_HOSTS.has(host)) return fail(403, 'origin');

    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return fail(400, 'json');
    }
    if (Object.keys(body).length > MAX_FIELDS) return fail(400, 'payload');

    // 2) Only a `source` this route recognizes — never forward an arbitrary Form Source to the CRM.
    const source = String(body.source ?? '');
    if (!FORMS.has(source)) return fail(400, 'form');

    // 3) Honeypot: a field every one of our forms hides from real visitors (see components/Honeypot.tsx).
    // A bot that fills it gets a fake "success" so it has nothing to learn from, and nothing is
    // forwarded to n8n / Telegram / Airtable on its behalf.
    if (typeof body.website === 'string' && body.website.trim() !== '') {
        return NextResponse.json({ ok: true });
    }

    // 4) Invisible Cloudflare Turnstile challenge, verified here (server-side, with our secret —
    // the secret never reaches the browser).
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
    const secret = process.env.TURNSTILE_SECRET_KEY || (process.env.NODE_ENV !== 'production' ? DEV_TURNSTILE_SECRET : '');
    const turnstileToken = String(body.turnstileToken ?? '');
    if (!secret || !turnstileToken) return fail(400, 'captcha');

    interface TurnstileVerifyResponse {
        success: boolean;
    }
    const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: turnstileToken, remoteip: ip }),
        signal: AbortSignal.timeout(8000),
    })
        .then((r) => r.json() as Promise<TurnstileVerifyResponse>)
        .catch(() => ({ success: false }));
    if (!verification.success) return fail(400, 'captcha');

    // 5) Strip fields that must never leave this route, and cap every remaining string.
    const clean: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(body)) {
        if (key === 'turnstileToken' || key === 'website') continue;
        clean[key] = typeof value === 'string' ? value.trim().slice(0, MAX[key] ?? 2000) : value;
    }

    // 6) Forward to n8n with the secret key that only ever lives on the server.
    const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
    const webhookKey = process.env.N8N_LEAD_WEBHOOK_KEY;
    if (!webhookUrl || !webhookKey) {
        console.error('POST /api/lead: N8N_LEAD_WEBHOOK_URL / N8N_LEAD_WEBHOOK_KEY are not configured');
        return fail(500, 'config');
    }

    try {
        const upstream = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-XTEK-Key': webhookKey },
            body: JSON.stringify({
                ...clean,
                site: host.startsWith('landing.') ? 'landing' : 'main',
                clientIp: ip,
                receivedAt: new Date().toISOString(),
            }),
            signal: AbortSignal.timeout(10000),
        });
        if (!upstream.ok) {
            console.error('POST /api/lead: n8n rejected the lead', upstream.status, await upstream.text().catch(() => ''));
            return fail(502, 'upstream');
        }
    } catch (error) {
        console.error('POST /api/lead: failed to reach n8n', error);
        return fail(502, 'upstream');
    }

    return NextResponse.json({ ok: true });
}
