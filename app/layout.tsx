
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '../context/LanguageContext';
import LayoutShell from '../components/LayoutShell';
import Script from "next/script";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xtek AI | AI Agency | Business Automation USA",
  description: "Xtek AI is a premier AI implementation agency based in the USA. We offer SmartFlow AI audits, Executive AI accounting automation, AEO marketing, and Web Design & Development services.",
  keywords: "AI agency USA, Artificial Intelligence consulting, Business automation, SmartFlow AI, Executive AI, AEO optimization, Web Design, Web Development, AI chatbots for business, digital marketing agency",
  icons: {
    icon: "/favicon.png",
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
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-29BT1LZTS0" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-29BT1LZTS0');
          `}
        </Script>

        {/* GSAP */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="beforeInteractive" />

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '783543120904007');
            fbq('track', 'PageView');
          `}
        </Script>

        <LanguageProvider>
          <LayoutShell>
            {children}
          </LayoutShell>
        </LanguageProvider>

        {/* ElevenLabs ConvAI */}
        <div dangerouslySetInnerHTML={{ __html: '<elevenlabs-convai agent-id="agent_8601kgbe8jdvfpc8pdgxzw6wj530"></elevenlabs-convai>' }} />
        <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="lazyOnload" />
      </body>
    </html>
  );
}
