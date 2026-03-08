import type { Metadata } from 'next';
import BlogIndex from '../../views/BlogIndex';

export const metadata: Metadata = {
    title: 'Blog | Xtek AI - AI Automation & Digital Marketing Insights',
    description: 'Expert insights on AI automation, digital marketing, AEO optimization, and business growth strategies from the Xtek AI team.',
};

export default function Blog() {
    return <BlogIndex />;
}
