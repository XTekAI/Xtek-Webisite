
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import LandingServices from '../components/LandingServices';
import AutomationBenefits from '../components/AutomationBenefits';
import SuccessStories from '../components/SuccessStories';
import LandingContactForm from '../components/LandingContactForm';
import Legal from '../components/Legal';
import { MagnetizeButton } from '../components/ui/magnetize-button';

const LandingPage: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="landing-mode">
            <Hero />
            <TrustedBy />

            <section id="contact" className="py-24 px-6 relative overflow-hidden bg-white/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-light/50 to-transparent"></div>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 !text-white">
                        {t.contact.section_title}
                    </h2>
                    <p className="text-xl text-white/60">
                        {t.contact.section_subtitle}
                    </p>
                </div>
                <LandingContactForm />
            </section>

            <LandingServices />

            <AutomationBenefits />

            <SuccessStories />

            <section className="py-20 px-6 text-center bg-secondary/10 border-y border-secondary/20">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 !text-white">{t.landing.urgency}</h2>
                    <MagnetizeButton
                        onClick={(e) => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-12 py-5 bg-secondary text-white rounded-full text-xl font-bold hover:scale-105 transition-all shadow-2xl shadow-secondary/20 border-none h-auto"
                    >
                        {t.landing.hero.cta_primary}
                    </MagnetizeButton>
                </div>
            </section>

            <Legal />
        </div>
    );
};

export default LandingPage;
