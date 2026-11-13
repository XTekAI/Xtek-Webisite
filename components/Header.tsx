"use client";

import Link from 'next/link';
import { useRouter, usePathname, redirect } from 'next/navigation';

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { handleSmoothScroll } from '../lib/utils';
import { MagnetizeButton } from './ui/magnetize-button';
import { homeHref } from '../lib/navigation';
import { services } from '../content/services';


// One row of the mobile menu: full-width tap target (min 48px) with a divider.
const mobileRowClass =
  'flex items-center justify-between py-3 text-lg font-semibold !text-white border-b border-white/10 hover:text-primary-light transition-colors';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, lang } = useLanguage();
  const pathname = usePathname();
  // Mobile menu: the Services row opens a list of the service pages in place.
  const [servicesOpen, setServicesOpen] = useState(false);
  const router = useRouter();

  // Lock body scroll when menu is open to prevent background scrolling
  useEffect(() => {
    // While the menu is open, also hide the ElevenLabs call widget (it covered the menu's button).
    document.body.classList.toggle('menu-open', isMenuOpen);
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      setServicesOpen(false);
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
    setServicesOpen(false);
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
      router.push(homeHref(targetId));
      pendingNavRef.current = null;
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
      router.push(homeHref(targetId));
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

  // Main menu: the pages visitors look for first. Everything else lives under "More".
  const primaryLinks = navLinks.filter(l => ['services', 'faq', 'contact'].includes(l.id));
  const secondaryLinks = navLinks.filter(l => ['about', 'success-stories', 'blog'].includes(l.id));

  const closeMenuClean = () => {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    closeMenu();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-primary/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={scrollToTop} className="flex items-center gap-3 group relative z-[110]">
          <img src="/brand/xtek-horizontal-negativo.svg" alt="XTEK AI" width={164} height={50} className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105" />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          {primaryLinks.map(link => (
            <React.Fragment key={link.id}>
              {link.id === 'faq' && (
                <>
                  <Link href="/products" className="text-sm font-medium !text-white hover:text-primary-light transition-colors">{t.nav.products}</Link>
                  <Link href="/next-horizon" className="text-sm font-medium !text-white hover:text-primary-light transition-colors flex items-center gap-1">
                    Next Horizon
                    <svg className="w-3.5 h-3.5 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </Link>
                </>
              )}
              <a href={`/#${link.id}`} onClick={(e) => handleNavigation(e, link.id)} className="text-sm font-medium !text-white hover:text-primary-light transition-colors">{link.label}</a>
            </React.Fragment>
          ))}
          <div className="relative group">
            <button className="text-sm font-medium !text-white hover:text-primary-light transition-colors flex items-center gap-1">
              {t.nav.more}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-300">
              <div className="w-56 bg-[#0a0f1c]/95 backdrop-blur-md rounded-lg border border-primary-light/20 shadow-xl flex flex-col py-2">
                {secondaryLinks.map(link => (
                  <a key={link.id} href={`/#${link.id}`} onClick={(e) => handleNavigation(e, link.id)} className="px-4 py-2 text-sm text-white/80 hover:text-primary-light hover:bg-white/5 transition-colors">{link.label}</a>
                ))}
                <div className="h-px bg-white/10 my-2 mx-4"></div>
                <span className="px-4 pb-1 text-[10px] font-bold tracking-widest text-white/40 uppercase">Service Areas</span>
                <Link href="/service-areas/hamilton-nj" className="px-4 py-2 text-sm text-white/80 hover:text-primary-light hover:bg-white/5 transition-colors">Hamilton, NJ</Link>
                <Link href="/service-areas/philadelphia-pa" className="px-4 py-2 text-sm text-white/80 hover:text-primary-light hover:bg-white/5 transition-colors">Philadelphia, PA</Link>
                <Link href="/service-areas/manhattan-ny" className="px-4 py-2 text-sm text-white/80 hover:text-primary-light hover:bg-white/5 transition-colors">Manhattan, NY</Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4 relative z-[110]">
          <MagnetizeButton
            onClick={(e) => handleNavigation(e, 'contact')}
            className="hidden sm:inline-flex text-sm font-semibold px-6 py-2.5 bg-primary-light hover:bg-secondary text-white transition-all duration-300 rounded-full border-none h-auto"
          >
            {t.nav.cta}
          </MagnetizeButton>

          {/* Mobile Menu Button */}
          <button
            className="xl:hidden p-2.5 -mr-2.5 text-white relative z-[110]"
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

      {/* Mobile menu: compact list that starts under the logo and scrolls when needed. (The old one
          centered ~14 large links vertically, so on phones the top of the list was cut off.) */}
      <div
        className={`xl:hidden fixed inset-0 bg-primary z-[105] transition-all duration-300 flex flex-col overflow-y-auto overscroll-contain px-6 pt-24 pb-8 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeMenu(); }}
      >
        <nav className="flex flex-col">
          {primaryLinks.map(link => (
            <React.Fragment key={link.id}>
              {link.id === 'faq' && (
                <>
                  <Link href="/products" onClick={closeMenuClean} className={mobileRowClass}>
                    {t.nav.products}
                    <span className="text-white/30">›</span>
                  </Link>
                  <Link href="/next-horizon" onClick={closeMenuClean} className={mobileRowClass}>
                    <span className="flex items-center gap-2">
                      Next Horizon
                      <svg className="w-4 h-4 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </span>
                    <span className="text-white/30">›</span>
                  </Link>
                </>
              )}
              {link.id === 'services' ? (
                <div className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setServicesOpen((o) => !o)}
                    aria-expanded={servicesOpen}
                    aria-controls="mobile-services-list"
                    className={`${mobileRowClass} w-full border-b-0`}
                  >
                    {link.label}
                    <svg className={`w-5 h-5 text-primary-light transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div
                    id="mobile-services-list"
                    className={`grid transition-all duration-300 ${servicesOpen ? 'grid-rows-[1fr] opacity-100 pb-3' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <ul className="overflow-hidden pl-3 border-l border-secondary/50 ml-1">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            onClick={closeMenuClean}
                            tabIndex={servicesOpen ? 0 : -1}
                            className="block py-2.5 text-[15px] font-medium !text-white/80 hover:!text-white"
                          >
                            {s[lang].name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <a
                          href="/#services"
                          tabIndex={servicesOpen ? 0 : -1}
                          onClick={(e) => { e.preventDefault(); closeMenuAndNavigate('services'); }}
                          className="block py-2.5 text-[15px] font-semibold !text-accent"
                        >
                          {t.nav.all_services} →
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <a href={`/#${link.id}`} onClick={(e) => { e.preventDefault(); closeMenuAndNavigate(link.id); }} className={mobileRowClass}>
                  {link.label}
                  <span className="text-white/30">›</span>
                </a>
              )}
            </React.Fragment>
          ))}
        </nav>

        <p className="mt-7 mb-1 text-[11px] font-bold tracking-widest text-white/40 uppercase">{t.nav.more}</p>
        <nav className="flex flex-col">
          {secondaryLinks.map(link => (
            <a key={link.id} href={`/#${link.id}`} onClick={(e) => { e.preventDefault(); closeMenuAndNavigate(link.id); }} className={mobileRowClass}>
              {link.label}
              <span className="text-white/30">›</span>
            </a>
          ))}
        </nav>

        <p className="mt-7 mb-3 text-[11px] font-bold tracking-widest text-white/40 uppercase">Service Areas</p>
        <div className="flex flex-wrap gap-2">
          {[
            ['/service-areas/hamilton-nj', 'Hamilton, NJ'],
            ['/service-areas/philadelphia-pa', 'Philadelphia, PA'],
            ['/service-areas/manhattan-ny', 'Manhattan, NY'],
          ].map(([href, label]) => (
            <Link key={href} href={href} onClick={closeMenuClean} className="px-4 py-2 rounded-full border border-white/15 text-sm !text-white/80 hover:border-primary-light">
              {label}
            </Link>
          ))}
        </div>

        <a
          href="/#contact"
          onClick={(e) => { e.preventDefault(); closeMenuAndNavigate('contact'); }}
          className="mt-8 w-full py-4 bg-secondary !text-white rounded-full font-bold text-base text-center shadow-lg shadow-secondary/30"
        >
          {t.nav.cta}
        </a>
      </div>
    </header>
  );
};

export default Header;
