import type { Metadata } from 'next';
import { serviceAreas } from '../../../content/service-areas';
import ServiceAreaLayout from '../../../views/service-areas/ServiceAreaLayout';
import JsonLd from '../../../components/JsonLd';
import { breadcrumbJsonLd, buildMetadata, serviceAreaJsonLd } from '../../../lib/seo';

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
        title: area.metaTitle,
        description: area.metaDescription,
        path: `/service-areas/${area.id}`,
        keywords: area.service_keywords.join(', '),
    });
}

export function generateStaticParams() {
    return serviceAreas.map((area) => ({
        cityId: area.id,
    }));
}

export default async function ServiceAreaPage({ params }: Props) {
    const { cityId } = await params;
    const area = serviceAreas.find((a) => a.id === cityId);

    return (
        <>
            {area && (
                <JsonLd
                    data={[
                        serviceAreaJsonLd(area),
                        breadcrumbJsonLd([
                            { name: 'Home', path: '/' },
                            { name: `${area.city}, ${area.state}`, path: `/service-areas/${area.id}` },
                        ]),
                    ]}
                />
            )}
            <ServiceAreaLayout />
        </>
    );
}
