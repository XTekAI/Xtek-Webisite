"use client";

import Link from 'next/link';
import { useRouter, usePathname, redirect } from 'next/navigation';

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { handleSmoothScroll } from '../lib/utils';
import { MagnetizeButton } from './ui/magnetize-button';


const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  // Lock body scroll when menu is open to prevent background scrolling
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      // Only restore scroll if no pending navigation target
      if (scrollY && !pendingNavRef.current) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [isMenuOpen]);

  const pendingNavRef = React.useRef<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const closeMenuAndNavigate = useCallback((targetId: string) => {
    // Unlock body first
    const savedScrollY = document.body.style.top;
    pendingNavRef.current = targetId;

    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';

    if (savedScrollY) {
      window.scrollTo(0, parseInt(savedScrollY || '0') * -1);
    }

    setIsMenuOpen(false);

    // If not on home page, navigate to home first then scroll
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        pendingNavRef.current = null;
      }, 300);
    } else {
      requestAnimationFrame(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        pendingNavRef.current = null;
      });
    }
  }, [pathname, router]);

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
          <Link href="/next-horizon" className="text-sm font-medium !text-white hover:text-primary-light transition-colors flex items-center gap-1">
            Next Horizon
            <svg className="w-3.5 h-3.5 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </Link>
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
            className="lg:hidden p-2 text-white relative z-[110]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - moved outside inner container */}
      <div
        className={`fixed inset-0 bg-primary/95 backdrop-blur-xl z-[105] transition-all duration-300 flex flex-col items-center justify-center gap-6 overflow-y-auto ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeMenu(); }}
      >
        {navLinks.map(link => (
          <a key={link.id} href={`#${link.id}`} onClick={(e) => { e.preventDefault(); closeMenuAndNavigate(link.id); }} className="text-2xl font-bold !text-white hover:text-primary-light transition-colors">{link.label}</a>
        ))}

        <div className="w-16 h-px bg-white/20 my-2"></div>
        <Link href="/next-horizon" onClick={() => { document.body.style.overflow = ''; document.body.style.position = ''; document.body.style.width = ''; document.body.style.top = ''; closeMenu(); }} className="text-2xl font-bold !text-white hover:text-primary-light transition-colors flex items-center gap-2">
          Next Horizon
          <svg className="w-5 h-5 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        </Link>
        <div className="w-16 h-px bg-white/20 my-2"></div>
        <span className="text-sm font-bold tracking-widest text-white/50 uppercase">Service Areas</span>
        <Link href="/service-areas/hamilton-nj" onClick={() => { document.body.style.overflow = ''; document.body.style.position = ''; document.body.style.width = ''; document.body.style.top = ''; closeMenu(); }} className="text-xl font-bold !text-white hover:text-primary-light transition-colors">Hamilton, NJ</Link>
        <Link href="/service-areas/philadelphia-pa" onClick={() => { document.body.style.overflow = ''; document.body.style.position = ''; document.body.style.width = ''; document.body.style.top = ''; closeMenu(); }} className="text-xl font-bold !text-white hover:text-primary-light transition-colors">Philadelphia, PA</Link>
        <Link href="/service-areas/manhattan-ny" onClick={() => { document.body.style.overflow = ''; document.body.style.position = ''; document.body.style.width = ''; document.body.style.top = ''; closeMenu(); }} className="text-xl font-bold !text-white hover:text-primary-light transition-colors">Manhattan, NY</Link>
        <div className="w-16 h-px bg-white/20 my-2"></div>

        <a href="#contact" onClick={(e) => { e.preventDefault(); closeMenuAndNavigate('contact'); }} className="mt-4 px-8 py-3 bg-primary-light !text-white rounded-full font-bold text-xl">{t.nav.cta}</a>
      </div>
    </header>
  );
};

export default Header;
