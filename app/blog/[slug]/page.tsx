import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '../../../lib/blogLoader';
import BlogPost from '../../../views/BlogPost';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | Xtek AI Blog',
        };
    }

    return {
        title: `${post.title} | Xtek AI Blog`,
        description: post.excerpt || post.content.substring(0, 160),
        openGraph: {
            title: post.title,
            description: post.excerpt || post.content.substring(0, 160),
            type: 'article',
            images: post.featuredImage ? [post.featuredImage] : [],
        },
    };
}

export function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default function BlogPostPage() {
    return <BlogPost />;
}
