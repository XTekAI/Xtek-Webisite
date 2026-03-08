import { translations } from '../translations';

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
}

// Helper to convert translations blog post to BlogPost format
function convertTranslationPost(post: any): BlogPost {
    // Generate slug from title if not provided
    const slug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    return {
        id: post.id || slug,
        title: post.title,
        slug: slug,
        date: post.date || 'Jan 01, 2025',
        readingTime: '5 min',
        category: post.tags?.[0] || 'General',
        tags: post.tags || [],
        excerpt: post.desc || '',
        featuredImage: post.image || '',
        content: post.content || '',
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
