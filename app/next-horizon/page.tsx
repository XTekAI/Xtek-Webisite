import type { Metadata } from 'next';
import NextHorizon from '../../views/NextHorizon';
import JsonLd from '../../components/JsonLd';
import { breadcrumbJsonLd, buildMetadata, nextHorizonJsonLd } from '../../lib/seo';

const DESCRIPTION = 'Closed-loop internal platform for government, healthcare and corporate teams: departmental silos, private AI and unified meetings behind your firewall.';

export const metadata: Metadata = buildMetadata({
    title: 'Next Horizon | Secure Internal AI Platform | Xtek AI',
    description: DESCRIPTION,
    path: '/next-horizon',
    keywords: 'secure internal platform, departmental silos, private AI, HIPAA compliant, CJIS compliant, government IT, healthcare data security, enterprise communication, internal fortress, closed-loop security',
});

export default function NextHorizonPage() {
    return (
        <>
            <JsonLd
                data={[
                    nextHorizonJsonLd(DESCRIPTION),
                    breadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'Next Horizon', path: '/next-horizon' },
                    ]),
                ]}
            />
            <NextHorizon />
        </>
    );
}
