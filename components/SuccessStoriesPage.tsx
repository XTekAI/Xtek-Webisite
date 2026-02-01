
import React from 'react';
import { useLanguage } from '../App';
import { MagnetizeButton } from './ui/magnetize-button';

const SuccessStoryDetail: React.FC<{
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
  tags: string[];
  labels: {
    badge: string;
    challenge: string;
    solution: string;
    impact: string;
  };
}> = ({ title, client, challenge, solution, result, image, tags, labels }) => (
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
        <h2 className="text-primary-light font-bold uppercase tracking-widest text-sm mb-6">{labels.badge}</h2>
        <h3 className="text-4xl font-bold mb-8 leading-tight">{title}</h3>

        <div className="space-y-8">
          <div>
            <h4 className="text-secondary font-bold text-lg mb-2">{labels.challenge}</h4>
            <p className="text-white/60 leading-relaxed">{challenge}</p>
          </div>
          <div>
            <h4 className="text-primary-light font-bold text-lg mb-2">{labels.solution}</h4>
            <p className="text-white/60 leading-relaxed">{solution}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-6 border-l-4 border-primary-light">
            <h4 className="text-white font-bold mb-1">{labels.impact}</h4>
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
          {t.blog.back}
        </button>

        <div className="mb-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">{t.testimonials.page_title}</h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto">
            {t.testimonials.page_subtitle}
          </p>
        </div>

        {t.testimonials.detailed_cases.map((caseStudy: any, index: number) => (
          <SuccessStoryDetail
            key={index}
            title={caseStudy.title}
            client={caseStudy.client}
            challenge={caseStudy.challenge}
            solution={caseStudy.solution}
            result={caseStudy.result}
            image={caseStudy.image}
            tags={caseStudy.tags}
            labels={{
              badge: t.testimonials.story_badge,
              challenge: t.testimonials.challenge_label,
              solution: t.testimonials.solution_label,
              impact: t.testimonials.impact_label
            }}
          />
        ))}

        <div className="glass rounded-[40px] p-16 text-center">
          <h2 className="text-4xl font-bold mb-8">{t.testimonials.next_story_title}</h2>
          <MagnetizeButton
            onClick={(e) => {
              e.preventDefault();
              setPage('home');
              setTimeout(() => {
                const element = document.getElementById('contact');
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                  window.history.pushState(null, '', '#contact');
                }
              }, 100);
            }}
            className="px-12 py-5 bg-primary-light text-white font-bold rounded-full text-xl hover:bg-secondary hover:scale-105 transition-all shadow-xl shadow-primary-light/20 border-none h-auto"
          >
            {t.testimonials.start_journey}
          </MagnetizeButton>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesPage;
