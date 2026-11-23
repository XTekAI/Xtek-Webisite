import Link from 'next/link';
import React from 'react';
import { ArrowRight, CircleAlert, Briefcase } from 'lucide-react';

import { industries, type Industry } from '../../content/industries';
import { serviceAreas } from '../../content/service-areas';
import ContactSection from '../../components/ContactSection';
import LiquidBackdrop from '../../components/LiquidBackdrop';
import CtaButton from '../../components/CtaButton';

const pill =
    'px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 hover:text-accent hover:border-accent/40 transition-colors';

const IndustryLayout: React.FC<{ industry: Industry }> = ({ industry }) => (
    <div className="relative isolate pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <LiquidBackdrop />

        {/* Hero */}
        <header className="text-center mb-20 relative">
            <p className="text-sm font-semibold tracking-wider text-primary-light uppercase mb-4 inline-flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Industries · {industry.short}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text max-w-4xl mx-auto leading-tight">{industry.heroTitle}</h1>
            <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-3xl mx-auto leading-relaxed">{industry.heroSub}</p>
            <div className="flex justify-center">
                <CtaButton>Book a free strategy call</CtaButton>
            </div>
        </header>

        {/* Intro */}
        <section className="max-w-3xl mx-auto mb-20 space-y-6 text-lg text-white/70 leading-relaxed">
            {industry.intro.map((p, i) => (
                <p key={i}>{p}</p>
            ))}
        </section>

        {/* Pain points */}
        <section className="max-w-4xl mx-auto mb-20 liquid-glass p-10" aria-labelledby="pain-heading">
            <h2 id="pain-heading" className="text-2xl md:text-3xl font-bold mb-8">
                Where time and customers slip away
            </h2>
            <ul className="grid md:grid-cols-2 gap-4 text-white/75">
                {industry.painPoints.map((p) => (
                    <li key={p} className="flex gap-3">
                        <CircleAlert className="w-5 h-5 text-accent shrink-0 mt-0.5" /> {p}
                    </li>
                ))}
            </ul>
        </section>

        {/* Solutions */}
        <section className="mb-20" aria-labelledby="solutions-heading">
            <h2 id="solutions-heading" className="text-3xl font-bold text-center mb-12">
                What we automate for {industry.short.toLowerCase()}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {industry.solutions.map((s) => (
                    <Link key={s.title} href={s.href} className="liquid-glass p-8 text-left group">
                        <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-accent transition-colors">{s.title}</h3>
                        <p className="text-white/60 mb-4">{s.text}</p>
                        <span className="text-sm text-primary-light inline-flex items-center gap-1">
                            {s.href.startsWith('/solutions/') ? 'See how it works' : 'See the service'} <ArrowRight className="w-4 h-4" />
                        </span>
                    </Link>
                ))}
            </div>
        </section>

        {/* Steps */}
        <section className="max-w-5xl mx-auto mb-20" aria-labelledby="steps-heading">
            <h2 id="steps-heading" className="text-3xl font-bold text-center mb-12">
                How a typical project works
            </h2>
            <ol className="grid md:grid-cols-4 gap-6">
                {industry.steps.map((s, i) => (
                    <li key={s.title} className="liquid-glass p-6">
                        <span className="text-sm font-bold text-accent">Step {i + 1}</span>
                        <h3 className="text-lg font-semibold mt-2 mb-2">{s.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed">{s.text}</p>
                    </li>
                ))}
            </ol>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto mb-20" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-3xl font-bold text-center mb-12">
                Frequently asked questions
            </h2>
            <div className="space-y-6">
                {industry.faqs.map((f) => (
                    <div key={f.q} className="liquid-glass p-8">
                        <h3 className="relative text-xl font-bold mb-3">{f.q}</h3>
                        <p className="text-white/60">{f.a}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Internal links */}
        <nav aria-label="More from Xtek AI" className="max-w-4xl mx-auto mb-12 text-center">
            <h2 className="text-2xl font-bold mb-6">Other industries we work with</h2>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {industries
                    .filter((i) => i.slug !== industry.slug)
                    .map((i) => (
                        <Link key={i.slug} href={`/industries/${i.slug}`} className={pill}>
                            {i.short}
                        </Link>
                    ))}
            </div>
            <h2 className="text-2xl font-bold mb-6">Areas we serve</h2>
            <div className="flex flex-wrap justify-center gap-3">
                {serviceAreas.map((a) => (
                    <Link key={a.id} href={`/service-areas/${a.id}`} className={pill}>
                        {a.name}
                    </Link>
                ))}
                <span className="px-5 py-2 text-sm text-white/50">and businesses nationwide</span>
            </div>
        </nav>

        <ContactSection
            title="Let's talk about your business"
            subtitle="Answer a few quick questions and we'll plan a free strategy call around how your business works."
        />
    </div>
);

export default IndustryLayout;
