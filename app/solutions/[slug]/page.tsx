import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { solutions, getSolution } from '../../../content/solutions';
import SolutionLayout from '../../../views/solutions/SolutionLayout';
import JsonLd from '../../../components/JsonLd';
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, solutionJsonLd } from '../../../lib/seo';

interface Props {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
    return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const solution = getSolution(slug);
    if (!solution) return { title: 'Solution Not Found | Xtek AI', robots: { index: false, follow: false } };
    return buildMetadata({
        title: `${solution.metaTitle} | Xtek AI`,
        description: solution.metaDescription,
        path: `/solutions/${solution.slug}`,
    });
}

export default async function SolutionPage({ params }: Props) {
    const { slug } = await params;
    const solution = getSolution(slug);
    if (!solution) notFound();

    return (
        <>
            <JsonLd
                data={[
                    solutionJsonLd(solution),
                    faqJsonLd(solution.faqs),
                    breadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'Solutions', path: '/solutions' },
                        { name: solution.name, path: `/solutions/${solution.slug}` },
                    ]),
                ]}
            />
            <SolutionLayout solution={solution} />
        </>
    );
}
