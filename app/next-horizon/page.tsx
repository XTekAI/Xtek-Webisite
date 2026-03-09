import type { Metadata } from 'next';
import NextHorizon from '../../views/NextHorizon';

export const metadata: Metadata = {
    title: 'Next Horizon | Secure Internal AI & Communication Platform | Xtek AI',
    description: 'Next Horizon is a closed-loop internal platform for government, healthcare, and corporate environments. Departmental silos, private AI, unified meetings — all behind your firewall.',
    keywords: 'secure internal platform, departmental silos, private AI, HIPAA compliant, CJIS compliant, government IT, healthcare data security, enterprise communication, internal fortress, closed-loop security',
    openGraph: {
        title: 'Next Horizon | Your Organization\'s Internal Fortress',
        description: 'Replace insecure email chains with departmentally siloed, internally hosted infrastructure — purpose-built for high-stakes environments.',
        type: 'website',
    },
};

export default function NextHorizonPage() {
    return <NextHorizon />;
}
