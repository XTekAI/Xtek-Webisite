import type { Metadata } from 'next';
import NotFoundView from '../views/NotFoundView';

export const metadata: Metadata = {
    title: 'Page Not Found | Xtek AI',
    description: 'This page does not exist. Go back to Xtek AI, the New Jersey AI automation agency.',
    robots: { index: false, follow: true },
};

// Next.js serves this for every unknown URL with a real 404 status, so search engines don't index it.
export default function NotFound() {
    return <NotFoundView />;
}
