import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { industries, getIndustry } from '../../../content/industries';
import IndustryLayout from '../../../views/industries/IndustryLayout';
import JsonLd from '../../../components/JsonLd';
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, industryJsonLd } from '../../../lib/seo';

interface Props {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
    return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const industry = getIndustry(slug);
    if (!industry) return { title: 'Industry Not Found | Xtek AI', robots: { index: false, follow: false } };
    return buildMetadata({
        title: `${industry.metaTitle} | Xtek AI`,
        description: industry.metaDescription,
        path: `/industries/${industry.slug}`,
    });
}

export default async function IndustryPage({ params }: Props) {
    const { slug } = await params;
    const industry = getIndustry(slug);
    if (!industry) notFound();

    return (
        <>
            <JsonLd
                data={[
                    industryJsonLd(industry),
                    faqJsonLd(industry.faqs),
                    breadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'Industries', path: '/industries' },
                        { name: industry.name, path: `/industries/${industry.slug}` },
                    ]),
                ]}
            />
            <IndustryLayout industry={industry} />
        </>
    );
}
