
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Legal: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 px-6 border-t border-white/5 bg-primary/10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        <div id="privacy">
          <h3 className="text-2xl font-bold mb-6 text-primary-light">{t.legal.privacy_title}</h3>
          <div className="space-y-4 text-white/40 text-sm leading-relaxed">
            <p>Your privacy is of the utmost importance to Xtek AI. We handle your data with enterprise-grade security protocols and transparency.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Data is processed exclusively for the optimization of your business services.</li>
              <li>We do not share your strategic data with third-party model trainers.</li>
              <li>All information is encrypted end-to-end within our US-based infrastructure.</li>
            </ul>
          </div>
        </div>
        <div id="terms">
          <h3 className="text-2xl font-bold mb-6 text-primary-light">{t.legal.terms_title}</h3>
          <div className="space-y-4 text-white/40 text-sm leading-relaxed">
            <p>By engaging with Xtek AI, you agree to our terms of innovation and service delivery.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Services are delivered based on the initial strategic audit findings.</li>
              <li>Automation agents remain the intellectual property of Xtek AI unless otherwise stated.</li>
              <li>Implementation timelines are subject to business complexity and data availability.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Legal;
