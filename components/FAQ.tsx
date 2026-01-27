
import React, { useState } from 'react';
import { useLanguage } from '../App';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-primary-light transition-colors group"
      >
        <h3 className="text-lg md:text-xl font-medium pr-8">{question}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-6 h-6 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-white/60 leading-relaxed text-base">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-primary/20">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-primary-light uppercase tracking-widest mb-4 inline-block">
            {t.faq.badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold">{t.faq.title}</h2>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12">
          <FAQItem question={t.faq.q1} answer={t.faq.a1} />
          <FAQItem question={t.faq.q2} answer={t.faq.a2} />
          <FAQItem question={t.faq.q3} answer={t.faq.a3} />
          <FAQItem question={t.faq.q4} answer={t.faq.a4} />
          <FAQItem question={t.faq.q5} answer={t.faq.a5} />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
