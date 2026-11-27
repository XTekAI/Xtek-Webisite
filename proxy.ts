import { NextResponse, type NextRequest } from 'next/server';

// The Meta Ads funnel lives only on landing.xtekai.com, and visitors there must not reach the main site.
//  - On the main site (xtekai.com / www): the landing and its legal copies are sent to the subdomain,
//    with the query string (UTMs, fbclid) kept.
//  - On the subdomain: only the landing pages and their legal copies exist. The main site's legal paths
//    go to the landing copies; any other path goes back to the landing.
// Keep these lists in step with AUDIT_PATHS / AUDIT_LEGAL in content/audit-landing.ts.

const MAIN_HOSTS = new Set(['xtekai.com', 'www.xtekai.com']);
const LANDING_HOSTS = new Set(['landing.xtekai.com', 'landing.localhost']);
const LANDING_ORIGIN = 'https://landing.xtekai.com';

const LANDING_PAGES = new Set(['/', '/free-audit', '/auditoria-gratis', '/legal/privacy', '/legal/terms', '/legal/sms-terms']);
const LEGAL_COPIES: Record<string, string> = { '/privacy': '/legal/privacy', '/terms': '/legal/terms', '/sms-terms': '/legal/sms-terms' };

export function proxy(request: NextRequest) {
    const { pathname, search } = request.nextUrl;
    // The Host header, not nextUrl.hostname (which next dev reports as "localhost" for landing.localhost).
    const host = request.headers.get('host') ?? request.nextUrl.host;
    const hostname = host.split(':')[0];
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

    if (MAIN_HOSTS.has(hostname)) {
        if (path === '/free-audit' || path === '/auditoria-gratis' || path.startsWith('/legal/')) {
            return NextResponse.redirect(`${LANDING_ORIGIN}${path}${search}`, 307);
        }
        return NextResponse.next();
    }

    if (LANDING_HOSTS.has(hostname) && !LANDING_PAGES.has(path)) {
        const proto = request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '');
        return NextResponse.redirect(`${proto}://${host}${LEGAL_COPIES[path] ?? '/'}${search}`, 307);
    }

    return NextResponse.next();
}

export const config = {
    // Pages only: never API routes, Next internals or files with an extension (images, robots.txt, ...).
    matcher: ['/((?!api/|_next/|.*\\..*).*)'],
};
