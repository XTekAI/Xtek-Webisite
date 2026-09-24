"use client";

import Link from 'next/link';

import React, { useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MagnetizeButton } from '../components/ui/magnetize-button';
import { getAllPosts } from '../lib/blogLoader';

import NewsletterConsentField from '../components/NewsletterConsentField';
import Honeypot from '../components/Honeypot';
import TurnstileWidget, { type TurnstileWidgetHandle } from '../components/TurnstileWidget';
import { buildNewsletterConsentRecord } from '../lib/contactConsent';
import { submitLead } from '../lib/submitLead';
const BlogIndex: React.FC = () => {
    // @ts-ignore
    const { t, lang } = useLanguage();
    const posts = getAllPosts();

    const [newsletterData, setNewsletterData] = useState({ name: '', email: '', preferredLanguage: lang });
    const [submitted, setSubmitted] = useState(false);
    const [consentChecked, setConsentChecked] = useState(false);
    const [consentError, setConsentError] = useState(false);
    const [honeypot, setHoneypot] = useState('');
    const [turnstileToken, setTurnstileToken] = useState('');
    const turnstileRef = useRef<TurnstileWidgetHandle>(null);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email } = newsletterData;

        if (!name || !email) {
            alert(t.contact.validation_error);
            return;
        }

        if (!consentChecked) {
            setConsentError(true);
            return;
        }

        const ok = await submitLead(
            { name, email, preferredLanguage: newsletterData.preferredLanguage, ...buildNewsletterConsentRecord(lang, consentChecked), source: 'blog_index_newsletter' },
            turnstileToken,
            honeypot,
        );

        if (ok) {
            setSubmitted(true);
            setNewsletterData({ name: '', email: '', preferredLanguage: lang });
            setConsentChecked(false);
            setConsentError(false);
            setHoneypot('');
            setTurnstileToken('');
        } else {
            alert(t.contact.submit_error);
            turnstileRef.current?.reset();
        }
    };

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
                    {posts.map((post) => (
                        <div key={post.slug} className="glass rounded-[32px] overflow-hidden border border-white/5 group hover:border-primary-light/30 transition-all duration-500 flex flex-col h-full">
                            <div className="h-48 overflow-hidden relative">
                                {post.featuredImage && (
                                    <img src={post.featuredImage} alt={post.title} width={800} height={533} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                )}
                                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                                    {post.tags.map((tag: string) => (
                                        <span key={tag} className="px-2 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="text-primary-light text-xs font-bold mb-4 uppercase tracking-widest">{post.date} • {post.readingTime}</div>
                                <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-primary-light transition-colors">{post.title}</h3>
                                <p className="text-white/60 mb-6 line-clamp-3 text-sm">{post.excerpt || post.content.substring(0, 100)}...</p>
                                <div className="mt-auto pt-6 border-t border-white/5">
                                    <Link href={`/blog/${post.slug}`}
                                        className="flex items-center gap-2 text-white font-bold text-sm tracking-widest uppercase group/btn hover:text-primary-light transition-colors"
                                    >
                                        {t.blog.read_more}
                                        <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="glass rounded-[40px] border border-white/5 p-8 md:p-12 mt-24 mb-16 text-center max-w-4xl mx-auto">
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
                            <Honeypot value={honeypot} onChange={setHoneypot} />
                            <TurnstileWidget ref={turnstileRef} onToken={setTurnstileToken} />
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
                            <div className="flex flex-col gap-2 text-left">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/50 px-1">{t.contact.label_preferred_language}</label>
                                <select
                                    name="preferredLanguage"
                                    value={newsletterData.preferredLanguage}
                                    onChange={(e) => setNewsletterData(prev => ({ ...prev, preferredLanguage: e.target.value as 'en' | 'es' }))}
                                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-light transition-colors text-white"
                                >
                                    <option value="en" className="bg-primary">English</option>
                                    <option value="es" className="bg-primary">Español</option>
                                </select>
                            </div>
                            <NewsletterConsentField checked={consentChecked} onChange={(c) => { setConsentChecked(c); if (c) setConsentError(false); }} showError={consentError} />
                            <MagnetizeButton type="submit" className="w-full px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-secondary transition-colors border-none h-auto">
                                {t.blog.newsletter_cta}
                            </MagnetizeButton>
                        </form>
                    )}
                </div>

                <div className="text-center mt-16">
                    <Link href="/"
                        className="flex items-center gap-2 text-white/50 hover:text-primary-light transition-colors mx-auto group inline-flex"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t.blog.back}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogIndex;
