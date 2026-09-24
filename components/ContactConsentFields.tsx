"use client";

import React, { useId } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    CONSENT_LINK_HREFS,
    CONSENT_LINK_LABELS,
    CONSENT_TEXT,
    type ContactConsent,
} from '../lib/contactConsent';

interface ContactConsentFieldsProps {
    consent: ContactConsent;
    onChange: (consent: ContactConsent) => void;
    /** True after a submit attempt: unchecked required boxes then show an error. */
    showErrors: boolean;
}

const linkClass = 'text-sky-300 underline underline-offset-2 hover:text-white';

/** Renders consent wording, turning {terms} / {privacy} / {sms} into links that open in a new tab. */
export function renderConsentText(text: string, lang: 'en' | 'es'): React.ReactNode[] {
    const labels = CONSENT_LINK_LABELS[lang];
    return text.split(/(\{terms\}|\{privacy\}|\{sms\})/).map((part, index) => {
        const match = part.match(/^\{(terms|privacy|sms)\}$/);
        if (!match) return <React.Fragment key={index}>{part}</React.Fragment>;
        const key = match[1] as 'terms' | 'privacy' | 'sms';
        return (
            <a key={index} href={CONSENT_LINK_HREFS[key]} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {labels[key]}
            </a>
        );
    });
}

interface BoxProps {
    id: string;
    name: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    required?: boolean;
    showError?: boolean;
    badge: string;
    children: React.ReactNode;
    errorText: string;
}

export const ConsentBox: React.FC<BoxProps> = ({ id, name, checked, onChange, required = false, showError = false, badge, children, errorText }) => {
    const errorId = `${id}-error`;
    const invalid = required && showError && !checked;
    return (
        <div>
            <div className="flex gap-3">
                <input
                    id={id}
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    aria-required={required || undefined}
                    aria-invalid={invalid || undefined}
                    aria-describedby={invalid ? errorId : undefined}
                    className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/30 bg-white/5 accent-[#057BA3] cursor-pointer"
                />
                <label htmlFor={id} className="text-xs md:text-[13px] leading-relaxed text-white/75 cursor-pointer">
                    <span className={required ? 'font-bold text-white/90 mr-1' : 'text-white/50 mr-1'}>({badge})</span>
                    {children}
                </label>
            </div>
            {invalid && (
                <p id={errorId} role="alert" className="mt-2 text-xs font-bold text-red-300 pl-8">
                    {errorText}
                </p>
            )}
        </div>
    );
};

/**
 * The consent checkboxes used by the contact forms, none pre-checked:
 *  1. Terms + Privacy Policy (required),
 *  2. service messages by text and email: replies, scheduling, reminders, follow-ups (required),
 *  3. marketing texts (optional, separate, with the disclosures carriers and Twilio require),
 *  4. marketing emails (optional).
 */
const ContactConsentFields: React.FC<ContactConsentFieldsProps> = ({ consent, onChange, showErrors }) => {
    const { lang } = useLanguage();
    const text = CONSENT_TEXT[lang];
    const baseId = useId();

    return (
        <fieldset className="mt-8 mb-6 space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <legend className="sr-only">{lang === 'es' ? 'Consentimiento' : 'Consent'}</legend>

            <ConsentBox
                id={`${baseId}-terms`}
                name="termsAccepted"
                checked={consent.terms}
                onChange={(terms) => onChange({ ...consent, terms })}
                required
                showError={showErrors}
                badge={text.required}
                errorText={text.requiredError}
            >
                {renderConsentText(text.terms, lang)}
            </ConsentBox>

            <ConsentBox
                id={`${baseId}-service`}
                name="serviceMessagesConsent"
                checked={consent.service}
                onChange={(service) => onChange({ ...consent, service })}
                required
                showError={showErrors}
                badge={text.required}
                errorText={text.requiredError}
            >
                {renderConsentText(text.service, lang)}
            </ConsentBox>

            <ConsentBox
                id={`${baseId}-marketing-sms`}
                name="marketingSmsConsent"
                checked={consent.marketingSms}
                onChange={(marketingSms) => onChange({ ...consent, marketingSms })}
                badge={text.optional}
                errorText=""
            >
                {renderConsentText(text.marketingSms, lang)}
            </ConsentBox>

            <ConsentBox
                id={`${baseId}-marketing-email`}
                name="marketingEmailConsent"
                checked={consent.marketingEmail}
                onChange={(marketingEmail) => onChange({ ...consent, marketingEmail })}
                badge={text.optional}
                errorText=""
            >
                {renderConsentText(text.marketingEmail, lang)}
            </ConsentBox>
        </fieldset>
    );
};

export default ContactConsentFields;
