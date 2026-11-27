"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AUDIT_LEGAL } from '../content/audit-landing';
import { useLandingBackHref } from './AuditLegalShell';

const LANDING_MAP: Record<string, string> = { '/privacy': AUDIT_LEGAL.privacy, '/terms': AUDIT_LEGAL.terms, '/sms-terms': AUDIT_LEGAL.sms };

/**
 * Internal link on a legal page. On the ad landing's copies (/legal/*) links to the other policies stay
 * inside /legal/, and any other page (home included) goes back to the landing, never to the main site.
 */
const LegalLink: React.FC<{ href: string; className?: string; children: React.ReactNode }> = ({ href, className, children }) => {
    const pathname = usePathname() ?? '';
    const back = useLandingBackHref();
    if (!pathname.startsWith('/legal/')) return <Link href={href} className={className}>{children}</Link>;
    const [path, hash = ''] = href.split('#');
    const target = LANDING_MAP[path] ? LANDING_MAP[path] + (hash ? `#${hash}` : '') : back;
    return <a href={target} className={className}>{children}</a>;
};

export default LegalLink;
