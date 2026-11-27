import type { Metadata } from 'next';
import { LANDING_ORIGIN } from '../../../content/audit-landing';

// The same document as /privacy, served inside the ad landing (landing.xtekai.com) with the landing's minimal
// header, so visitors can read it without reaching the main site's menu. The canonical copy is on www.
export const metadata: Metadata = {
    metadataBase: new URL(LANDING_ORIGIN),
    title: { absolute: 'Privacy Policy | Xtek AI' },
    alternates: { canonical: 'https://www.xtekai.com/privacy' },
    robots: { index: false, follow: false },
};

export { default } from '../../privacy/page';
