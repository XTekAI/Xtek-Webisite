import type { Metadata } from 'next';
import LegalPageLayout from '../../components/LegalPageLayout';
import JsonLd from '../../components/JsonLd';
import { breadcrumbJsonLd, buildMetadata } from '../../lib/seo';

export const metadata: Metadata = buildMetadata({
    title: 'Privacy Policy | Xtek AI',
    description: 'How Xtek AI handles your data: processed only to optimize your business services, never shared with third-party model trainers, encrypted end-to-end.',
    path: '/privacy',
});

export default function PrivacyPage() {
    return (
        <>
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: 'Home', path: '/' },
                    { name: 'Privacy Policy', path: '/privacy' },
                ])}
            />
            <LegalPageLayout
                title="Privacy Policy"
                intro="Your privacy is of the utmost importance to Xtek AI. We handle your data with enterprise-grade security protocols and transparency."
                points={[
                    'Data is processed exclusively for the optimization of your business services.',
                    'We do not share your strategic data with third-party model trainers.',
                    'All information is encrypted end-to-end within our US-based infrastructure.',
                ]}
                otherPage={{ href: '/terms', label: 'Read our Terms of Use' }}
            />
        </>
    );
}
