import type { Metadata } from 'next';
import AuditLanding from '../../views/AuditLanding';
import { AUDIT_COPY, AUDIT_PATHS } from '../../content/audit-landing';

// Meta Ads landing page (en). Kept out of search results: it duplicates the offer on the main site.
const copy = AUDIT_COPY.en.meta;

export const metadata: Metadata = {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: { canonical: AUDIT_PATHS.en, languages: { en: AUDIT_PATHS.en, es: AUDIT_PATHS.es } },
    robots: { index: false, follow: true },
    openGraph: { title: copy.title, description: copy.description, url: AUDIT_PATHS.en, locale: 'en_US', images: [{ url: '/og-audit-en.jpg', width: 1200, height: 630, alt: 'Your business is losing customers somewhere. Free audit by Xtek AI' }] },
    twitter: { card: 'summary_large_image', title: copy.title, description: copy.description, images: ['/og-audit-en.jpg'] },
};

export default function Page() {
    return <AuditLanding lang="en" />;
}
