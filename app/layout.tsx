
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '../context/LanguageContext';
import LayoutShell from '../components/LayoutShell';
import Script from "next/script";
import JsonLd from "../components/JsonLd";
import DeferredScript from "../components/DeferredScript";
import ThirdPartyScripts from "../components/ThirdPartyScripts";
import CookieConsent from "../components/CookieConsent";
import TrackingCapture from "../components/TrackingCapture";
import {
  SITE_URL,
  SITE_NAME,
  OG_IMAGE,
  organizationJsonLd,
  websiteJsonLd,
} from "../lib/seo";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const DEFAULT_TITLE = "Xtek AI | AI Automation Agency & Business Automation USA";
const DEFAULT_DESCRIPTION =
  "Xtek AI is a US-based AI implementation agency offering SmartFlow AI audits, Executive AI accounting automation, AEO marketing, and web design.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: "AI agency USA, Artificial Intelligence consulting, Business automation, SmartFlow AI, Executive AI, AEO optimization, Web Design, Web Development, AI chatbots for business, digital marketing agency",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  // Pages override these through buildMetadata() in lib/seo.ts.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <TrackingCapture />

        {/* GSAP - loaded after hydration; Services.tsx waits until it is available */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="afterInteractive" />

        {/* Google Analytics + Meta Pixel: loaded according to the visitor's privacy choice (lib/consent.ts) */}
        <ThirdPartyScripts />

        <LanguageProvider>
          <LayoutShell>
            {children}
          </LayoutShell>
          <CookieConsent />
        </LanguageProvider>

        {/* ElevenLabs ConvAI */}
        <div dangerouslySetInnerHTML={{ __html: '<elevenlabs-convai agent-id="agent_8601kgbe8jdvfpc8pdgxzw6wj530"></elevenlabs-convai>' }} />
        <DeferredScript src="https://unpkg.com/@elevenlabs/convai-widget-embed" />
      </body>
    </html>
  );
}
