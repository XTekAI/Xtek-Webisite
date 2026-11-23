import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { serviceAreas } from '../../content/service-areas';
import JsonLd from '../../components/JsonLd';
import ContactSection from '../../components/ContactSection';
import LiquidBackdrop from '../../components/LiquidBackdrop';
import { breadcrumbJsonLd, buildMetadata, collectionPageJsonLd } from '../../lib/seo';

const TITLE = 'Service Areas: AI Automation in New Jersey, NYC & Philadelphia';
const DESCRIPTION =
    'Xtek AI is a New Jersey AI automation agency serving businesses across NJ, South Jersey, Bergen County, New York City, Philadelphia and nationwide.';

export const metadata: Metadata = buildMetadata({
    title: `${TITLE} | Xtek AI`,
    description: DESCRIPTION,
    path: '/service-areas',
});

export default function ServiceAreasIndex() {
    return (
        <>
            <JsonLd
                data={[
                    collectionPageJsonLd(TITLE, DESCRIPTION, '/service-areas'),
                    breadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'Service Areas', path: '/service-areas' },
                    ]),
                ]}
            />
            <div className="relative isolate pt-32 pb-8 px-6 max-w-6xl mx-auto">
                <LiquidBackdrop />
                <header className="text-center mb-16">
                    <p className="text-sm font-semibold tracking-wider text-primary-light uppercase mb-4">Service Areas</p>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text leading-tight">
                        AI Automation for Businesses Across New Jersey, New York &amp; Philadelphia
                    </h1>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                        We are based in New Jersey and work with businesses throughout the region and across the US, over video
                        calls and in person when you are close by. Pick your area to see how we help local businesses there.
                    </p>
                </header>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {serviceAreas.map((area) => (
                        <Link
                            key={area.id}
                            href={`/service-areas/${area.id}`}
                            className="liquid-glass p-8 flex flex-col group"
                        >
                            <span className="text-xs font-semibold tracking-wider text-primary-light uppercase mb-3 inline-flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> {area.state}
                            </span>
                            <h2 className="text-2xl font-semibold mb-3 text-white group-hover:text-accent transition-colors">
                                {area.name}
                            </h2>
                            <p className="text-white/60 mb-4 flex-1">{area.towns.slice(0, 5).join(' · ')}</p>
                            <span className="text-sm text-primary-light inline-flex items-center gap-1">
                                AI automation in {area.name} <ArrowRight className="w-4 h-4" />
                            </span>
                        </Link>
                    ))}
                </div>

                <p className="text-center text-white/50 mt-12">
                    Outside these areas? We work with businesses nationwide.{' '}
                    <a href="#contact" className="text-primary-light underline underline-offset-2">Tell us about your business</a>.
                </p>
            </div>
            <ContactSection />
        </>
    );
}
