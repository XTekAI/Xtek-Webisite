import type { Metadata } from 'next';
import PageSwitcher from '../components/PageSwitcher';
import JsonLd from '../components/JsonLd';
import { reviewsJsonLd } from '../content/google-reviews';
import { buildMetadata } from '../lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Xtek AI | AI Automation Agency & Business Automation USA',
  description:
    'Xtek AI is a US-based AI implementation agency offering SmartFlow AI audits, Executive AI accounting automation, AEO marketing, and web design.',
  path: '/',
  keywords:
    'AI agency USA, Artificial Intelligence consulting, Business automation, SmartFlow AI, Executive AI, AEO optimization, Web Design, Web Development, AI chatbots for business, digital marketing agency',
});

export default function Page() {
  return (
    <>
      <JsonLd data={reviewsJsonLd()} />
      <PageSwitcher />
    </>
  );
}
