"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Briefcase, Layers, MapPin, Newspaper, Sparkles } from 'lucide-react';
import LiquidBackdrop from '../components/LiquidBackdrop';
import CtaButton from '../components/CtaButton';

const REDIRECT_SECONDS = 15;

const LINKS = [
    { href: '/#services', label: 'Services', text: 'What we build for your business', icon: Layers },
    { href: '/solutions', label: 'Solutions', text: 'AI receptionist, booking, follow-up and more', icon: Sparkles },
    { href: '/industries', label: 'Industries', text: 'Studios, shops, contractors and practices', icon: Briefcase },
    { href: '/service-areas', label: 'Service areas', text: 'New Jersey, NYC, Philadelphia and nationwide', icon: MapPin },
    { href: '/blog', label: 'Blog', text: 'Guides on AI automation for small businesses', icon: Newspaper },
];

/** Branded 404: explains what happened, offers the main sections and returns to the home page on its own. */
const NotFoundView: React.FC = () => {
    const router = useRouter();
    const [seconds, setSeconds] = useState(REDIRECT_SECONDS);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        if (seconds <= 0) {
            router.replace('/');
            return;
        }
        const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
        return () => clearTimeout(id);
    }, [seconds, paused, router]);

    return (
        <div className="relative isolate min-h-[100svh] pt-32 pb-24 px-6 max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
            <LiquidBackdrop />

            <div className="relative mb-8 select-none" aria-hidden="true">
                <span className="block text-[9rem] md:text-[13rem] font-bold leading-none gradient-text tracking-tight">404</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/favicon.svg" alt="" width={72} height={72} className="absolute -top-2 -right-6 md:-right-10 w-14 md:w-20 h-auto animate-float drop-shadow-[0_0_25px_rgba(5,123,163,0.6)]" />
            </div>

            <p className="text-sm font-semibold tracking-wider text-primary-light uppercase mb-4">Page not found</p>
            <h1 className="text-3xl md:text-5xl font-bold mb-5 max-w-3xl leading-tight">
                This page took a{' '}
                <span className="font-serif italic font-medium text-accent">wrong turn</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed">
                The link may be old or the page may have moved. Our automations never miss a lead, so let&apos;s get you
                back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
                <CtaButton href="/">Back to the home page</CtaButton>
                <CtaButton href="/#contact" variant="secondary">Talk to us</CtaButton>
            </div>

            <p className="text-sm text-white/50 mb-16" aria-live="polite">
                {paused ? (
                    'Automatic redirect paused.'
                ) : (
                    <>
                        Taking you to the home page in <span className="font-bold text-accent">{seconds}</span> s ·{' '}
                        <button type="button" onClick={() => setPaused(true)} className="underline underline-offset-2 hover:text-accent">
                            stay here
                        </button>
                    </>
                )}
            </p>

            <nav aria-label="Popular pages" className="w-full grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {LINKS.map(({ href, label, text, icon: Icon }) => (
                    <Link key={href} href={href} className="liquid-glass p-6 text-left group">
                        <Icon className="w-6 h-6 text-primary-light mb-3" />
                        <span className="block font-semibold mb-1 group-hover:text-accent transition-colors">{label}</span>
                        <span className="block text-sm text-white/55 mb-3">{text}</span>
                        <span className="text-xs text-primary-light inline-flex items-center gap-1">
                            Go <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default NotFoundView;
