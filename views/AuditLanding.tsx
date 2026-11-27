"use client";

import React, { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion';
import { ArrowUpRight, Check, ChevronDown, Minus, Play } from 'lucide-react';
import AuditLeadForm from '../components/AuditLeadForm';
import { scrollToSection } from '../lib/navigation';
import { GOOGLE_PROFILE_URL } from '../lib/seo';
import {
    AUDIT_COPY,
    AUDIT_PATHS,
    CLIENT_NAMES,
    CLIENT_PROFILES,
    WORK_VIDEOS,
    XTEK_GOOGLE,
    XTEK_REVIEWS,
    type AuditLang,
} from '../content/audit-landing';

// Ad landing page (Meta Ads): one offer, one action. Every CTA scrolls to the lead form.
// Motion: spring/bezier reveals on scroll (transform + opacity + blur only), a pinned horizontal
// track for the Google profiles, and client videos that only play while on screen.

const EASE = [0.32, 0.72, 0, 1] as const;
const FORM_ID = 'audit-form';
const FORM_ID_2 = 'audit-form-final';

const goToForm = (e?: React.MouseEvent) => {
    e?.preventDefault();
    scrollToSection(FORM_ID);
};

/* ---------------------------------- primitives ---------------------------------- */

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string; y?: number }> = ({ children, delay = 0, className, y = 48 }) => {
    const reduce = useReducedMotion();
    return (
        <motion.div
            className={className}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(10px)' }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.9, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
};

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {children}
    </span>
);

const Em: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <em className={`font-serif italic font-medium text-accent ${className}`}>{children}</em>
);

const SectionTitle: React.FC<{ eyebrow: string; title: string; em: string; sub?: string; center?: boolean }> = ({ eyebrow, title, em, sub, center }) => (
    <Reveal className={center ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-6 text-[2rem] leading-[1.08] md:text-5xl lg:text-[3.4rem] font-bold tracking-tight !text-white">
            {title} <Em>{em}</Em>
        </h2>
        {sub && <p className="mt-5 text-base md:text-lg text-white/60 leading-relaxed">{sub}</p>}
    </Reveal>
);

const CtaPill: React.FC<{ children: React.ReactNode; className?: string; onClick?: (e: React.MouseEvent) => void }> = ({ children, className = '', onClick = goToForm }) => (
    <a
        href={`#${FORM_ID}`}
        onClick={onClick}
        className={`group inline-flex items-center justify-between gap-4 pl-7 pr-2 py-2 rounded-full bg-secondary !text-white font-bold text-base md:text-lg shadow-[0_18px_40px_-14px_rgba(167,86,106,0.85)] hover:bg-[#b45f74] active:scale-[0.98] transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${className}`}
    >
        {children}
        <span className="w-11 h-11 shrink-0 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-105">
            <ArrowUpRight className="w-5 h-5" />
        </span>
    </a>
);

const Stars: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
    <span className="inline-flex gap-0.5 text-[#FBBC05]" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} className={className} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.29 3.97a1 1 0 00.95.69h4.17c.97 0 1.37 1.24.59 1.81l-3.37 2.45a1 1 0 00-.36 1.12l1.29 3.97c.3.92-.76 1.69-1.54 1.12l-3.37-2.45a1 1 0 00-1.18 0l-3.37 2.45c-.78.57-1.84-.2-1.54-1.12l1.29-3.97a1 1 0 00-.36-1.12L1.98 9.4c-.78-.57-.38-1.81.59-1.81h4.17a1 1 0 00.95-.69l1.36-3.97z" />
            </svg>
        ))}
    </span>
);

const GoogleG: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
);

/* ---------------------------------- header ---------------------------------- */

const noSubscribe = () => () => {};

const Header: React.FC<{ lang: AuditLang }> = ({ lang }) => {
    const c = AUDIT_COPY[lang];
    const other: AuditLang = lang === 'en' ? 'es' : 'en';
    const [scrolled, setScrolled] = useState(false);
    // Keep the ad's UTM / fbclid parameters when the visitor switches language.
    const search = useSyncExternalStore(noSubscribe, () => window.location.search, () => '');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        const frame = requestAnimationFrame(onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="fixed top-3 md:top-5 inset-x-0 z-40 px-3 md:px-6 pointer-events-none"
        >
            <div
                className={`pointer-events-auto mx-auto max-w-6xl flex items-center justify-between gap-3 rounded-full border pl-4 pr-2 py-2 transition-[background-color,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    scrolled ? 'bg-[#00384B]/75 backdrop-blur-xl border-white/10 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.7)]' : 'bg-transparent border-transparent'
                }`}
            >
                <Link href={AUDIT_PATHS[lang] + search} aria-label="Xtek AI" className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/brand/xtek-horizontal-negativo.svg" alt="Xtek AI" className="h-7 md:h-8 w-auto" />
                </Link>
                <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-full border border-white/10 bg-white/[0.05] p-1 text-xs font-bold" role="group" aria-label="Language">
                        {(['en', 'es'] as const).map((l) =>
                            l === lang ? (
                                <span key={l} aria-current="true" className="rounded-full bg-white px-3 py-1.5 text-primary">{l.toUpperCase()}</span>
                            ) : (
                                <Link key={l} href={AUDIT_PATHS[other] + search} hrefLang={l} className="rounded-full px-3 py-1.5 text-white/70 hover:text-white transition-colors">
                                    {l.toUpperCase()}
                                </Link>
                            ),
                        )}
                    </div>
                    <a
                        href={`#${FORM_ID}`}
                        onClick={goToForm}
                        className="hidden sm:inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold !text-white hover:bg-[#b45f74] active:scale-[0.98] transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    >
                        {c.nav.cta}
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </motion.header>
    );
};

/* ---------------------------------- hero ---------------------------------- */

const wordsParent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } };
const wordChild: Variants = {
    hidden: { y: '110%', opacity: 0 },
    show: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const SplitWords: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
    <>
        {text.split(' ').map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
                <motion.span variants={wordChild} className={`inline-block ${className ?? ''}`}>
                    {w}&nbsp;
                </motion.span>
            </span>
        ))}
    </>
);

const Hero: React.FC<{ lang: AuditLang }> = ({ lang }) => {
    const c = AUDIT_COPY[lang].hero;
    const reduce = useReducedMotion();
    return (
        <section className="relative pt-28 md:pt-40 pb-16 md:pb-28 px-4 md:px-6 overflow-hidden">
            {/* ambient orbs: transform-only animation */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
                <div className="audit-orb absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-secondary/30 blur-[120px]" />
                <div className="audit-orb audit-orb--slow absolute top-20 -right-40 h-[32rem] w-[32rem] rounded-full bg-primary-light/30 blur-[120px]" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-primary" />
            </div>

            <div className="relative mx-auto max-w-6xl grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-start">
                <div className="lg:pt-6">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
                        <Eyebrow>{c.eyebrow}</Eyebrow>
                    </motion.div>

                    <motion.h1
                        variants={reduce ? undefined : wordsParent}
                        initial="hidden"
                        animate="show"
                        className="mt-6 text-[2.5rem] leading-[1.04] sm:text-5xl md:text-6xl lg:text-[4.4rem] font-bold tracking-tight !text-white"
                    >
                        <SplitWords text={c.titleA} />
                        <SplitWords text={c.titleB} className="font-serif italic font-medium text-accent" />
                        <span className="block mt-3 text-[1.55rem] sm:text-3xl md:text-4xl lg:text-[2.6rem] leading-tight text-white/85">
                            <SplitWords text={c.titleC} />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
                        className="mt-6 max-w-xl text-base md:text-xl text-white/65 leading-relaxed"
                    >
                        {c.sub}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
                        className="mt-8 flex flex-col sm:flex-row sm:items-center gap-5"
                    >
                        <CtaPill className="w-full sm:w-auto">{c.cta}</CtaPill>
                        <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                            <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-lg">
                                <GoogleG className="w-6 h-6" />
                            </span>
                            <span className="leading-tight">
                                <Stars />
                                <span className="block text-sm text-white/70 group-hover:text-white transition-colors">{c.proof(XTEK_GOOGLE.rating, XTEK_GOOGLE.count)}</span>
                            </span>
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.05, ease: EASE }}
                        className="mt-7 flex items-center gap-3"
                    >
                        <div className="flex -space-x-2.5 shrink-0">
                            {['yoja', 'zambranos', 'inked-city', 'rollitos'].map((n) => (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img key={n} src={`/clients/${n}-logo.jpg`} alt="" className="w-9 h-9 rounded-full object-cover ring-2 ring-primary bg-white" />
                            ))}
                        </div>
                        <p className="text-xs md:text-sm text-white/55 max-w-xs leading-snug">{c.proof2}</p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.1, delay: 0.45, ease: EASE }}
                >
                    <AuditLeadForm lang={lang} id={FORM_ID} />
                </motion.div>
            </div>
        </section>
    );
};

/* ---------------------------------- marquee ---------------------------------- */

const Marquee: React.FC<{ lang: AuditLang }> = ({ lang }) => (
    <section className="py-10 md:py-14 border-y border-white/[0.07] bg-white/[0.02] overflow-hidden">
        <p className="text-center text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-white/45 mb-6">{AUDIT_COPY[lang].marquee}</p>
        <div className="relative [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
            <div className="audit-marquee flex w-max gap-12 md:gap-16">
                {[...CLIENT_NAMES, ...CLIENT_NAMES].map((n, i) => (
                    <span key={i} aria-hidden={i >= CLIENT_NAMES.length} className="whitespace-nowrap text-xl md:text-2xl font-black italic tracking-tight text-white/70">
                        {n}
                    </span>
                ))}
            </div>
        </div>
    </section>
);

/* ---------------------------------- leaks (01–04) ---------------------------------- */

const Leaks: React.FC<{ lang: AuditLang }> = ({ lang }) => {
    const c = AUDIT_COPY[lang].leaks;
    const spans = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7'];
    return (
        <section className="py-24 md:py-36 px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
                <SectionTitle eyebrow={c.eyebrow} title={c.title} em={c.titleEm} sub={c.sub} />
                <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
                    {c.items.map((it, i) => (
                        <Reveal key={i} delay={i * 0.08} className={spans[i]}>
                            <div className="group h-full rounded-[2rem] p-1.5 bg-white/[0.04] border border-white/10 transition-colors duration-700 hover:border-accent/40">
                                <div className="h-full rounded-[calc(2rem-0.375rem)] bg-gradient-to-br from-white/[0.06] to-white/[0.01] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-7 md:p-9 flex flex-col">
                                    <span className="font-serif italic text-5xl md:text-6xl text-accent/90 leading-none transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1">
                                        0{i + 1}
                                    </span>
                                    <h3 className="mt-6 text-xl md:text-2xl font-bold !text-white">{it.t}</h3>
                                    <p className="mt-3 text-white/60 leading-relaxed">{it.d}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal className="mt-10 flex justify-center">
                    <CtaPill>{AUDIT_COPY[lang].hero.cta}</CtaPill>
                </Reveal>
            </div>
        </section>
    );
};

/* ---------------------------------- how it works ---------------------------------- */

const How: React.FC<{ lang: AuditLang }> = ({ lang }) => {
    const c = AUDIT_COPY[lang].how;
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
    const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

    return (
        <section className="relative py-24 md:py-36 px-4 md:px-6 bg-gradient-to-b from-white/[0.025] to-transparent">
            <div className="mx-auto max-w-6xl grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
                <div className="lg:sticky lg:top-32 self-start">
                    <SectionTitle eyebrow={c.eyebrow} title={c.title} em={c.titleEm} />
                    <Reveal delay={0.1}>
                        <p className="mt-6 text-white/60 leading-relaxed max-w-md">{c.custom}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {c.services.map((s) => (
                                <span key={s} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs md:text-sm text-white/75">{s}</span>
                            ))}
                        </div>
                    </Reveal>
                </div>

                <div ref={ref} className="relative pl-12 md:pl-16">
                    <div className="absolute left-[1.15rem] md:left-[1.4rem] top-2 bottom-2 w-px bg-white/10" />
                    <motion.div style={{ scaleY: line }} className="absolute left-[1.15rem] md:left-[1.4rem] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent via-secondary to-primary-light" />
                    <div className="space-y-10 md:space-y-14">
                        {c.steps.map((s, i) => (
                            <Reveal key={i} delay={0.05}>
                                <div className="relative">
                                    <span className="absolute -left-12 md:-left-16 top-0 w-9 h-9 md:w-11 md:h-11 rounded-full bg-primary border border-accent/50 flex items-center justify-center font-bold text-accent shadow-[0_0_0_6px_rgba(0,56,75,1)]">
                                        {i + 1}
                                    </span>
                                    <div className="rounded-[2rem] p-1.5 bg-white/[0.04] border border-white/10">
                                        <div className="rounded-[calc(2rem-0.375rem)] bg-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] p-6 md:p-8">
                                            <h3 className="text-xl md:text-2xl font-bold !text-white">{s.t}</h3>
                                            <p className="mt-3 text-white/60 leading-relaxed">{s.d}</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ---------------------------------- real work (videos) ---------------------------------- */

const PhoneVideo: React.FC<{ v: (typeof WORK_VIDEOS)[number]; lang: AuditLang; offset: number }> = ({ v, lang, offset }) => {
    const ref = useRef<HTMLDivElement>(null);
    const video = useRef<HTMLVideoElement>(null);
    const inView = useInView(ref, { margin: '0px 0px -15% 0px' });
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [offset, -offset]);

    useEffect(() => {
        const el = video.current;
        if (!el) return;
        if (inView && !reduce) el.play().catch(() => {});
        else el.pause();
    }, [inView, reduce]);

    return (
        <motion.figure ref={ref} style={{ y }} className="relative snap-center shrink-0 w-[72vw] max-w-[300px] md:w-auto md:max-w-none">
            <div className="rounded-[2.6rem] p-2 bg-gradient-to-b from-white/25 to-white/5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
                <div className="relative rounded-[2.2rem] overflow-hidden bg-black aspect-[1320/2568]">
                    <video
                        ref={video}
                        src={v.src}
                        poster={v.poster}
                        muted
                        loop
                        playsInline
                        preload="none"
                        className="absolute inset-0 w-full h-full object-cover"
                        aria-label={v.name}
                    />
                    {reduce && (
                        <button type="button" onClick={() => video.current?.play()} className="absolute inset-0 flex items-center justify-center bg-black/30" aria-label="Play">
                            <Play className="w-12 h-12 text-white" />
                        </button>
                    )}
                </div>
            </div>
            <figcaption className="mt-5 text-center">
                <span className="block font-bold text-white">{v.name}</span>
                <span className="text-sm text-white/50">{v.type[lang]}</span>
            </figcaption>
        </motion.figure>
    );
};

const Work: React.FC<{ lang: AuditLang }> = ({ lang }) => {
    const c = AUDIT_COPY[lang].work;
    return (
        <section className="py-24 md:py-36 overflow-hidden">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
                <SectionTitle eyebrow={c.eyebrow} title={c.title} em={c.titleEm} sub={c.sub} center />
            </div>
            <Reveal className="mt-14 md:mt-20">
                <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-[14vw] md:px-6 mx-auto max-w-5xl pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {WORK_VIDEOS.map((v, i) => (
                        <PhoneVideo key={v.id} v={v} lang={lang} offset={[30, -20, 40][i]} />
                    ))}
                </div>
            </Reveal>
        </section>
    );
};

/* ---------------------------------- Google profiles: pinned horizontal track ---------------------------------- */

const Profiles: React.FC<{ lang: AuditLang }> = ({ lang }) => {
    const c = AUDIT_COPY[lang].profiles;
    const section = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const [distance, setDistance] = useState(0);
    const reduce = useReducedMotion();

    useLayoutEffect(() => {
        const measure = () => {
            if (!track.current) return;
            setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 32));
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
    const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -distance]), { stiffness: 140, damping: 32, mass: 0.35 });

    if (reduce) {
        return (
            <section className="py-24 px-4 md:px-6">
                <div className="mx-auto max-w-6xl">
                    <SectionTitle eyebrow={c.eyebrow} title={c.title} em={c.titleEm} sub={c.sub} />
                    <div className="mt-12 flex gap-5 overflow-x-auto snap-x pb-4">
                        {CLIENT_PROFILES.map((p) => (
                            <ProfileCard key={p.name} p={p} i={0} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={section} className="relative" style={{ height: `calc(100dvh + ${distance}px)` }}>
            <div className="sticky top-0 h-[100dvh] flex flex-col justify-center overflow-hidden">
                <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
                    <SectionTitle eyebrow={c.eyebrow} title={c.title} em={c.titleEm} sub={c.sub} />
                </div>
                <motion.div ref={track} style={{ x }} className="mt-8 md:mt-12 flex gap-4 md:gap-6 pl-4 md:pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] pr-8 w-max will-change-transform">
                    {CLIENT_PROFILES.map((p, i) => (
                        <ProfileCard key={p.name} p={p} i={i} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const ProfileCard: React.FC<{ p: (typeof CLIENT_PROFILES)[number]; i: number }> = ({ p, i }) => (
    <div
        className={`group snap-center shrink-0 w-[62vw] max-w-[270px] md:w-[290px] md:max-w-none rounded-[1.8rem] p-1.5 bg-white/[0.06] border border-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:!rotate-0 hover:-translate-y-2 ${
            i % 2 ? 'md:rotate-[1.5deg] md:translate-y-4' : 'md:-rotate-[1.5deg]'
        }`}
    >
        <div className="rounded-[calc(1.8rem-0.375rem)] overflow-hidden bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt={`${p.name} – Google Business Profile`} width={p.w} height={p.h} loading="lazy" decoding="async" className="w-full h-auto block" />
        </div>
    </div>
);

/* ---------------------------------- reviews ---------------------------------- */

const ReviewCard: React.FC<{ r: (typeof XTEK_REVIEWS)[number]; lang: AuditLang; big?: boolean }> = ({ r, lang, big }) => {
const translated = r.original !== lang ? AUDIT_COPY[lang].reviews.translated : null;
return (
    <div className="h-full rounded-[2rem] p-1.5 bg-white/[0.05] border border-white/10">
        <div className="h-full rounded-[calc(2rem-0.375rem)] bg-white text-[#1f1f1f] p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: r.color }}>
                    {r.author[0]}
                </span>
                <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{r.author}</p>
                    <p className="text-xs text-black/50 truncate">{r.meta[lang]}</p>
                </div>
                <GoogleG className="w-6 h-6 shrink-0" />
            </div>
            <div className="mt-4"><Stars /></div>
            <p className={`mt-3 leading-relaxed text-black/80 ${big ? 'text-lg md:text-xl' : ''}`}>{r.text[lang]}</p>
            {translated && <p className="mt-auto pt-4 text-[11px] text-black/40">{translated}</p>}
        </div>
    </div>
);
};

const Reviews: React.FC<{ lang: AuditLang }> = ({ lang }) => {
    const c = AUDIT_COPY[lang].reviews;
    const [featured, ...rest] = XTEK_REVIEWS;
    return (
        <section className="py-24 md:py-36 px-4 md:px-6">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                    <SectionTitle eyebrow={c.eyebrow} title={c.title} em={c.titleEm} />
                    <Reveal delay={0.1}>
                        <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-4 rounded-[1.6rem] bg-white px-5 py-4 text-[#1f1f1f] hover:-translate-y-0.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                            <GoogleG className="w-9 h-9" />
                            <span>
                                <span className="flex items-center gap-2 text-2xl font-bold">{XTEK_GOOGLE.rating} <Stars /></span>
                                <span className="text-xs text-black/55">XTek AI LLC · {c.all}</span>
                            </span>
                        </a>
                    </Reveal>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
                    <Reveal className="md:col-span-7 md:row-span-3"><ReviewCard r={featured} lang={lang} big /></Reveal>
                    {rest.map((r, i) => (
                        <Reveal key={r.author} delay={0.08 * (i + 1)} className="md:col-span-5"><ReviewCard r={r} lang={lang} /></Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ---------------------------------- founder ---------------------------------- */

const Founder: React.FC<{ lang: AuditLang }> = ({ lang }) => {
    const c = AUDIT_COPY[lang].founder;
    return (
        <section className="py-20 md:py-32 px-4 md:px-6">
            <Reveal className="mx-auto max-w-4xl">
                <div className="rounded-[2.4rem] p-2 bg-white/[0.04] border border-white/10">
                    <div className="relative overflow-hidden rounded-[calc(2.4rem-0.5rem)] bg-gradient-to-br from-secondary/25 via-primary to-primary-light/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] p-8 md:p-14">
                        <span aria-hidden className="absolute -top-6 right-6 font-serif italic text-[10rem] leading-none text-white/[0.06] select-none">&ldquo;</span>
                        <Eyebrow>{c.eyebrow}</Eyebrow>
                        <p className="mt-8 text-xl md:text-2xl leading-relaxed text-white/90 font-medium">{c.p1}</p>
                        <p className="mt-5 text-base md:text-lg leading-relaxed text-white/65">{c.p2}</p>
                        <div className="mt-10 flex items-center gap-4">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/brand/xtek-simbolo-negativo.svg" alt="" className="w-12 h-12 rounded-full bg-white/10 p-2" />
                            <div>
                                <p className="font-serif italic text-2xl text-accent leading-none">{c.name}</p>
                                <p className="mt-1 text-sm text-white/55">{c.role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </section>
    );
};

/* ---------------------------------- fit ---------------------------------- */

const Fit: React.FC<{ lang: AuditLang }> = ({ lang }) => {
    const c = AUDIT_COPY[lang].fit;
    return (
        <section className="py-20 md:py-32 px-4 md:px-6">
            <div className="mx-auto max-w-6xl grid md:grid-cols-12 gap-5">
                <div className="md:col-span-12 mb-6">
                    <SectionTitle eyebrow={c.eyebrow} title={c.title} em={c.titleEm} />
                </div>
                <Reveal className="md:col-span-7">
                    <ul className="h-full rounded-[2rem] border border-accent/25 bg-accent/[0.06] p-7 md:p-9 space-y-5">
                        {c.yes.map((y) => (
                            <li key={y} className="flex gap-4 text-white/85 text-base md:text-lg leading-snug">
                                <span className="mt-0.5 w-7 h-7 shrink-0 rounded-full bg-accent/20 flex items-center justify-center"><Check className="w-4 h-4 text-accent" strokeWidth={3} /></span>
                                {y}
                            </li>
                        ))}
                    </ul>
                </Reveal>
                <Reveal delay={0.1} className="md:col-span-5">
                    <div className="h-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 md:p-9">
                        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/45 mb-5">{c.noTitle}</p>
                        <ul className="space-y-5">
                            {c.no.map((n) => (
                                <li key={n} className="flex gap-4 text-white/60 leading-snug">
                                    <span className="mt-0.5 w-7 h-7 shrink-0 rounded-full bg-white/[0.06] flex items-center justify-center"><Minus className="w-4 h-4 text-white/50" /></span>
                                    {n}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

/* ---------------------------------- FAQ ---------------------------------- */

const Faq: React.FC<{ lang: AuditLang }> = ({ lang }) => {
    const c = AUDIT_COPY[lang].faq;
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section className="py-20 md:py-32 px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
                <SectionTitle eyebrow={c.eyebrow} title={c.title} em={c.titleEm} center />
                <div className="mt-12 space-y-3">
                    {c.items.map((it, i) => {
                        const isOpen = open === i;
                        return (
                            <Reveal key={i} delay={i * 0.04} y={24}>
                                <div className={`rounded-[1.5rem] border transition-colors duration-500 ${isOpen ? 'border-accent/35 bg-white/[0.06]' : 'border-white/10 bg-white/[0.03]'}`}>
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        onClick={() => setOpen(isOpen ? null : i)}
                                        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 font-semibold text-white md:text-lg"
                                    >
                                        <span className={isOpen ? 'text-accent' : ''}>{it.q}</span>
                                        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'rotate-180 text-accent' : 'text-white/50'}`} />
                                    </button>
                                    <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                        <div className="overflow-hidden">
                                            <p className="px-6 pb-6 text-white/65 leading-relaxed">{it.a}</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

/* ---------------------------------- final CTA + form ---------------------------------- */

const Final: React.FC<{ lang: AuditLang }> = ({ lang }) => {
    const c = AUDIT_COPY[lang].final;
    return (
        <section className="relative py-24 md:py-36 px-4 md:px-6 overflow-hidden">
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="audit-orb absolute left-1/2 top-1/3 -translate-x-1/2 h-[34rem] w-[34rem] rounded-full bg-secondary/25 blur-[130px]" />
            </div>
            <div className="relative mx-auto max-w-6xl grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <Reveal>
                    <h2 className="text-[2.2rem] leading-[1.06] md:text-6xl font-bold tracking-tight !text-white">
                        {c.title} <Em>{c.titleEm}</Em>
                    </h2>
                    <p className="mt-6 text-lg text-white/65">{c.sub}</p>
                </Reveal>
                <Reveal delay={0.12}>
                    <AuditLeadForm lang={lang} id={FORM_ID_2} />
                </Reveal>
            </div>
        </section>
    );
};

/* ---------------------------------- sticky mobile CTA ---------------------------------- */

const StickyCta: React.FC<{ lang: AuditLang }> = ({ lang }) => {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const ids = [FORM_ID, FORM_ID_2];
        const visible = new Set<string>();
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
                setShow(visible.size === 0 && window.scrollY > 300);
            },
            { threshold: 0.15 },
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) io.observe(el);
        });
        const onScroll = () => setShow(visible.size === 0 && window.scrollY > 300);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            io.disconnect();
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <div
            className={`lg:hidden fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-primary via-primary/90 to-transparent transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
            }`}
        >
            <CtaPill className="w-full">{AUDIT_COPY[lang].sticky}</CtaPill>
        </div>
    );
};

/* ---------------------------------- footer ---------------------------------- */

const Footer: React.FC<{ lang: AuditLang }> = ({ lang }) => {
    const c = AUDIT_COPY[lang].footer;
    return (
        <footer className="border-t border-white/[0.07] px-4 md:px-6 pt-10 pb-28 lg:pb-10">
            <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-5 text-sm text-white/45">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/xtek-horizontal-negativo.svg" alt="Xtek AI" className="h-7 w-auto opacity-80" />
                <p>© {new Date().getFullYear()} X-Tek AI LLC · New Jersey, US · {c.rights}</p>
                <div className="flex gap-5">
                    <a href="/privacy" className="hover:text-white">{c.privacy}</a>
                    <a href="/terms" className="hover:text-white">{c.terms}</a>
                    <a href="/sms-terms" className="hover:text-white">SMS</a>
                </div>
            </div>
        </footer>
    );
};

/* ---------------------------------- page ---------------------------------- */

const AuditLanding: React.FC<{ lang: AuditLang }> = ({ lang }) => (
    <div className="audit-landing relative bg-primary text-white overflow-x-clip" lang={lang}>
        <div aria-hidden className="audit-grain pointer-events-none fixed inset-0 z-[1] opacity-[0.035]" />
        <Header lang={lang} />
        <main className="relative z-[2]">
            <Hero lang={lang} />
            <Marquee lang={lang} />
            <Leaks lang={lang} />
            <How lang={lang} />
            <Work lang={lang} />
            <Profiles lang={lang} />
            <Reviews lang={lang} />
            <Founder lang={lang} />
            <Fit lang={lang} />
            <Faq lang={lang} />
            <Final lang={lang} />
        </main>
        <Footer lang={lang} />
        <StickyCta lang={lang} />
    </div>
);

export default AuditLanding;
