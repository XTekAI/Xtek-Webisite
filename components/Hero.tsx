import React, { lazy, Suspense } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { handleSmoothScroll } from '../lib/utils';
import { MagnetizeButton } from './ui/magnetize-button';
import NeuralBackground from './ui/flow-field-background';

const Hero: React.FC = () => {
  const { t, isLandingMode } = useLanguage();
  const heroContent = isLandingMode ? t.landing.hero : t.hero;

  return (
    <section id="hero" className={`relative min-h-screen flex items-center overflow-hidden ${isLandingMode ? 'pt-40' : 'pt-20'}`}>
      {/* Dynamic Background with Shooting Stars */}
      <div className="absolute inset-0 z-0">
        <NeuralBackground
          color="#A7566A"
          trailOpacity={0.15}
          speed={0.6}
          particleCount={400}
        />
      </div>

      {/* Overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary z-0 pointer-events-none"></div>

      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary-light text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-light"></span>
          </span>
          {heroContent.badge}
        </div>

        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-fade-in-up [animation-delay:200ms] !text-white">
          {heroContent.title_part1} <br />
          <span className="gradient-text">{heroContent.title_part2}</span>
        </h1>

        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/70 mb-12 animate-fade-in-up [animation-delay:400ms]">
          {heroContent.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
          <MagnetizeButton
            onClick={(e) => handleSmoothScroll(e, 'contact')}
            className="w-full sm:w-auto px-8 py-4 bg-primary-light text-white font-bold rounded-full hover:bg-secondary hover:scale-105 transition-all shadow-lg shadow-primary-light/20 flex items-center justify-center gap-2 border-none h-auto"
          >
            {heroContent.cta_primary}
          </MagnetizeButton>
          <a
            href="#services"
            onClick={(e) => handleSmoothScroll(e, 'services')}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-secondary hover:border-secondary transition-all"
          >
            {heroContent.cta_secondary}
          </a>
        </div>

        {/* Floating Visual Element (Abstract AI Representation) */}
        <div className="mt-20 relative mx-auto max-w-5xl animate-float">
          <div className="glass rounded-3xl p-4 md:p-8 aspect-video overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000"
              alt="AI Visual"
              className="w-full h-full object-cover rounded-2xl opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-10 left-10 z-20 text-left">
              <div className="flex items-center gap-2 text-primary-light mb-2">
                <div className="w-8 h-1 bg-primary-light"></div>
                <span className="text-sm font-bold tracking-widest uppercase">{t.hero.visual_caption}</span>
              </div>
              <h3 className="text-3xl font-bold">XTEK AI SOLUTIONS</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
