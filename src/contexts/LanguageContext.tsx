
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'english' | 'hindi' | 'bengali';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return (savedLanguage as Language) || 'english';
  });

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', language);
    
    // Add lang attribute to HTML for accessibility
    document.documentElement.lang = language === 'english' ? 'en' : language === 'hindi' ? 'hi' : 'bn';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
