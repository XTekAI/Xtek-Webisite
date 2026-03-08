"use client";

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { handleSmoothScroll } from '../lib/utils';
import { MagnetizeButton } from './ui/magnetize-button';
import UrgencyBanner from './UrgencyBanner';

const LandingHeader: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col">
            <UrgencyBanner />
            <header className={`transition-all duration-500 ${isScrolled ? 'bg-primary/95 backdrop-blur-lg py-2 shadow-2xl' : 'bg-transparent py-4'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center font-bold text-xl !text-white transition-transform group-hover:scale-110 notranslate">X</div>
                        <span className="text-2xl font-bold tracking-tight uppercase !text-white notranslate">XTEK AI</span>
                    </div>

                    <MagnetizeButton
                        onClick={(e) => handleSmoothScroll(e, 'contact')}
                        className="text-sm font-semibold px-6 py-2.5 bg-primary-light hover:bg-secondary text-white transition-all duration-300 rounded-full border-none h-auto"
                    >
                        {t.landing.hero.cta_primary}
                    </MagnetizeButton>
                </div>
            </header>
        </div>
    );
};

export default LandingHeader;
