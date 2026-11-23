import Link from 'next/link';
import { serviceAreas } from '../content/service-areas';
import { industries } from '../content/industries';

/** Crawlable links from the home page to every service-area page. */
const ServiceAreasStrip: React.FC = () => (
    <section aria-labelledby="areas-heading" className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
            <h2 id="areas-heading" className="text-2xl md:text-3xl font-bold mb-3">
                AI Automation Agency in New Jersey, New York &amp; Philadelphia
            </h2>
            <p className="text-white/50 mb-8 max-w-2xl mx-auto">
                Local strategy sessions and hands-on implementation for businesses across the region.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                {serviceAreas.map((area) => (
                    <Link
                        key={area.id}
                        href={`/service-areas/${area.id}`}
                        className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 hover:text-accent hover:border-primary-light/40 transition-colors"
                    >
                        AI automation in {area.name}
                    </Link>
                ))}
                <Link
                    href="/next-horizon"
                    className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 hover:text-accent hover:border-primary-light/40 transition-colors"
                >
                    Next Horizon Platform
                </Link>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mt-14 mb-3">AI Automation by Industry</h2>
            <p className="text-white/50 mb-8 max-w-2xl mx-auto">Systems built around how studios, shops, contractors and practices actually work.</p>
            <div className="flex flex-wrap justify-center gap-3">
                {industries.map((i) => (
                    <Link
                        key={i.slug}
                        href={`/industries/${i.slug}`}
                        className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 hover:text-accent hover:border-primary-light/40 transition-colors"
                    >
                        {i.short}
                    </Link>
                ))}
            </div>
        </div>
    </section>
);

export default ServiceAreasStrip;
