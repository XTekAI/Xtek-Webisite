"use client";

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LandingFooter: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer className="py-12 border-t border-white/5 bg-primary/20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-light rounded flex items-center justify-center font-bold !text-white notranslate">X</div>
                        <span className="text-xl font-bold tracking-tight uppercase !text-white notranslate">Xtek AI</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
                        <a
                            href="mailto:tekmanager@xtekai.com"
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
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-white/30 text-xs">
                        © {new Date().getFullYear()} XTEK AI Agency. {t.footer.rights}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
