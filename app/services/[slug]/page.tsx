import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getService, services } from '../../../content/services';
import ServicePage from '../../../views/ServicePage';
import JsonLd from '../../../components/JsonLd';
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from '../../../lib/seo';

interface Props {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
    return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = getService(slug);
    if (!service) return { title: 'Service Not Found | Xtek AI', robots: { index: false, follow: false } };

    return buildMetadata({
        title: service.en.metaTitle,
        description: service.en.metaDescription,
        path: `/services/${service.slug}`,
    });
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const service = getService(slug);
    if (!service) notFound();

    const copy = service.en;
    return (
        <>
            <JsonLd
                data={[
                    serviceJsonLd({
                        slug: service.slug,
                        name: copy.name,
                        serviceType: service.serviceType,
                        description: copy.metaDescription,
                    }),
                    faqJsonLd(copy.faqs),
                    breadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'Services', path: '/#services' },
                        { name: copy.name, path: `/services/${service.slug}` },
                    ]),
                ]}
            />
            <ServicePage slug={service.slug} />
        </>
    );
}
