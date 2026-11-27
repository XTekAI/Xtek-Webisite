"use client";

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, Lock } from 'lucide-react';
import PhoneField from './PhoneField';
import ContactConsentFields from './ContactConsentFields';
import Honeypot from './Honeypot';
import TurnstileWidget, { type TurnstileWidgetHandle } from './TurnstileWidget';
import { DEFAULT_PHONE_COUNTRY, isValidEmail, isValidPersonName, isValidPhone, sanitizePersonName, toE164 } from '../lib/formValidation';
import { buildConsentRecord, emptyConsent, hasRequiredConsent, type ContactConsent } from '../lib/contactConsent';
import { submitLead } from '../lib/submitLead';
import { CONTACT } from '../lib/seo';
import { AUDIT_COPY, type AuditLang } from '../content/audit-landing';

// Short lead form for the Meta Ads landing pages: business, name, phone, email + consent.
// n8n's welcome email (sent in `preferredLanguage`) carries the Calendly link, so the only job
// here is to capture the lead. Source stays 'landing_contact_form', which the CRM already knows.

const input =
    'w-full bg-white/[0.06] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-[border-color,background-color] duration-300 focus:border-accent/70 focus:bg-white/[0.09]';
const label = 'block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55 mb-2 px-1';
const EASE = [0.32, 0.72, 0, 1] as const;

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

const AuditLeadForm: React.FC<{ lang: AuditLang; id?: string }> = ({ lang, id }) => {
    const c = AUDIT_COPY[lang].form;
    const [business, setBusiness] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState(DEFAULT_PHONE_COUNTRY);
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState<ContactConsent>(emptyConsent);
    const [tried, setTried] = useState(false);
    const [error, setError] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [token, setToken] = useState('');
    const [sending, setSending] = useState(false);
    const [done, setDone] = useState(false);
    const turnstile = useRef<TurnstileWidgetHandle>(null);

    const validate = (): string => {
        if (!business.trim() || !name.trim() || !phone || !email.trim()) return c.errRequired;
        if (!isValidPersonName(name)) return c.errName;
        if (!isValidPhone(phone, country)) return c.errPhone;
        if (!isValidEmail(email)) return c.errEmail;
        return '';
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (sending) return;
        setTried(true);
        const message = validate();
        setError(message);
        if (message || !hasRequiredConsent(consent)) return;

        setSending(true);
        const ok = await submitLead(
            {
                name: name.trim(),
                businessName: business.trim(),
                email: email.trim(),
                phone: toE164(phone, country),
                preferredLanguage: lang,
                description: 'Free audit request from the Meta Ads landing page.',
                offer: 'free_audit',
                ...buildConsentRecord(consent, lang),
                source: 'landing_contact_form',
            },
            token,
            honeypot,
        );
        setSending(false);
        if (ok) {
            setDone(true);
            try {
                window.fbq?.('track', 'Lead', { content_name: 'free_audit', content_category: lang });
            } catch {
                /* pixel blocked or opted out */
            }
        } else {
            setError(c.errSend);
            turnstile.current?.reset();
        }
    };

    return (
        <div id={id} className="scroll-mt-28 rounded-[2rem] p-1.5 bg-white/[0.04] border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="rounded-[calc(2rem-0.375rem)] bg-[#03303f]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] p-6 md:p-8">
                <AnimatePresence mode="wait" initial={false}>
                    {done ? (
                        <motion.div
                            key="ok"
                            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="text-center py-6"
                        >
                            <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-6">
                                <Check className="w-8 h-8 text-accent" strokeWidth={2.5} />
                            </div>
                            <h3 className="text-3xl font-bold !text-white mb-3">{c.okTitle}</h3>
                            <p className="text-white/65 mb-8 leading-relaxed">{c.okText}</p>
                            <a
                                href={CONTACT.calendlyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-secondary !text-white font-bold active:scale-[0.98] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                            >
                                {c.okCta}
                                <span className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                    <ArrowUpRight className="w-5 h-5" />
                                </span>
                            </a>
                        </motion.div>
                    ) : (
                        <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }} transition={{ duration: 0.4, ease: EASE }}>
                            <Honeypot value={honeypot} onChange={setHoneypot} />
                            <TurnstileWidget ref={turnstile} onToken={setToken} />

                            <h3 className="text-2xl md:text-[1.75rem] font-bold !text-white leading-tight">{c.title}</h3>
                            <p className="text-white/55 text-sm mt-2 mb-6 leading-relaxed">{c.hint}</p>

                            <div className="space-y-4">
                                <div>
                                    <label className={label} htmlFor={`${id}-biz`}>{c.business}</label>
                                    <input id={`${id}-biz`} name="businessName" autoComplete="organization" className={input} placeholder={c.businessPh} value={business} onChange={(e) => { setBusiness(e.target.value); setError(''); }} />
                                </div>
                                <div>
                                    <label className={label} htmlFor={`${id}-name`}>{c.name}</label>
                                    <input id={`${id}-name`} name="name" autoComplete="name" className={input} placeholder={c.namePh} value={name} onChange={(e) => { setName(sanitizePersonName(e.target.value)); setError(''); }} />
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <span className={label}>{c.phone}</span>
                                        <PhoneField
                                            country={country}
                                            digits={phone}
                                            onCountryChange={setCountry}
                                            onDigitsChange={(d) => { setPhone(d); setError(''); }}
                                            inputClass={input}
                                            hasError={tried && !!phone && !isValidPhone(phone, country)}
                                        />
                                    </div>
                                    <div>
                                        <label className={label} htmlFor={`${id}-email`}>{c.email}</label>
                                        <input id={`${id}-email`} type="email" name="email" autoComplete="email" inputMode="email" className={input} placeholder={c.emailPh} value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} />
                                    </div>
                                </div>
                            </div>

                            <ContactConsentFields consent={consent} onChange={setConsent} showErrors={tried} lang={lang} />

                            {error && (
                                <p role="alert" className="mb-4 text-sm font-semibold text-red-300">{error}</p>
                            )}

                            <button
                                type="submit"
                                disabled={sending}
                                className="group w-full flex items-center justify-between gap-3 pl-7 pr-2 py-2 rounded-full bg-secondary text-white font-bold text-lg shadow-[0_18px_40px_-14px_rgba(167,86,106,0.8)] hover:bg-[#b45f74] active:scale-[0.98] transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:opacity-70"
                            >
                                <span>{sending ? c.sending : c.submit}</span>
                                <span className="w-11 h-11 shrink-0 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
                                    <ArrowUpRight className="w-5 h-5" />
                                </span>
                            </button>
                            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-white/45">
                                <Lock className="w-3.5 h-3.5" /> {c.trust}
                            </p>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AuditLeadForm;
