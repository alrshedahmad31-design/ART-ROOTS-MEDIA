import { createContext, useContext, useState, useEffect } from 'react';
import en from './en';
import ar from './ar';

const translations = { en, ar };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        const saved = localStorage.getItem('art-lang');
        return saved || 'ar';
    });

    useEffect(() => {
        localStorage.setItem('art-lang', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }, [lang]);

    const t = translations[lang];

    const toggleLang = () => {
        setLang(prev => prev === 'ar' ? 'en' : 'ar');
    };

    const isRTL = lang === 'ar';

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

export default LanguageContext;
