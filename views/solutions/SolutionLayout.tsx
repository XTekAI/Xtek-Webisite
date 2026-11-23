import Link from 'next/link';
import React from 'react';
import { ArrowRight, Check, Plug, Sparkles } from 'lucide-react';

import { solutions, type Solution } from '../../content/solutions';
import { industries } from '../../content/industries';
import ContactSection from '../../components/ContactSection';
import LiquidBackdrop from '../../components/LiquidBackdrop';
import CtaButton from '../../components/CtaButton';

const pill =
    'px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 hover:text-accent hover:border-accent/40 transition-colors';

const SolutionLayout: React.FC<{ solution: Solution }> = ({ solution }) => {
    const usedBy = industries.filter((i) => i.solutions.some((s) => s.href === `/solutions/${solution.slug}`));
    return (
        <div className="relative isolate pt-32 pb-24 px-6 max-w-7xl mx-auto">
            <LiquidBackdrop />

            {/* Hero */}
            <header className="text-center mb-20">
                <p className="text-sm font-semibold tracking-wider text-primary-light uppercase mb-4 inline-flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Solutions · {solution.short}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text max-w-4xl mx-auto leading-tight">{solution.heroTitle}</h1>
                <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-3xl mx-auto leading-relaxed">{solution.heroSub}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <CtaButton>Book a free strategy call</CtaButton>
                    <CtaButton href={solution.parent.href} variant="secondary">
                        Part of {solution.parent.label}
                    </CtaButton>
                </div>
            </header>

            {/* Intro */}
            <section className="max-w-3xl mx-auto mb-20 space-y-6 text-lg text-white/70 leading-relaxed">
                {solution.intro.map((p, i) => (
                    <p key={i}>{p}</p>
                ))}
            </section>

            {/* Includes + works with */}
            <section className="max-w-5xl mx-auto mb-20 grid md:grid-cols-3 gap-6">
                <div className="liquid-glass p-10 md:col-span-2">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">What’s included</h2>
                    <ul className="space-y-4 text-white/75">
                        {solution.includes.map((x) => (
                            <li key={x} className="flex gap-3">
                                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" /> {x}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="liquid-glass p-10">
                    <h2 className="text-2xl font-bold mb-8">Works with</h2>
                    <ul className="space-y-4 text-white/75">
                        {solution.worksWith.map((x) => (
                            <li key={x} className="flex gap-3">
                                <Plug className="w-5 h-5 text-primary-light shrink-0 mt-0.5" /> {x}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Steps */}
            <section className="max-w-5xl mx-auto mb-20" aria-labelledby="steps-heading">
                <h2 id="steps-heading" className="text-3xl font-bold text-center mb-12">
                    How we set it up
                </h2>
                <ol className="grid md:grid-cols-4 gap-6">
                    {solution.steps.map((s, i) => (
                        <li key={s.title} className="liquid-glass p-6">
                            <span className="text-sm font-bold text-accent">Step {i + 1}</span>
                            <h3 className="text-lg font-semibold mt-2 mb-2">{s.title}</h3>
                            <p className="text-white/60 text-sm leading-relaxed">{s.text}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* Related service / product */}
            <section className="max-w-5xl mx-auto mb-20 grid md:grid-cols-2 gap-6">
                <Link href={solution.parent.href} className="liquid-glass p-8 group">
                    <span className="text-xs font-semibold tracking-wider text-primary-light uppercase">Main service</span>
                    <h2 className="text-2xl font-semibold mt-2 mb-3 group-hover:text-accent transition-colors">{solution.parent.label}</h2>
                    <p className="text-white/60 mb-4">{solution.parent.text}</p>
                    <span className="text-sm text-primary-light inline-flex items-center gap-1">
                        See the service <ArrowRight className="w-4 h-4" />
                    </span>
                </Link>
                {solution.product ? (
                    <a href={solution.product.href} target="_blank" rel="noopener noreferrer" className="liquid-glass p-8 group">
                        <span className="text-xs font-semibold tracking-wider text-primary-light uppercase">Our product</span>
                        <h2 className="text-2xl font-semibold mt-2 mb-3 group-hover:text-accent transition-colors">{solution.product.label}</h2>
                        <p className="text-white/60 mb-4">{solution.product.text}</p>
                        <span className="text-sm text-primary-light inline-flex items-center gap-1">
                            Visit {solution.product.label} <ArrowRight className="w-4 h-4" />
                        </span>
                    </a>
                ) : (
                    <Link href="/services/smartflow-ai-growth-audit" className="liquid-glass p-8 group">
                        <span className="text-xs font-semibold tracking-wider text-primary-light uppercase">Not sure where to start?</span>
                        <h2 className="text-2xl font-semibold mt-2 mb-3 group-hover:text-accent transition-colors">SmartFlow AI: Growth Audit</h2>
                        <p className="text-white/60 mb-4">We review how your business runs today and tell you which automation will help most first.</p>
                        <span className="text-sm text-primary-light inline-flex items-center gap-1">
                            See the audit <ArrowRight className="w-4 h-4" />
                        </span>
                    </Link>
                )}
            </section>

            {/* FAQ */}
            <section className="max-w-3xl mx-auto mb-20" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-3xl font-bold text-center mb-12">
                    Frequently asked questions
                </h2>
                <div className="space-y-6">
                    {solution.faqs.map((f) => (
                        <div key={f.q} className="liquid-glass p-8">
                            <h3 className="relative text-xl font-bold mb-3">{f.q}</h3>
                            <p className="text-white/60">{f.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Internal links */}
            <nav aria-label="More from Xtek AI" className="max-w-4xl mx-auto mb-12 text-center">
                {usedBy.length > 0 && (
                    <>
                        <h2 className="text-2xl font-bold mb-6">Industries that use this</h2>
                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            {usedBy.map((i) => (
                                <Link key={i.slug} href={`/industries/${i.slug}`} className={pill}>
                                    {i.short}
                                </Link>
                            ))}
                        </div>
                    </>
                )}
                <h2 className="text-2xl font-bold mb-6">Other solutions</h2>
                <div className="flex flex-wrap justify-center gap-3">
                    {solutions
                        .filter((s) => s.slug !== solution.slug)
                        .map((s) => (
                            <Link key={s.slug} href={`/solutions/${s.slug}`} className={pill}>
                                {s.short}
                            </Link>
                        ))}
                </div>
            </nav>

            <ContactSection
                title="Let's talk about your business"
                subtitle="Answer a few quick questions and we'll plan a free strategy call around how your business works."
            />
        </div>
    );
};

export default SolutionLayout;
