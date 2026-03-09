"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { handleSmoothScroll } from '../lib/utils';
import { MagnetizeButton } from '../components/ui/magnetize-button';
import NeuralBackground from '../components/ui/flow-field-background';

/* ─────────────────────── QUOTE FORM ─────────────────────── */
const QuoteForm: React.FC = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '', organization: '', email: '', phone: '', sector: '', message: ''
    });
    const [errors, setErrors] = useState({ email: '', phone: '' });
    const [submitted, setSubmitted] = useState(false);

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone: string) =>
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone.replace(/\s/g, '')) || phone.length >= 7;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'email' || name === 'phone') setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, organization, email, phone } = formData;
        if (!name || !organization || !email || !phone) { alert('Please fill in all required fields.'); return; }

        let hasErrors = false;
        const newErrors = { phone: '', email: '' };
        if (!validateEmail(email)) { newErrors.email = t.contact.error_email; hasErrors = true; }
        if (!validatePhone(phone)) { newErrors.phone = t.contact.error_phone; hasErrors = true; }
        if (hasErrors) { setErrors(newErrors); return; }

        try {
            await fetch('https://prueba1-n8n.fihoy6.easypanel.host/webhook/web2', {
                method: 'POST', mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, source: 'next_horizon_quote' }),
            });
            setSubmitted(true);
        } catch { alert('There was an error. Please try again.'); }
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
                <button onClick={() => { setSubmitted(false); setFormData({ name: '', organization: '', email: '', phone: '', sector: '', message: '' }); }} className="text-primary-light font-bold hover:underline">
                    Submit another request
                </button>
            </div>
        );
    }

    const inputClass = "bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary-light focus:bg-white/10 transition-all text-white placeholder:text-white/20";
    const labelClass = "text-xs font-bold uppercase tracking-widest text-white/50 px-1";

    return (
        <form onSubmit={handleSubmit} className="glass max-w-2xl mx-auto p-8 md:p-12 rounded-3xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col gap-2">
                    <label className={labelClass}>Full Name *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Jane Smith" className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                    <label className={labelClass}>Organization *</label>
                    <input required type="text" name="organization" value={formData.organization} onChange={handleChange} placeholder="City of Springfield" className={inputClass} />
                </div>
                <div className="flex flex-col gap-2">
                    <label className={labelClass}>Email *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane@organization.gov" className={`${inputClass} ${errors.email ? 'border-secondary' : ''}`} />
                    {errors.email && <span className="text-secondary text-[10px] font-bold uppercase px-1">{errors.email}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className={labelClass}>Phone *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={`${inputClass} ${errors.phone ? 'border-secondary' : ''}`} />
                    {errors.phone && <span className="text-secondary text-[10px] font-bold uppercase px-1">{errors.phone}</span>}
                </div>
                <div className="flex flex-col gap-2">
                    <label className={labelClass}>Sector</label>
                    <select name="sector" value={formData.sector} onChange={handleChange} className={inputClass}>
                        <option value="" className="bg-primary">Select your sector...</option>
                        <option value="government" className="bg-primary">Government / Municipal</option>
                        <option value="healthcare" className="bg-primary">Healthcare / Hospital</option>
                        <option value="corporate" className="bg-primary">Corporate / Enterprise</option>
                        <option value="legal" className="bg-primary">Legal / Law Firm</option>
                        <option value="education" className="bg-primary">Education</option>
                        <option value="other" className="bg-primary">Other</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className={labelClass}>Brief Description</label>
                    <input type="text" name="message" value={formData.message} onChange={handleChange} placeholder="What are your primary needs?" className={inputClass} />
                </div>
            </div>
            <button type="submit" className="w-full py-4 bg-primary-light text-white font-bold rounded-xl hover:bg-secondary transition-all shadow-xl shadow-primary-light/20 flex items-center justify-center gap-2">
                Request a Private Consultation
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <p className="text-center text-white/30 text-xs mt-6">Your information is encrypted and never shared with third parties.</p>
        </form>
    );
};

/* ─────────────────────── MAIN PAGE ─────────────────────── */
const NextHorizon: React.FC = () => {
    return (
        <div>
            {/* ══════════════ HERO ══════════════ */}
            <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
                <div className="absolute inset-0 z-0">
                    <NeuralBackground color="#057BA3" trailOpacity={0.1} speed={0.4} particleCount={300} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary z-0 pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10 px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light/10 border border-primary-light/20 text-primary-light text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in-up">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        Enterprise-Grade Security Platform
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-8 animate-fade-in-up [animation-delay:200ms] !text-white leading-tight">
                        Your Organization&apos;s <br />
                        <span className="gradient-text">Internal Fortress</span>
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 mb-12 animate-fade-in-up [animation-delay:400ms]">
                        Next Horizon is a closed-loop communication and AI platform that replaces insecure email chains with departmentally siloed, internally hosted infrastructure — purpose-built for government, healthcare, and corporate environments.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
                        <MagnetizeButton
                            onClick={(e) => handleSmoothScroll(e, 'quote')}
                            className="w-full sm:w-auto px-10 py-5 bg-primary-light text-white font-bold text-lg rounded-full hover:bg-secondary hover:scale-105 transition-all shadow-lg shadow-primary-light/20 flex items-center justify-center gap-2 border-none h-auto"
                        >
                            Schedule a Private Consultation
                        </MagnetizeButton>
                        <a href="#architecture" onClick={(e) => handleSmoothScroll(e, 'architecture')} className="w-full sm:w-auto px-8 py-5 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all text-center">
                            See the Architecture
                        </a>
                    </div>
                </div>
            </section>

            {/* ══════════════ TRUST BAR ══════════════ */}
            <section className="py-12 bg-white/[0.02] border-y border-white/10">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { val: "Zero", label: "External Exposure" },
                        { val: "100%", label: "Internal Hosting" },
                        { val: "AES-256", label: "Encryption Standard" },
                        { val: "24/7", label: "Monitoring & Uptime" },
                    ].map((s, i) => (
                        <div key={i}>
                            <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{s.val}</div>
                            <div className="text-white/40 text-xs font-bold uppercase tracking-widest">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══════════════ ARCHITECTURE ══════════════ */}
            <section id="architecture" className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-sm font-bold text-primary-light uppercase tracking-widest mb-4 inline-block">Security Architecture</span>
                        <h2 className="text-3xl md:text-6xl font-bold mb-6 !text-white">The Closed-Loop Model</h2>
                        <p className="text-xl text-white/50 max-w-3xl mx-auto">
                            Unlike cloud-based collaboration tools that route your data through third-party servers, Next Horizon keeps every byte within your organization&apos;s perimeter. No external exposure. No third-party access. No compromises.
                        </p>
                    </div>

                    <div className="nh-row">
                        <div className="nh-card">
                            <div className="nh-card__content">
                                <svg className="w-12 h-12 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                <h3 className="text-xl font-bold !text-white">Internal-Only Network</h3>
                                <p className="text-sm text-white/80 leading-relaxed">
                                    All data lives on your hardware, behind your firewall. No SaaS dependency, no vendor lock-in, no external routing of sensitive information.
                                </p>
                            </div>
                        </div>

                        <div className="nh-card">
                            <div className="nh-card__content">
                                <svg className="w-12 h-12 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                <h3 className="text-xl font-bold !text-white">End-to-End Encryption</h3>
                                <p className="text-sm text-white/80 leading-relaxed">
                                    AES-256 encryption at rest and in transit. Every file, message, and document is protected by military-grade cryptographic standards.
                                </p>
                            </div>
                        </div>

                        <div className="nh-card">
                            <div className="nh-card__content">
                                <svg className="w-12 h-12 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                <h3 className="text-xl font-bold !text-white">Full Audit Trail</h3>
                                <p className="text-sm text-white/80 leading-relaxed">
                                    Every action is logged with user identity, timestamp, and IP. Complete regulatory compliance for HIPAA, CJIS, and SOC 2 frameworks.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════ FEATURE SHOWCASE ══════════════ */}
            <section className="py-24 px-6 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-sm font-bold text-secondary uppercase tracking-widest mb-4 inline-block">Platform Capabilities</span>
                        <h2 className="text-3xl md:text-6xl font-bold mb-6 !text-white">Built for Operational Excellence</h2>
                        <p className="text-xl text-white/50 max-w-3xl mx-auto">
                            Three pillars that transform how your organization communicates, collaborates, and makes decisions.
                        </p>
                    </div>

                    <div className="nh-row">
                        {/* ── Card 1: Organizational Sovereignty ── */}
                        <div className="nh-card">
                            <div className="nh-card__content">
                                <svg className="w-12 h-12 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                <h3 className="text-xl font-bold !text-white">Organizational Sovereignty</h3>
                                <ul className="flex flex-col gap-3">
                                    {[
                                        "Granular Permission Architecture — Multi-tier access control for HR, Finance, and Legal",
                                        "Zero-Trust Environment — Department-specific encryption keys ensuring total data isolation",
                                        "Secure Inter-Departmental Bridges — Managed file sharing with mandatory administrative approval"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-white/80 leading-relaxed">
                                            <span className="nh-check mt-1">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16"><path clipRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" fillRule="evenodd" /></svg>
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <a href="#quote" onClick={(e) => handleSmoothScroll(e, 'quote')} className="mt-auto text-white/70 hover:text-white text-sm font-semibold transition-colors">
                                    Request Access &rarr;
                                </a>
                            </div>
                        </div>

                        {/* ── Card 2: Next Horizon AI (Pink/Accent) ── */}
                        <div className="nh-card nh-card--accent">
                            <div className="nh-card__content">
                                <svg className="w-12 h-12 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                                <h3 className="text-xl font-bold !text-white">Next Horizon AI</h3>
                                <ul className="flex flex-col gap-3">
                                    {[
                                        "On-Premise Intelligence — A private LLM that operates entirely behind your firewall",
                                        "Institutional Memory — Summarize decades of documentation without external data exposure",
                                        "Automated Policy Compliance — AI-driven scanning to ensure documents meet internal regulations"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-white/80 leading-relaxed">
                                            <span className="nh-check mt-1">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16"><path clipRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" fillRule="evenodd" /></svg>
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <a href="#quote" onClick={(e) => handleSmoothScroll(e, 'quote')} className="mt-auto text-white/70 hover:text-white text-sm font-semibold transition-colors">
                                    Schedule Consultation &rarr;
                                </a>
                            </div>
                        </div>

                        {/* ── Card 3: Unified Operations ── */}
                        <div className="nh-card">
                            <div className="nh-card__content">
                                <svg className="w-12 h-12 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <h3 className="text-xl font-bold !text-white">Unified Operations</h3>
                                <ul className="flex flex-col gap-3">
                                    {[
                                        "End-to-End Encrypted Coordination — Secure scheduling for sensitive leadership briefings",
                                        "Department-Wide Instant Alerts — One-click notifications to specific secure internal groups",
                                        "Secure Governance — Automated agenda distribution and action-item tracking within the vault"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-white/80 leading-relaxed">
                                            <span className="nh-check mt-1">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 16 16"><path clipRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" fillRule="evenodd" /></svg>
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <a href="#quote" onClick={(e) => handleSmoothScroll(e, 'quote')} className="mt-auto text-white/70 hover:text-white text-sm font-semibold transition-colors">
                                    Request a Quote &rarr;
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════ USE CASES ══════════════ */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-sm font-bold text-primary-light uppercase tracking-widest mb-4 inline-block">Industry Solutions</span>
                        <h2 className="text-3xl md:text-6xl font-bold mb-6 !text-white">Purpose-Built for High-Stakes Environments</h2>
                    </div>

                    <div className="space-y-8">
                        {/* City Halls */}
                        <div className="glass rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
                            <div className="w-24 h-24 bg-primary-light/10 rounded-3xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-12 h-12 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 !text-white">City Halls & Municipal Government</h3>
                                <p className="text-white/50 mb-6 leading-relaxed">
                                    Replace insecure interdepartmental email with siloed channels for Public Works, Finance, Legal, and City Council. Ensure CJIS compliance, automate meeting agendas, and use Next Horizon AI to draft public-facing communications and policy summaries — all without data ever leaving city infrastructure.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {["CJIS Compliant", "FOIA-Ready Audit Logs", "Council Meeting Automation", "Citizen Data Protection"].map((tag, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full text-xs font-bold bg-primary-light/10 text-primary-light border border-primary-light/20">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Hospitals */}
                        <div className="glass rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
                            <div className="w-24 h-24 bg-secondary/10 rounded-3xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-12 h-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 !text-white">Hospitals & Healthcare Systems</h3>
                                <p className="text-white/50 mb-6 leading-relaxed">
                                    Protect patient records with HIPAA-compliant departmental silos for Radiology, Nursing, Administration, and Billing. Use the private AI to summarize discharge notes, draft referral letters, and analyze clinical documentation — all processed locally with zero cloud exposure.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {["HIPAA Compliant", "PHI Data Isolation", "Clinical AI Summarization", "Staff Scheduling Integration"].map((tag, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full text-xs font-bold bg-secondary/10 text-secondary border border-secondary/20">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Corporate */}
                        <div className="glass rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
                            <div className="w-24 h-24 bg-primary-light/10 rounded-3xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-12 h-12 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 !text-white">Corporate & Enterprise Offices</h3>
                                <p className="text-white/50 mb-6 leading-relaxed">
                                    Eliminate shadow IT and data leakage with a unified platform where Legal, HR, Finance, and Executive teams operate in isolated environments. The internal AI assistant handles contract review, financial report drafting, and board meeting preparation — all governed by SOC 2 controls.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {["SOC 2 Aligned", "IP & Trade Secret Protection", "Executive Dashboard", "M&A Data Room Ready"].map((tag, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full text-xs font-bold bg-primary-light/10 text-primary-light border border-primary-light/20">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════ QUOTE FORM ══════════════ */}
            <section id="quote" className="py-24 px-6 relative overflow-hidden bg-white/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-light/50 to-transparent" />
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light/10 border border-primary-light/20 text-primary-light text-xs font-bold uppercase tracking-widest mb-6">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        Confidential Inquiry
                    </div>
                    <h2 className="text-3xl md:text-6xl font-bold mb-6 !text-white">Request a Quote</h2>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto">
                        Every deployment is custom-engineered for your organization&apos;s size, compliance requirements, and departmental structure. Let&apos;s start the conversation.
                    </p>
                </div>
                <QuoteForm />
            </section>

            {/* ══════════════ FINAL CTA ══════════════ */}
            <section className="py-24 px-6 text-center border-t border-white/5">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 !text-white">
                        Your data deserves a <span className="gradient-text">fortress</span>, not a folder.
                    </h2>
                    <p className="text-lg text-white/40 mb-10 max-w-xl mx-auto">
                        Join the organizations that have eliminated email-based data exposure and embraced closed-loop internal infrastructure.
                    </p>
                    <MagnetizeButton
                        onClick={(e) => handleSmoothScroll(e, 'quote')}
                        className="px-12 py-5 bg-primary-light text-white rounded-full text-xl font-bold hover:bg-secondary hover:scale-105 transition-all shadow-2xl shadow-primary-light/20 border-none h-auto"
                    >
                        Schedule a Private Consultation
                    </MagnetizeButton>
                </div>
            </section>
        </div>
    );
};

export default NextHorizon;
