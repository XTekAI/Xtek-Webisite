
import React, { useLayoutEffect, useRef } from 'react';
import { useLanguage } from '../App';

const ServiceLayer: React.FC<{
  title: string;
  description: string;
  items: string[];
  icon: React.ReactNode;
  index: number;
  isLast?: boolean;
}> = ({ title, description, items, icon, index, isLast }) => {
  return (
    <div
      className="service-layer absolute inset-0 flex flex-col items-center justify-center opacity-0 px-6"
      style={{ zIndex: 10 + index }}
    >
      <div className="max-w-4xl w-full glass rounded-[40px] p-8 md:p-16 border-t border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2">
            <div className="w-16 h-16 bg-primary-light/20 text-primary-light rounded-2xl flex items-center justify-center mb-8">
              {icon}
            </div>
            <h3 className="text-2xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">{title}</h3>
            <p className="text-xl text-white/60 leading-relaxed mb-8">{description}</p>
          </div>
          <div className="w-full md:w-1/2 bg-white/5 rounded-3xl p-8 border border-white/5">
            <h4 className="text-sm font-bold uppercase tracking-widest text-primary-light mb-6">Key Focus Areas</h4>
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

  useLayoutEffect(() => {
    const { gsap } = window as any;
    const { ScrollTrigger } = window as any;
    gsap.registerPlugin(ScrollTrigger);

    const layers = gsap.utils.toArray('.service-layer');

    // Create the main pinning timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: () => `+=${layers.length * 100}%`, // Sufficient scroll space
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      }
    });

    layers.forEach((layer: any, i: number) => {
      // Fade in and move up
      tl.to(layer, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut"
      });

      // If not the last layer, fade it out to reveal the next one
      if (i < layers.length - 1) {
        tl.to(layer, {
          opacity: 0,
          scale: 0.9,
          y: -50,
          duration: 1,
          ease: "power2.inOut"
        }, "+=0.5"); // Pause briefly while visible
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  return (
    <section id="services" ref={mainRef} className="relative h-screen bg-primary overflow-hidden">
      {/* Dynamic Background (Inkwell style) */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary-light/5 to-primary pointer-events-none"></div>

      {/* Progress Indicator Side (Optional decorative) */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-50">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="w-1 h-8 bg-white/10 rounded-full overflow-hidden">
            <div className="w-full h-full bg-primary-light origin-top scale-y-0 transition-transform duration-500"></div>
          </div>
        ))}
      </div>

      <div className="relative h-full w-full">
        {/* Intro Header (Visible before first layer) */}
        <div className="absolute top-20 left-0 w-full text-center px-6 z-40">
          <span className="text-sm font-bold text-secondary uppercase tracking-widest mb-4 inline-block">{t.services.badge}</span>
        </div>

        <div ref={layersContainerRef} className="relative h-full w-full">
          <ServiceLayer
            index={0}
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            title={t.services.s1_title}
            description={t.services.s1_desc}
            items={t.services.s1_items}
          />
          <ServiceLayer
            index={1}
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            title={t.services.s2_title}
            description={t.services.s2_desc}
            items={t.services.s2_items}
          />
          <ServiceLayer
            index={2}
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
            title={t.services.s3_title}
            description={t.services.s3_desc}
            items={t.services.s3_items}
          />
          <ServiceLayer
            index={3}
            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
            title={t.services.s4_title}
            description={t.services.s4_desc}
            items={t.services.s4_items}
          />

          {/* Last specialized CTA layer */}
          <div className="service-layer absolute inset-0 flex flex-col items-center justify-center opacity-0 px-6 z-[20]">
            <div className="max-w-4xl w-full glass rounded-[40px] p-12 md:p-20 border-t border-secondary/30 text-center flex flex-col items-center shadow-2xl">
              <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mb-8 animate-pulse">
                <svg className="w-12 h-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-3xl md:text-6xl font-bold mb-6 tracking-tight">{t.services.custom_title}</h3>
              <p className="text-xl text-white/60 mb-12 max-w-2xl">{t.services.custom_desc}</p>
              <a
                href="#contact"
                className="px-12 py-5 bg-secondary text-white rounded-full text-xl font-bold hover:bg-secondary/90 hover:scale-105 transition-all shadow-xl shadow-secondary/30"
              >
                {t.services.custom_cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
