
import React from 'react';
import { useLanguage, handleSmoothScroll } from '../App';

const StoryItem: React.FC<{
  title: string;
  client: string;
  result: string;
  image: string;
}> = ({ title, client, result, image }) => (
  <div className="glass rounded-[32px] overflow-hidden border border-white/5 group hover:border-primary-light/30 transition-all duration-500">
    <div className="h-64 relative overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent"></div>
      <div className="absolute bottom-6 left-6">
        <span className="text-xs font-bold text-primary-light uppercase tracking-widest">{client}</span>
      </div>
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-4 leading-tight">{title}</h3>
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
  image: string;
  tags: string[];
}> = ({ title, client, challenge, solution, result, image, tags }) => (
  <div className="glass rounded-[40px] overflow-hidden mb-12 border border-white/5 group">
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative h-64 lg:h-auto overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
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
        <h3 className="text-2xl font-bold mb-6 leading-tight">{title}</h3>
        <div className="space-y-6 text-sm">
          <div>
            <h4 className="text-secondary font-bold mb-1">Challenge</h4>
            <p className="text-white/60 leading-relaxed">{challenge}</p>
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
  const { t, setPage } = useLanguage();
  return (
    <section id="success-stories" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="text-sm font-bold text-primary-light uppercase tracking-widest mb-4 inline-block">
              {t.testimonials.badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {t.testimonials.title}
            </h2>
          </div>
          <p className="text-white/40 text-lg max-w-sm">
            Discover how we translate bespoke intelligence into measurable growth for US enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <StoryItem
            title="Finance Automation for Logistics"
            client="RetailPro USA"
            result="95% Manual Data Reduction"
            image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800"
          />
          <StoryItem
            title="AEO Healthcare Strategy"
            client="HealthFirst USA"
            result="+25% Conversion Rate"
            image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
          />
          <StoryItem
            title="Content Engine for SaaS"
            client="SaaS Matrix"
            result="300% Content Output"
            image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
          />
        </div>

        <div className="text-center mb-20">
          <button
            onClick={() => { setPage('stories'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="inline-flex items-center gap-3 text-white/60 hover:text-primary-light font-bold text-lg transition-colors group"
          >
            {t.testimonials.view_all}
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div id="detailed-cases" className="pt-20">
          <h3 className="text-3xl font-bold mb-12 text-center gradient-text">Detailed Success Cases</h3>

          <CaseStudyDetail
            title="From Manual Invoicing to Autonomous Finance"
            client="RetailPro USA"
            challenge="RetailPro was losing 15 hours a week in manual invoice processing and data entry errors across 12 warehouses."
            solution="We implemented Executive AI: a custom administrative agent that extracts, validates, and syncs invoices automatically."
            result="95% reduction in manual data entry and $120k saved annually in overhead."
            image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200"
            tags={["Automation", "Finance", "AI Agents"]}
          />

          <CaseStudyDetail
            title="Optimizing the Human Journey with AEO"
            client="HealthFirst USA"
            challenge="Organic traffic was stagnant and traditional SEO wasn't answering specific patient questions on AI search engines."
            solution="Redesigned content strategy for AEO (Answer Engine Optimization) and implemented a personalized healthcare assistant."
            result="40% increase in Answer-Engine visibility and 25% conversion boost."
            image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"
            tags={["AEO", "SEO", "Healthcare"]}
          />
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
