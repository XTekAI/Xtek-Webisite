import type { Metadata } from 'next';
import SuccessStoriesPage from '../../components/SuccessStoriesPage';
import JsonLd from '../../components/JsonLd';
import { breadcrumbJsonLd, buildMetadata, collectionPageJsonLd } from '../../lib/seo';

const TITLE = 'Success Stories | Xtek AI - Real Results for Real Businesses';
const DESCRIPTION = 'See how Xtek AI has helped businesses automate workflows, scale marketing, and achieve measurable ROI through AI-powered solutions.';

export const metadata: Metadata = buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: '/stories',
});

export default function Stories() {
    return (
        <>
            <JsonLd
                data={[
                    collectionPageJsonLd('Xtek AI Success Stories', DESCRIPTION, '/stories'),
                    breadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'Success Stories', path: '/stories' },
                    ]),
                ]}
            />
            <SuccessStoriesPage />
        </>
    );
}
