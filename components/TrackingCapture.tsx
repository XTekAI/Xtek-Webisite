"use client";

import { useEffect } from 'react';

// First-touch attribution: which campaign/ad brought this visitor, captured once per browser
// session and reused by every lead/newsletter form (see lib/submitLead.ts), so we can tell which
// ads actually turn into leads — especially on the landing page.
const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

/** Mounted once in app/layout.tsx. Renders nothing. */
export default function TrackingCapture() {
    useEffect(() => {
        try {
            if (sessionStorage.getItem('xtek_tracking')) return; // keep the first visit, not the latest
            const params = new URLSearchParams(window.location.search);
            const tracking: Record<string, string> = {
                landingPage: window.location.href,
                firstReferrer: document.referrer,
            };
            KEYS.forEach((key) => {
                const value = params.get(key);
                if (value) tracking[key] = value;
            });
            sessionStorage.setItem('xtek_tracking', JSON.stringify(tracking));
        } catch {
            /* storage blocked (private mode, extension): forms submit without tracking */
        }
    }, []);

    return null;
}
