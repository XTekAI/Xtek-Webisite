import React, { useState, createContext, useContext, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import SuccessStories from './components/SuccessStories';
import SuccessStoriesPage from './components/SuccessStoriesPage';
import ContactForm from './components/ContactForm';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Legal from './components/Legal';
import BlogSection from './components/BlogSection';
import BlogPage from './components/BlogPage';
import { translations } from './translations';

type Language = 'en' | 'es';
type Page = 'home' | 'stories' | 'blog';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  page: Page;
  setPage: (page: Page) => void;
  t: typeof translations.en;
  activeBlog: string | null;
  setActiveBlog: (id: string | null) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};

// Global smooth scroll helper
export const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
  e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Update URL hash without jumping
    window.history.pushState(null, '', `#${targetId}`);
  }
};

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [page, setPage] = useState<Page>('home');
  const [activeBlog, setActiveBlog] = useState<string | null>(null);

  // Handle hash changes or navigation state consistency
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#stories') {
        setPage('stories');
      } else if (page === 'stories' && window.location.hash !== '#stories') {
        // Fallback for direct URL navigation back to home components
        setPage('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [page]);

  const value = {
    lang,
    setLang,
    page,
    setPage,
    t: translations[lang],
    activeBlog,
    setActiveBlog
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className="min-h-screen hero-pattern">
        <Header />
        <main>
          {page === 'home' ? (
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
                    {value.t.contact.section_title}
                  </h2>
                  <p className="text-xl text-white/60">
                    {value.t.contact.section_subtitle}
                  </p>
                </div>
                <ContactForm />
              </section>
              <BlogSection />
              <FAQ />
              <Legal />
            </>
          ) : page === 'stories' ? (
            <SuccessStoriesPage />
          ) : (
            <BlogPage />
          )}
        </main>
        <Footer />
      </div>
    </LanguageContext.Provider>
  );
}

export default App;
