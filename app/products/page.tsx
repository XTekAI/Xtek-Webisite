import type { Metadata } from 'next';
import ProductsPage from '../../components/ProductsPage';
import JsonLd from '../../components/JsonLd';
import { breadcrumbJsonLd, buildMetadata, collectionPageJsonLd } from '../../lib/seo';

const TITLE = 'Digital Products | Apps for Local Businesses | Xtek AI';
const DESCRIPTION = 'Subscription apps built by Xtek AI for local businesses: MyLoyalink, a loyalty app for Apple Wallet and Google Wallet (from $29/month, 14-day free trial), and a digital menu for restaurants.';

export const metadata: Metadata = buildMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: '/products',
});

export default function Products() {
    return (
        <>
            <JsonLd
                data={[
                    collectionPageJsonLd('Xtek AI Digital Products', DESCRIPTION, '/products'),
                    breadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'Digital Products', path: '/products' },
                    ]),
                ]}
            />
            <ProductsPage />
        </>
    );
}
