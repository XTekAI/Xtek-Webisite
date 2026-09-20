"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import {
    CONSENT_MODE,
    OPEN_SETTINGS_EVENT,
    clearTrackingCookies,
    effectiveConsent,
    hasGlobalPrivacyControl,
    readConsent,
    saveConsent,
} from '../lib/consent';

const OPT_OUT = CONSENT_MODE === 'opt-out';

const COPY = {
    en: {
        title: 'Your privacy choices',
        bodyOptOut:
            'We use cookies for analytics (Google Analytics) and to measure our advertising (Meta Pixel). You can opt out of either at any time, and we honor Global Privacy Control signals.',
        bodyOptIn:
            'We use cookies to understand how the site is used (analytics) and to measure our advertising (marketing). They stay off until you choose.',
        policy: 'Privacy Policy',
        reject: OPT_OUT ? 'Opt out of all' : 'Reject all',
        accept: OPT_OUT ? 'Allow all' : 'Accept all',
        customize: 'Customize',
        save: 'Save choices',
        necessary: 'Strictly necessary',
        necessaryDesc: 'Remembers your privacy choices on this site. Always on.',
        analytics: 'Analytics',
        analyticsDesc: 'Google Analytics: helps us see which pages are useful.',
        marketing: 'Marketing',
        marketingDesc: 'Meta Pixel: measures the results of our Facebook and Instagram ads.',
        always: 'Always on',
    },
    es: {
        title: 'Tus opciones de privacidad',
        bodyOptOut:
            'Usamos cookies para analítica (Google Analytics) y para medir nuestra publicidad (Meta Pixel). Puedes desactivarlas en cualquier momento y respetamos las señales de Global Privacy Control.',
        bodyOptIn:
            'Usamos cookies para entender cómo se usa el sitio (analítica) y medir nuestra publicidad (marketing). Están desactivadas hasta que elijas.',
        policy: 'Política de Privacidad',
        reject: OPT_OUT ? 'Desactivar todo' : 'Rechazar todo',
        accept: OPT_OUT ? 'Permitir todo' : 'Aceptar todo',
        customize: 'Personalizar',
        save: 'Guardar opciones',
        necessary: 'Estrictamente necesarias',
        necessaryDesc: 'Recuerdan tus opciones de privacidad en este sitio. Siempre activas.',
        analytics: 'Analítica',
        analyticsDesc: 'Google Analytics: nos ayuda a ver qué páginas son útiles.',
        marketing: 'Marketing',
        marketingDesc: 'Meta Pixel: mide los resultados de nuestros anuncios en Facebook e Instagram.',
        always: 'Siempre activas',
    },
} as const;

const buttonBase =
    'flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white';
const outlineButton = `${buttonBase} bg-transparent border border-white/40 text-white hover:bg-white/10`;

/**
 * Privacy-choices panel. In 'opt-out' mode it only appears when the visitor
 * opens it ("Your Privacy Choices" in the footer); in 'opt-in' mode it also
 * appears automatically until a choice is made.
 */
const CookieConsent: React.FC = () => {
    const { lang } = useLanguage();
    const copy = COPY[lang];

    const [visible, setVisible] = useState(false);
    const [customize, setCustomize] = useState(false);
    const [analytics, setAnalytics] = useState(false);
    const [marketing, setMarketing] = useState(false);

    useEffect(() => {
        const stored = readConsent();
        if (!stored && hasGlobalPrivacyControl()) {
            // Honor the Global Privacy Control signal as an opt-out of analytics/marketing.
            saveConsent({ analytics: false, marketing: false });
        } else if (!stored && !OPT_OUT) {
            setVisible(true);
        }

        const open = () => {
            const current = effectiveConsent(readConsent());
            setAnalytics(current.analytics);
            setMarketing(current.marketing);
            setCustomize(true);
            setVisible(true);
        };
        window.addEventListener(OPEN_SETTINGS_EVENT, open);
        return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
    }, []);

    const apply = (choice: { analytics: boolean; marketing: boolean }) => {
        const before = effectiveConsent(readConsent());
        const revoked = (before.analytics && !choice.analytics) || (before.marketing && !choice.marketing);
        saveConsent(choice);
        setVisible(false);
        setCustomize(false);
        if (revoked) {
            // Scripts that already ran can't be unloaded: clear their cookies and reload.
            clearTrackingCookies();
            window.location.reload();
        }
    };

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-labelledby="cookie-consent-title"
            className="fixed bottom-4 left-4 right-4 md:right-auto md:max-w-lg z-[100] rounded-2xl border border-white/15 bg-primary p-6 shadow-2xl"
        >
            <h2 id="cookie-consent-title" className="text-lg font-bold text-white mb-2">{copy.title}</h2>
            <p className="text-sm text-white/75 leading-relaxed mb-4">
                {OPT_OUT ? copy.bodyOptOut : copy.bodyOptIn}{' '}
                <Link href="/privacy#cookies" className="underline underline-offset-2 text-white hover:text-white/80">{copy.policy}</Link>.
            </p>

            {customize && (
                <div className="space-y-3 mb-4 text-sm">
                    <div className="flex items-start justify-between gap-4 rounded-xl bg-white/5 p-3">
                        <div>
                            <p className="font-bold text-white">{copy.necessary}</p>
                            <p className="text-white/65">{copy.necessaryDesc}</p>
                        </div>
                        <span className="text-xs text-white/65 whitespace-nowrap pt-1">{copy.always}</span>
                    </div>
                    <label className="flex items-start justify-between gap-4 rounded-xl bg-white/5 p-3 cursor-pointer">
                        <span>
                            <span className="block font-bold text-white">{copy.analytics}</span>
                            <span className="block text-white/65">{copy.analyticsDesc}</span>
                        </span>
                        <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 h-5 w-5 accent-[#057BA3]" />
                    </label>
                    <label className="flex items-start justify-between gap-4 rounded-xl bg-white/5 p-3 cursor-pointer">
                        <span>
                            <span className="block font-bold text-white">{copy.marketing}</span>
                            <span className="block text-white/65">{copy.marketingDesc}</span>
                        </span>
                        <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-1 h-5 w-5 accent-[#057BA3]" />
                    </label>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
                <button type="button" onClick={() => apply({ analytics: false, marketing: false })} className={outlineButton}>
                    {copy.reject}
                </button>
                {customize ? (
                    <button type="button" onClick={() => apply({ analytics, marketing })} className={outlineButton}>
                        {copy.save}
                    </button>
                ) : (
                    <button type="button" onClick={() => setCustomize(true)} className={outlineButton}>
                        {copy.customize}
                    </button>
                )}
                <button type="button" onClick={() => apply({ analytics: true, marketing: true })} className={`${buttonBase} bg-primary-light text-white border border-primary-light hover:bg-secondary hover:border-secondary`}>
                    {copy.accept}
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
