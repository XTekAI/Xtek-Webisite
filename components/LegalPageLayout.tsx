import Link from 'next/link';
import { CONTACT } from '../lib/seo';

interface LegalPageLayoutProps {
    title: string;
    intro: string;
    points: string[];
    otherPage: { href: string; label: string };
}

/** Standalone page for the privacy / terms text that also appears on the home page. */
export default function LegalPageLayout({ title, intro, points, otherPage }: LegalPageLayoutProps) {
    return (
        <div className="pt-40 pb-24 px-6 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/40">
                    <Link href="/" className="hover:text-primary-light transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-white/70">{title}</span>
                </nav>

                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-primary-light">{title}</h1>

                <div className="glass rounded-[32px] border border-white/5 p-8 md:p-12 space-y-6 text-white/60 leading-relaxed">
                    <p>{intro}</p>
                    <ul className="list-disc pl-5 space-y-3">
                        {points.map((point) => (
                            <li key={point}>{point}</li>
                        ))}
                    </ul>
                    <p>
                        Questions? Contact us at{' '}
                        <a href={`mailto:${CONTACT.email}`} className="text-primary-light hover:underline">{CONTACT.email}</a>{' '}
                        or <a href="tel:6099126800" className="text-primary-light hover:underline">609 912 6800</a>.
                    </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-6 text-sm">
                    <Link href={otherPage.href} className="text-primary-light hover:underline">{otherPage.label}</Link>
                    <Link href="/" className="text-white/50 hover:text-white transition-colors">Back to home</Link>
                </div>
            </div>
        </div>
    );
}
