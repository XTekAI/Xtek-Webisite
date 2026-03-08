"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { handleSmoothScroll } from '../lib/utils';
import { MagnetizeButton } from '../components/ui/magnetize-button';
import NeuralBackground from '../components/ui/flow-field-background';
import TrustedBy from '../components/TrustedBy';
import AutomationBenefits from '../components/AutomationBenefits';
import LandingContactForm from '../components/LandingContactForm';
import Legal from '../components/Legal';

const LandingPage: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="landing-mode">
            {/* ==================== HERO SECTION ==================== */}
            <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 z-0">
                    <NeuralBackground
                        color="#A7566A"
                        trailOpacity={0.15}
                        speed={0.6}
                        particleCount={400}
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary z-0 pointer-events-none"></div>

                <div className="max-w-5xl mx-auto text-center relative z-10 px-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary-light text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-light"></span>
                        </span>
                        {t.landing.hero.badge}
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-8 animate-fade-in-up [animation-delay:200ms] !text-white leading-tight">
                        {t.landing.hero.title_part1} <br />
                        <span className="gradient-text">{t.landing.hero.title_part2}</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/70 mb-12 animate-fade-in-up [animation-delay:400ms]">
                        {t.landing.hero.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
                        <MagnetizeButton
                            onClick={(e) => handleSmoothScroll(e, 'contact')}
                            className="w-full sm:w-auto px-10 py-5 bg-primary-light text-white font-bold text-lg rounded-full hover:bg-secondary hover:scale-105 transition-all shadow-lg shadow-primary-light/20 flex items-center justify-center gap-2 border-none h-auto"
                        >
                            {t.landing.hero.cta_primary}
                        </MagnetizeButton>
                        <a
                            href="#stats"
                            onClick={(e) => handleSmoothScroll(e, 'stats')}
                            className="w-full sm:w-auto px-8 py-5 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-secondary hover:border-secondary transition-all text-center"
                        >
                            {t.landing.hero.cta_secondary}
                        </a>
                    </div>
                </div>
            </section>

            {/* ==================== STATS BAR ==================== */}
            <section id="stats" className="py-16 bg-white/[0.03] border-y border-white/10">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-white/10">
                        <div className="text-center px-8">
                            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{t.about.stat1_val}</div>
                            <div className="text-white/50 text-sm font-bold uppercase tracking-widest">{t.about.stat1_label}</div>
                        </div>
                        <div className="text-center px-8">
                            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{t.about.stat2_val}</div>
                            <div className="text-white/50 text-sm font-bold uppercase tracking-widest">{t.about.stat2_label}</div>
                        </div>
                        <div className="text-center px-8">
                            <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{t.about.stat3_val}</div>
                            <div className="text-white/50 text-sm font-bold uppercase tracking-widest">{t.about.stat3_label}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== TRUSTED BY ==================== */}
            <TrustedBy />

            {/* ==================== BENEFITS ==================== */}
            <AutomationBenefits />

            {/* ==================== CONTACT FORM ==================== */}
            <section id="contact" className="py-24 px-6 relative overflow-hidden bg-white/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-light/50 to-transparent"></div>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                        </span>
                        Limited Availability
                    </div>
                    <h2 className="text-3xl md:text-6xl font-bold mb-6 !text-white">
                        {t.contact.section_title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/60">
                        {t.contact.section_subtitle}
                    </p>
                </div>
                <LandingContactForm />
            </section>

            {/* ==================== FINAL URGENCY CTA ==================== */}
            <section className="py-24 px-6 text-center bg-gradient-to-b from-secondary/10 via-secondary/5 to-transparent border-y border-secondary/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/5 via-transparent to-transparent pointer-events-none"></div>
                <div className="max-w-3xl mx-auto relative z-10">
                    <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                        <svg className="w-10 h-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 !text-white">{t.landing.urgency}</h2>
                    <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
                        {t.landing.hero.subtitle}
                    </p>
                    <MagnetizeButton
                        onClick={(e) => handleSmoothScroll(e, 'contact')}
                        className="px-12 py-5 bg-secondary text-white rounded-full text-xl font-bold hover:scale-105 transition-all shadow-2xl shadow-secondary/20 border-none h-auto"
                    >
                        {t.landing.hero.cta_primary}
                    </MagnetizeButton>
                </div>
            </section>

            {/* ==================== LEGAL ==================== */}
            <Legal />
        </div>
    );
};

export default LandingPage;
