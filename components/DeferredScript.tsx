"use client";

import { useEffect } from 'react';

interface DeferredScriptProps {
    src: string;
    /** Fallback delay when the visitor has not interacted with the page yet. */
    delayMs?: number;
}

/**
 * Loads a heavy third-party script on the first user interaction (or after a
 * delay) so it never competes with the page's own JavaScript at startup.
 */
export default function DeferredScript({ src, delayMs = 6000 }: DeferredScriptProps) {
    useEffect(() => {
        const events = ['pointerdown', 'keydown', 'scroll', 'touchstart'];
        let loaded = false;

        const cleanup = () => {
            clearTimeout(timer);
            events.forEach((event) => window.removeEventListener(event, load));
        };

        function load() {
            if (loaded) return;
            loaded = true;
            cleanup();
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
        }

        const timer = setTimeout(load, delayMs);
        events.forEach((event) => window.addEventListener(event, load, { once: true, passive: true }));
        return cleanup;
    }, [src, delayMs]);

    return null;
}
