/**
 * Blog content index - provides server-safe access to blog post metadata
 * for use in generateMetadata and generateStaticParams.
 *
 * Full blog post data (including HTML content) remains in translations.ts
 * and is loaded by lib/blogLoader.ts for rendering.
 */

export { getAllPosts, getPostBySlug } from '../../lib/blogLoader';
export type { BlogPost } from '../../lib/blogLoader';
