
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const UrgencyBanner: React.FC = () => {
    const { t, isLandingMode } = useLanguage();

    if (!isLandingMode) return null;

    return (
        <div className="bg-secondary/95 backdrop-blur-md py-2 px-6 text-center animate-fade-in border-b border-white/10">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
                <p className="text-white font-bold text-sm md:text-base tracking-wide uppercase">
                    {t.landing.urgency}
                </p>
            </div>
        </div>
    );
};

export default UrgencyBanner;
