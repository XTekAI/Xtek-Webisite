"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LEGAL_PATHS } from '../content/legal';
import { useLandingBackHref } from './AuditLegalShell';

// Every legal page (both languages) has a copy at the same path under /legal on the ad landing.
const LEGAL_SET = new Set<string>([...Object.values(LEGAL_PATHS.en), ...Object.values(LEGAL_PATHS.es)]);

/**
 * Internal link on a legal page. On the ad landing's copies (/legal/*) links to the other policies stay
 * inside /legal/, and any other page (home included) goes back to the landing, never to the main site.
 */
const LegalLink: React.FC<{ href: string; className?: string; children: React.ReactNode }> = ({ href, className, children }) => {
    const pathname = usePathname() ?? '';
    const back = useLandingBackHref();
    if (!pathname.startsWith('/legal/')) return <Link href={href} className={className}>{children}</Link>;
    const [path, hash = ''] = href.split('#');
    const target = LEGAL_SET.has(path) ? `/legal${path}${hash ? `#${hash}` : ''}` : back;
    return <a href={target} className={className}>{children}</a>;
};

export default LegalLink;
