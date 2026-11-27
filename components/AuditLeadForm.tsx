"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Lock } from 'lucide-react';
import PhoneField from './PhoneField';
import ContactConsentFields from './ContactConsentFields';
import Honeypot from './Honeypot';
import TurnstileWidget, { type TurnstileWidgetHandle } from './TurnstileWidget';
import { DEFAULT_PHONE_COUNTRY, isValidEmail, isValidPersonName, isValidPhone, sanitizePersonName, toE164 } from '../lib/formValidation';
import { buildConsentRecord, emptyConsent, hasRequiredConsent, type ContactConsent } from '../lib/contactConsent';
import { submitLead } from '../lib/submitLead';
import { CONTACT } from '../lib/seo';
import { AUDIT_COPY, type AuditLang } from '../content/audit-landing';

// 4-step lead wizard for the Meta Ads landing pages:
//   1. one tap: what to improve first  2. business + name  3. phone + email  4. consent + send.
// n8n's welcome email (sent in `preferredLanguage`) carries the Calendly link. Source stays
// 'landing_contact_form', which the CRM already knows; the goal goes in `description` / `challenges`.

const TOTAL = 4;
const EASE = [0.32, 0.72, 0, 1] as const;
const input =
    'w-full bg-white/[0.06] border border-white/10 rounded-2xl px-4 py-4 text-base text-white placeholder:text-white/30 outline-none transition-[border-color,background-color] duration-300 focus:border-accent/70 focus:bg-white/[0.09]';
const label = 'block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55 mb-2 px-1';

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

const PrimaryButton: React.FC<{ children: React.ReactNode; disabled?: boolean; type?: 'button' | 'submit'; onClick?: () => void; arrow?: 'right' | 'up' }> = ({
    children,
    disabled,
    type = 'button',
    onClick,
    arrow = 'right',
}) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="group w-full flex items-center justify-between gap-3 pl-7 pr-2 py-2 rounded-full bg-secondary text-white font-bold text-lg shadow-[0_18px_40px_-14px_rgba(167,86,106,0.8)] hover:bg-[#b45f74] active:scale-[0.98] transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:opacity-70"
    >
        <span>{children}</span>
        <span className="w-11 h-11 shrink-0 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
            {arrow === 'up' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
        </span>
    </button>
);

const AuditLeadForm: React.FC<{ lang: AuditLang; id?: string }> = ({ lang, id }) => {
    const c = AUDIT_COPY[lang].form;
    const reduce = useReducedMotion();

    const [step, setStep] = useState(0);
    const [dir, setDir] = useState(1);
    const [interacted, setInteracted] = useState(false);
    const [goal, setGoal] = useState('');
    const [business, setBusiness] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState(DEFAULT_PHONE_COUNTRY);
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState<ContactConsent>(emptyConsent);
    const [consentTried, setConsentTried] = useState(false);
    const [error, setError] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [token, setToken] = useState('');
    const [sending, setSending] = useState(false);
    const [done, setDone] = useState(false);
    const turnstile = useRef<TurnstileWidgetHandle>(null);
    const top = useRef<HTMLDivElement>(null);
    const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => () => { if (advanceTimer.current) clearTimeout(advanceTimer.current); }, []);

    const goTo = (next: number) => {
        setError('');
        setInteracted(true);
        setDir(next > step ? 1 : -1);
        setStep(next);
        // On phones the card can be taller than the screen: keep its top in view between steps.
        requestAnimationFrame(() => {
            const el = top.current;
            if (!el) return;
            const y = el.getBoundingClientRect().top;
            if (y < 70 || y > window.innerHeight * 0.45) window.scrollTo({ top: y + window.scrollY - 90, behavior: 'smooth' });
        });
    };

    const stepError = (s: number): string => {
        if (s === 0 && !goal) return c.errGoal;
        if (s === 1) {
            if (!business.trim() || !name.trim()) return c.errRequired;
            if (!isValidPersonName(name)) return c.errName;
        }
        if (s === 2) {
            if (!phone || !email.trim()) return c.errRequired;
            if (!isValidPhone(phone, country)) return c.errPhone;
            if (!isValidEmail(email)) return c.errEmail;
        }
        return '';
    };

    const next = () => {
        const message = stepError(step);
        if (message) return setError(message);
        goTo(step + 1);
    };

    const pickGoal = (v: string) => {
        setGoal(v);
        setError('');
        if (advanceTimer.current) clearTimeout(advanceTimer.current);
        advanceTimer.current = setTimeout(() => goTo(1), 260);
    };

    const goalLabelEn = AUDIT_COPY.en.form.goals.find((g) => g.v === goal)?.l ?? goal;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (sending) return;
        if (step < TOTAL - 1) return next();
        setConsentTried(true);
        if (!hasRequiredConsent(consent)) return setError(c.errConsent);

        setSending(true);
        const ok = await submitLead(
            {
                name: name.trim(),
                businessName: business.trim(),
                email: email.trim(),
                phone: toE164(phone, country),
                preferredLanguage: lang,
                description: `Free audit request (Meta Ads landing). Wants to improve first: ${goalLabelEn}.`,
                challenges: [goal],
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

    const variants = {
        enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * 48, filter: 'blur(6px)' }),
        center: { opacity: 1, x: 0, filter: 'blur(0px)' },
        exit: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * -48, filter: 'blur(6px)' }),
    };

    return (
        <div id={id} className="scroll-mt-28 rounded-[2rem] p-1.5 bg-white/[0.04] border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div ref={top} className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-[#03303f]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] p-6 md:p-8">
                {done ? (
                    <motion.div
                        initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="text-center py-6"
                    >
                        <motion.div
                            initial={{ scale: 0.4, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
                            className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center mx-auto mb-6"
                        >
                            <Check className="w-8 h-8 text-accent" strokeWidth={2.5} />
                        </motion.div>
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
                    <form onSubmit={onSubmit} noValidate>
                        <Honeypot value={honeypot} onChange={setHoneypot} />
                        <TurnstileWidget ref={turnstile} onToken={setToken} />

                        {/* progress */}
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">{c.stepOf(step + 1, TOTAL)}</span>
                            {step > 0 && (
                                <button type="button" onClick={() => goTo(step - 1)} className="inline-flex items-center gap-1.5 text-sm text-white/55 hover:text-white transition-colors">
                                    <ArrowLeft className="w-4 h-4" /> {c.back}
                                </button>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-1.5 mb-7" role="progressbar" aria-valuemin={1} aria-valuemax={TOTAL} aria-valuenow={step + 1}>
                            {Array.from({ length: TOTAL }, (_, i) => (
                                <div key={i} className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                                    <motion.div
                                        className="h-full rounded-full bg-gradient-to-r from-secondary to-accent origin-left"
                                        initial={false}
                                        animate={{ scaleX: i <= step ? 1 : 0 }}
                                        transition={{ duration: 0.6, ease: EASE }}
                                    />
                                </div>
                            ))}
                        </div>

                        <AnimatePresence mode="wait" custom={dir} initial={false}>
                            <motion.div
                                key={step}
                                custom={dir}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.45, ease: EASE }}
                            >
                                <h3 className="text-2xl md:text-[1.75rem] font-bold !text-white leading-tight">{c.steps[step].t}</h3>
                                <p className="text-white/55 text-sm mt-2 mb-6 leading-relaxed">{c.steps[step].h}</p>

                                {step === 0 && (
                                    <div className="grid gap-2.5" role="radiogroup">
                                        {c.goals.map((g, i) => {
                                            const selected = goal === g.v;
                                            return (
                                                <motion.button
                                                    key={g.v}
                                                    type="button"
                                                    role="radio"
                                                    aria-checked={selected}
                                                    onClick={() => pickGoal(g.v)}
                                                    initial={reduce ? false : { opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.05 * i, ease: EASE }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`flex items-center gap-3 text-left px-4 py-4 rounded-2xl border font-semibold transition-colors duration-300 ${
                                                        selected ? 'bg-accent/15 border-accent text-white' : 'bg-white/[0.05] border-white/10 text-white/85 hover:border-accent/50 hover:bg-white/[0.08]'
                                                    }`}
                                                >
                                                    <span className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center transition-colors ${selected ? 'bg-accent border-accent' : 'border-white/30'}`}>
                                                        {selected && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
                                                    </span>
                                                    {g.l}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                )}

                                {step === 1 && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className={label} htmlFor={`${id}-biz`}>{c.business}</label>
                                            <input id={`${id}-biz`} autoFocus={interacted} name="businessName" autoComplete="organization" enterKeyHint="next" className={input} placeholder={c.businessPh} value={business} onChange={(e) => { setBusiness(e.target.value); setError(''); }} />
                                        </div>
                                        <div>
                                            <label className={label} htmlFor={`${id}-name`}>{c.name}</label>
                                            <input id={`${id}-name`} name="name" autoComplete="name" enterKeyHint="next" className={input} placeholder={c.namePh} value={name} onChange={(e) => { setName(sanitizePersonName(e.target.value)); setError(''); }} />
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-4">
                                        <div>
                                            <span className={label}>{c.phone}</span>
                                            <PhoneField
                                                country={country}
                                                digits={phone}
                                                onCountryChange={setCountry}
                                                onDigitsChange={(d) => { setPhone(d); setError(''); }}
                                                inputClass={input}
                                                autoFocus={interacted}
                                            />
                                        </div>
                                        <div>
                                            <label className={label} htmlFor={`${id}-email`}>{c.email}</label>
                                            <input id={`${id}-email`} type="email" name="email" autoComplete="email" inputMode="email" enterKeyHint="next" className={input} placeholder={c.emailPh} value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }} />
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div>
                                        <div className="rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white/70 space-y-1">
                                            <p><span className="text-white font-semibold">{business}</span> · {name}</p>
                                            <p>{email}</p>
                                        </div>
                                        <ContactConsentFields consent={consent} onChange={(v) => { setConsent(v); setError(''); }} showErrors={consentTried} lang={lang} />
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>

                        {error && (
                            <p role="alert" className="mt-4 text-sm font-semibold text-red-300">{error}</p>
                        )}

                        {step > 0 && (
                            <div className="mt-6">
                                {step < TOTAL - 1 ? (
                                    <PrimaryButton type="submit">{c.next}</PrimaryButton>
                                ) : (
                                    <PrimaryButton type="submit" disabled={sending} arrow="up">{sending ? c.sending : c.submit}</PrimaryButton>
                                )}
                            </div>
                        )}
                        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-white/45">
                            <Lock className="w-3.5 h-3.5" /> {c.trust}
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuditLeadForm;
