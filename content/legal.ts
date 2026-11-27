import { CONTACT } from '../lib/seo';

/** Facts used by the Privacy Policy and Terms pages. Update them here. */
export const LEGAL = {
    name: 'Xtek AI',
    email: CONTACT.email,
    phoneDisplay: '609 912 6800',
    phoneHref: 'tel:6099126800',
    effectiveDate: 'September 24, 2026',
    lastUpdated: 'November 27, 2026',
    lastUpdatedIso: '2026-11-27',
    governingState: 'New Jersey',
    effectiveDateEs: '24 de septiembre de 2026',
    lastUpdatedEs: '27 de noviembre de 2026',
};

/** Where each legal page lives, per language. The ad landing serves copies under /legal (see proxy.ts). */
export const LEGAL_PATHS = {
    en: { privacy: '/privacy', terms: '/terms', sms: '/sms-terms' },
    es: { privacy: '/es/privacidad', terms: '/es/terminos', sms: '/es/terminos-sms' },
} as const;

