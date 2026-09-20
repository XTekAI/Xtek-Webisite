"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GOOGLE_PROFILE, googleReviews } from '../content/google-reviews';

const COPY = {
    en: {
        badge: 'Google Reviews',
        title: 'Rated 5.0 on Google',
        subtitle: 'What our clients say about working with Xtek AI.',
        based: (n: number) => `Based on ${n} Google reviews`,
        cta: 'See all reviews on Google',
        localGuide: 'Local Guide',
        translated: 'Translated from Spanish',
        originalEn: 'Original review in English',
        stars: (n: number) => `${n} out of 5 stars`,
    },
    es: {
        badge: 'Reseñas de Google',
        title: 'Calificados con 5.0 en Google',
        subtitle: 'Lo que dicen nuestros clientes sobre trabajar con Xtek AI.',
        based: (n: number) => `Basado en ${n} reseñas de Google`,
        cta: 'Ver todas las reseñas en Google',
        localGuide: 'Local Guide',
        translated: 'Traducido del inglés',
        originalEn: 'Reseña original en inglés',
        stars: (n: number) => `${n} de 5 estrellas`,
    },
} as const;

const GoogleG: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
);

const Stars: React.FC<{ label: string; className?: string }> = ({ label, className = 'w-5 h-5' }) => (
    <span role="img" aria-label={label} className="inline-flex gap-0.5 text-yellow-400">
        {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.29 3.97a1 1 0 00.95.69h4.17c.97 0 1.37 1.24.59 1.81l-3.37 2.45a1 1 0 00-.36 1.12l1.29 3.97c.3.92-.76 1.69-1.54 1.12l-3.37-2.45a1 1 0 00-1.18 0l-3.37 2.45c-.78.57-1.84-.2-1.54-1.12l1.29-3.97a1 1 0 00-.36-1.12L1.98 9.4c-.78-.57-.38-1.81.59-1.81h4.17a1 1 0 00.95-.69l1.36-3.97z" />
            </svg>
        ))}
    </span>
);

const GoogleReviews: React.FC = () => {
    const { lang } = useLanguage();
    const copy = COPY[lang];

    return (
        <section id="reviews" aria-labelledby="reviews-heading" className="py-24 px-6 relative overflow-hidden border-t border-white/5">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4 inline-block">{copy.badge}</span>
                    <h2 id="reviews-heading" className="text-4xl md:text-5xl font-bold mb-4">{copy.title}</h2>
                    <p className="text-white/60 text-lg mb-8">{copy.subtitle}</p>

                    <div className="inline-flex items-center gap-4 glass rounded-full px-6 py-3 border border-white/10">
                        <GoogleG className="w-7 h-7" />
                        <span className="text-3xl font-bold">{GOOGLE_PROFILE.rating.toFixed(1)}</span>
                        <Stars label={copy.stars(5)} />
                        <span className="text-sm text-white/60 hidden sm:inline">{copy.based(GOOGLE_PROFILE.reviewCount)}</span>
                    </div>
                    <p className="text-sm text-white/60 mt-3 sm:hidden">{copy.based(GOOGLE_PROFILE.reviewCount)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {googleReviews.map((review) => {
                        const text = (lang === 'es' && review.text.es) || review.text.en;
                        const note =
                            lang === 'en' && review.originalLang === 'es'
                                ? copy.translated
                                : lang === 'es' && review.originalLang === 'en'
                                    ? copy.originalEn
                                    : null;

                        return (
                            <figure key={review.id} className="glass rounded-3xl p-8 border border-white/5 flex flex-col h-full">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-12 h-12 rounded-full bg-primary-light/20 border border-primary-light/30 flex items-center justify-center font-bold text-lg text-white" aria-hidden="true">
                                        {review.author.charAt(0).toUpperCase()}
                                    </div>
                                    <figcaption className="flex-1 min-w-0">
                                        <span className="block font-bold leading-tight truncate">{review.author}</span>
                                        <span className="block text-xs text-white/60 mt-1">
                                            {review.localGuide ? `${copy.localGuide} · ` : ''}Google
                                        </span>
                                    </figcaption>
                                    <GoogleG className="w-5 h-5 shrink-0" />
                                </div>

                                <Stars label={copy.stars(5)} className="w-4 h-4" />

                                <blockquote className="mt-4 text-white/80 leading-relaxed flex-1" lang={lang === 'es' && review.text.es ? 'es' : 'en'}>
                                    &ldquo;{text}&rdquo;
                                </blockquote>

                                {note && <p className="mt-4 text-xs text-white/50">{note}</p>}
                            </figure>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <a
                        href={GOOGLE_PROFILE.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 font-bold hover:bg-primary-light hover:border-primary-light transition-all"
                    >
                        <GoogleG className="w-5 h-5" />
                        {copy.cta}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default GoogleReviews;
