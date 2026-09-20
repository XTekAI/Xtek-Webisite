// Cookie / tracking preferences, stored in the visitor's browser (localStorage).
//
// CONSENT_MODE controls the default when a visitor has not chosen yet:
//   'opt-out': analytics and marketing tools load until the visitor opts out
//              (the standard model under US state privacy laws such as the CCPA).
//   'opt-in':  nothing loads until the visitor accepts, and a banner is shown
//              (required for visitors in the EU/UK; switch to this if Xtek AI
//              starts serving those regions).
// In both modes a Global Privacy Control signal counts as an opt-out.
export const CONSENT_MODE: 'opt-out' | 'opt-in' = 'opt-out';

export interface ConsentChoice {
    analytics: boolean;
    marketing: boolean;
    decidedAt: string;
}

export const CONSENT_KEY = 'xtek-cookie-consent';
export const OPEN_SETTINGS_EVENT = 'xtek:open-cookie-settings';
export const CONSENT_CHANGED_EVENT = 'xtek:cookie-consent-changed';

export function readConsent(): ConsentChoice | null {
    try {
        const raw = window.localStorage.getItem(CONSENT_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (typeof parsed?.analytics !== 'boolean' || typeof parsed?.marketing !== 'boolean') return null;
        return parsed as ConsentChoice;
    } catch {
        return null;
    }
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }): ConsentChoice {
    const saved: ConsentChoice = { ...choice, decidedAt: new Date().toISOString() };
    try {
        window.localStorage.setItem(CONSENT_KEY, JSON.stringify(saved));
    } catch {
        /* storage unavailable: the choice applies to this page view only */
    }
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: saved }));
    return saved;
}

/** The choice that applies right now: the stored one, else GPC, else the mode's default. */
export function effectiveConsent(stored: ConsentChoice | null): { analytics: boolean; marketing: boolean; decided: boolean } {
    if (stored) return { analytics: stored.analytics, marketing: stored.marketing, decided: true };
    if (hasGlobalPrivacyControl()) return { analytics: false, marketing: false, decided: true };
    const on = CONSENT_MODE === 'opt-out';
    return { analytics: on, marketing: on, decided: false };
}

/** Opens the cookie settings panel (used by the footer and the privacy policy). */
export function openCookieSettings() {
    window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

/** Global Privacy Control: a browser signal that the visitor opts out of sale/sharing. */
export function hasGlobalPrivacyControl(): boolean {
    return (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

/** Removes the first-party cookies set by Google Analytics and the Meta Pixel. */
export function clearTrackingCookies() {
    const names = document.cookie
        .split(';')
        .map((c) => c.split('=')[0].trim())
        .filter((name) => name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name === '_gat' || name === '_fbp' || name === '_fbc');

    const host = window.location.hostname;
    const domains = [host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
    for (const name of names) {
        for (const domain of domains) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
        }
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
}
