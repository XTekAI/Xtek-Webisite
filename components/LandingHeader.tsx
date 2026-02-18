
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { handleSmoothScroll } from '../lib/utils';
import { MagnetizeButton } from './ui/magnetize-button';

import UrgencyBanner from './UrgencyBanner';

const LandingHeader: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { id: 'services', label: t.nav.services },
        { id: 'success-stories', label: t.nav.testimonials },
        { id: 'contact', label: t.nav.contact },
    ];

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col">
            <UrgencyBanner />
            <header className={`transition-all duration-500 ${isScrolled ? 'bg-primary/95 backdrop-blur-lg py-2 shadow-2xl' : 'bg-transparent py-4'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 group relative z-50">
                        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center font-bold text-xl !text-white transition-transform group-hover:scale-110 notranslate">X</div>
                        <span className="text-2xl font-bold tracking-tight uppercase !text-white notranslate">XTEK AI</span>
                    </div>

                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map(link => (
                            <a key={link.id} href={`#${link.id}`} onClick={(e) => handleSmoothScroll(e, link.id)} className="text-sm font-medium !text-white hover:text-primary-light transition-colors">{link.label}</a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4 relative z-50">
                        <MagnetizeButton
                            onClick={(e) => handleSmoothScroll(e, 'contact')}
                            className="hidden sm:inline-flex text-sm font-semibold px-6 py-2.5 bg-primary-light hover:bg-secondary text-white transition-all duration-300 rounded-full border-none h-auto"
                        >
                            {t.nav.cta}
                        </MagnetizeButton>

                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 text-white"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Overlay */}
                    <div className={`fixed inset-0 bg-primary/95 backdrop-blur-xl z-40 transition-all duration-300 flex flex-col items-center justify-center gap-8 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                        {navLinks.map(link => (
                            <a key={link.id} href={`#${link.id}`} onClick={(e) => { handleSmoothScroll(e, link.id); setIsMenuOpen(false); }} className="text-2xl font-bold !text-white hover:text-primary-light transition-colors">{link.label}</a>
                        ))}
                        <a href="#contact" onClick={(e) => { handleSmoothScroll(e, 'contact'); setIsMenuOpen(false); }} className="px-8 py-3 bg-primary-light !text-white rounded-full font-bold text-xl">{t.nav.cta}</a>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default LandingHeader;
