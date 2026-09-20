"use client";


import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

const Legal: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 px-6 border-t border-white/5 bg-primary/10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        <div id="privacy">
          <h3 className="text-2xl font-bold mb-6 text-primary-light">{t.legal.privacy_title}</h3>
          <div className="space-y-4 text-white/60 text-sm leading-relaxed">
            <p>Your privacy matters to Xtek AI. We collect only the information needed to answer your inquiry and deliver our services.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>We do not sell your personal information for money.</li>
              <li>You can opt out of analytics and advertising cookies at any time with &ldquo;Your Privacy Choices&rdquo;.</li>
              <li>California and other US residents can access, correct or delete their data.</li>
            </ul>
            <Link href="/privacy" className="inline-block text-sky-300 underline underline-offset-2 hover:text-white">Read the full Privacy Policy</Link>
          </div>
        </div>
        <div id="terms">
          <h3 className="text-2xl font-bold mb-6 text-primary-light">{t.legal.terms_title}</h3>
          <div className="space-y-4 text-white/60 text-sm leading-relaxed">
            <p>By engaging with Xtek AI, you agree to our terms of service delivery.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Services are delivered based on the initial strategic audit findings and the agreed proposal.</li>
              <li>Automation agents remain the intellectual property of Xtek AI unless otherwise stated.</li>
              <li>Implementation timelines are subject to business complexity and data availability.</li>
            </ul>
            <Link href="/terms" className="inline-block text-sky-300 underline underline-offset-2 hover:text-white">Read the full Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Legal;
