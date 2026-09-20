import { GOOGLE_PROFILE_URL, ORG_ID } from '../lib/seo';

/**
 * Reviews copied from the public Google Business Profile of Xtek AI.
 * Update `rating`, `reviewCount` and `reviews` here when new reviews arrive.
 * Text is quoted as written on Google; for reviews written in Spanish,
 * `en` is Google's English translation and `es` the original text.
 */
export const GOOGLE_PROFILE = {
    url: GOOGLE_PROFILE_URL,
    rating: 5.0,
    reviewCount: 6,
    checkedOn: '2026-09-19',
};

export interface GoogleReview {
    id: string;
    author: string;
    localGuide?: boolean;
    originalLang: 'en' | 'es';
    text: { en: string; es?: string };
}

export const googleReviews: GoogleReview[] = [
    {
        id: 'alexander-lopez',
        author: 'Alexander Lopez',
        originalLang: 'es',
        text: {
            en: 'Excellent work. Very professional, creative, and attentive to every detail. The website is modern, fast, and has a very attractive design. The experience and commitment to the project are evident. Furthermore, they were always willing to listen to my ideas and make the necessary adjustments. 100% recommended for any individual or business needing a professional website. Excellent service!',
            es: 'Excelente trabajo. Muy profesional, creativo y atento a cada detalle. La página quedó moderna, rápida y con un diseño muy atractivo. Se nota la experiencia y el compromiso con el proyecto. Además, siempre estuvo dispuesto a escuchar mis ideas y hacer los ajustes necesarios. 100% recomendado para cualquier persona o negocio que necesite una página web profesional. ¡Excelente servicio!',
        },
    },
    {
        id: 'franklin-zambrano',
        author: 'Franklin Zambrano',
        localGuide: true,
        originalLang: 'en',
        text: {
            en: 'Fantastic and great to work with. I highly recommend Lisandro for all your digital marketing needs.',
        },
    },
    {
        id: 'charmander-gamer51',
        author: 'Charmander Gamer51',
        originalLang: 'es',
        text: {
            en: "Excellent work, very professional, and I'm grateful for the work you've done for our tattoo studio, Inked City Tattoos. You've helped us a lot.",
            es: 'extelemte trabajo muy profecional y estoy agradecido por el trabajo que ha hecho para nuestro estudio de tatuajes inked city tattoos nos ha ayudado bastante',
        },
    },
    {
        id: 'elisa-lopez',
        author: 'Elisa Lopez',
        originalLang: 'en',
        text: {
            en: 'Great service! They helped me grow and organize my small business.',
        },
    },
];

/**
 * Rating + reviews for the Organization, matching what the on-page Google
 * Reviews section shows (so only render this on pages that show that section).
 * It shares the Organization's @id so it extends the node defined in the layout.
 */
export const reviewsJsonLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: GOOGLE_PROFILE.rating,
        bestRating: 5,
        worstRating: 1,
        reviewCount: GOOGLE_PROFILE.reviewCount,
    },
    review: googleReviews.map((review) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: review.author },
        reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5, worstRating: 1 },
        reviewBody: review.text.en,
        inLanguage: 'en',
        publisher: { '@type': 'Organization', name: 'Google', url: 'https://www.google.com/maps' },
    })),
});
