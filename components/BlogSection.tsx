import React from 'react';
import { useLanguage } from '../App';

const BlogSection: React.FC = () => {
    // @ts-ignore - Context updated in next step
    const { t, setPage, setActiveBlog } = useLanguage();
    const [expandedId, setExpandedId] = React.useState<string | null>(null);

    const toggleExpand = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        setExpandedId(prev => prev === id ? null : id);
    };

    return (
        <section id="blog" className="py-24 px-6 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-sm font-bold text-primary-light uppercase tracking-widest mb-4 inline-block">
                        {t.blog.badge}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 !text-white">
                        {t.blog.title}
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        {t.blog.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {t.blog.posts.slice(0, 3).map((post: any) => {
                        const isExpanded = expandedId === post.id;
                        return (
                            <div key={post.id} className={`glass rounded-[32px] overflow-hidden border border-white/5 group hover:border-primary-light/30 transition-all duration-500 flex flex-col ${isExpanded ? 'row-span-2' : ''}`}>
                                <div className="h-48 overflow-hidden relative shrink-0">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        {post.tags.map((tag: string) => (
                                            <span key={tag} className="px-2 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="text-primary-light text-xs font-bold mb-4 uppercase tracking-widest">{post.date}</div>
                                    <h3 className="text-2xl font-bold mb-4 leading-tight !text-white group-hover:!text-primary-light transition-colors">{post.title}</h3>
                                    <p className="text-white/60 mb-6 text-sm">{post.desc}</p>

                                    {/* Expandable Content Content */}
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                                        <div className="prose prose-invert prose-sm max-w-none pt-4 border-t border-white/10" dangerouslySetInnerHTML={{ __html: post.content }} />
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-white/5">
                                        <button
                                            onClick={(e) => toggleExpand(post.id, e)}
                                            className="flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase group/btn hover:text-primary-light transition-colors"
                                        >
                                            {isExpanded ? 'Show Less' : t.blog.read_more}
                                            <svg className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'group-hover/btn:translate-x-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                {isExpanded ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <button
                        onClick={() => { setPage('blog'); setActiveBlog(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold hover:bg-white/10 hover:border-white/40 transition-all uppercase tracking-widest text-sm"
                    >
                        View All Articles
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
