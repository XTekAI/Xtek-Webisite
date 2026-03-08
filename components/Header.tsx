"use client";

import Link from 'next/link';
import { useRouter, usePathname, redirect } from 'next/navigation';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { handleSmoothScroll } from '../lib/utils';
import { MagnetizeButton } from './ui/magnetize-button';


const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigation = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
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

  const navLinks = [
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'success-stories', label: t.nav.testimonials },
    { id: 'blog', label: t.nav.blog },
    { id: 'faq', label: t.nav.faq },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-primary/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={scrollToTop} className="flex items-center gap-3 group relative z-50">
          <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center font-bold text-xl !text-white transition-transform group-hover:scale-110 notranslate">X</div>
          <span className="text-2xl font-bold tracking-tight uppercase !text-white notranslate">XTEK AI</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.id} href={`#${link.id}`} onClick={(e) => handleNavigation(e, link.id)} className="text-sm font-medium !text-white hover:text-primary-light transition-colors">{link.label}</a>
          ))}
          <div className="relative group">
            <button className="text-sm font-medium !text-white hover:text-primary-light transition-colors flex items-center gap-1">
              Service Areas
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#0a0f1c]/95 backdrop-blur-md rounded-lg border border-primary-light/20 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col pt-2 pb-2">
              <Link href="/service-areas/hamilton-nj" className="px-4 py-2 text-sm text-white/80 hover:text-primary-light hover:bg-white/5 transition-colors">Hamilton, NJ</Link>
              <Link href="/service-areas/philadelphia-pa" className="px-4 py-2 text-sm text-white/80 hover:text-primary-light hover:bg-white/5 transition-colors">Philadelphia, PA</Link>
              <Link href="/service-areas/manhattan-ny" className="px-4 py-2 text-sm text-white/80 hover:text-primary-light hover:bg-white/5 transition-colors">Manhattan, NY</Link>
            </div>
          </div>
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
        <div className={`fixed inset-0 bg-primary/95 backdrop-blur-xl z-40 transition-all duration-300 flex flex-col items-center justify-center gap-6 overflow-y-auto ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          {navLinks.map(link => (
            <a key={link.id} href={`#${link.id}`} onClick={(e) => { handleNavigation(e, link.id); setIsMenuOpen(false); }} className="text-2xl font-bold !text-white hover:text-primary-light transition-colors">{link.label}</a>
          ))}

          <div className="w-16 h-px bg-white/20 my-2"></div>
          <span className="text-sm font-bold tracking-widest text-white/50 uppercase">Service Areas</span>
          <Link href="/service-areas/hamilton-nj" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold !text-white hover:text-primary-light transition-colors">Hamilton, NJ</Link>
          <Link href="/service-areas/philadelphia-pa" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold !text-white hover:text-primary-light transition-colors">Philadelphia, PA</Link>
          <Link href="/service-areas/manhattan-ny" onClick={() => setIsMenuOpen(false)} className="text-xl font-bold !text-white hover:text-primary-light transition-colors">Manhattan, NY</Link>
          <div className="w-16 h-px bg-white/20 my-2"></div>

          <a href="#contact" onClick={(e) => { handleNavigation(e, 'contact'); setIsMenuOpen(false); }} className="mt-4 px-8 py-3 bg-primary-light !text-white rounded-full font-bold text-xl">{t.nav.cta}</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
