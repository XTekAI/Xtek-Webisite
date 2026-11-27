import type { Metadata } from 'next';
import { LANDING_ORIGIN } from '../../../content/audit-landing';

// The same document as /sms-terms, served inside the ad landing (landing.xtekai.com) with the landing's minimal
// header, so visitors can read it without reaching the main site's menu. The canonical copy is on www.
export const metadata: Metadata = {
    metadataBase: new URL(LANDING_ORIGIN),
    title: { absolute: 'SMS Terms and Messaging Policy | Xtek AI' },
    alternates: { canonical: 'https://www.xtekai.com/sms-terms' },
    robots: { index: false, follow: false },
};

export { default } from '../../sms-terms/page';
