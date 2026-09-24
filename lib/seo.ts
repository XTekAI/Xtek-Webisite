import type { Metadata } from 'next';

export const SITE_URL = 'https://www.xtekai.com';
export const SITE_NAME = 'Xtek AI';
export const SITE_TAGLINE = 'Intelligence in Action';

export const CONTACT = {
    email: 'tekmanager@xtekai.com',
    phone: '+1-609-912-6800',
    calendlyUrl: 'https://calendly.com/tekmanager-xtekai/30min',
};

// Google Business Profile (opened by its CID, so the URL carries no address or coordinates).
export const GOOGLE_PROFILE_URL = 'https://www.google.com/maps?cid=855544981083072402';

export const SOCIAL_LINKS = {
    facebook: 'https://www.facebook.com/profile.php?id=61579221937656',
    instagram: 'https://www.instagram.com/xtek.ai/',
    linkedin: 'https://www.linkedin.com/in/lisandro-xtek-ai-b20b043a9/',
    google: GOOGLE_PROFILE_URL,
};

export const OG_IMAGE = {
    url: '/og-image.jpg',
    width: 1200,
    height: 630,
    alt: 'Xtek AI - Intelligence in Action',
};

export const absoluteUrl = (path = '/') => `${SITE_URL}${path === '/' ? '' : path}`;

interface BuildMetadataOptions {
    title: string;
    description: string;
    /** Path of the page, used for the canonical URL and og:url, e.g. "/blog". */
    path: string;
    type?: 'website' | 'article';
    image?: string;
    keywords?: string;
    publishedTime?: string;
    modifiedTime?: string;
    tags?: string[];
}

/**
 * Builds the metadata every page needs: title, description, canonical,
 * Open Graph and Twitter card. Pages that define `openGraph` replace the
 * layout's default object, so each page must ship the full set.
 */
export function buildMetadata({
    title,
    description,
    path,
    type = 'website',
    image,
    keywords,
    publishedTime,
    modifiedTime,
    tags,
}: BuildMetadataOptions): Metadata {
    const images = image
        ? [{ url: image, alt: title }]
        : [{ url: OG_IMAGE.url, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: OG_IMAGE.alt }];

    return {
        title,
        description,
        ...(keywords ? { keywords } : {}),
        alternates: { canonical: path },
        openGraph: {
            type,
            siteName: SITE_NAME,
            locale: 'en_US',
            url: path,
            title,
            description,
            images,
            ...(type === 'article'
                ? { publishedTime, modifiedTime, authors: [SITE_NAME], tags }
                : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: images.map((i) => i.url),
        },
    };
}

/** Trims text to a meta-description length, cutting at a word boundary. */
export function clampDescription(text: string, max = 158): string {
    const clean = text.replace(/\s+/g, ' ').trim();
    if (clean.length <= max) return clean;
    const cut = clean.slice(0, max - 1);
    return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s-]+$/, '')}…`;
}

const MONTHS: Record<string, number> = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

/** "Jan 05, 2025" -> "2025-01-05" (undefined when the format is not recognised). */
export function toIsoDate(date: string): string | undefined {
    const m = date.match(/^([A-Za-z]{3})[a-z]*\.?\s+(\d{1,2}),?\s+(\d{4})$/);
    if (!m) return undefined;
    const month = MONTHS[m[1].toLowerCase()];
    if (!month) return undefined;
    return `${m[3]}-${String(month).padStart(2, '0')}-${m[2].padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// JSON-LD builders
// ---------------------------------------------------------------------------

export const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationJsonLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    alternateName: 'XTEK AI Agency',
    url: SITE_URL,
    logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.png`,
        width: 512,
        height: 512,
    },
    image: `${SITE_URL}${OG_IMAGE.url}`,
    slogan: SITE_TAGLINE,
    description:
        'Xtek AI is a US-based AI implementation agency offering SmartFlow AI audits, Executive AI accounting automation, AI agents and chatbots, AEO marketing, and web design and development.',
    email: CONTACT.email,
    telephone: CONTACT.phone,
    contactPoint: [
        {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: CONTACT.email,
            telephone: CONTACT.phone,
            availableLanguage: ['English', 'Spanish'],
        },
    ],
    areaServed: [
        { '@type': 'City', name: 'Hamilton, NJ' },
        { '@type': 'City', name: 'Philadelphia, PA' },
        { '@type': 'City', name: 'Manhattan, NY' },
    ],
    hasMap: GOOGLE_PROFILE_URL,
    sameAs: Object.values(SOCIAL_LINKS),
});

export const websiteJsonLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'en-US',
    publisher: { '@id': ORG_ID },
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: absoluteUrl(item.path),
    })),
});

interface ServiceAreaInput {
    id: string;
    city: string;
    state: string;
    metaDescription: string;
    service_keywords: string[];
}

export const serviceAreaJsonLd = (area: ServiceAreaInput) => ({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${absoluteUrl(`/service-areas/${area.id}`)}#service`,
    name: `${SITE_NAME} - AI Automation & Marketing in ${area.city}, ${area.state}`,
    url: absoluteUrl(`/service-areas/${area.id}`),
    description: area.metaDescription,
    image: `${SITE_URL}${OG_IMAGE.url}`,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    parentOrganization: { '@id': ORG_ID },
    areaServed: { '@type': 'City', name: `${area.city}, ${area.state}` },
    knowsAbout: area.service_keywords,
    sameAs: Object.values(SOCIAL_LINKS),
});

interface PostInput {
    title: string;
    slug: string;
    date: string;
    excerpt?: string;
    featuredImage?: string;
    tags: string[];
    category?: string;
}

export const blogPostingJsonLd = (post: PostInput, description: string) => {
    const url = absoluteUrl(`/blog/${post.slug}`);
    const published = toIsoDate(post.date);
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        headline: post.title,
        description,
        url,
        ...(post.featuredImage ? { image: [post.featuredImage] } : {}),
        ...(published ? { datePublished: published, dateModified: published } : {}),
        author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        publisher: { '@id': ORG_ID },
        inLanguage: 'en-US',
        ...(post.tags.length ? { keywords: post.tags.join(', ') } : {}),
        ...(post.category ? { articleSection: post.category } : {}),
    };
};

export const blogJsonLd = (posts: PostInput[]) => ({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${absoluteUrl('/blog')}#blog`,
    url: absoluteUrl('/blog'),
    name: `${SITE_NAME} Blog`,
    description: 'Insights on AI automation, digital marketing, AEO optimization and business growth.',
    publisher: { '@id': ORG_ID },
    blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        ...(toIsoDate(post.date) ? { datePublished: toIsoDate(post.date) } : {}),
    })),
});

export const webPageJsonLd = (name: string, description: string, path: string, dateModified: string) => ({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: absoluteUrl(path),
    dateModified,
    inLanguage: 'en-US',
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
});

export const collectionPageJsonLd = (name: string, description: string, path: string) => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
});

export const nextHorizonJsonLd = (description: string) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl('/next-horizon')}#service`,
    name: 'Next Horizon - Secure Internal AI & Communication Platform',
    serviceType: 'Secure internal communication and private AI platform',
    url: absoluteUrl('/next-horizon'),
    description,
    provider: { '@id': ORG_ID },
    audience: {
        '@type': 'Audience',
        audienceType: 'Government, healthcare and corporate organizations',
    },
});
