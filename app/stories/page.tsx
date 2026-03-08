import type { Metadata } from 'next';
import SuccessStoriesPage from '../../components/SuccessStoriesPage';

export const metadata: Metadata = {
    title: 'Success Stories | Xtek AI - Real Results for Real Businesses',
    description: 'See how Xtek AI has helped businesses automate workflows, scale marketing, and achieve measurable ROI through AI-powered solutions.',
};

export default function Stories() {
    return <SuccessStoriesPage />;
}
