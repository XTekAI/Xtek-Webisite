import React from 'react';
import { useLanguage } from '../App';

const BlogPage: React.FC = () => {
    // @ts-ignore - Context updated in next step
    const { t, setPage, activeBlog } = useLanguage();

    const post = t.blog.posts.find((p: any) => p.id === activeBlog);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <button onClick={() => setPage('home')} className="text-white">Return Home</button>
            </div>
        );
    }

    return (
        <div className="pt-40 pb-24 px-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => setPage('home')}
                    className="flex items-center gap-2 text-white/50 hover:text-primary-light transition-colors mb-12 group"
                >
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    {t.blog.back}
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
                        <p className="text-xl leading-relaxed text-white/80 font-light mb-8">{post.content}</p>
                        <p className="text-white/60 leading-relaxed">
                            (Full article content would go here. Since this is a demo, expanding the placeholder text...) <br /><br />
                            In the context of the global market, companies adopting {post.tags[0]} are seeing significant competitive advantages.
                            Our analysis shows that integrating these systems reduces operational friction by an average of 35% within the first quarter.
                            <br /><br />
                            The shift is inevitable. As we move towards more autonomous systems, the role of human oversight becomes one of strategy rather than execution.
                        </p>
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
                            await fetch('https://prueba1-n8n.fihoy6.easypanel.host/webhook-test/xtek', {
                                method: 'POST',
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
                        <button type="submit" className="w-full px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors">
                            {t.blog.newsletter_cta}
                        </button>
                    </form>
                </div>

                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-8">Ready to implement this?</h3>
                    <button
                        onClick={() => { setPage('home'); setTimeout(() => window.location.hash = '#contact', 100); }}
                        className="px-8 py-4 bg-secondary text-white rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-secondary/20"
                    >
                        Book a Consultation
                    </button>
                </div>
            </div>
        </div>
    );
};
export default BlogPage;
