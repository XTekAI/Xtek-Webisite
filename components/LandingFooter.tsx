
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { handleSmoothScroll } from '../lib/utils';

const LandingFooter: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer className="py-20 border-t border-white/5 bg-primary/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-light rounded flex items-center justify-center font-bold !text-white notranslate">X</div>
                        <span className="text-xl font-bold tracking-tight uppercase !text-white notranslate">Xtek AI</span>
                    </div>

                    <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-white/60">
                        <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-white transition-colors">{t.footer.col1_item1}</a>
                        <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-white transition-colors">{t.footer.col1_item2}</a>
                        <a href="#success-stories" onClick={(e) => handleSmoothScroll(e, 'success-stories')} className="hover:text-white transition-colors">{t.nav.testimonials}</a>
                        <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-white transition-colors">{t.nav.contact}</a>
                        <div className="flex flex-wrap justify-center gap-8 md:border-l md:border-white/10 md:pl-8">
                            <a
                                href="mailto:tekmanager@xtekai.com?subject=Inquiry from Xtek AI Website&body=Hello Xtek AI Team,%0D%0A%0D%0AI would like to learn more about your services.%0D%0A%0D%0AName:%0D%0ACompany:%0D%0APhone:"
                                className="hover:text-white transition-colors flex items-center gap-2"
                            >
                                <span className="text-primary-light">@</span>
                                tekmanager@xtekai.com
                            </a>
                            <a href="tel:6099126800" className="hover:text-white transition-colors flex items-center gap-2">
                                <span className="text-primary-light">P:</span>
                                609 912 6800
                            </a>
                        </div>
                    </nav>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-white/30 text-xs">
                        © {new Date().getFullYear()} XTEK AI Agency. {t.footer.rights}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-white/30 text-xs">Direct AI Solutions</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-light"></div>
                        <span className="text-white/30 text-xs font-serif italic">Landing Experience</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
