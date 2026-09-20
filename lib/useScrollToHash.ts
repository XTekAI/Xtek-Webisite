"use client";

import { useEffect } from 'react';
import { scrollToSectionSettled } from './navigation';

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

        go();
        window.addEventListener('hashchange', go);
        return () => {
            window.removeEventListener('hashchange', go);
            stop?.();
        };
    }, []);
}
