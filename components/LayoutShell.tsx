"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { AUDIT_PATHS } from '../content/audit-landing';
import Header from './Header';
import Footer from './Footer';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';
import AuditLegalShell from './AuditLegalShell';

const LayoutShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLandingMode } = useLanguage();
    const pathname = usePathname();

    // The Meta Ads landing pages (and landing.xtekai.com, which renders the same page) bring their own
    // header and footer: no site navigation, one action.
    if (Object.values(AUDIT_PATHS).includes(pathname) || (isLandingMode && pathname === '/')) {
        return <>{children}</>;
    }

    // The legal pages inside the ad funnel: landing header, no site menu.
    if (pathname.startsWith('/legal/')) return <AuditLegalShell>{children}</AuditLegalShell>;

    if (isLandingMode) {
        return (
            <>
                <LandingHeader />
                <main className="min-h-screen">
                    {children}
                </main>
                <LandingFooter />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default LayoutShell;
