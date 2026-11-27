import type { Metadata } from 'next';
import AuditLanding from '../../views/AuditLanding';
import { AUDIT_COPY, AUDIT_PATHS } from '../../content/audit-landing';

// Meta Ads landing page (es). Kept out of search results: it duplicates the offer on the main site.
const copy = AUDIT_COPY.es.meta;

export const metadata: Metadata = {
    title: { absolute: copy.title },
    description: copy.description,
    alternates: { canonical: AUDIT_PATHS.es, languages: { en: AUDIT_PATHS.en, es: AUDIT_PATHS.es } },
    robots: { index: false, follow: true },
    openGraph: { title: copy.title, description: copy.description, url: AUDIT_PATHS.es, locale: 'es_US' },
};

export default function Page() {
    return <AuditLanding lang="es" />;
}
