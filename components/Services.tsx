"use client";


import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MagnetizeButton } from './ui/magnetize-button';
import CtaButton from './CtaButton';
import { serviceByHomeIndex } from '../content/services';
import { saveServicesReturn, takeServicesReturn } from '../lib/serviceReturn';

// Every card is a layer stacked on the same spot; GSAP pins the section and fades one layer into the
// next as you scroll (on phones too, with mobile fixes below). On phones the card is kept short (title,
// short description, "Learn more") so it fits one screen; the full detail lives on each service page.
const LAYER_CLASS =
  'service-layer absolute inset-0 flex flex-col items-center justify-center invisible opacity-0 px-4 pt-20 md:pt-0 md:px-6';

const ServiceLayer: React.FC<{
  title: string;
  description: string;
  items: string[];
  icon: React.ReactNode;
  index: number;
  href?: string;
  learnMore: string;
}> = ({ title, description, items, icon, index, href, learnMore }) => {
  return (
    <div className={LAYER_CLASS} style={{ zIndex: 10 + index }}>
      <div className="max-w-4xl w-full glass rounded-3xl md:rounded-[40px] p-6 md:p-16 border-t border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-light/20 text-primary-light rounded-2xl flex items-center justify-center mb-5 md:mb-8">
              {icon}
            </div>
            <h3 className="text-2xl md:text-5xl font-bold mb-3 md:mb-6 tracking-tight leading-tight !text-white">{title}</h3>
            <p className="text-base md:text-xl text-white/60 leading-relaxed mb-6 md:mb-8 line-clamp-3 md:line-clamp-none">{description}</p>
            {href && (
              <CtaButton href={href} onClick={() => saveServicesReturn(index)} className="!px-6 !py-3">
                {learnMore}
              </CtaButton>
            )}
          </div>
          <div className="hidden md:block w-full md:w-1/2 bg-white/5 rounded-3xl p-8 border border-white/5">
            <p className="text-sm font-bold uppercase tracking-widest text-primary-light mb-6">Key Focus Areas</p>
            <ul className="space-y-4">
              {items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lg text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-light"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const { t } = useLanguage();
  const mainRef = useRef<HTMLDivElement>(null);
  const layersContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // GSAP loads after hydration (afterInteractive), so wait for it instead of
  // blocking the page on the CDN scripts.
  const [gsapReady, setGsapReady] = useState(false);


  useEffect(() => {
    const isReady = () => Boolean((window as any).gsap && (window as any).ScrollTrigger);
    if (isReady()) {
      setGsapReady(true);
      return;
    }
    const poll = setInterval(() => {
      if (isReady()) {
        clearInterval(poll);
        setGsapReady(true);
      }
    }, 50);
    return () => clearInterval(poll);
  }, []);

  useLayoutEffect(() => {
    if (!gsapReady) return;
    const { gsap } = window as any;
    const { ScrollTrigger } = window as any;
    gsap.registerPlugin(ScrollTrigger);

    const layers = gsap.utils.toArray('.service-layer');

    // Use matchMedia to create responsive animations
    const mm = gsap.matchMedia();

    // Context for logic that applies to BOTH (or we define specific overrides)
    // We want the same visual effect (pinning + fading) on both, just faster on mobile.

    // Helper to setup the timeline
    const setupTimeline = (isMobile: boolean) => {
      const scrollDistance = isMobile ? layers.length * 45 : layers.length * 100;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: () => `+=${scrollDistance}%`,
          pin: true,
          pinSpacing: true,
          scrub: isMobile ? 0.3 : 1, // Much faster response on mobile for smoother feel
          anticipatePin: isMobile ? 0 : 1, // Disable anticipatePin on mobile to prevent jank
          invalidateOnRefresh: true, // Recalculate on resize/orientation change
        }
      });

      layers.forEach((layer: any, i: number) => {
        // autoAlpha (not just opacity) also toggles visibility, so hidden cards cannot sit on top of
        // the visible one and swallow taps/clicks on its "Learn more" button.
        tl.to(layer, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.inOut"
        });
        // The moment this card is fully visible (used to come back to it from a service page).
        tl.addLabel(`card${i}`);

        if (i < layers.length - 1) {
          tl.to(layer, {
            autoAlpha: 0,
            scale: isMobile ? 0.95 : 0.9, // Subtler scale on mobile
            y: isMobile ? -20 : -50, // Less movement on mobile
            duration: 1,
            ease: "power2.inOut"
          }, "+=0.3");
        }
      });
      return tl;
    };

    // Coming back (browser Back) from a service page: jump straight to the card the visitor left from.
    const restoreCard = (tl: any) => {
      const cardIndex = takeServicesReturn();
      if (cardIndex === null) return;
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        const st = tl.scrollTrigger;
        const label = tl.labels[`card${cardIndex}`];
        if (!st || label === undefined) return;
        // A bit past the label so the card is settled, not still fading in.
        const progress = Math.min(1, (label + 0.15) / tl.duration());
        const y = st.start + progress * (st.end - st.start);
        window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
        st.update();
        st.getTween?.()?.progress(1); // skip the scrub catch-up so cards do not flash by
        tl.progress(progress);
      });
    };

    mm.add("(min-width: 768px)", () => {
      restoreCard(setupTimeline(false));
    });

    // Phones: same pinned effect, tuned for touch. ignoreMobileResize stops the address bar (which
    // changes the viewport height) from re-calculating the pin mid-scroll; normalizeScroll takes over
    // touch scrolling so momentum does not fight the pinned section.
    mm.add("(max-width: 767px)", () => {
      ScrollTrigger.config({ ignoreMobileResize: true });
      ScrollTrigger.normalizeScroll(true);
      restoreCard(setupTimeline(true));
      return () => ScrollTrigger.normalizeScroll(false);
    });

    return () => {
      mm.revert();
    };
  }, [gsapReady]);

  return (
    <section id="services" ref={mainRef} className="relative h-[100svh] md:h-screen bg-primary overflow-hidden">
      {/* Dynamic Background (Inkwell style) */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light/5 to-primary pointer-events-none"></div>

      {/* Progress Indicator Side (Optional decorative) */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-50">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-1 h-8 bg-white/10 rounded-full overflow-hidden">
            <div className="w-full h-full bg-primary-light origin-top scale-y-0 transition-transform duration-500"></div>
          </div>
        ))}
      </div>

      <div className="relative h-full w-full">
        {/* Intro Header (Visible before first layer) */}
        <div ref={titleRef} className="absolute top-24 md:top-20 left-0 w-full text-center px-6 z-40">
          <span className="text-sm font-bold text-secondary uppercase tracking-widest mb-4 inline-block">{t.services.badge}</span>
        </div>

        <div ref={layersContainerRef} className="relative h-full w-full">
          <ServiceLayer
            index={0}
            href={`/services/${serviceByHomeIndex(1)?.slug}`}
            learnMore={t.services.learn_more}
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            title={t.services.s1_title}
            description={t.services.s1_desc}
            items={t.services.s1_items}
          />
          <ServiceLayer
            index={1}
            href={`/services/${serviceByHomeIndex(2)?.slug}`}
            learnMore={t.services.learn_more}
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title={t.services.s2_title}
            description={t.services.s2_desc}
            items={t.services.s2_items}
          />
          <ServiceLayer
            index={2}
            href={`/services/${serviceByHomeIndex(3)?.slug}`}
            learnMore={t.services.learn_more}
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
            title={t.services.s3_title}
            description={t.services.s3_desc}
            items={t.services.s3_items}
          />
          <ServiceLayer
            index={3}
            href={`/services/${serviceByHomeIndex(4)?.slug}`}
            learnMore={t.services.learn_more}
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
            title={t.services.s4_title}
            description={t.services.s4_desc}
            items={t.services.s4_items}
          />
          <ServiceLayer
            index={4}
            href={`/services/${serviceByHomeIndex(5)?.slug}`}
            learnMore={t.services.learn_more}
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
            title={t.services.s5_title}
            description={t.services.s5_desc}
            items={t.services.s5_items}
          />
          <ServiceLayer
            index={5}
            href={`/services/${serviceByHomeIndex(6)?.slug}`}
            learnMore={t.services.learn_more}
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>}
            title={t.services.s6_title}
            description={t.services.s6_desc}
            items={t.services.s6_items}
          />

          {/* Last specialized CTA layer */}
          <div className={`${LAYER_CLASS} z-[30]`}>
            <div className="max-w-4xl w-full glass rounded-3xl md:rounded-[40px] p-8 md:p-20 border-t border-secondary/30 text-center flex flex-col items-center shadow-2xl">
              <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mb-8 animate-pulse">
                <svg className="w-12 h-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight !text-white">{t.services.custom_title}</h3>
              <p className="text-xl text-white/60 mb-12 max-w-2xl">{t.services.custom_desc}</p>
              <MagnetizeButton
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-12 py-5 bg-secondary text-white rounded-full text-xl font-bold hover:bg-secondary/90 hover:scale-105 transition-all shadow-xl shadow-secondary/30 border-none h-auto"
              >
                {t.services.custom_cta}
              </MagnetizeButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
