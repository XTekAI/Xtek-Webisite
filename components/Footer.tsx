
import React from 'react';
import { useLanguage, handleSmoothScroll } from '../App';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <button onClick={scrollToTop} className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary-light rounded flex items-center justify-center font-bold !text-white notranslate">X</div>
              <span className="text-xl font-bold tracking-tight uppercase !text-white notranslate">Xtek AI</span>
            </button>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61579221937656"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-light transition-all cursor-pointer group"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current text-white/60 group-hover:text-white" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/xtek.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary-light transition-all cursor-pointer group"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-none stroke-current text-white/60 group-hover:text-white" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary-light">{t.footer.col1_title}</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-white transition-colors">{t.footer.col1_item1}</a></li>
              <li><a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className="hover:text-white transition-colors">{t.footer.col1_item2}</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">{t.footer.col1_item3}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary-light">{t.footer.col2_title}</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-white transition-colors">{t.footer.col2_item1}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.col2_item2}</a></li>
              <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-white transition-colors">{t.footer.col2_item3}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary-light">{t.footer.col3_title}</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><a href="#terms" onClick={(e) => handleSmoothScroll(e, 'terms')} className="hover:text-white transition-colors">{t.footer.col3_item1}</a></li>
              <li><a href="#privacy" onClick={(e) => handleSmoothScroll(e, 'privacy')} className="hover:text-white transition-colors">{t.footer.col3_item2}</a></li>
              <li><a href="#privacy" onClick={(e) => handleSmoothScroll(e, 'privacy')} className="hover:text-white transition-colors">{t.footer.col3_item3}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} XTEK AI Agency. {t.footer.rights}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-xs">Intelligence in Action</span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary-light"></div>
            <span className="text-white/30 text-xs font-serif italic">Global Presence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
