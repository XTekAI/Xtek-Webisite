"use client";

import { useEffect } from 'react';
import { scrollToSectionSettled } from './navigation';
import { hasPendingServicesReturn } from './serviceReturn';

/**
 * Scrolls to the section named in the URL hash (e.g. "/#contact") when the page opens and whenever the
 * hash changes, so links from other pages land on the right section.
 */
export function useScrollToHash() {
    useEffect(() => {
        let stop: (() => void) | undefined;

        const go = () => {
            const id = decodeURIComponent(window.location.hash.slice(1));
            if (!id) return;
            stop?.();
            stop = scrollToSectionSettled(id);
        };

        // Without a hash, always open at the hero. Restoring the old scroll position on reload lands
        // in the wrong place on phones, because the pinned sections and images change the page height.
        if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
        if (!window.location.hash && !hasPendingServicesReturn()) window.scrollTo(0, 0);

        go();
        window.addEventListener('hashchange', go);
        return () => {
            window.removeEventListener('hashchange', go);
            stop?.();
        };
    }, []);
}
