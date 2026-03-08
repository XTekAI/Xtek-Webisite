import type { Metadata } from 'next';
import { serviceAreas } from '../../../content/service-areas';
import ServiceAreaLayout from '../../../views/service-areas/ServiceAreaLayout';

interface Props {
    params: Promise<{ cityId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { cityId } = await params;
    const area = serviceAreas.find((a) => a.id === cityId);

    if (!area) {
        return {
            title: 'Service Area Not Found | Xtek AI',
        };
    }

    return {
        title: area.metaTitle,
        description: area.metaDescription,
        keywords: area.service_keywords.join(', '),
        openGraph: {
            title: area.metaTitle,
            description: area.metaDescription,
            type: 'website',
        },
    };
}

export function generateStaticParams() {
    return serviceAreas.map((area) => ({
        cityId: area.id,
    }));
}

export default function ServiceAreaPage() {
    return <ServiceAreaLayout />;
}
