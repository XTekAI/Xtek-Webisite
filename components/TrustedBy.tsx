
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const TrustedBy: React.FC = () => {
  const { t } = useLanguage();
  const companies = [
    "TechGlobal", "Nexus Systems", "CloudScale", "Visionary Corp", "InnovateHQ", "DigitalFlow"
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-white/40 text-sm font-bold uppercase tracking-[0.2em] mb-12">
          {t.trusted}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center opacity-50">
          {companies.map((company, i) => (
            <div key={i} className="flex justify-center text-2xl font-black italic tracking-tighter text-white/80 grayscale hover:grayscale-0 transition-all cursor-default">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
