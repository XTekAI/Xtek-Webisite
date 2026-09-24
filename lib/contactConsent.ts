// Consent captured by the contact / quote forms, and the record we send with each submission.
//
// Two levels of consent, each stored with the exact wording the person saw (needed for the TCPA
// and for Twilio / carrier SMS registration: 10DLC and toll-free verification):
//   - Service messages (text + email about the inquiry and appointments): REQUIRED to submit the
//     form, because that is how we reply and manage appointments. Never pre-checked.
//   - Marketing messages (offers, promotions, news): OPTIONAL, with a separate box for texts and one
//     for emails. Never pre-checked and never a condition of any purchase.
// Keep the wording here as the single source of truth: the form renders it and the record stores it.

export type ConsentLanguage = 'en' | 'es';

/** Bump when the consent wording or the linked policies change materially. */
export const POLICY_VERSION = '2026-09-20';

export interface ContactConsent {
    /** Required: agrees to the Terms and Conditions and Privacy Policy. */
    terms: boolean;
    /** Required: agrees to service messages by text and email (replies, scheduling, reminders, follow-ups). */
    service: boolean;
    /** Optional: agrees to marketing text messages. */
    marketingSms: boolean;
    /** Optional: agrees to marketing emails. */
    marketingEmail: boolean;
}

export const emptyConsent: ContactConsent = { terms: false, service: false, marketingSms: false, marketingEmail: false };

/** True when every required box is checked. */
export const hasRequiredConsent = (consent: ContactConsent) => consent.terms && consent.service;

// {terms}, {privacy} and {sms} become links in the form and plain names in the stored record.
export const CONSENT_TEXT = {
    en: {
        terms: 'I have read and agree to the {terms} and the {privacy}.',
        service:
            'I agree to receive service messages from Xtek AI by text (SMS) and email, at the phone number and email address I provided, including automated messages about my inquiry and appointments: replies, meeting scheduling, confirmations, reminders and follow-ups. Message frequency varies. Message and data rates may apply. Reply STOP to cancel texts or HELP for help. See our {privacy} and {sms}.',
        marketingSms:
            'I also agree to receive marketing text (SMS) messages from Xtek AI at the phone number I provided, including automated offers, promotions and news about our services. Consent is not a condition of any purchase. Message frequency varies. Message and data rates may apply. Reply STOP to cancel or HELP for help. See our {privacy} and {sms}.',
        marketingEmail:
            'I also agree to receive marketing emails from Xtek AI, including offers, promotions and news about our services. I can unsubscribe at any time.',
        required: 'Required',
        optional: 'Optional',
        requiredError: 'Please check this box to submit the form.',
    },
    es: {
        terms: 'He leído y acepto los {terms} y la {privacy}.',
        service:
            'Acepto recibir mensajes de servicio de Xtek AI por mensaje de texto (SMS) y correo electrónico, al número de teléfono y al correo que proporcioné, incluidos mensajes automatizados sobre mi consulta y mis citas: respuestas, programación de reuniones, confirmaciones, recordatorios y seguimientos. La frecuencia de los mensajes varía. Pueden aplicarse tarifas de mensajes y datos. Responde STOP para cancelar los mensajes de texto o HELP para obtener ayuda. Consulta nuestra {privacy} y los {sms}.',
        marketingSms:
            'También acepto recibir mensajes de texto (SMS) de marketing de Xtek AI al número que proporcioné, incluidas ofertas y promociones automatizadas y novedades sobre nuestros servicios. El consentimiento no es una condición para ninguna compra. La frecuencia de los mensajes varía. Pueden aplicarse tarifas de mensajes y datos. Responde STOP para cancelar o HELP para obtener ayuda. Consulta nuestra {privacy} y los {sms}.',
        marketingEmail:
            'También acepto recibir correos electrónicos de marketing de Xtek AI, incluidas ofertas, promociones y novedades sobre nuestros servicios. Puedo darme de baja en cualquier momento.',
        required: 'Obligatorio',
        optional: 'Opcional',
        requiredError: 'Marca esta casilla para enviar el formulario.',
    },
} as const;

export const CONSENT_LINK_LABELS = {
    en: { terms: 'Terms and Conditions', privacy: 'Privacy Policy', sms: 'SMS Terms' },
    es: { terms: 'Términos y Condiciones', privacy: 'Política de Privacidad', sms: 'Términos de SMS' },
} as const;

export const CONSENT_LINK_HREFS = { terms: '/terms', privacy: '/privacy', sms: '/sms-terms' } as const;

/** The wording with the link tokens replaced by their names (what gets stored). */
export function plainConsentText(text: string, lang: ConsentLanguage): string {
    const labels = CONSENT_LINK_LABELS[lang];
    return text.replace(/\{(terms|privacy|sms)\}/g, (_, key: 'terms' | 'privacy' | 'sms') => labels[key]);
}

/**
 * Proof-of-consent fields added to the form submission (browser side).
 * Automations should only send service messages when `serviceMessagesConsent` is true and only send
 * marketing texts / emails when `marketingSmsConsent` / `marketingEmailConsent` is true.
 */
export function buildConsentRecord(consent: ContactConsent, lang: ConsentLanguage) {
    const text = CONSENT_TEXT[lang];
    return {
        termsAccepted: consent.terms,
        privacyAccepted: consent.terms,
        serviceMessagesConsent: consent.service,
        marketingSmsConsent: consent.marketingSms,
        marketingEmailConsent: consent.marketingEmail,
        termsConsentText: plainConsentText(text.terms, lang),
        serviceMessagesConsentText: consent.service ? plainConsentText(text.service, lang) : null,
        marketingSmsConsentText: consent.marketingSms ? plainConsentText(text.marketingSms, lang) : null,
        marketingEmailConsentText: consent.marketingEmail ? plainConsentText(text.marketingEmail, lang) : null,
        consentLanguage: lang,
        consentTimestamp: new Date().toISOString(),
        consentPageUrl: window.location.href,
        policyVersion: POLICY_VERSION,
        userAgent: navigator.userAgent,
    };
}

/**
 * Proof-of-consent record for the three newsletter forms: subscribing is agreeing to marketing
 * emails, so it needs the same kind of record the other forms keep. Only call this once the
 * subscriber has checked the (required, unchecked-by-default) consent box on the form.
 */
export function buildNewsletterConsentRecord(lang: ConsentLanguage, checked: boolean) {
    return {
        marketingEmailConsent: checked,
        marketingEmailConsentText: checked ? plainConsentText(CONSENT_TEXT[lang].marketingEmail, lang) : null,
        consentLanguage: lang,
        consentTimestamp: new Date().toISOString(),
        consentPageUrl: window.location.href,
        policyVersion: POLICY_VERSION,
        userAgent: navigator.userAgent,
    };
}
