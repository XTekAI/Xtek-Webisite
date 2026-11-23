"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { MagnetizeButton } from './ui/magnetize-button';
import { scrollToSection } from '../lib/navigation';

/**
 * Site-wide call-to-action button with the same look and particle effect as the home hero button.
 * href "#id" scrolls to that section on the current page (falls back to the home page section),
 * "http..." opens in a new tab, anything else navigates inside the site.
 */
const PRIMARY =
    'w-full sm:w-auto px-8 py-4 bg-primary-light !text-white font-bold rounded-full hover:bg-secondary hover:scale-105 transition-all shadow-lg shadow-primary-light/20 flex items-center justify-center gap-2 border-none h-auto';
const SECONDARY =
    'w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 !text-white font-bold rounded-full border border-white/10 hover:bg-secondary hover:border-secondary transition-all';

const CtaButton: React.FC<{ href?: string; variant?: 'primary' | 'secondary'; arrow?: boolean; className?: string; onClick?: () => void; children: React.ReactNode }> = ({
    href = '#contact',
    variant = 'primary',
    arrow = true,
    className = '',
    onClick,
    children,
}) => {
    const router = useRouter();
    const go = (e: React.MouseEvent) => {
        e.preventDefault();
        onClick?.();
        if (href.startsWith('#')) {
            const id = href.slice(1);
            if (!scrollToSection(id)) router.push(`/${href}`);
        } else if (/^https?:\/\//.test(href)) {
            window.open(href, '_blank', 'noopener,noreferrer');
        } else {
            router.push(href);
        }
    };

    if (variant === 'secondary') {
        return (
            <a href={href} onClick={go} className={`${SECONDARY} ${className}`}>
                {children}
                {arrow && <ArrowRight className="w-4 h-4" />}
            </a>
        );
    }
    return (
        <MagnetizeButton onClick={go} className={`${PRIMARY} ${className}`}>
            <span className="inline-flex items-center gap-2">
                {children}
                {arrow && <ArrowRight className="w-4 h-4" />}
            </span>
        </MagnetizeButton>
    );
};

export default CtaButton;
