// Navigation helpers for buttons that jump to a section of the home page (or the landing page).
// Client-side only: they read `window`.

const HEADER_OFFSET = 80;

const isLandingByQuery = () =>
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('mode') === 'landing';

/** Adds `?mode=landing` when the landing variant was selected with that query string, so it is not lost. */
export const modeHref = (path: string) => (isLandingByQuery() ? `${path}?mode=landing` : path);

/** URL of the home / landing page, optionally pointing at one of its sections (e.g. "contact"). */
export const homeHref = (sectionId?: string) => `${modeHref('/')}${sectionId ? `#${sectionId}` : ''}`;

/** Scrolls so the section sits just below the fixed header. Returns false when the section is not on this page. */
export function scrollToSection(id: string, behavior: ScrollBehavior = 'smooth'): boolean {
    const element = document.getElementById(id);
    if (!element) return false;
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET, behavior });
    return true;
}

/**
 * Scrolls to a section and keeps correcting for a few seconds, because the layout can still move after
 * the first scroll (pinned GSAP sections, images and fonts loading). Stops as soon as the visitor
 * scrolls, taps or presses a key. Returns a function that cancels it.
 */
export function scrollToSectionSettled(id: string, behavior: ScrollBehavior = 'smooth'): () => void {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const userEvents = ['wheel', 'touchstart', 'keydown', 'mousedown'];

    const stop = () => {
        cancelled = true;
        timers.forEach(clearTimeout);
        userEvents.forEach((event) => window.removeEventListener(event, stop));
    };

    const correct = () => {
        if (cancelled) return;
        const element = document.getElementById(id);
        if (!element) return;
        const delta = element.getBoundingClientRect().top - HEADER_OFFSET;
        if (Math.abs(delta) > 12) window.scrollTo({ top: window.scrollY + delta, behavior: 'smooth' });
    };

    userEvents.forEach((event) => window.addEventListener(event, stop, { passive: true }));
    scrollToSection(id, behavior);
    [900, 1800, 3000, 4500].forEach((ms) => timers.push(setTimeout(correct, ms)));
    timers.push(setTimeout(stop, 5000));
    return stop;
}
