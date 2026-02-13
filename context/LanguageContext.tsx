
import React, { createContext, useContext, useState } from 'react';
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
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<Language>('en');
    const [page, setPage] = useState<Page>('home');
    const [activeBlog, setActiveBlog] = useState<string | null>(null);

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
            {children}
        </LanguageContext.Provider>
    );
};
