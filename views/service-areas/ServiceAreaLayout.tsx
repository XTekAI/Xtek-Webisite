import Link from 'next/link';
import React from 'react';
import { ArrowRight, CheckCircle, MapPin, Video, Car } from 'lucide-react';

import { serviceAreas, type ServiceArea } from '../../content/service-areas';
import { getService } from '../../content/services';
import { industries } from '../../content/industries';
import ContactSection from '../../components/ContactSection';
import LiquidBackdrop from '../../components/LiquidBackdrop';
import CtaButton from '../../components/CtaButton';

const pill =
    'px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 hover:text-accent hover:border-primary-light/40 transition-colors';

const ServiceAreaLayout: React.FC<{ area: ServiceArea }> = ({ area }) => {
    const label = area.kind === 'City' && area.name !== 'New York City' ? `${area.name}, ${area.state}` : area.name;

    return (
        <div className="relative isolate pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <LiquidBackdrop />
            {/* Hero */}
            <header className="text-center mb-20 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-primary-light/10 blur-[100px] rounded-full"></div>
                <p className="relative text-sm font-semibold tracking-wider text-primary-light uppercase mb-4 inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {label}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text max-w-4xl mx-auto leading-tight relative">{area.heroTitle}</h1>
                <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-3xl mx-auto leading-relaxed relative">{area.heroSub}</p>
                <div className="relative flex justify-center">
                    <CtaButton>Book a free strategy call</CtaButton>
                </div>
            </header>

            {/* Intro */}
            <section className="max-w-3xl mx-auto mb-20 space-y-6 text-lg text-white/70 leading-relaxed">
                {area.intro.map((p, i) => (
                    <p key={i}>{p}</p>
                ))}
            </section>

            {/* Services */}
            <section className="mb-20" aria-labelledby="services-heading">
                <h2 id="services-heading" className="text-3xl font-bold text-center mb-12">
                    How we help businesses in {area.name}
                </h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {area.serviceFocus.map(({ slug, text }) => {
                        const service = getService(slug);
                        if (!service) return null;
                        return (
                            <Link
                                key={slug}
                                href={`/services/${slug}`}
                                className="liquid-glass p-8 text-left group"
                            >
                                <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-accent transition-colors">
                                    {service.en.name}
                                </h3>
                                <p className="text-white/60 mb-4">{text}</p>
                                <span className="text-sm text-primary-light inline-flex items-center gap-1">
                                    Learn more <ArrowRight className="w-4 h-4" />
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Towns + how we work */}
            <section className="mb-20 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                <div className="liquid-glass p-10">
                    <h2 className="text-2xl font-bold mb-6">Areas we serve around {area.name}</h2>
                    <ul className="grid grid-cols-2 gap-3 text-white/70">
                        {area.towns.map((t) => (
                            <li key={t} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-primary-light shrink-0" /> {t}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="liquid-glass p-10">
                    <h2 className="text-2xl font-bold mb-6">How we work with you</h2>
                    <div className="space-y-5 text-white/70">
                        <p className="flex gap-3">
                            <Video className="w-6 h-6 text-primary-light shrink-0" />
                            Strategy sessions and check-ins over video calls, at times that fit your schedule.
                        </p>
                        <p className="flex gap-3">
                            <Car className="w-6 h-6 text-primary-light shrink-0" />
                            In-person visits when you are within driving distance of our New Jersey base.
                        </p>
                        <p className="flex gap-3">
                            <CheckCircle className="w-6 h-6 text-primary-light shrink-0" />
                            Every project starts with an audit, so you know what will be automated and why before anything is built.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl mx-auto mb-20" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-3xl font-bold text-center mb-12">
                    Frequently asked questions
                </h2>
                <div className="space-y-6">
                    {area.faqs.map((f) => (
                        <div key={f.q} className="liquid-glass p-8">
                            <h3 className="relative text-xl font-bold mb-3">{f.q}</h3>
                            <p className="text-white/60">{f.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Internal links */}
            <nav aria-label="More from Xtek AI" className="max-w-4xl mx-auto mb-16 text-center">
                <h2 className="text-2xl font-bold mb-8">Other areas we serve</h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {serviceAreas
                        .filter((a) => a.id !== area.id)
                        .map((a) => (
                            <Link key={a.id} href={`/service-areas/${a.id}`} className={pill}>
                                AI automation in {a.name}
                            </Link>
                        ))}
                    <Link href="/stories" className={pill}>Success stories</Link>
                    <Link href="/blog" className={pill}>AI automation blog</Link>
                </div>
                <h2 className="text-2xl font-bold mt-12 mb-8">Industries we work with in {area.name}</h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {industries.map((i) => (
                        <Link key={i.slug} href={`/industries/${i.slug}`} className={pill}>
                            {i.short}
                        </Link>
                    ))}
                </div>
            </nav>

            <ContactSection
                title={`Let's talk about your ${area.name} business`}
                subtitle="Answer a few quick questions and we'll get back to you to plan your free strategy call."
            />
        </div>
    );
};

export default ServiceAreaLayout;
