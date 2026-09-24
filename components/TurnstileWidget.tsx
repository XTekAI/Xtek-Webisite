"use client";

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

// Cloudflare's official "always pass" Turnstile test site key. Used only when the real one is not
// configured AND we are not in production (see .env.example / app/api/lead/route.ts, which uses
// the matching test secret) — `next build` sets NODE_ENV=production for Vercel Preview too, so
// this never silently activates on a deployed site, only under `next dev`.
const DEV_SITE_KEY = '1x00000000000000000000AA';

export interface TurnstileWidgetHandle {
    /** Fetches a fresh token — call after a failed submit, since a token can only be used once. */
    reset: () => void;
}

interface TurnstileWidgetProps {
    /** Called with the verification token once ready, or "" if it expires or errors. */
    onToken: (token: string) => void;
}

/**
 * Invisible Cloudflare Turnstile challenge: runs in the background as soon as it mounts, with no
 * checkbox or visible UI. app/api/lead/route.ts verifies the resulting token server-side before
 * forwarding anything to n8n.
 */
const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(({ onToken }, ref) => {
    const widgetRef = useRef<TurnstileInstance>(null);
    const siteKey =
        process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || (process.env.NODE_ENV !== 'production' ? DEV_SITE_KEY : '');

    useImperativeHandle(ref, () => ({
        reset: () => widgetRef.current?.reset(),
    }));

    if (!siteKey) return null;

    return (
        <Turnstile
            ref={widgetRef}
            siteKey={siteKey}
            options={{ size: 'invisible' }}
            onSuccess={onToken}
            onExpire={() => onToken('')}
            onError={() => onToken('')}
        />
    );
});
TurnstileWidget.displayName = 'TurnstileWidget';

export default TurnstileWidget;
