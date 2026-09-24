// Sends any of the six lead / newsletter forms to our own /api/lead route (never directly to n8n —
// see app/api/lead/route.ts for why). Client-side only: it reads window/sessionStorage.

/**
 * @param payload Form fields plus its consent record and `source` — see lib/contactConsent.ts.
 * @param turnstileToken Token from the invisible Turnstile widget (see components/TurnstileWidget.tsx).
 * @param honeypot Value of the hidden "website" field (see components/Honeypot.tsx); always empty for a real visitor.
 * @returns true once /api/lead confirms the lead reached n8n, false otherwise — never silently
 *   reports success the way the old `fetch(..., { mode: 'no-cors' })` calls did.
 */
export async function submitLead(
    payload: Record<string, unknown>,
    turnstileToken: string,
    honeypot: string,
): Promise<boolean> {
    let tracking: Record<string, string> = {};
    try {
        tracking = JSON.parse(sessionStorage.getItem('xtek_tracking') ?? '{}');
    } catch {
        /* sessionStorage unavailable (private mode, blocked storage): submit without tracking */
    }

    try {
        const res = await fetch('/api/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...payload,
                tracking: { ...tracking, pageUrl: window.location.href, referrer: document.referrer },
                turnstileToken,
                website: honeypot,
            }),
        });
        return res.ok;
    } catch {
        return false;
    }
}
