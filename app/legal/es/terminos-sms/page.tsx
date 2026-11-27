import type { Metadata } from 'next';
import { LANDING_ORIGIN } from '../../../../content/audit-landing';

// The same document as /es/terminos-sms, served inside the ad landing (landing.xtekai.com) with the landing's minimal
// header, so visitors can read it without reaching the main site's menu. The canonical copy is on www.
export const metadata: Metadata = {
    metadataBase: new URL(LANDING_ORIGIN),
    title: { absolute: 'Términos de SMS y política de mensajes | Xtek AI' },
    alternates: { canonical: 'https://www.xtekai.com/es/terminos-sms' },
    robots: { index: false, follow: false },
};

export { default } from '../../../es/terminos-sms/page';
