
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../lib/blogLoader';
import { useLanguage } from '../context/LanguageContext';
import { MagnetizeButton } from '../components/ui/magnetize-button';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = getPostBySlug(slug || '');
    // @ts-ignore
    const { t } = useLanguage();

    if (!post) {
        return (
            <div className="pt-40 pb-24 px-6 min-h-screen text-center">
                <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                <Link to="/blog" className="text-primary-light hover:underline">Return to Blog</Link>
            </div>
        );
    }

    return (
        <div className="pt-40 pb-24 px-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Link
                    to="/blog"
                    className="flex items-center gap-2 text-white/50 hover:text-primary-light transition-colors mb-12 group"
                >
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Blog List
                </Link>

                <div className="glass rounded-[40px] overflow-hidden border border-white/5 p-8 md:p-12 mb-12">
                    <div className="flex gap-3 mb-6 flex-wrap">
                        {post.tags.map((tag: string) => (
                            <span key={tag} className="px-3 py-1 bg-primary-light/20 text-primary-light rounded-full text-xs font-bold uppercase tracking-widest">{tag}</span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{post.title}</h1>
                    <div className="flex items-center gap-4 text-white/40 text-sm font-bold uppercase tracking-widest mb-12 pb-12 border-b border-white/10">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                        <span>•</span>
                        <span>By Xtek Team</span>
                    </div>

                    {post.featuredImage && (
                        <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 relative group">
                            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
                            <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        </div>
                    )}

                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="text-xl leading-relaxed text-white/80 font-light mb-8" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    </div>
                </div>

                <div className="glass rounded-[40px] border border-white/5 p-8 md:p-12 mb-16 text-center">
                    <h3 className="text-2xl font-bold mb-6">{t.blog.newsletter_title}</h3>
                    <form className="max-w-md mx-auto space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
                        <input
                            type="text"
                            placeholder={t.blog.newsletter_name}
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-light transition-colors text-white"
                        />
                        <input
                            type="email"
                            placeholder={t.blog.newsletter_email}
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-light transition-colors text-white"
                        />
                        <MagnetizeButton type="submit" className="w-full px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-secondary transition-colors border-none h-auto">
                            {t.blog.newsletter_cta}
                        </MagnetizeButton>
                    </form>
                </div>

                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-8">{t.blog.cta_title}</h3>
                    <Link to="/#contact">
                        <MagnetizeButton className="px-8 py-4 bg-secondary text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-secondary/20 border-none h-auto">
                            {t.blog.cta_button}
                        </MagnetizeButton>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
