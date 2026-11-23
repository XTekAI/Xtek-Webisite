import type { Metadata } from 'next';
import { serviceAreas } from '../../../content/service-areas';
import ServiceAreaLayout from '../../../views/service-areas/ServiceAreaLayout';
import JsonLd from '../../../components/JsonLd';
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceAreaJsonLd } from '../../../lib/seo';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ cityId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { cityId } = await params;
    const area = serviceAreas.find((a) => a.id === cityId);

    if (!area) {
        return {
            title: 'Service Area Not Found | Xtek AI',
            robots: { index: false, follow: false },
        };
    }

    return buildMetadata({
        title: `${area.metaTitle} | Xtek AI`,
        description: area.metaDescription,
        path: `/service-areas/${area.id}`,
    });
}

export const dynamicParams = false;

export function generateStaticParams() {
    return serviceAreas.map((area) => ({
        cityId: area.id,
    }));
}

export default async function ServiceAreaPage({ params }: Props) {
    const { cityId } = await params;
    const area = serviceAreas.find((a) => a.id === cityId);

    if (!area) notFound();

    return (
        <>
            {area && (
                <JsonLd
                    data={[
                        serviceAreaJsonLd(area),
                        faqJsonLd(area.faqs),
                        breadcrumbJsonLd([
                            { name: 'Home', path: '/' },
                            { name: area.name, path: `/service-areas/${area.id}` },
                        ]),
                    ]}
                />
            )}
            <ServiceAreaLayout area={area} />
        </>
    );
}
