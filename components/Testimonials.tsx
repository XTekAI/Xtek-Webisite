
import React from 'react';
import { useLanguage } from '../App';

const TestimonialCard: React.FC<{
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}> = ({ name, role, company, quote, image }) => (
  <div className="glass rounded-3xl p-8 flex flex-col h-full border-t border-white/5">
    <div className="flex items-center gap-4 mb-8">
      <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <h4 className="font-bold text-lg leading-none">{name}</h4>
        <p className="text-sm text-white/50 mt-1">{role} - {company}</p>
      </div>
    </div>
    <div className="text-primary-light mb-4">
      <svg className="w-8 h-8 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C1.91243 8 1.017 7.10457 1.017 6V5C1.017 3.89543 1.91243 3 3.017 3H6.017C8.22614 3 10.017 4.79086 10.017 7V15C10.017 18.3137 7.33071 21 4.017 21H1.017Z" /></svg>
    </div>
    <p className="text-lg italic text-white/80 flex-grow">"{quote}"</p>
  </div>
);

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section id="testimonials" className="py-32 px-6 relative bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-primary-light uppercase tracking-widest mb-4">{t.testimonials.badge}</h2>
          <h3 className="text-4xl md:text-5xl font-bold !text-white">{t.testimonials.title}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            name={t.testimonials.t1_name}
            role={t.testimonials.t1_role}
            company={t.testimonials.t1_company}
            image="https://picsum.photos/100/100?random=1"
            quote={t.testimonials.t1_quote}
          />
          <TestimonialCard
            name={t.testimonials.t2_name}
            role={t.testimonials.t2_role}
            company={t.testimonials.t2_company}
            image="https://picsum.photos/100/100?random=2"
            quote={t.testimonials.t2_quote}
          />
          <TestimonialCard
            name={t.testimonials.t3_name}
            role={t.testimonials.t3_role}
            company={t.testimonials.t3_company}
            image="https://picsum.photos/100/100?random=3"
            quote={t.testimonials.t3_quote}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
