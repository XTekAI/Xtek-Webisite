// Remembers which services card the visitor was on when they tapped "Learn more", so that the browser's
// Back button brings them to that same card instead of the top of the home page.
//
// A raw scroll position is not enough: on return the pinned services section is rebuilt and the page
// height changes, so we store the card index and scroll to that card once the animation is ready.

const KEY = 'xtek:servicesReturn';
const MAX_AGE_MS = 60 * 60 * 1000;

// Back/forward navigation in the app router fires `popstate`. A tap on the logo or a menu link does not,
// so only a real "Back" restores the card.
let lastPopState = 0;
if (typeof window !== 'undefined') {
    window.addEventListener('popstate', () => {
        lastPopState = Date.now();
    });
}

export function saveServicesReturn(cardIndex: number) {
    try {
        sessionStorage.setItem(KEY, JSON.stringify({ cardIndex, at: Date.now() }));
    } catch {
        // Private mode / storage disabled: Back simply opens the page normally.
    }
}

function read(): number | null {
    try {
        const raw = sessionStorage.getItem(KEY);
        if (!raw) return null;
        const { cardIndex, at } = JSON.parse(raw);
        // Generous window: on a slow connection the animation library can take several seconds to load
        // after Back, and the card is restored only once it is ready.
        const cameBack = Date.now() - lastPopState < 15000;
        if (!cameBack || Date.now() - at > MAX_AGE_MS || typeof cardIndex !== 'number') return null;
        return cardIndex;
    } catch {
        return null;
    }
}

/** True when the visitor just came back and a card is waiting to be restored (does not consume it). */
export const hasPendingServicesReturn = () => read() !== null;

/** Returns the card to restore (once) and forgets it. */
export function takeServicesReturn(): number | null {
    const index = read();
    if (index !== null) {
        try {
            sessionStorage.removeItem(KEY);
        } catch {
            /* ignore */
        }
    }
    return index;
}
