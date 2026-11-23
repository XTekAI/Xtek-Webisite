"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, Quote } from 'lucide-react';
import { getService, services, type ServiceSlug } from '../content/services';
import { useLanguage } from '../context/LanguageContext';
import { CONTACT } from '../lib/seo';
import { homeHref } from '../lib/navigation';
import ContactSection from '../components/ContactSection';
import CtaButton from '../components/CtaButton';

const UI = {
    en: { home: 'Home', services: 'Services', other: 'Other services', learnMore: 'Learn more', contact: 'Send us a message', challenge: 'The challenge', solution: 'What we did', result: 'The result' },
    es: { home: 'Inicio', services: 'Servicios', other: 'Otros servicios', learnMore: 'Conocer más', contact: 'Envíanos un mensaje', challenge: 'El reto', solution: 'Lo que hicimos', result: 'El resultado' },
};

/** Main call to action: book a call (Calendly) or go to the contact form on the home page. */
const CallButtons: React.FC<{ cta: string; contact: string }> = ({ cta, contact }) => (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <CtaButton href={CONTACT.calendlyUrl}>{cta}</CtaButton>
        <CtaButton href="#contact" variant="secondary" arrow={false}>{contact}</CtaButton>
    </div>
);

/**
 * Service page, in this order (the client cares most about savings, then what is included):
 * hero → savings → what's included → how we work → client story → FAQ → call to action → other services.
 */
const ServicePage: React.FC<{ slug: ServiceSlug }> = ({ slug }) => {
    const { lang } = useLanguage();
    const service = getService(slug)!;
    const c = service[lang];
    const ui = UI[lang];

    return (
        <article className="pt-28 md:pt-36 pb-20 px-5 md:px-6">
            {/* Hero */}
            <header className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
                <nav aria-label="Breadcrumb" className="text-xs text-white/40 mb-6">
                    <Link href="/" className="hover:text-white">{ui.home}</Link>
                    <span className="mx-2">/</span>
                    <Link href={homeHref('services')} className="hover:text-white">{ui.services}</Link>
                    <span className="mx-2">/</span>
                    <span className="text-white/60">{c.name}</span>
                </nav>
                <span className="inline-block px-3 py-1 rounded-full border border-primary-light/60 text-[10px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest text-primary-light mb-6">
                    {c.name}
                </span>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-6 !text-white">
                    {c.h1}{' '}
                    <span className="font-serif italic font-medium text-accent">{c.h1Highlight}</span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10">{c.intro}</p>
                <CallButtons cta={c.cta} contact={ui.contact} />
            </header>

            {/* Savings */}
            <section className="max-w-5xl mx-auto mb-16 md:mb-24">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">{c.savingsTitle}</h2>
                <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                    {c.savings.map((s) => (
                        <div key={s.title} className="rounded-3xl p-6 md:p-8 border border-accent/30 bg-accent/5">
                            <h3 className="text-lg md:text-xl font-bold text-accent mb-2">{s.title}</h3>
                            <p className="text-white/70 leading-relaxed">{s.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* What's included */}
            <section className="max-w-5xl mx-auto mb-16 md:mb-24">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">{c.includesTitle}</h2>
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                    {c.includes.map((item) => (
                        <div key={item.title} className="glass rounded-3xl p-6 md:p-8 flex gap-4">
                            <div className="flex-none w-10 h-10 rounded-xl bg-primary-light/20 text-primary-light flex items-center justify-center">
                                <Check className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1 !text-white">{item.title}</h3>
                                <p className="text-white/60 leading-relaxed">{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* How we work */}
            <section className="max-w-4xl mx-auto mb-16 md:mb-24">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">{c.processTitle}</h2>
                <ol className="space-y-4">
                    {c.process.map((step, i) => (
                        <li key={step.title} className="flex gap-4 md:gap-6 items-start glass rounded-3xl p-5 md:p-6">
                            <span className="flex-none w-10 h-10 rounded-full bg-primary-light text-white font-bold flex items-center justify-center">{i + 1}</span>
                            <div>
                                <h3 className="text-lg font-bold !text-white">{step.title}</h3>
                                <p className="text-white/60 leading-relaxed">{step.text}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Client story */}
            <section className="max-w-4xl mx-auto mb-16 md:mb-24">
                <div className="rounded-[32px] p-6 md:p-12 bg-gradient-to-br from-primary-light/15 to-secondary/10 border border-white/10">
                    <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-widest mb-4">
                        <Quote className="w-4 h-4" /> {c.story.label}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 !text-white">{c.story.title}</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            [ui.challenge, c.story.challenge],
                            [ui.solution, c.story.solution],
                            [ui.result, c.story.result],
                        ].map(([label, text]) => (
                            <div key={label}>
                                <p className="text-sm font-bold uppercase tracking-wider text-primary-light mb-2">{label}</p>
                                <p className="text-white/75 leading-relaxed">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ (answers stay in the HTML so search engines and AI can read them) */}
            <section className="max-w-3xl mx-auto mb-16 md:mb-24">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12">{c.faqTitle}</h2>
                <div className="space-y-3">
                    {c.faqs.map((f) => (
                        <details key={f.q} className="group glass rounded-2xl px-5 md:px-6 py-4">
                            <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-white min-h-11">
                                <h3 className="text-base md:text-lg">{f.q}</h3>
                                <ChevronDown className="flex-none w-5 h-5 text-primary-light transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="mt-3 text-white/65 leading-relaxed">{f.a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* Call to action */}
            <section className="max-w-4xl mx-auto text-center mb-16 md:mb-24 glass rounded-[32px] p-8 md:p-14">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">{c.ctaTitle}</h2>
                <p className="text-white/65 text-lg mb-8 max-w-2xl mx-auto">{c.ctaText}</p>
                <CallButtons cta={c.cta} contact={ui.contact} />
            </section>

            <ContactSection />

            {/* Other services (internal links) */}
            <nav aria-label={ui.other} className="max-w-5xl mx-auto">
                <h2 className="text-xl font-bold mb-6 text-center">{ui.other}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {services.filter((s) => s.slug !== slug).map((s) => (
                        <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 px-5 py-4 text-white/80 hover:text-white hover:border-primary-light/60 transition-colors"
                        >
                            <span className="font-semibold">{s[lang].name}</span>
                            <ArrowRight className="flex-none w-4 h-4 text-primary-light" />
                        </Link>
                    ))}
                </div>
            </nav>
        </article>
    );
};

export default ServicePage;
