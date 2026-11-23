import type { MetadataRoute } from 'next';
import { getAllPosts } from '../lib/blogLoader';
import { serviceAreas } from '../content/service-areas';
import { services } from '../content/services';
import { industries } from '../content/industries';
import { solutions } from '../content/solutions';
import { absoluteUrl, toIsoDate } from '../lib/seo';

// Bump this when the static pages change in a meaningful way.
const SITE_LAST_UPDATED = '2026-11-23';
const SERVICES_LAST_UPDATED = '2026-11-12';

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages = ['/', '/service-areas', '/industries', '/solutions', '/blog', '/stories', '/products', '/next-horizon', '/privacy', '/terms', '/sms-terms'].map((path) => ({
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

    const industryPages = industries.map((i) => ({
        url: absoluteUrl(`/industries/${i.slug}`),
        lastModified: SITE_LAST_UPDATED,
    }));

    const solutionPages = solutions.map((s) => ({
        url: absoluteUrl(`/solutions/${s.slug}`),
        lastModified: SITE_LAST_UPDATED,
    }));

    return [...staticPages, ...servicePages, ...solutionPages, ...areaPages, ...industryPages, ...postPages];
}
