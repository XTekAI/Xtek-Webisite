// Copy for the Meta Ads landing pages: /free-audit (English) and /auditoria-gratis (Spanish).
// Brand rules: no prices, no invented figures. Every number on this page comes from a Google
// screenshot in "Clientes Reales/" (checked 2026-11-26) — update it here if it changes.

export type AuditLang = 'en' | 'es';

export const AUDIT_PATHS: Record<AuditLang, string> = { en: '/free-audit', es: '/auditoria-gratis' };

export interface WorkVideo {
    id: string;
    name: string;
    type: { en: string; es: string };
    src: string;
    poster: string;
}

export const WORK_VIDEOS: WorkVideo[] = [
    { id: 'yoja', name: 'Yoja Hair Lounge', type: { en: 'Hair salon', es: 'Salón de belleza' }, src: '/landing/yoja-site.mp4', poster: '/landing/yoja-site.jpg' },
    { id: 'inked', name: 'Inked City Tattoo', type: { en: 'Tattoo studio', es: 'Estudio de tatuajes' }, src: '/landing/inked-city-site.mp4', poster: '/landing/inked-city-site.jpg' },
    { id: 'zambranos', name: 'Zambranos Complete Auto Center', type: { en: 'Auto repair shop', es: 'Taller mecánico' }, src: '/landing/zambranos-site.mp4', poster: '/landing/zambranos-site.jpg' },
];

export interface ClientProfile {
    name: string;
    img: string;
    w: number;
    h: number;
}

// Google Business Profiles of real clients (screenshots cropped to the profile card).
export const CLIENT_PROFILES: ClientProfile[] = [
    { name: 'Yoja Hair Lounge', img: '/landing/yoja-gbp.webp', w: 736, h: 837 },
    { name: 'Zambranos Complete Auto Center', img: '/landing/zambranos-gbp.webp', w: 736, h: 887 },
    { name: 'Inked City Tattoos', img: '/landing/inked-city-gbp.webp', w: 736, h: 837 },
    { name: 'Escape Bar and Liquor Restaurant', img: '/landing/escape-bar-gbp.webp', w: 736, h: 887 },
    { name: "Rollito's Ice Cream Rolls", img: '/landing/rollitos-gbp.webp', w: 736, h: 837 },
    { name: 'Mayan Art Tattoo', img: '/landing/mayan-art-gbp.webp', w: 736, h: 837 },
    { name: 'R&C Barbershop', img: '/landing/rc-barbershop-gbp.webp', w: 736, h: 837 },
    { name: 'Chicho Barbershop', img: '/landing/chicho-gbp.webp', w: 736, h: 837 },
    { name: "Anthony's Driveway Sealing", img: '/landing/anthonys-gbp.webp', w: 637, h: 600 },
];

export const CLIENT_NAMES = [
    'Yoja Hair Lounge',
    'Zambranos Auto Center',
    'Inked City Tattoos',
    'Mayan Art Tattoo',
    'Escape Bar',
    "Rollito's Ice Cream",
    'R&C Barbershop',
    'Chicho Barbershop',
    "Anthony's Driveway Sealing",
];

// XTEK AI's own Google profile and reviews, copied word for word from Google (2026-11-26).
export const XTEK_GOOGLE = { rating: '5.0', count: 6 };

export const XTEK_REVIEWS = [
    {
        author: 'Jose Lopez',
        original: 'es' as AuditLang,
        meta: { en: '2 months ago', es: 'hace 2 meses' },
        text: {
            en: 'Excellent work. Very professional, creative, and attentive to every detail. The website is modern, fast, and has a very attractive design. The experience and commitment to the project are evident. Furthermore, they were always willing to listen to my ideas and make the necessary adjustments. 100% recommended for any individual or business needing a professional website. Excellent service!',
            es: 'Excelente trabajo. Muy profesional, creativo y atento a cada detalle. La página quedó moderna, rápida y con un diseño muy atractivo. Se nota la experiencia y el compromiso con el proyecto. Además, siempre estuvo dispuesto a escuchar mis ideas y hacer los ajustes necesarios. 100% recomendado para cualquier persona o negocio que necesite una página web profesional. ¡Excelente servicio!',
        },
        color: '#057BA3',
        featured: true,
    },
    {
        author: 'Franklin Zambrano',
        original: 'en' as AuditLang,
        meta: { en: 'Local Guide · Zambranos Auto Center', es: 'Local Guide · Zambranos Auto Center' },
        text: {
            en: 'Fantastic and great to work with. I highly recommend Lisandro for all your digital marketing needs.',
            es: 'Fantástico y muy bueno para trabajar. Recomiendo mucho a Lisandro para todas tus necesidades de marketing digital.',
        },
        color: '#A7566A',
    },
    {
        author: 'Charmander Gamer51',
        original: 'es' as AuditLang,
        meta: { en: 'Inked City Tattoos', es: 'Inked City Tattoos' },
        text: {
            en: "Excellent work, very professional, and I'm grateful for the work you've done for our tattoo studio, Inked City Tattoos. You've helped us a lot.",
            es: 'Excelente trabajo, muy profesional, y estoy agradecido por el trabajo que ha hecho para nuestro estudio de tatuajes, Inked City Tattoos. Nos ha ayudado bastante.',
        },
        color: '#2F7D4F',
    },
    {
        author: 'Elisa Lopez',
        original: 'en' as AuditLang,
        meta: { en: 'Google review', es: 'Reseña de Google' },
        text: {
            en: 'Great service! They helped me grow and organize my small business.',
            es: '¡Gran servicio! Me ayudaron a crecer y organizar mi pequeño negocio.',
        },
        color: '#8E5CC4',
    },
];

const en = {
    meta: {
        title: 'Free Business Audit for Local Businesses | Xtek AI',
        description:
            'Book a free 30-minute call. We review your Google profile, website and how you answer customers, and show you what to fix first.',
    },
    nav: { cta: 'Free audit', switchTo: 'Español' },
    hero: {
        eyebrow: 'Free audit for local businesses',
        titleA: 'Your business is losing customers',
        titleB: 'somewhere.',
        titleC: 'We’ll show you where, for free.',
        sub: 'On a free 30-minute call we review your Google profile, your website, and how you answer calls and messages. You leave with a short list of what to fix first, whether or not you hire us.',
        cta: 'Get my free audit',
        proof: (r: string, n: number) => `${r} on Google · ${n} reviews`,
        proof2: 'Barbershops, salons, tattoo studios, auto shops, restaurants and contractors',
    },
    form: {
        title: 'Claim your free audit',
        hint: 'Takes under a minute. We email you a link to pick a time for your call.',
        business: 'Business name',
        businessPh: 'Your business',
        name: 'Your name',
        namePh: 'First and last name',
        phone: 'Phone',
        email: 'Email',
        emailPh: 'you@business.com',
        submit: 'Send me my free audit',
        sending: 'Sending…',
        trust: 'Free · No obligation · English or Spanish',
        errRequired: 'Please fill in every field.',
        errName: 'Use letters only in your name.',
        errEmail: 'Check your email address.',
        errPhone: 'Check your phone number.',
        errSend: 'We couldn’t send your request. Please try again or call (609) 912-6800.',
        okTitle: 'You’re in.',
        okText: 'Check your email: we just sent you the link to pick a time for your free call. Want to choose it now?',
        okCta: 'Pick a time now',
        stepOf: (n: number, t: number) => `Step ${n} of ${t}`,
        back: 'Back',
        next: 'Continue',
        steps: [
            { t: 'What do you want to improve?', h: 'Pick all that apply. We’ll focus the audit there.' },
            { t: 'Tell us about your business', h: 'So we can review it before the call.' },
            { t: 'Where should we send your audit?', h: 'We email you a link to pick a time for your call.' },
            { t: 'Last step', h: 'Confirm and we’ll send you the link to book your free call.' },
        ],
        goals: [
            { v: 'found_on_google', l: 'Get found on Google' },
            { v: 'website', l: 'A website that brings customers' },
            { v: 'bookings_calls', l: 'More bookings, fewer missed calls' },
            { v: 'automation', l: 'Automate repetitive tasks' },
            { v: 'not_sure', l: 'Not sure yet, I want the audit' },
        ],
        errGoal: 'Pick at least one option.',
        errConsent: 'Check both required boxes to continue.',
    },
    marquee: 'Local businesses we work with',
    leaks: {
        eyebrow: 'Where customers slip away',
        title: 'Local businesses usually lose customers in',
        titleEm: 'one of four places',
        sub: 'The audit finds which one is costing you the most right now.',
        items: [
            { t: 'They can’t find you', d: 'Your Google profile has old photos, missing hours or no recent posts, so the shop down the street shows up first.' },
            { t: 'They find you, but don’t trust you', d: 'The website is outdated, slow on a phone, or missing. People leave before they call.' },
            { t: 'They want to book, but can’t', d: 'No online booking, missed calls after hours, messages that wait until tomorrow.' },
            { t: 'You do everything by hand', d: 'Reminders, follow-ups, review requests and invoices eat hours you could spend on clients.' },
        ],
    },
    how: {
        eyebrow: 'How the free audit works',
        title: 'Three steps.',
        titleEm: 'No pitch deck.',
        steps: [
            { t: 'Send your details', d: 'Fill in the form. We email you a link to choose a time that works for you.' },
            { t: 'We study your business first', d: 'Before the call we look at your Google profile, website, reviews and how customers reach you.' },
            { t: 'You get a clear plan', d: 'On the call we show you what to fix first. If it makes sense, we propose a plan built for your business. If not, you keep the list.' },
        ],
        custom: 'Every plan is custom. Some businesses only need automation. Others need everything, from the website to the Google profile.',
        services: ['Websites', 'Google Business Profile', 'Online booking', 'Automations', 'AI assistant for calls & messages', 'Review requests'],
    },
    work: {
        eyebrow: 'Real work',
        title: 'Websites we built for',
        titleEm: 'local businesses',
        sub: 'Recorded on a phone, the way your customers see them.',
    },
    profiles: {
        eyebrow: 'Real clients on Google',
        title: 'Businesses that trust',
        titleEm: 'Xtek AI',
        sub: 'Google Business Profiles of clients we work with. Ratings belong to each business, shown as they appear on Google Maps.',
    },
    reviews: {
        eyebrow: 'Google reviews',
        title: 'What our clients',
        titleEm: 'say',
        translated: 'Translated from Spanish',
        all: 'See all reviews on Google',
    },
    founder: {
        eyebrow: 'A note from the founder',
        p1: 'Every business I work with gets a plan built around it. A barbershop and an auto shop don’t lose customers in the same place, so I don’t sell packages.',
        p2: 'Before I propose anything, I look at how your business gets customers today. That’s what the free audit is for. You get honest answers, in English or Spanish, and you decide what happens next.',
        name: 'Lisandro Orellana',
        role: 'Founder & CEO, Xtek AI',
    },
    fit: {
        eyebrow: 'Is this for you?',
        title: 'The audit is',
        titleEm: 'a good fit if…',
        yes: [
            'You own a local business and want more calls, bookings or walk-ins',
            'You know your website or Google profile needs work, but not where to start',
            'You spend hours on tasks a system could do for you',
        ],
        noTitle: 'It’s not for you if…',
        no: [
            'You want the cheapest template website you can find',
            'You can’t give it 30 minutes this month',
        ],
    },
    faq: {
        eyebrow: 'Questions',
        title: 'Before you',
        titleEm: 'book',
        items: [
            { q: 'Is the audit really free?', a: 'Yes. The call and the audit are free, with no obligation to hire us.' },
            { q: 'What do I need to prepare?', a: 'Nothing. Tell us your business name and we review everything before the call.' },
            { q: 'How much do your services cost?', a: 'It depends on what your business needs. Every plan is custom, and you see the price before any work starts.' },
            { q: 'Can we talk in Spanish?', a: 'Yes. We work in English and Spanish.' },
            { q: 'I already have a website. Is this still useful?', a: 'Yes. Then we look at what else is missing: your Google profile, booking, follow-ups or automations.' },
            { q: 'Where are you located?', a: 'We’re based in New Jersey and work with businesses across the US, by phone and video call.' },
        ],
    },
    final: {
        title: 'Find out where your business',
        titleEm: 'is losing customers',
        sub: 'Free 30-minute call. No obligation. In English or Spanish.',
        cta: 'Get my free audit',
    },
    sticky: 'Get my free audit',
    footer: { privacy: 'Privacy Policy', terms: 'Terms', rights: 'All rights reserved.' },
};

const es: typeof en = {
    meta: {
        title: 'Auditoría gratis para negocios locales | Xtek AI',
        description:
            'Agenda una llamada gratis de 30 minutos. Revisamos tu perfil de Google, tu página web y cómo atiendes a tus clientes, y te decimos qué arreglar primero.',
    },
    nav: { cta: 'Auditoría gratis', switchTo: 'English' },
    hero: {
        eyebrow: 'Auditoría gratis para negocios',
        titleA: 'Tu negocio está perdiendo clientes',
        titleB: 'en algún punto.',
        titleC: 'Te decimos dónde, gratis.',
        sub: 'En una llamada gratis de 30 minutos revisamos tu perfil de Google, tu página web y cómo respondes llamadas y mensajes. Sales con una lista corta de lo que debes arreglar primero, nos contrates o no.',
        cta: 'Quiero mi auditoría gratis',
        proof: (r: string, n: number) => `${r} en Google · ${n} reseñas`,
        proof2: 'Barberías, salones, estudios de tatuajes, talleres, restaurantes y contratistas',
    },
    form: {
        title: 'Pide tu auditoría gratis',
        hint: 'Toma menos de un minuto. Te enviamos por email el link para elegir la hora de tu llamada.',
        business: 'Nombre del negocio',
        businessPh: 'Tu negocio',
        name: 'Tu nombre',
        namePh: 'Nombre y apellido',
        phone: 'Teléfono',
        email: 'Email',
        emailPh: 'tu@negocio.com',
        submit: 'Quiero mi auditoría gratis',
        sending: 'Enviando…',
        trust: 'Gratis · Sin compromiso · En español o inglés',
        errRequired: 'Completa todos los campos.',
        errName: 'Usa solo letras en tu nombre.',
        errEmail: 'Revisa tu email.',
        errPhone: 'Revisa tu número de teléfono.',
        errSend: 'No pudimos enviar tu solicitud. Inténtalo de nuevo o llama al (609) 912-6800.',
        okTitle: '¡Listo!',
        okText: 'Revisa tu email: te acabamos de enviar el link para elegir la hora de tu llamada gratis. ¿Quieres elegirla ahora?',
        okCta: 'Elegir hora ahora',
        stepOf: (n: number, t: number) => `Paso ${n} de ${t}`,
        back: 'Atrás',
        next: 'Continuar',
        steps: [
            { t: '¿Qué quieres mejorar?', h: 'Elige todas las que apliquen. Enfocamos la auditoría ahí.' },
            { t: 'Cuéntanos de tu negocio', h: 'Así lo revisamos antes de la llamada.' },
            { t: '¿A dónde te enviamos la auditoría?', h: 'Te mandamos por email el link para elegir la hora de tu llamada.' },
            { t: 'Último paso', h: 'Confirma y te enviamos el link para agendar tu llamada gratis.' },
        ],
        goals: [
            { v: 'found_on_google', l: 'Que me encuentren en Google' },
            { v: 'website', l: 'Una página web que traiga clientes' },
            { v: 'bookings_calls', l: 'Más reservas, menos llamadas perdidas' },
            { v: 'automation', l: 'Automatizar tareas repetitivas' },
            { v: 'not_sure', l: 'No estoy seguro, quiero la auditoría' },
        ],
        errGoal: 'Elige al menos una opción.',
        errConsent: 'Marca las dos casillas obligatorias para continuar.',
    },
    marquee: 'Negocios locales con los que trabajamos',
    leaks: {
        eyebrow: 'Dónde se te escapan los clientes',
        title: 'Un negocio local suele perder clientes en',
        titleEm: 'uno de cuatro lugares',
        sub: 'La auditoría encuentra cuál te está costando más ahora mismo.',
        items: [
            { t: 'No te encuentran', d: 'Tu perfil de Google tiene fotos viejas, horarios incompletos o ninguna publicación reciente, y el negocio de la esquina sale primero.' },
            { t: 'Te encuentran, pero no confían', d: 'La página web está desactualizada, es lenta en el teléfono o no existe. La gente se va antes de llamar.' },
            { t: 'Quieren reservar, pero no pueden', d: 'Sin reservas en línea, llamadas perdidas fuera de horario, mensajes que esperan hasta mañana.' },
            { t: 'Haces todo a mano', d: 'Recordatorios, seguimientos, pedir reseñas y facturas te quitan horas que podrías dar a tus clientes.' },
        ],
    },
    how: {
        eyebrow: 'Cómo funciona la auditoría gratis',
        title: 'Tres pasos.',
        titleEm: 'Sin rollos.',
        steps: [
            { t: 'Envía tus datos', d: 'Llena el formulario. Te enviamos por email un link para elegir la hora que mejor te quede.' },
            { t: 'Estudiamos tu negocio antes', d: 'Antes de la llamada revisamos tu perfil de Google, tu web, tus reseñas y cómo te contactan tus clientes.' },
            { t: 'Recibes un plan claro', d: 'En la llamada te mostramos qué arreglar primero. Si tiene sentido, te proponemos un plan hecho para tu negocio. Si no, te quedas con la lista.' },
        ],
        custom: 'Cada plan es a la medida. Algunos negocios solo necesitan automatizar procesos. Otros necesitan todo, desde la página web hasta el perfil de Google.',
        services: ['Páginas web', 'Perfil de Google Business', 'Reservas en línea', 'Automatizaciones', 'Asistente de IA para llamadas y mensajes', 'Solicitud de reseñas'],
    },
    work: {
        eyebrow: 'Trabajo real',
        title: 'Páginas web que hicimos para',
        titleEm: 'negocios locales',
        sub: 'Grabadas en un teléfono, como las ven tus clientes.',
    },
    profiles: {
        eyebrow: 'Clientes reales en Google',
        title: 'Negocios que confían en',
        titleEm: 'Xtek AI',
        sub: 'Perfiles de Google Business de clientes con los que trabajamos. Las calificaciones son de cada negocio, tal como aparecen en Google Maps.',
    },
    reviews: {
        eyebrow: 'Reseñas de Google',
        title: 'Lo que dicen',
        titleEm: 'nuestros clientes',
        translated: 'Traducida del inglés',
        all: 'Ver todas las reseñas en Google',
    },
    founder: {
        eyebrow: 'Una nota del fundador',
        p1: 'Cada negocio con el que trabajo recibe un plan hecho a su medida. Una barbería y un taller no pierden clientes en el mismo lugar, por eso no vendo paquetes.',
        p2: 'Antes de proponerte algo, reviso cómo consigue clientes tu negocio hoy. Para eso es la auditoría gratis. Recibes respuestas honestas, en español o inglés, y tú decides qué sigue.',
        name: 'Lisandro Orellana',
        role: 'Fundador y CEO, Xtek AI',
    },
    fit: {
        eyebrow: '¿Es para ti?',
        title: 'La auditoría',
        titleEm: 'es para ti si…',
        yes: [
            'Tienes un negocio local y quieres más llamadas, reservas o clientes en la puerta',
            'Sabes que tu web o tu perfil de Google necesitan trabajo, pero no por dónde empezar',
            'Pasas horas en tareas que un sistema podría hacer por ti',
        ],
        noTitle: 'No es para ti si…',
        no: [
            'Buscas la página web de plantilla más barata posible',
            'No puedes darle 30 minutos este mes',
        ],
    },
    faq: {
        eyebrow: 'Preguntas',
        title: 'Antes de',
        titleEm: 'agendar',
        items: [
            { q: '¿La auditoría es gratis de verdad?', a: 'Sí. La llamada y la auditoría son gratis, sin compromiso de contratarnos.' },
            { q: '¿Qué tengo que preparar?', a: 'Nada. Dinos el nombre de tu negocio y revisamos todo antes de la llamada.' },
            { q: '¿Cuánto cuestan sus servicios?', a: 'Depende de lo que necesite tu negocio. Cada plan es a la medida y ves el precio antes de empezar cualquier trabajo.' },
            { q: '¿Podemos hablar en español?', a: 'Sí. Trabajamos en español e inglés.' },
            { q: 'Ya tengo página web. ¿Me sirve igual?', a: 'Sí. Entonces revisamos qué más falta: tu perfil de Google, las reservas, los seguimientos o las automatizaciones.' },
            { q: '¿Dónde están ubicados?', a: 'Estamos en New Jersey y trabajamos con negocios de todo EE. UU. por teléfono y videollamada.' },
        ],
    },
    final: {
        title: 'Descubre dónde tu negocio',
        titleEm: 'está perdiendo clientes',
        sub: 'Llamada gratis de 30 minutos. Sin compromiso. En español o inglés.',
        cta: 'Quiero mi auditoría gratis',
    },
    sticky: 'Quiero mi auditoría gratis',
    footer: { privacy: 'Política de privacidad', terms: 'Términos', rights: 'Todos los derechos reservados.' },
};

export const AUDIT_COPY = { en, es };
