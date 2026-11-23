import type { Metadata } from 'next';
import PageSwitcher from '../components/PageSwitcher';
import JsonLd from '../components/JsonLd';
import { reviewsJsonLd } from '../content/google-reviews';
import { buildMetadata } from '../lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Xtek AI | AI Automation Agency in New Jersey & Nationwide',
  description:
    'Xtek AI is a New Jersey AI automation agency building AI agents, workflow automation, websites and AEO marketing for NJ, NYC, Philadelphia and beyond.',
  path: '/',
});

export default function Page() {
  return (
    <>
      <JsonLd data={reviewsJsonLd()} />
      <PageSwitcher />
    </>
  );
}
