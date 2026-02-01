
import React, { useState, useEffect } from 'react';
import { useLanguage, handleSmoothScroll } from '../App';
import { MagnetizeButton } from './ui/magnetize-button';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t, page, setPage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page !== 'home') {
      setPage('home');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.history.pushState("", document.title, window.location.pathname + window.location.search);
  };

  const handleNavigation = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    if (page !== 'home') {
      setPage('home');
      setTimeout(() => {
        // Find the element again after rendering home
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      handleSmoothScroll(e as React.MouseEvent<HTMLAnchorElement>, targetId);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-primary/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={scrollToTop} className="flex items-center gap-3 group relative z-50">
          <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center font-bold text-xl !text-white transition-transform group-hover:scale-110 notranslate">X</div>
          <span className="text-2xl font-bold tracking-tight uppercase !text-white notranslate">XTEK AI</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#about" onClick={(e) => handleNavigation(e, 'about')} className="text-sm font-medium !text-white hover:text-primary-light transition-colors">{t.nav.about}</a>
          <a href="#services" onClick={(e) => handleNavigation(e, 'services')} className="text-sm font-medium !text-white hover:text-primary-light transition-colors">{t.nav.services}</a>
          <a href="#success-stories" onClick={(e) => handleNavigation(e, 'success-stories')} className="text-sm font-medium !text-white hover:text-primary-light transition-colors">{t.nav.testimonials}</a>
          <a href="#blog" onClick={(e) => handleNavigation(e, 'blog')} className="text-sm font-medium !text-white hover:text-primary-light transition-colors">{t.nav.blog}</a>
          <a href="#faq" onClick={(e) => handleNavigation(e, 'faq')} className="text-sm font-medium !text-white hover:text-primary-light transition-colors">{t.nav.faq}</a>
          <a href="#contact" onClick={(e) => handleNavigation(e, 'contact')} className="text-sm font-medium !text-white hover:text-primary-light transition-colors">{t.nav.contact}</a>
        </nav>

        <div className="flex items-center gap-4 relative z-50">

          <MagnetizeButton
            onClick={(e) => handleNavigation(e, 'contact')}
            className="hidden sm:inline-flex text-sm font-semibold px-6 py-2.5 bg-primary-light hover:bg-secondary text-white transition-all duration-300 rounded-full border-none h-auto"
          >
            {t.nav.cta}
          </MagnetizeButton>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-primary/95 backdrop-blur-xl z-40 transition-all duration-300 flex flex-col items-center justify-center gap-8 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          <a href="#about" onClick={(e) => { handleNavigation(e, 'about'); setIsMenuOpen(false); }} className="text-2xl font-bold !text-white hover:text-primary-light transition-colors">{t.nav.about}</a>
          <a href="#services" onClick={(e) => { handleNavigation(e, 'services'); setIsMenuOpen(false); }} className="text-2xl font-bold !text-white hover:text-primary-light transition-colors">{t.nav.services}</a>
          <a href="#success-stories" onClick={(e) => { handleNavigation(e, 'success-stories'); setIsMenuOpen(false); }} className="text-2xl font-bold !text-white hover:text-primary-light transition-colors">{t.nav.testimonials}</a>
          <a href="#blog" onClick={(e) => { handleNavigation(e, 'blog'); setIsMenuOpen(false); }} className="text-2xl font-bold !text-white hover:text-primary-light transition-colors">{t.nav.blog}</a>
          <a href="#faq" onClick={(e) => { handleNavigation(e, 'faq'); setIsMenuOpen(false); }} className="text-2xl font-bold !text-white hover:text-primary-light transition-colors">{t.nav.faq}</a>
          <a href="#contact" onClick={(e) => { handleNavigation(e, 'contact'); setIsMenuOpen(false); }} className="text-2xl font-bold !text-white hover:text-primary-light transition-colors">{t.nav.contact}</a>
          <a href="#contact" onClick={(e) => { handleNavigation(e, 'contact'); setIsMenuOpen(false); }} className="px-8 py-3 bg-primary-light !text-white rounded-full font-bold text-xl">{t.nav.cta}</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
