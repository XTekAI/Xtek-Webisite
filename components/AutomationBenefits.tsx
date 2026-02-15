
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { handleSmoothScroll } from '../lib/utils';
import { MagnetizeButton } from './ui/magnetize-button';

const AutomationBenefits: React.FC = () => {
    const { t } = useLanguage();

    const benefits = [
        { title: t.landing.benefits.b1_title, desc: t.landing.benefits.b1_desc, icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { title: t.landing.benefits.b2_title, desc: t.landing.benefits.b2_desc, icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { title: t.landing.benefits.b3_title, desc: t.landing.benefits.b3_desc, icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
    ];

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 !text-white">{t.landing.benefits.title}</h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">{t.landing.benefits.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
                    {benefits.map((benefit, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-primary-light/10 text-primary-light rounded-3xl flex items-center justify-center mb-8 group-hover:bg-primary-light group-hover:text-white transition-all duration-500">
                                {benefit.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 !text-white">{benefit.title}</h3>
                            <p className="text-white/60 leading-relaxed">{benefit.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20">
                    <MagnetizeButton
                        onClick={(e) => handleSmoothScroll(e, 'contact')}
                        className="px-12 py-5 bg-secondary text-white rounded-full text-xl font-bold hover:scale-105 transition-all shadow-2xl shadow-secondary/20 border-none h-auto"
                    >
                        {t.landing.hero.cta_primary}
                    </MagnetizeButton>
                </div>
            </div>
        </section>
    );
};

export default AutomationBenefits;
