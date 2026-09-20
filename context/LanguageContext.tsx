"use client";

import React, { createContext, useContext, useState, useSyncExternalStore } from 'react';
import { translations } from '../translations';

export type Language = 'en' | 'es';
export type Page = 'home' | 'stories' | 'blog';

export interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    page: Page;
    setPage: (page: Page) => void;
    t: typeof translations.en;
    activeBlog: string | null;
    setActiveBlog: (id: string | null) => void;
    isLandingMode: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// The landing variant is chosen from the browser URL, which the server can't
// see. useSyncExternalStore renders the server value (false) while hydrating
// and then switches, instead of throwing a hydration mismatch (React #418).
const subscribeToNothing = () => () => { };
const getIsLandingMode = () =>
    window.location.hostname === 'landing.xtekai.com' ||
    window.location.hostname === 'landing.localhost' ||
    window.location.search.includes('mode=landing');
const getServerIsLandingMode = () => false;

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<Language>('en'); // Default back to English
    const [page, setPage] = useState<Page>('home');
    const [activeBlog, setActiveBlog] = useState<string | null>(null);

    const isLandingMode = useSyncExternalStore(subscribeToNothing, getIsLandingMode, getServerIsLandingMode);

    const value = {
        lang,
        setLang,
        page,
        setPage,
        t: translations[lang],
        activeBlog,
        setActiveBlog,
        isLandingMode
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};
