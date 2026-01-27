
import React from 'react';
import { useLanguage, handleSmoothScroll } from '../App';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative pt-24 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-light/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary-light text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-light"></span>
          </span>
          {t.hero.badge}
        </div>

        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 animate-fade-in-up [animation-delay:200ms]">
          {t.hero.title_part1} <br />
          <span className="gradient-text">{t.hero.title_part2}</span>
        </h1>

        <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/70 mb-12 animate-fade-in-up [animation-delay:400ms]">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:600ms]">
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, 'contact')}
            className="w-full sm:w-auto px-8 py-4 bg-primary-light text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-primary-light/20 flex items-center justify-center gap-2"
          >
            {t.hero.cta_primary}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          <a
            href="#services"
            onClick={(e) => handleSmoothScroll(e, 'services')}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-colors"
          >
            {t.hero.cta_secondary}
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
