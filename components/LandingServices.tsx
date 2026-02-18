import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LandingServices: React.FC = () => {
    const { t } = useLanguage();

    const services = [
        { title: t.services.s1_title, desc: t.services.s1_desc, icon: '📊' },
        { title: t.services.s2_title, desc: t.services.s2_desc, icon: '⚙️' },
        { title: t.services.s3_title, desc: t.services.s3_desc, icon: '🤖' },
        { title: t.services.s4_title, desc: t.services.s4_desc, icon: '📈' },
        { title: t.services.s5_title, desc: t.services.s5_desc, icon: '💻' },
        { title: t.services.s6_title, desc: t.services.s6_desc, icon: '✍️' },
    ];

    return (
        <section id="services" className="py-20 px-6 bg-primary/40">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-sm font-bold text-primary-light uppercase tracking-widest mb-4 inline-block">{t.services.badge}</span>
                    <h2 className="text-3xl md:text-5xl font-bold !text-white">{t.services.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, idx) => (
                        <div key={idx} className="glass p-8 rounded-3xl hover:border-primary-light/50 transition-all group">
                            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                            <h3 className="text-xl font-bold mb-4 !text-white">{service.title}</h3>
                            <p className="text-white/60 text-sm leading-relaxed">{service.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-primary-light font-bold hover:underline flex items-center gap-2 mx-auto"
                    >
                        {t.services.custom_cta}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default LandingServices;
