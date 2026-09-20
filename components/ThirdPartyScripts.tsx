"use client";

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { CONSENT_CHANGED_EVENT, effectiveConsent, readConsent } from '../lib/consent';

const GA_ID = 'G-29BT1LZTS0';
const META_PIXEL_ID = '783543120904007';

/**
 * Loads Google Analytics and the Meta Pixel according to the visitor's privacy
 * choice (see lib/consent.ts): they load by default in 'opt-out' mode unless the
 * visitor opted out or sends a Global Privacy Control signal.
 */
export default function ThirdPartyScripts() {
    const [allowed, setAllowed] = useState<{ analytics: boolean; marketing: boolean } | null>(null);

    useEffect(() => {
        setAllowed(effectiveConsent(readConsent()));
        const onChange = () => setAllowed(effectiveConsent(readConsent()));
        window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
        return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
    }, []);

    return (
        <>
            {allowed?.analytics && (
                <>
                    <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_ID}');
                        `}
                    </Script>
                </>
            )}

            {allowed?.marketing && (
                <Script id="meta-pixel" strategy="afterInteractive">
                    {`
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '${META_PIXEL_ID}');
                        fbq('track', 'PageView');
                    `}
                </Script>
            )}
        </>
    );
}
