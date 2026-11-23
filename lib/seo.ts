import type { Metadata } from 'next';
import { services } from '../content/services';

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

// Founder and CEO.
export const FOUNDER = {
    name: 'Lisandro Orellana',
    jobTitle: 'Founder & CEO',
    linkedin: SOCIAL_LINKS.linkedin,
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

const city = (name: string, state: string) => ({
    '@type': 'City',
    name,
    containedInPlace: { '@type': 'State', name: state },
});

const county = (name: string, state: string) => ({
    '@type': 'AdministrativeArea',
    name,
    containedInPlace: { '@type': 'State', name: state },
});

const STATE_NAMES: Record<string, string> = { NJ: 'New Jersey', PA: 'Pennsylvania', NY: 'New York' };
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
        url: `${SITE_URL}/icon-512.png`,
        width: 512,
        height: 512,
    },
    image: `${SITE_URL}${OG_IMAGE.url}`,
    slogan: SITE_TAGLINE,
    description:
        'Xtek AI is a US-based AI implementation agency offering SmartFlow AI audits, Executive AI accounting automation, AI agents and chatbots, AEO marketing, and web design and development.',
    email: CONTACT.email,
    telephone: CONTACT.phone,
    // State level only, on purpose: the street address is not published.
    address: {
        '@type': 'PostalAddress',
        addressRegion: 'NJ',
        addressCountry: 'US',
    },
    contactPoint: [
        {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            email: CONTACT.email,
            telephone: CONTACT.phone,
            availableLanguage: ['English', 'Spanish'],
        },
    ],
    // Mirrors the service areas of the Google Business Profile (2026-11-23).
    areaServed: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'State', name: 'New Jersey' },
        county('Bergen County', 'New Jersey'),
        ...['Trenton', 'Princeton', 'Hamilton Township', 'West Windsor', 'Plainsboro', 'East Windsor', 'North Brunswick',
            'South Brunswick', 'New Brunswick', 'Cherry Hill', 'Marlton', 'Voorhees Township', 'Evesham Township', 'Medford',
            'Haddon Township', 'Mount Laurel', 'Lakewood'].map((name) => city(name, 'New Jersey')),
        city('Philadelphia', 'Pennsylvania'),
        city('New York', 'New York'),
    ],
    // Topics the company is an authority on (helps search engines and AI assistants place the entity).
    knowsAbout: [
        'AI automation',
        'Business process automation',
        'AI agents',
        'AI chatbots',
        'Voice AI agents',
        'Accounting automation',
        'Answer Engine Optimization (AEO)',
        'Search engine optimization (SEO)',
        'Digital marketing',
        'Web design and development',
        'Content creation',
    ],
    // The six service pages, linked by @id to the Service node on each page.
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Xtek AI services',
        itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
                '@type': 'Service',
                '@id': `${absoluteUrl(`/services/${s.slug}`)}#service`,
                name: s.en.name,
                url: absoluteUrl(`/services/${s.slug}`),
            },
        })),
    },
    hasMap: GOOGLE_PROFILE_URL,
    // The LinkedIn link is the founder's personal profile, so it belongs to the founder, not the company.
    founder: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#founder`,
        name: FOUNDER.name,
        jobTitle: FOUNDER.jobTitle,
        sameAs: [FOUNDER.linkedin],
        worksFor: { '@id': ORG_ID },
    },
    // Profiles of the company itself (the Google Maps listing is already in hasMap).
    sameAs: [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram],
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
    name: string;
    state: string;
    kind: 'State' | 'Region' | 'County' | 'City';
    metaDescription: string;
    towns: string[];
    service_keywords: string[];
}

const areaPlace = (area: ServiceAreaInput) => {
    const state = STATE_NAMES[area.state] ?? area.state;
    if (area.kind === 'State') return { '@type': 'State', name: state };
    if (area.kind === 'County') return county(area.name, state);
    if (area.kind === 'Region') return { '@type': 'AdministrativeArea', name: area.name, containedInPlace: { '@type': 'State', name: state } };
    return city(area.name, state);
};

// An area page describes the services offered there, not a separate local branch: there is no
// office per area, so it is a Service provided by the organization (no address of its own).
export const serviceAreaJsonLd = (area: ServiceAreaInput) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(`/service-areas/${area.id}`)}#service`,
    name: `AI Automation & Marketing in ${area.name}`,
    serviceType: 'AI automation and digital marketing',
    url: absoluteUrl(`/service-areas/${area.id}`),
    description: area.metaDescription,
    provider: { '@id': ORG_ID },
    areaServed: [areaPlace(area), ...(area.kind === 'City' ? [] : area.towns.map((t) => ({ '@type': 'Place', name: t })))],
    keywords: area.service_keywords.join(', '),
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

interface ServicePageInput {
    slug: string;
    name: string;
    serviceType: string;
    description: string;
}

/** A service page (/services/<slug>), offered by the organization across the US. */
export const serviceJsonLd = (service: ServicePageInput) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: service.name,
    serviceType: service.serviceType,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'United States' },
});

/** FAQ block for questions that are visible on the page. */
export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
});
