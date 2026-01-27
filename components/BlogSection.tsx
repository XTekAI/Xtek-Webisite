import React from 'react';
import { useLanguage } from '../App';

const BlogSection: React.FC = () => {
    // @ts-ignore - Context updated in next step
    const { t, setPage, setActiveBlog } = useLanguage();

    const handleArticleClick = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        if (setActiveBlog) setActiveBlog(id);
        setPage('blog');
        window.scrollTo({ top: 0, behavior: 'instant' });
    };

    return (
        <section id="blog" className="py-24 px-6 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-sm font-bold text-primary-light uppercase tracking-widest mb-4 inline-block">
                        {t.blog.badge}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        {t.blog.title}
                    </h2>
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
                                        onClick={(e) => handleArticleClick(post.id, e)}
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
            </div>
        </section>
    );
};

export default BlogSection;
