"use client";

import React, { useSyncExternalStore } from 'react';
import { ArrowLeft } from 'lucide-react';
import { AUDIT_LEGAL, AUDIT_PATHS, LANDING_LAST_KEY } from '../content/audit-landing';

// Header and footer for the legal pages inside the ad landing (/legal/*). No site menu: the only way
// out is back to the landing the visitor came from.

const noSubscribe = () => () => {};
const readLast = () => {
    try {
        return sessionStorage.getItem(LANDING_LAST_KEY) || AUDIT_PATHS.en;
    } catch {
        return AUDIT_PATHS.en;
    }
};

/** The landing page (with its UTMs) the visitor came from; /free-audit if unknown. */
export const useLandingBackHref = () => useSyncExternalStore(noSubscribe, readLast, () => AUDIT_PATHS.en);

const AuditLegalShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const back = useLandingBackHref();
    const es = back.startsWith(AUDIT_PATHS.es);

    return (
        <div className="audit-landing relative bg-primary text-white min-h-screen">
            <header className="fixed top-4 inset-x-0 z-40 px-4">
                <div className="mx-auto max-w-4xl flex items-center justify-between gap-4 rounded-full border border-white/10 bg-primary/70 backdrop-blur-xl pl-5 pr-2 py-2">
                    <a href={back} aria-label="Xtek AI">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/brand/xtek-horizontal-negativo.svg" alt="Xtek AI" className="h-7 w-auto" />
                    </a>
                    <a
                        href={back}
                        className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold !text-white hover:bg-[#b45f74] active:scale-[0.98] transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        {es ? 'Volver' : 'Back'}
                    </a>
                </div>
            </header>
            <main>{children}</main>
            <footer className="border-t border-white/[0.07] px-4 md:px-6 py-10">
                <div className="mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-5 text-sm text-white/45">
                    <p>© {new Date().getFullYear()} X-Tek AI LLC · New Jersey, US</p>
                    <div className="flex gap-5">
                        <a href={AUDIT_LEGAL.privacy} className="hover:text-white">{es ? 'Privacidad' : 'Privacy'}</a>
                        <a href={AUDIT_LEGAL.terms} className="hover:text-white">{es ? 'Términos' : 'Terms'}</a>
                        <a href={AUDIT_LEGAL.sms} className="hover:text-white">SMS</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AuditLegalShell;
