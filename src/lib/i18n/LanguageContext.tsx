'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  SupportedLanguage,
  LanguageMeta,
  TranslationDictionary,
  SUPPORTED_LANGUAGES,
} from './types';
import { DEFAULT_LANGUAGE, getTranslation, isValidLanguage } from './index';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: keyof TranslationDictionary, params?: Record<string, string | number>) => string;
  supportedLanguages: LanguageMeta[];
  currentLanguageMeta: LanguageMeta;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const STORAGE_KEY_LANGUAGE = 'fieldwork_language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage or browser navigator on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANGUAGE);
      if (saved && isValidLanguage(saved)) {
        setLanguageState(saved);
        if (typeof document !== 'undefined') {
          document.documentElement.lang = saved;
        }
      } else if (typeof navigator !== 'undefined') {
        const browserLang = navigator.language?.split('-')[0]?.toLowerCase();
        if (browserLang && isValidLanguage(browserLang)) {
          setLanguageState(browserLang);
          if (typeof document !== 'undefined') {
            document.documentElement.lang = browserLang;
          }
        }
      }
    } catch {
      // Ignore localStorage access errors
    } finally {
      setIsHydrated(true);
    }
  }, []);

  const setLanguage = useCallback((newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY_LANGUAGE, newLang);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLang;
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const t = useCallback(
    (key: keyof TranslationDictionary, params?: Record<string, string | number>) => {
      return getTranslation(language, key, params);
    },
    [language]
  );

  const currentLanguageMeta = useMemo(() => {
    return (
      SUPPORTED_LANGUAGES.find((l) => l.code === language) ||
      SUPPORTED_LANGUAGES.find((l) => l.code === DEFAULT_LANGUAGE)!
    );
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      supportedLanguages: SUPPORTED_LANGUAGES,
      currentLanguageMeta,
    }),
    [language, setLanguage, t, currentLanguageMeta]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback safe defaults if rendered outside of provider
    return {
      language: DEFAULT_LANGUAGE,
      setLanguage: () => {},
      t: (key, params) => getTranslation(DEFAULT_LANGUAGE, key, params),
      supportedLanguages: SUPPORTED_LANGUAGES,
      currentLanguageMeta: SUPPORTED_LANGUAGES[0],
    };
  }
  return context;
};
