import type { Metadata } from 'next';
import BlogIndex from '../../views/BlogIndex';
import JsonLd from '../../components/JsonLd';
import { getAllPosts } from '../../lib/blogLoader';
import { blogJsonLd, breadcrumbJsonLd, buildMetadata } from '../../lib/seo';

export const metadata: Metadata = buildMetadata({
    title: 'Blog | Xtek AI - AI Automation & Digital Marketing Insights',
    description: 'Expert insights on AI automation, digital marketing, AEO optimization, and business growth strategies from the Xtek AI team.',
    path: '/blog',
});

export default function Blog() {
    return (
        <>
            <JsonLd
                data={[
                    blogJsonLd(getAllPosts()),
                    breadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'Blog', path: '/blog' },
                    ]),
                ]}
            />
            <BlogIndex />
        </>
    );
}
