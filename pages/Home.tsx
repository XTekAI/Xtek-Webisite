
import React from 'react';
import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import SuccessStories from '../components/SuccessStories';
import ContactForm from '../components/ContactForm';
import BlogSection from '../components/BlogSection';
import FAQ from '../components/FAQ';
import Legal from '../components/Legal';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
    // @ts-ignore
    const { t } = useLanguage();

    React.useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }, []);

    return (
        <>
            <Hero />
            <TrustedBy />
            <AboutUs />
            <Services />
            <SuccessStories />
            <section id="contact" className="py-24 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-light/50 to-transparent"></div>
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        {t.contact.section_title}
                    </h2>
                    <p className="text-xl text-white/60">
                        {t.contact.section_subtitle}
                    </p>
                </div>
                <ContactForm />
            </section>
            <BlogSection />
            <FAQ />
            <Legal />
        </>
    );
};
export default Home;
