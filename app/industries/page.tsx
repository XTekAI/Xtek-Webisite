import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';
import { industries } from '../../content/industries';
import JsonLd from '../../components/JsonLd';
import ContactSection from '../../components/ContactSection';
import LiquidBackdrop from '../../components/LiquidBackdrop';
import { breadcrumbJsonLd, buildMetadata, collectionPageJsonLd } from '../../lib/seo';

const TITLE = 'Industries We Serve: AI Automation for Local Service Businesses';
const DESCRIPTION =
    'AI agents, booking, follow-up and marketing automation for tattoo studios, barbershops, auto repair, cleaning, contractors, plumbers, dental and eye care practices.';

export const metadata: Metadata = buildMetadata({
    title: `${TITLE} | Xtek AI`,
    description: DESCRIPTION,
    path: '/industries',
});

export default function IndustriesIndex() {
    return (
        <>
            <JsonLd
                data={[
                    collectionPageJsonLd(TITLE, DESCRIPTION, '/industries'),
                    breadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'Industries', path: '/industries' },
                    ]),
                ]}
            />
            <div className="relative isolate pt-32 pb-8 px-6 max-w-6xl mx-auto">
                <LiquidBackdrop />
                <header className="text-center mb-16">
                    <p className="text-sm font-semibold tracking-wider text-primary-light uppercase mb-4">Industries</p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text leading-tight">
                        AI Automation Built for the Way Your Industry Works
                    </h1>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                        We have built booking systems, AI agents, follow-up and marketing for studios, shops, contractors and
                        practices. Pick your industry to see what we automate and how a project works.
                    </p>
                </header>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {industries.map((i) => (
                        <Link key={i.slug} href={`/industries/${i.slug}`} className="liquid-glass p-8 flex flex-col group">
                            <span className="text-xs font-semibold tracking-wider text-primary-light uppercase mb-3 inline-flex items-center gap-2">
                                <Briefcase className="w-4 h-4" /> Industry
                            </span>
                            <h2 className="text-2xl font-semibold mb-3 text-white group-hover:text-accent transition-colors">{i.name}</h2>
                            <p className="text-white/60 mb-4 flex-1">{i.solutions.slice(0, 3).map((s) => s.title).join(' · ')}</p>
                            <span className="text-sm text-primary-light inline-flex items-center gap-1">
                                AI automation for {i.short.toLowerCase()} <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    ))}
                </div>

                <p className="text-center text-white/50 mt-12">
                    Don&apos;t see your industry? Most service businesses share the same problems.{' '}
                    <a href="#contact" className="text-primary-light underline underline-offset-2 hover:text-accent">Tell us about yours</a>.
                </p>
            </div>
            <ContactSection />
        </>
    );
}
