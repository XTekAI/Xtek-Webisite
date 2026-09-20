import Link from 'next/link';
import { serviceAreas } from '../content/service-areas';

/** Crawlable links from the home page to every service-area page. */
const ServiceAreasStrip: React.FC = () => (
    <section aria-labelledby="areas-heading" className="py-16 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
            <h2 id="areas-heading" className="text-2xl md:text-3xl font-bold mb-3">
                AI Automation Agency in New Jersey, Pennsylvania &amp; New York
            </h2>
            <p className="text-white/50 mb-8 max-w-2xl mx-auto">
                Local strategy sessions and hands-on implementation for businesses across the region.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
                {serviceAreas.map((area) => (
                    <Link
                        key={area.id}
                        href={`/service-areas/${area.id}`}
                        className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 hover:text-primary-light hover:border-primary-light/40 transition-colors"
                    >
                        {area.city}, {area.state}
                    </Link>
                ))}
                <Link
                    href="/next-horizon"
                    className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/80 hover:text-primary-light hover:border-primary-light/40 transition-colors"
                >
                    Next Horizon Platform
                </Link>
            </div>
        </div>
    </section>
);

export default ServiceAreasStrip;
