import { translations } from '../translations';
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

// Search-friendly titles (max ~50 chars, so "<title> | Xtek AI" stays under 60).
// The full title is still used for the on-page H1 and the BlogPosting headline.
const SEO_TITLES: Record<string, string> = {
    'the-strategic-guide-to-ai-automation-agencies-transforming-business-operations': 'The Strategic Guide to AI Automation Agencies',
    'reclaiming-your-time-how-ai-automation-is-transforming-nj-and-pa-businesses': 'Reclaim Your Time: AI Automation for NJ & PA',
    'navigating-new-jersey-s-digital-marketing-agency-landscape': 'New Jersey Digital Marketing Agency Landscape',
    'quantum-computing-breakthroughs-2024-the-new-frontiers-in-technology-ai-and-global-regulation': 'Quantum Computing Breakthroughs in 2024',
    'the-rising-stars-of-ai-image-generators-a-2026-curated-list': 'Rising Stars of AI Image Generators: 2026 List',
    'aws-ai-factories-a-groundbreaking-leap-in-ai-application-development': 'AWS AI Factories: A Leap in AI Development',
    'the-rise-and-thrive-of-the-digital-marketing-agency-scene-in-raleigh-nc': 'Digital Marketing Agency Scene in Raleigh, NC',
    'understanding-pydantic-ai-the-revolutionary-python-agent-framework': 'Understanding Pydantic AI: Python Agent Framework',
    'exploring-the-world-of-effective-context-engineering-for-ai-agents': 'Effective Context Engineering for AI Agents',
};

// Complete meta descriptions (120-160 chars) for posts whose excerpt is too
// short or too long for a search snippet.
const SEO_DESCRIPTIONS: Record<string, string> = {
    'reclaiming-your-time-how-ai-automation-is-transforming-nj-and-pa-businesses': 'Automation lets you grow revenue without growing headcount. See how AI automation helps New Jersey and Pennsylvania businesses reclaim their time.',
    'quantum-computing-breakthroughs-2024-the-new-frontiers-in-technology-ai-and-global-regulation': "Exploring 2024's major leaps in quantum computing, AI governance and global regulation, and what they mean for businesses adopting AI.",
    'the-rise-and-thrive-of-the-digital-marketing-agency-scene-in-raleigh-nc': 'Raleigh, NC has become a dynamic hub for digital marketing innovation. Learn what defines the local agency scene and how to choose a partner.',
    'understanding-pydantic-ai-the-revolutionary-python-agent-framework': 'Pydantic AI is a new Python agent framework drawing attention from developers who want to build more reliable AI systems.',
    'your-complete-guide-to-digital-marketing-agencies': 'Digital marketing agencies have become the guiding star for businesses cracking the code of online success. Here is your complete guide.',
};

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

// Helper to convert translations blog post to BlogPost format
function convertTranslationPost(post: any): BlogPost {
    // Generate slug from title if not provided
    const slug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    return {
        seoTitle: SEO_TITLES[slug] || post.title,
        seoDescription: SEO_DESCRIPTIONS[slug] || clampDescription(post.desc || ''),
        id: post.id || slug,
        title: post.title,
        slug: slug,
        date: post.date || 'Jan 01, 2025',
        readingTime: '5 min',
        category: post.tags?.[0] || 'General',
        tags: post.tags || [],
        excerpt: post.desc || '',
        featuredImage: post.image || '',
        content: normalizeHtml(post.content || ''),
        desc: post.desc,
        image: post.image
    };
}

export function getAllPosts(): BlogPost[] {
    // Get posts from translations (English version)
    const translationPosts = translations.en.blog?.posts || [];

    // Convert to BlogPost format
    const posts: BlogPost[] = translationPosts.map(convertTranslationPost);

    // Sort by date (newest first)
    return posts.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
    });
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
