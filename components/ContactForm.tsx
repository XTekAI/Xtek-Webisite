"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

import ContactConsentFields from './ContactConsentFields';
import Honeypot from './Honeypot';
import TurnstileWidget, { type TurnstileWidgetHandle } from './TurnstileWidget';
import { buildConsentRecord, emptyConsent, hasRequiredConsent, type ContactConsent } from '../lib/contactConsent';
import { submitLead } from '../lib/submitLead';
import { CONTACT } from '../lib/seo';

// The contact form is a 5-step wizard: about you -> industry -> challenges -> readiness -> contact + consent.
// Every answer is sent to /api/lead under the same field names the old single-page form used
// (name, businessName, email, phone, preferredLanguage, description) plus a few new ones, so the
// n8n / Airtable automation keeps working. `description` is built from the answers.

const TOTAL_STEPS = 5;
const AUTO_ADVANCE_MS = 220;

type Option = { value: string; label: string };

const inputClass =
  'bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary-light focus:bg-white/10 transition-all text-white placeholder:text-white/20';
const labelClass = 'text-xs font-bold uppercase tracking-widest text-white/50 px-1';

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) =>
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone.replace(/\s/g, '')) || phone.length >= 7;

const readinessToTemperature = (value: string) =>
  value === 'ready_now' ? 'hot' : value === 'one_to_three_months' ? 'warm' : 'cold';

const OptionButton: React.FC<{ selected: boolean; onClick: () => void; children: React.ReactNode; multi?: boolean }> = ({
  selected,
  onClick,
  children,
  multi,
}) => (
  <button
    type="button"
    aria-pressed={selected}
    onClick={onClick}
    className={`flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border transition-all font-medium ${
      selected
        ? 'bg-primary-light/25 border-primary-light text-white shadow-lg shadow-primary-light/10'
        : 'bg-white/5 border-white/10 text-white/80 hover:border-primary-light/50 hover:bg-white/10'
    }`}
  >
    <span
      className={`w-5 h-5 shrink-0 border flex items-center justify-center ${multi ? 'rounded-md' : 'rounded-full'} ${
        selected ? 'bg-primary-light border-primary-light' : 'border-white/30'
      }`}
    >
      {selected && (
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </span>
    {children}
  </button>
);

// `source` tells the CRM which form the lead came from. The home page uses the default; the landing page
// passes 'landing_contact_form'. Both values are known to /api/lead and to the n8n workflow.
const ContactForm: React.FC<{ source?: 'contact_form' | 'landing_contact_form' }> = ({ source = 'contact_form' }) => {
  const { t, lang } = useLanguage();
  const w = t.contact.wizard;

  const [step, setStep] = useState(0);
  // Only autofocus fields once the visitor is using the form; autofocusing on page load
  // made the browser jump to this section (and open the keyboard on phones).
  const [interacted, setInteracted] = useState(false);
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [industryOther, setIndustryOther] = useState('');
  const [challenges, setChallenges] = useState<string[]>([]);
  const [challengeOther, setChallengeOther] = useState('');
  const [readiness, setReadiness] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState<string>(lang);

  const [error, setError] = useState('');
  const [errors, setErrors] = useState({ phone: '', email: '' });
  const [consent, setConsent] = useState<ContactConsent>(emptyConsent);
  const [consentError, setConsentError] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => { if (advanceTimer.current) clearTimeout(advanceTimer.current); }, []);

  const goTo = (next: number) => {
    setError('');
    setInteracted(true);
    setStep(next);
    // Keep the top of the card in view when the content height changes between steps.
    requestAnimationFrame(() => {
      const el = topRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      if (top < 80 || top > window.innerHeight * 0.4) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const stepError = (current: number): string => {
    if (current === 0 && (!name.trim() || !businessName.trim())) return w.error_name;
    if (current === 1) {
      if (!industry) return w.error_pick;
      if (industry === 'other' && !industryOther.trim()) return w.error_other;
    }
    if (current === 2) {
      if (challenges.length === 0) return w.error_pick;
      if (challenges.includes('other') && !challengeOther.trim()) return w.error_other;
    }
    if (current === 3 && !readiness) return w.error_pick;
    return '';
  };

  const next = () => {
    const message = stepError(step);
    if (message) {
      setError(message);
      return;
    }
    goTo(step + 1);
  };

  // Single-choice steps move on by themselves right after a pick (except "Other", which needs text).
  const autoAdvance = (from: number) => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => goTo(from + 1), AUTO_ADVANCE_MS);
  };

  const pickIndustry = (value: string) => {
    setIndustry(value);
    setError('');
    if (value !== 'other') autoAdvance(1);
  };

  const pickReadiness = (value: string) => {
    setReadiness(value);
    setError('');
    autoAdvance(3);
  };

  const toggleChallenge = (value: string) => {
    setError('');
    setChallenges((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  // English summary for whoever reads the lead in the CRM, whatever language the visitor used.
  const industryLabelEn = () => {
    const en = translations.en.contact.wizard;
    return industry === 'other'
      ? `Other: ${industryOther.trim()}`
      : (en.industries.find((o) => o.value === industry)?.label ?? industry);
  };

  const buildDescription = () => {
    const en = translations.en.contact.wizard;
    const labelOf = (list: readonly Option[], value: string) => list.find((o) => o.value === value)?.label ?? value;
    const industryText = industry === 'other' ? `Other: ${industryOther.trim()}` : labelOf(en.industries, industry);
    const challengeText = challenges
      .map((c) => (c === 'other' ? `Other: ${challengeOther.trim()}` : labelOf(en.challenges, c)))
      .join('; ');
    return `Industry: ${industryText}. Challenges: ${challengeText}. Readiness: ${labelOf(en.readiness, readiness)}.`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (step < TOTAL_STEPS - 1) {
      next();
      return;
    }

    const newErrors = { phone: '', email: '' };
    if (!validateEmail(email)) newErrors.email = t.contact.error_email;
    if (!validatePhone(phone)) newErrors.phone = t.contact.error_phone;
    if (newErrors.email || newErrors.phone) {
      setErrors(newErrors);
      return;
    }
    if (!hasRequiredConsent(consent)) {
      setConsentError(true);
      return;
    }

    setSending(true);
    const ok = await submitLead(
      {
        name: name.trim(),
        businessName: businessName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        preferredLanguage,
        description: buildDescription(),
        // The n8n workflow reads `niche` into the CRM's "Niche" column (readable English, whatever the visitor's language).
        niche: industryLabelEn(),
        industry,
        industryOther: industry === 'other' ? industryOther.trim() : '',
        challenges,
        challengeOther: challenges.includes('other') ? challengeOther.trim() : '',
        readiness,
        leadTemperature: readinessToTemperature(readiness),
        ...buildConsentRecord(consent, lang),
        source,
      },
      turnstileToken,
      honeypot,
    );
    setSending(false);

    if (ok) {
      setSubmitted(true);
    } else {
      alert(t.contact.submit_error);
      turnstileRef.current?.reset();
    }
  };

  const reset = () => {
    setSubmitted(false);
    setStep(0);
    setName(''); setBusinessName(''); setIndustry(''); setIndustryOther('');
    setChallenges([]); setChallengeOther(''); setReadiness('');
    setEmail(''); setPhone(''); setPreferredLanguage(lang);
    setConsent(emptyConsent); setConsentError(false);
    setErrors({ phone: '', email: '' }); setError('');
    setHoneypot(''); setTurnstileToken('');
  };

  if (submitted) {
    return (
      <div className="glass max-w-2xl mx-auto p-12 text-center rounded-3xl animate-fade-in-up">
        <div className="w-20 h-20 bg-primary-light/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold mb-4 !text-white">{t.contact.success_title}</h3>
        <p className="text-white/60 mb-8">{t.contact.success_desc}</p>
        <a
          href={CONTACT.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-light text-white font-bold rounded-xl hover:bg-secondary transition-all shadow-xl shadow-primary-light/20 mb-6"
        >
          {t.contact.calendly_cta}
        </a>
        <div>
          <button onClick={reset} className="text-primary-light font-bold hover:underline">
            {t.contact.success_cta}
          </button>
        </div>
      </div>
    );
  }

  const isLast = step === TOTAL_STEPS - 1;
  const needsContinueButton = step === 0 || step === 2 || (step === 1 && industry === 'other') || isLast;

  return (
    <form onSubmit={handleSubmit} noValidate className="glass max-w-2xl mx-auto p-8 md:p-12 rounded-3xl border border-white/10">
      <div ref={topRef} className="scroll-mt-28" />
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <TurnstileWidget ref={turnstileRef} onToken={setTurnstileToken} />

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary-light">
            {w.step_of.replace('{n}', String(step + 1)).replace('{total}', String(TOTAL_STEPS))}
          </span>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden" role="progressbar" aria-valuemin={1} aria-valuemax={TOTAL_STEPS} aria-valuenow={step + 1}>
          <div className="h-full bg-primary-light rounded-full transition-all duration-500" style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }} />
        </div>
      </div>

      <div key={step} className="animate-fade-in-up">
        <h3 className="text-2xl md:text-3xl font-bold !text-white mb-2">{w.titles[step]}</h3>
        <p className="text-white/50 mb-8">{w.hints[step]}</p>

        {step === 0 && (
          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-col gap-2">
              <label className={labelClass}>{t.contact.label_name}</label>
              <input autoFocus={interacted} type="text" name="name" autoComplete="name" value={name} onChange={(e) => { setName(e.target.value); setError(''); }} placeholder={w.placeholder_name} className={inputClass} />
            </div>
            <div className="flex flex-col gap-2">
              <label className={labelClass}>{t.contact.label_business}</label>
              <input type="text" name="businessName" autoComplete="organization" value={businessName} onChange={(e) => { setBusinessName(e.target.value); setError(''); }} placeholder={w.placeholder_business} className={inputClass} />
            </div>
          </div>
        )}

        {step === 1 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {w.industries.map((o: Option) => (
                <OptionButton key={o.value} selected={industry === o.value} onClick={() => pickIndustry(o.value)}>{o.label}</OptionButton>
              ))}
            </div>
            {industry === 'other' && (
              <input autoFocus type="text" value={industryOther} onChange={(e) => { setIndustryOther(e.target.value); setError(''); }} placeholder={w.placeholder_other} className={`${inputClass} w-full mt-4`} />
            )}
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {w.challenges.map((o: Option) => (
                <OptionButton key={o.value} multi selected={challenges.includes(o.value)} onClick={() => toggleChallenge(o.value)}>{o.label}</OptionButton>
              ))}
            </div>
            {challenges.includes('other') && (
              <input autoFocus type="text" value={challengeOther} onChange={(e) => { setChallengeOther(e.target.value); setError(''); }} placeholder={w.placeholder_other} className={`${inputClass} w-full mt-4`} />
            )}
          </>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 gap-3">
            {w.readiness.map((o: Option) => (
              <OptionButton key={o.value} selected={readiness === o.value} onClick={() => pickReadiness(o.value)}>{o.label}</OptionButton>
            ))}
          </div>
        )}

        {step === 4 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              <div className="flex flex-col gap-2">
                <label className={labelClass}>{t.contact.label_email}</label>
                <input autoFocus type="email" name="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }} placeholder="hello@company.com" className={`${inputClass} ${errors.email ? '!border-secondary' : ''}`} />
                {errors.email && <span className="text-secondary text-[10px] font-bold uppercase px-1">{errors.email}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label className={labelClass}>{t.contact.label_phone}</label>
                <input type="tel" name="phone" autoComplete="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: '' })); }} placeholder="+1 (201) 555-0123" className={`${inputClass} ${errors.phone ? '!border-secondary' : ''}`} />
                {errors.phone && <span className="text-secondary text-[10px] font-bold uppercase px-1">{errors.phone}</span>}
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className={labelClass}>{t.contact.label_preferred_language}</label>
                <select name="preferredLanguage" value={preferredLanguage} onChange={(e) => setPreferredLanguage(e.target.value)} className={inputClass}>
                  <option value="en" className="bg-primary">English</option>
                  <option value="es" className="bg-primary">Español</option>
                </select>
              </div>
            </div>
            <ContactConsentFields consent={consent} onChange={(c) => { setConsent(c); if (hasRequiredConsent(c)) setConsentError(false); }} showErrors={consentError} />
          </>
        )}

        {error && <p role="alert" className="text-secondary text-sm font-bold mt-4">{error}</p>}
      </div>

      <div className="flex items-center justify-between gap-4 mt-8">
        {step > 0 ? (
          <button type="button" onClick={() => goTo(step - 1)} className="px-5 py-3 text-white/60 hover:text-white font-bold transition-colors">
            ← {w.back}
          </button>
        ) : <span />}

        {needsContinueButton && (
          <button
            type="submit"
            disabled={sending}
            className="px-8 py-4 bg-primary-light text-white font-bold rounded-xl hover:bg-secondary transition-all shadow-xl shadow-primary-light/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLast ? t.contact.cta : w.next}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
