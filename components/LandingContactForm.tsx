
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LandingContactForm: React.FC = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        phone: '',
        email: ''
    });

    const [errors, setErrors] = useState({
        phone: '',
        email: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone: string) => {
        // Basic phone validation: at least 7 digits, allows +, -, spaces, and parentheses
        return /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(phone.replace(/\s/g, '')) || phone.length >= 7;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear errors when user types
        if (name === 'email' || name === 'phone') {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { name, businessName, phone, email } = formData;

        // Basic empty check
        if (!name || !businessName || !phone || !email) {
            alert(t.contact.validation_error);
            return;
        }

        // Format validation
        let hasErrors = false;
        const newErrors = { phone: '', email: '' };

        if (!validateEmail(email)) {
            newErrors.email = t.contact.error_email;
            hasErrors = true;
        }

        if (!validatePhone(phone)) {
            newErrors.phone = t.contact.error_phone;
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        try {
            await fetch('https://prueba1-n8n.fihoy6.easypanel.host/webhook/landing', {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, source: 'landing_contact_form' }),
            });
            setSubmitted(true);
        } catch (error) {
            console.error('Submission error:', error);
            alert('There was an error submitting the form. Please try again.');
        }
    };

    if (submitted) {
        return (
            <div className="glass max-w-2xl mx-auto p-12 text-center rounded-3xl animate-fade-in-up">
                <div className="w-20 h-20 bg-primary-light/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-3xl font-bold mb-4 !text-white">{t.contact.success_title}</h3>
                <p className="text-white/60 mb-8">{t.contact.success_desc}</p>
                <button
                    onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', businessName: '', phone: '', email: '' });
                        setErrors({ phone: '', email: '' });
                    }}
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
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50 px-1">{t.contact.label_phone}</label>
                    <input
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (201) 555-0123"
                        className={`bg-white/5 border ${errors.phone ? 'border-secondary' : 'border-white/10'} rounded-xl px-4 py-3 outline-none focus:border-primary-light focus:bg-white/10 transition-all text-white placeholder:text-white/20`}
                    />
                    {errors.phone && <span className="text-secondary text-[10px] font-bold uppercase px-1">{errors.phone}</span>}
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
                        className={`bg-white/5 border ${errors.email ? 'border-secondary' : 'border-white/10'} rounded-xl px-4 py-3 outline-none focus:border-primary-light focus:bg-white/10 transition-all text-white placeholder:text-white/20`}
                    />
                    {errors.email && <span className="text-secondary text-[10px] font-bold uppercase px-1">{errors.email}</span>}
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

export default LandingContactForm;
