"use client";

import Link from 'next/link';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import ClientLogo from './ClientLogo';


const StoryItem: React.FC<{
  title: string;
  client: string;
  result: string;
  logo: string;
}> = ({ title, client, result, logo }) => (
  <div className="glass rounded-[32px] overflow-hidden border border-white/5 group hover:border-primary-light/30 transition-all duration-500">
    <div className="h-60 relative overflow-hidden bg-gradient-to-br from-white/[0.06] to-primary flex items-center justify-center pb-8">
      <ClientLogo logo={logo} client={client} size="w-32 h-32" className="transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute bottom-5 left-6">
        <span className="text-xs font-bold text-primary-light uppercase tracking-widest">{client}</span>
      </div>
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-4 leading-tight !text-white">{title}</h3>
      <div className="flex items-center gap-3 text-secondary">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        <span className="font-bold text-lg">{result}</span>
      </div>
    </div>
  </div>
);

const CaseStudyDetail: React.FC<{
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  logo: string;
  tags: string[];
}> = ({ title, client, challenge, solution, result, logo, tags }) => (
  <div className="glass rounded-[40px] overflow-hidden mb-12 border border-white/5 group">
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative min-h-[300px] lg:min-h-[420px] overflow-hidden bg-gradient-to-br from-white/[0.06] to-primary flex items-center justify-center pb-24">
        <ClientLogo logo={logo} client={client} size="w-44 h-44" className="transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute bottom-8 left-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-primary-light/30 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-widest">{tag}</span>
            ))}
          </div>
          <h3 className="text-2xl font-bold">{client}</h3>
        </div>
      </div>
      <div className="p-8 lg:p-12">
        <h2 className="text-primary-light font-bold uppercase tracking-widest text-xs mb-4">Deep Dive</h2>
        <h3 className="text-2xl font-bold mb-6 leading-tight !text-white">{title}</h3>
        <div className="space-y-6 text-sm">
          <div>
            <h4 className="text-secondary font-bold mb-1">Challenge</h4>
            <p className="text-white/60 leading-relaxed">{challenge}</p>
          </div>
          <div>
            <h4 className="text-primary-light font-bold mb-1">Solution</h4>
            <p className="text-white/60 leading-relaxed">{solution}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border-l-4 border-primary-light">
            <h4 className="text-white font-bold mb-1">Impact</h4>
            <p className="text-lg font-bold text-primary-light">{result}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SuccessStories: React.FC = () => {
  const { t, isLandingMode } = useLanguage();
  return (
    <section id="success-stories" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="text-sm font-bold text-primary-light uppercase tracking-widest mb-4 inline-block">
              {t.testimonials.badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight !text-white">
              {t.testimonials.title}
            </h2>
          </div>
          <p className="text-white/40 text-lg max-w-sm">
            {t.testimonials.detailed_cases_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {t.testimonials.stories.map((story: any, index: number) => (
            <StoryItem
              key={index}
              title={story.title}
              client={story.client}
              result={story.result}
              logo={story.logo}
            />
          ))}
        </div>

        {!isLandingMode && (
          <div className="text-center mb-20">
            <Link href="/stories"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-3 text-white/60 hover:text-primary-light font-bold text-lg transition-colors group"
            >
              {t.testimonials.view_all}
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}

        <div id="detailed-cases" className="pt-20">
          <h3 className="text-3xl font-bold mb-12 text-center gradient-text">{t.testimonials.detailed_cases_title}</h3>

          {t.testimonials.detailed_cases.map((caseStudy: any, index: number) => (
            <CaseStudyDetail
              key={index}
              title={caseStudy.title}
              client={caseStudy.client}
              challenge={caseStudy.challenge}
              solution={caseStudy.solution}
              result={caseStudy.result}
              logo={caseStudy.logo}
              tags={caseStudy.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
