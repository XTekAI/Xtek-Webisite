
import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { getPostBySlug } from '../lib/blogLoader';
import { useLanguage } from '../context/LanguageContext';
import { MagnetizeButton } from '../components/ui/magnetize-button';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const post = getPostBySlug(slug || '');
    // @ts-ignore
    const { t } = useLanguage();

    const [newsletterData, setNewsletterData] = useState({ name: '', email: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleBookConsultation = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/');
        setTimeout(() => {
            const element = document.getElementById('contact');
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }, 100);
    };

    if (!post) {
        return (
            <div className="pt-40 pb-24 px-6 min-h-screen text-center">
                <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                <Link to="/blog" className="text-primary-light hover:underline">Return to Blog</Link>
            </div>
        );
    }

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email } = newsletterData;

        if (!name || !email) {
            alert(t.contact.validation_error);
            return;
        }

        try {
            await fetch('https://prueba1-n8n.fihoy6.easypanel.host/webhook/web2', {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, source: 'blog_post_newsletter' }),
            });
            setSubmitted(true);
            setNewsletterData({ name: '', email: '' });
        } catch (error) {
            console.error('Newsletter error:', error);
            alert('Error subscribing. Please try again.');
        }
    };

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
                    {submitted ? (
                        <div className="animate-fade-in">
                            <p className="text-primary-light font-bold mb-2">¡Gracias por suscribirte!</p>
                            <button onClick={() => setSubmitted(false)} className="text-white/40 text-xs hover:text-white underline">
                                Enviar otro
                            </button>
                        </div>
                    ) : (
                        <form className="max-w-md mx-auto space-y-4" onSubmit={handleNewsletterSubmit}>
                            <input
                                type="text"
                                placeholder={t.blog.newsletter_name}
                                value={newsletterData.name}
                                onChange={(e) => setNewsletterData(prev => ({ ...prev, name: e.target.value }))}
                                required
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-light transition-colors text-white"
                            />
                            <input
                                type="email"
                                placeholder={t.blog.newsletter_email}
                                value={newsletterData.email}
                                onChange={(e) => setNewsletterData(prev => ({ ...prev, email: e.target.value }))}
                                required
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-light transition-colors text-white"
                            />
                            <MagnetizeButton type="submit" className="w-full px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-secondary transition-colors border-none h-auto">
                                {t.blog.newsletter_cta}
                            </MagnetizeButton>
                        </form>
                    )}
                </div>

                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-8">{t.blog.cta_title}</h3>
                    <MagnetizeButton
                        onClick={handleBookConsultation}
                        className="px-8 py-4 bg-secondary text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-secondary/20 border-none h-auto"
                    >
                        {t.blog.cta_button}
                    </MagnetizeButton>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
