import storedPosts from '../content/blog/posts.json';
import { clampDescription } from './seo';

const HTML_TAGS = 'a|b|i|em|strong|p|div|span|ul|ol|li|h[1-6]|blockquote|br|hr|table|thead|tbody|tr|td|th|section|article|code|pre';

/**
 * Most post bodies were pasted with stray spaces inside tags ("< p", "< /a>",
 * "</li >"). Browsers treat those as plain text, so headings and paragraphs
 * showed up as raw markup and links were never closed. Repair them here.
 */
function normalizeHtml(html: string): string {
    return html
        .replace(new RegExp(`<\\s*/\\s*(${HTML_TAGS})\\s*>`, 'gi'), '</$1>')
        .replace(new RegExp(`<\\s+(${HTML_TAGS})\\b`, 'gi'), '<$1');
}

/**
 * One entry per post. The n8n "XTEK · Blog SEO" workflow appends new posts to this file through
 * GitHub, so every field except slug/title/date/content is optional.
 */
interface StoredPost {
    slug: string;
    title: string;
    seoTitle?: string;
    description?: string;
    date: string; // YYYY-MM-DD
    tags?: string[];
    image?: string;
    content: string; // HTML
}

export interface BlogPost {
    title: string;
    slug: string;
    date: string;
    readingTime?: string;
    category?: string;
    tags: string[];
    excerpt?: string;
    featuredImage?: string;
    content: string;
    id: string;
    desc?: string;
    image?: string;
    seoTitle: string;
    seoDescription: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-03-08" -> "Mar 08, 2026" (the display format the views and toIsoDate expect). */
function displayDate(iso: string): string {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
    if (!m) return iso || '';
    return `${MONTHS[Number(m[2]) - 1]} ${m[3]}, ${m[1]}`;
}

function readingTime(html: string): string {
    const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 230))} min`;
}

function toBlogPost(post: StoredPost): BlogPost {
    const tags = post.tags ?? [];
    const content = normalizeHtml(post.content || '');
    const desc = post.description || '';
    return {
        id: post.slug,
        slug: post.slug,
        title: post.title,
        seoTitle: post.seoTitle || post.title,
        seoDescription: clampDescription(desc),
        date: displayDate(post.date),
        readingTime: readingTime(content),
        category: tags[0] || 'General',
        tags,
        excerpt: desc,
        desc,
        featuredImage: post.image || '',
        image: post.image || '',
        content,
    };
}

export function getAllPosts(): BlogPost[] {
    return (storedPosts as StoredPost[])
        .slice()
        .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
        .map(toBlogPost);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
    const allPosts = getAllPosts();
    return allPosts.find(post => post.slug === slug);
}

/** Other posts to link from a post page: same-tag posts first, then newest. */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
    const all = getAllPosts();
    const current = all.find((post) => post.slug === slug);
    const others = all.filter((post) => post.slug !== slug);
    if (!current) return others.slice(0, limit);

    const shared = (post: BlogPost) => post.tags.filter((tag) => current.tags.includes(tag)).length;
    return others
        .map((post, index) => ({ post, index, score: shared(post) }))
        .sort((a, b) => b.score - a.score || a.index - b.index)
        .slice(0, limit)
        .map(({ post }) => post);
}
