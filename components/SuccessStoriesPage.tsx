
import React from 'react';
import { useLanguage } from '../App';

const SuccessStoryDetail: React.FC<{
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  tags: string[];
}> = ({ title, client, challenge, solution, result, image, tags }) => (
  <div className="glass rounded-[40px] overflow-hidden mb-20 border border-white/5 group">
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="relative h-80 lg:h-auto overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent"></div>
        <div className="absolute bottom-10 left-10">
          <div className="flex gap-2 mb-4">
            {tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-primary-light/30 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest">{tag}</span>
            ))}
          </div>
          <h3 className="text-3xl font-bold">{client}</h3>
        </div>
      </div>
      <div className="p-8 lg:p-16">
        <h2 className="text-primary-light font-bold uppercase tracking-widest text-sm mb-6">Success Case Study</h2>
        <h3 className="text-4xl font-bold mb-8 leading-tight">{title}</h3>
        
        <div className="space-y-8">
          <div>
            <h4 className="text-secondary font-bold text-lg mb-2">The Challenge</h4>
            <p className="text-white/60 leading-relaxed">{challenge}</p>
          </div>
          <div>
            <h4 className="text-primary-light font-bold text-lg mb-2">Our AI Solution</h4>
            <p className="text-white/60 leading-relaxed">{solution}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border-l-4 border-primary-light">
            <h4 className="text-white font-bold mb-1">Key Impact</h4>
            <p className="text-2xl font-bold text-primary-light">{result}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SuccessStoriesPage: React.FC = () => {
  const { t, setPage } = useLanguage();
  
  return (
    <div className="pt-40 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 text-white/50 hover:text-primary-light transition-colors mb-12 group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <div className="mb-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">Radical <span className="italic font-serif text-primary-light">Transformation</span></h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            Discover how Xtek AI has helped industry leaders in the USA automate their chaos and dominate their markets using bespoke intelligence.
          </p>
        </div>

        <SuccessStoryDetail 
          title="From Manual Invoicing to Autonomous Finance"
          client="RetailPro USA"
          challenge="RetailPro was losing 15 hours a week in manual invoice processing and data entry errors across 12 warehouses."
          solution="We implemented Executive AI: a custom administrative agent that extracts, validates, and syncs invoices automatically."
          result="95% reduction in manual data entry and $120k saved annually in overhead."
          image="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200"
          tags={["Automation", "Finance", "AI Agents"]}
        />

        <SuccessStoryDetail 
          title="Optimizing the Human Journey with AEO"
          client="HealthFirst USA"
          challenge="Organic traffic was stagnant and traditional SEO wasn't answering specific patient questions on AI search engines."
          solution="Redesigned content strategy for AEO (Answer Engine Optimization) and implemented a personalized healthcare assistant."
          result="40% increase in Answer-Engine visibility and 25% conversion boost."
          image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"
          tags={["AEO", "SEO", "Healthcare"]}
        />

        <SuccessStoryDetail 
          title="Scalable Content for High-Performance SaaS"
          client="SaaS Matrix"
          challenge="The team couldn't keep up with the demand for personalized content for different US niche markets."
          solution="Developed a custom content engine that generates market-specific articles and ads while preserving brand tone."
          result="300% increase in content output without adding a single headcount."
          image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
          tags={["Content", "Generative AI", "SaaS"]}
        />

        <div className="glass rounded-[40px] p-16 text-center">
          <h2 className="text-4xl font-bold mb-8">Your story could be next.</h2>
          <button 
            onClick={() => { setPage('home'); window.location.hash = '#contact'; }}
            className="px-12 py-5 bg-primary-light text-white font-bold rounded-full text-xl hover:scale-105 transition-all shadow-xl shadow-primary-light/20"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesPage;
