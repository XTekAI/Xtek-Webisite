import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { solutions } from '../../content/solutions';
import JsonLd from '../../components/JsonLd';
import ContactSection from '../../components/ContactSection';
import LiquidBackdrop from '../../components/LiquidBackdrop';
import { breadcrumbJsonLd, buildMetadata, collectionPageJsonLd } from '../../lib/seo';

const TITLE = 'Automation Solutions for Service Businesses';
const DESCRIPTION =
    'AI receptionist, online booking, reminders, reviews, loyalty, lead follow-up, quotes, scheduling and intake forms: the specific automations Xtek AI builds.';

export const metadata: Metadata = buildMetadata({
    title: `${TITLE} | Xtek AI`,
    description: DESCRIPTION,
    path: '/solutions',
});

export default function SolutionsIndex() {
    return (
        <>
            <JsonLd
                data={[
                    collectionPageJsonLd(TITLE, DESCRIPTION, '/solutions'),
                    breadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'Solutions', path: '/solutions' },
                    ]),
                ]}
            />
            <div className="relative isolate pt-32 pb-8 px-6 max-w-6xl mx-auto">
                <LiquidBackdrop />
                <header className="text-center mb-16">
                    <p className="text-sm font-semibold tracking-wider text-primary-light uppercase mb-4">Solutions</p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text leading-tight">The Automations We Build, One by One</h1>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                        Our main services describe the big picture. These are the specific systems inside them, each explained
                        step by step.
                    </p>
                </header>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {solutions.map((s) => (
                        <Link key={s.slug} href={`/solutions/${s.slug}`} className="liquid-glass p-8 flex flex-col group">
                            <span className="text-xs font-semibold tracking-wider text-primary-light uppercase mb-3 inline-flex items-center gap-2">
                                <Sparkles className="w-4 h-4" /> {s.parent.label}
                            </span>
                            <h2 className="text-2xl font-semibold mb-3 text-white group-hover:text-accent transition-colors">{s.name}</h2>
                            <p className="text-white/60 mb-4 flex-1">{s.metaDescription}</p>
                            <span className="text-sm text-primary-light inline-flex items-center gap-1">
                                See how it works <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
            <ContactSection />
        </>
    );
}
