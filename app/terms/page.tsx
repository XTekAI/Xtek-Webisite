import type { Metadata } from 'next';
import LegalPageLayout from '../../components/LegalPageLayout';
import JsonLd from '../../components/JsonLd';
import { breadcrumbJsonLd, buildMetadata } from '../../lib/seo';

export const metadata: Metadata = buildMetadata({
    title: 'Terms of Use | Xtek AI',
    description: 'The terms that apply when you engage Xtek AI: how services are delivered, ownership of automation agents, and implementation timelines.',
    path: '/terms',
});

export default function TermsPage() {
    return (
        <>
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'Home', path: '/' },
                    { name: 'Terms of Use', path: '/terms' },
                ])}
            />
            <LegalPageLayout
                title="Terms of Use"
                intro="By engaging with Xtek AI, you agree to our terms of innovation and service delivery."
                points={[
                    'Services are delivered based on the initial strategic audit findings.',
                    'Automation agents remain the intellectual property of Xtek AI unless otherwise stated.',
                    'Implementation timelines are subject to business complexity and data availability.',
                ]}
                otherPage={{ href: '/privacy', label: 'Read our Privacy Policy' }}
            />
        </>
    );
}
