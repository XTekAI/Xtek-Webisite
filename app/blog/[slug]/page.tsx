import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '../../../lib/blogLoader';
import BlogPost from '../../../views/BlogPost';
import JsonLd from '../../../components/JsonLd';
import { blogPostingJsonLd, breadcrumbJsonLd, buildMetadata, toIsoDate } from '../../../lib/seo';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | Xtek AI Blog',
            robots: { index: false, follow: false },
        };
    }

    const published = toIsoDate(post.date);

    return buildMetadata({
        title: `${post.seoTitle} | Xtek AI`,
        description: post.seoDescription,
        path: `/blog/${post.slug}`,
        type: 'article',
        image: post.featuredImage || undefined,
        publishedTime: published,
        modifiedTime: published,
        tags: post.tags,
    });
}

export function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    return (
        <>
            {post && (
                <JsonLd
                    data={[
                        blogPostingJsonLd(post, post.seoDescription),
                        breadcrumbJsonLd([
                            { name: 'Home', path: '/' },
                            { name: 'Blog', path: '/blog' },
                            { name: post.seoTitle, path: `/blog/${post.slug}` },
                        ]),
                    ]}
                />
            )}
            <BlogPost />
        </>
    );
}
