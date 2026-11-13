import type { MetadataRoute } from 'next';
import { getAllPosts } from '../lib/blogLoader';
import { serviceAreas } from '../content/service-areas';
import { services } from '../content/services';
import { absoluteUrl, toIsoDate } from '../lib/seo';

// Bump this when the static pages change in a meaningful way.
const SITE_LAST_UPDATED = '2026-11-12';
const SERVICES_LAST_UPDATED = '2026-11-12';

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages = ['/', '/blog', '/stories', '/products', '/next-horizon', '/privacy', '/terms', '/sms-terms'].map((path) => ({
        url: absoluteUrl(path),
        lastModified: SITE_LAST_UPDATED,
    }));

    const areaPages = serviceAreas.map((area) => ({
        url: absoluteUrl(`/service-areas/${area.id}`),
        lastModified: SITE_LAST_UPDATED,
    }));

    const servicePages = services.map((s) => ({
        url: absoluteUrl(`/services/${s.slug}`),
        lastModified: SERVICES_LAST_UPDATED,
    }));

    const postPages = getAllPosts().map((post) => ({
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: toIsoDate(post.date) ?? SITE_LAST_UPDATED,
    }));

    return [...staticPages, ...servicePages, ...areaPages, ...postPages];
}
