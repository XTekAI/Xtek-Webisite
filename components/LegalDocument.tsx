import React from 'react';
import Link from 'next/link';
import { LEGAL } from '../content/legal';

export interface LegalSection {
    id: string;
    title: string;
    body: React.ReactNode;
}

// ---- Small building blocks used by the policy text -------------------------

export const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-white/75 leading-relaxed">{children}</p>
);

export const UL: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ul className="list-disc pl-6 space-y-2 text-white/75 leading-relaxed marker:text-sky-300">{children}</ul>
);

export const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-lg font-bold text-white pt-2">{children}</h3>
);

export const A: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
    const className = 'text-sky-300 underline underline-offset-2 hover:text-white';
    if (href.startsWith('/')) return <Link href={href} className={className}>{children}</Link>;
    if (href.startsWith('mailto:') || href.startsWith('tel:')) return <a href={href} className={className}>{children}</a>;
    return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
};

export const Table: React.FC<{ head: string[]; rows: React.ReactNode[][] }> = ({ head, rows }) => (
    <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-white">
                <tr>
                    {head.map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 font-bold align-bottom">{h}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="text-white/75">
                {rows.map((row, i) => (
                    <tr key={i} className="border-t border-white/10 align-top">
                        {row.map((cell, j) => (
                            <td key={j} className="px-4 py-3 leading-relaxed">{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

// ---- Page layout -----------------------------------------------------------

interface LegalDocumentProps {
    title: string;
    intro: React.ReactNode;
    sections: LegalSection[];
    otherPage: { href: string; label: string };
}

/** Long-form legal page: breadcrumb, effective date, table of contents and numbered sections. */
export default function LegalDocument({ title, intro, sections, otherPage }: LegalDocumentProps) {
    return (
        <div className="pt-40 pb-24 px-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/55">
                    <Link href="/" className="hover:text-primary-light transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-white/80">{title}</span>
                </nav>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{title}</h1>
                <p className="text-white/60 mb-8">
                    <strong className="text-white/80">Effective date:</strong>{' '}
                    <time dateTime={LEGAL.lastUpdatedIso}>{LEGAL.effectiveDate}</time>
                    <span className="mx-2">·</span>
                    <strong className="text-white/80">Last updated:</strong>{' '}
                    <time dateTime={LEGAL.lastUpdatedIso}>{LEGAL.effectiveDate}</time>
                </p>

                <div className="glass rounded-[32px] border border-white/5 p-8 md:p-12 mb-10 space-y-4">{intro}</div>

                <nav aria-labelledby="toc-heading" className="glass rounded-[32px] border border-white/5 p-8 md:p-10 mb-12">
                    <h2 id="toc-heading" className="text-xl font-bold mb-5 text-white">Contents</h2>
                    <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-decimal pl-5 text-white/75 marker:text-sky-300">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <a href={`#${section.id}`} className="hover:text-primary-light underline-offset-2 hover:underline">{section.title}</a>
                            </li>
                        ))}
                    </ol>
                </nav>

                <div className="space-y-12">
                    {sections.map((section, index) => (
                        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-32">
                            <h2 id={`${section.id}-heading`} className="text-2xl md:text-3xl font-bold text-white mb-5">
                                <span className="text-sky-300 mr-2">{index + 1}.</span>
                                {section.title}
                            </h2>
                            <div className="space-y-4">{section.body}</div>
                        </section>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-sm">
                    <Link href={otherPage.href} className="text-sky-300 underline underline-offset-2 hover:text-white">{otherPage.label}</Link>
                    <Link href="/" className="text-white/60 hover:text-white transition-colors">Back to home</Link>
                </div>
            </div>
        </div>
    );
}
