import React from 'react';
import { useLanguage } from '../App';
import { MagnetizeButton } from './ui/magnetize-button';

const BlogPage: React.FC = () => {
    // @ts-ignore - Context updated in next step
    const { t, setPage, activeBlog, setActiveBlog } = useLanguage();

    const post = t.blog.posts.find((p: any) => p.id === activeBlog);

    // If no active post, show the list of all blogs
    if (!post) {
        return (
            <div className="pt-40 pb-24 px-6 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sm font-bold text-primary-light uppercase tracking-widest mb-4 inline-block">
                            {t.blog.badge}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {t.blog.title}
                        </h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            {t.blog.subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {t.blog.posts.map((post: any) => (
                            <div key={post.id} className="glass rounded-[32px] overflow-hidden border border-white/5 group hover:border-primary-light/30 transition-all duration-500 flex flex-col h-full">
                                <div className="h-48 overflow-hidden relative">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        {post.tags.map((tag: string) => (
                                            <span key={tag} className="px-2 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="text-primary-light text-xs font-bold mb-4 uppercase tracking-widest">{post.date}</div>
                                    <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-primary-light transition-colors">{post.title}</h3>
                                    <p className="text-white/60 mb-6 line-clamp-3 text-sm">{post.desc}</p>
                                    <div className="mt-auto pt-6 border-t border-white/5">
                                        <button
                                            onClick={() => setActiveBlog(post.id)}
                                            className="flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase group/btn hover:text-primary-light transition-colors"
                                        >
                                            {t.blog.read_more}
                                            <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <button
                            onClick={() => setPage('home')}
                            className="flex items-center gap-2 text-white/50 hover:text-primary-light transition-colors mx-auto group"
                        >
                            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            {t.blog.back}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-40 pb-24 px-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => setActiveBlog(null)}
                    className="flex items-center gap-2 text-white/50 hover:text-primary-light transition-colors mb-12 group"
                >
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Blog List
                </button>

                <div className="glass rounded-[40px] overflow-hidden border border-white/5 p-8 md:p-12 mb-12">
                    <div className="flex gap-3 mb-6">
                        {post.tags.map((tag: string) => (
                            <span key={tag} className="px-3 py-1 bg-primary-light/20 text-primary-light rounded-full text-xs font-bold uppercase tracking-widest">{tag}</span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{post.title}</h1>
                    <div className="flex items-center gap-4 text-white/40 text-sm font-bold uppercase tracking-widest mb-12 pb-12 border-b border-white/10">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>Xtek Intelligence Team</span>
                    </div>

                    <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 relative group">
                        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="text-xl leading-relaxed text-white/80 font-light mb-8" dangerouslySetInnerHTML={{ __html: post.content }}></div>
                    </div>
                </div>

                <div className="glass rounded-[40px] border border-white/5 p-8 md:p-12 mb-16 text-center">
                    <h3 className="text-2xl font-bold mb-6">{t.blog.newsletter_title}</h3>
                    <form className="max-w-md mx-auto space-y-4" onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const name = (form[0] as HTMLInputElement).value;
                        const email = (form[1] as HTMLInputElement).value;

                        try {
                            await fetch('https://prueba1-n8n.fihoy6.easypanel.host/webhook/web', {
                                method: 'POST',
                                mode: 'no-cors',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ name, email, source: 'newsletter_form' }),
                            });
                            alert('Subscribed successfully!');
                            form.reset();
                        } catch (error) {
                            console.error(error);
                            alert('Error subscribing.');
                        }
                    }}>
                        <input
                            type="text"
                            placeholder={t.blog.newsletter_name}
                            required
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-light transition-colors text-white"
                        />
                        <input
                            type="email"
                            placeholder={t.blog.newsletter_email}
                            required
                            className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-light transition-colors text-white"
                        />
                        <MagnetizeButton type="submit" className="w-full px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-secondary transition-colors border-none h-auto">
                            {t.blog.newsletter_cta}
                        </MagnetizeButton>
                    </form>
                </div>

                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-8">{t.blog.cta_title}</h3>
                    <MagnetizeButton
                        onClick={() => { setPage('home'); setTimeout(() => window.location.hash = '#contact', 100); }}
                        className="px-8 py-4 bg-secondary text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-secondary/20 border-none h-auto"
                    >
                        {t.blog.cta_button}
                    </MagnetizeButton>
                </div>
            </div>
        </div>
    );
};
export default BlogPage;
