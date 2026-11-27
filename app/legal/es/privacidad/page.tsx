import type { Metadata } from 'next';
import { LANDING_ORIGIN } from '../../../../content/audit-landing';

// The same document as /es/privacidad, served inside the ad landing (landing.xtekai.com) with the landing's minimal
// header, so visitors can read it without reaching the main site's menu. The canonical copy is on www.
export const metadata: Metadata = {
    metadataBase: new URL(LANDING_ORIGIN),
    title: { absolute: 'Política de Privacidad | Xtek AI' },
    alternates: { canonical: 'https://www.xtekai.com/es/privacidad' },
    robots: { index: false, follow: false },
};

export { default } from '../../../es/privacidad/page';
