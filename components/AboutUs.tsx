
import React from 'react';
import { useLanguage } from '../App';

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-4xl md:text-5xl font-bold text-primary-light mb-2">{value}</div>
    <div className="text-sm uppercase tracking-widest text-white/40 font-bold">{label}</div>
  </div>
);

const AboutUs: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-24 md:py-32 px-6 relative overflow-hidden bg-primary/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-sm font-bold text-secondary uppercase tracking-widest mb-6 inline-block">
            {t.about.badge}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {t.about.title} <span className="italic font-serif text-primary-light">{t.about.title_italic}</span>
          </h2>
          <div className="space-y-6 text-xl text-white/60 leading-relaxed">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10">
            <StatCard value={t.about.stat1_val} label={t.about.stat1_label} />
            <StatCard value={t.about.stat2_val} label={t.about.stat2_label} />
            <StatCard value={t.about.stat3_val} label={t.about.stat3_label} />
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square glass rounded-[60px] overflow-hidden rotate-3 relative z-10">
             <img 
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
               alt="Team Working" 
               className="w-full h-full object-cover grayscale opacity-60"
             />
          </div>
          {/* Decorative shapes */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-light/10 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/10 blur-3xl rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-[80px] -rotate-6"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
