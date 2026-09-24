"use client";

import React, { useId } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ConsentBox, renderConsentText } from './ContactConsentFields';
import { CONSENT_TEXT } from '../lib/contactConsent';

interface NewsletterConsentFieldProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    /** True after a submit attempt with the box unchecked. */
    showError: boolean;
}

/**
 * The single required checkbox on the three newsletter forms (unchecked by default): subscribing
 * is agreeing to marketing emails, so it needs the same proof-of-consent wording and record as the
 * other forms' marketing-email box (see lib/contactConsent.ts's buildNewsletterConsentRecord).
 */
const NewsletterConsentField: React.FC<NewsletterConsentFieldProps> = ({ checked, onChange, showError }) => {
    const { lang } = useLanguage();
    const text = CONSENT_TEXT[lang];
    const id = useId();

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left">
            <ConsentBox
                id={`${id}-newsletter-marketing-email`}
                name="marketingEmailConsent"
                checked={checked}
                onChange={onChange}
                required
                showError={showError}
                badge={text.required}
                errorText={text.requiredError}
            >
                {renderConsentText(text.marketingEmail, lang)}
            </ConsentBox>
        </div>
    );
};

export default NewsletterConsentField;
