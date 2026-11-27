import type { Metadata } from 'next';
import AuditLanding from '../../views/AuditLanding';
import { AUDIT_COPY, AUDIT_PATHS, LANDING_ORIGIN } from '../../content/audit-landing';

// Meta Ads landing page (es). Kept out of search results: it duplicates the offer on the main site.
const copy = AUDIT_COPY.es.meta;

export const metadata: Metadata = {
    // Served from landing.xtekai.com only (see proxy.ts), so links, canonical and share image use that host.
    metadataBase: new URL(LANDING_ORIGIN),
    title: { absolute: copy.title },
    description: copy.description,
    alternates: { canonical: AUDIT_PATHS.es, languages: { en: AUDIT_PATHS.en, es: AUDIT_PATHS.es } },
    robots: { index: false, follow: true },
    openGraph: { title: copy.title, description: copy.description, url: AUDIT_PATHS.es, locale: 'es_US', images: [{ url: '/og-audit-es.jpg', width: 1200, height: 630, alt: 'Tu negocio está perdiendo clientes en algún punto. Auditoría gratis de Xtek AI' }] },
    twitter: { card: 'summary_large_image', title: copy.title, description: copy.description, images: ['/og-audit-es.jpg'] },
};

export default function Page() {
    return <AuditLanding lang="es" />;
}
