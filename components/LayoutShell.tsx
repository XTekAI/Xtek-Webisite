"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Header from './Header';
import Footer from './Footer';
import LandingHeader from './LandingHeader';
import LandingFooter from './LandingFooter';

const LayoutShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLandingMode } = useLanguage();

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
