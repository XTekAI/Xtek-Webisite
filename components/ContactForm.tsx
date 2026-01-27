
import React, { useState } from 'react';
import { useLanguage } from '../App';

const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    niche: '',
    email: '',
    phone: '',
    meetingDate: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass max-w-2xl mx-auto p-12 text-center rounded-3xl animate-fade-in-up">
        <div className="w-20 h-20 bg-primary-light/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold mb-4">{t.contact.success_title}</h3>
        <p className="text-white/60 mb-8">{t.contact.success_desc} {formData.meetingDate}.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-primary-light font-bold hover:underline"
        >
          {t.contact.success_cta}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass max-w-2xl mx-auto p-8 md:p-12 rounded-3xl border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/50 px-1">{t.contact.label_name}</label>
          <input 
            required
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            placeholder="John Doe"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary-light focus:bg-white/10 transition-all text-white placeholder:text-white/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/50 px-1">{t.contact.label_business}</label>
          <input 
            required
            type="text" 
            name="businessName" 
            value={formData.businessName} 
            onChange={handleChange}
            placeholder="Company Inc."
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary-light focus:bg-white/10 transition-all text-white placeholder:text-white/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/50 px-1">{t.contact.label_niche}</label>
          <input 
            required
            type="text" 
            name="niche" 
            value={formData.niche} 
            onChange={handleChange}
            placeholder={t.contact.placeholder_niche}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary-light focus:bg-white/10 transition-all text-white placeholder:text-white/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/50 px-1">{t.contact.label_email}</label>
          <input 
            required
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
            placeholder="hello@company.com"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary-light focus:bg-white/10 transition-all text-white placeholder:text-white/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/50 px-1">{t.contact.label_phone}</label>
          <input 
            required
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange}
            placeholder="+1 (201) 555-0123"
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary-light focus:bg-white/10 transition-all text-white placeholder:text-white/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/50 px-1">{t.contact.label_date}</label>
          <input 
            required
            type="date" 
            name="meetingDate" 
            value={formData.meetingDate} 
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary-light focus:bg-white/10 transition-all text-white [color-scheme:dark]"
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        className="w-full py-4 bg-primary-light text-white font-bold rounded-xl hover:bg-secondary transition-all shadow-xl shadow-primary-light/20 flex items-center justify-center gap-2"
      >
        {t.contact.cta}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
      <p className="text-center text-white/30 text-xs mt-6">
        {t.contact.privacy_note}
      </p>
    </form>
  );
};

export default ContactForm;
