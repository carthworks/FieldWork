import { SupportedLanguage, TranslationDictionary, SUPPORTED_LANGUAGES } from './types';
import { en } from './locales/en';
import { ta } from './locales/ta';
import { hi } from './locales/hi';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { de } from './locales/de';

export * from './types';

export const DICTIONARIES: Record<SupportedLanguage, TranslationDictionary> = {
  en,
  ta,
  hi,
  es,
  fr,
  de,
};

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export function getTranslation(
  lang: SupportedLanguage,
  key: keyof TranslationDictionary,
  params?: Record<string, string | number>
): string {
  const dict = DICTIONARIES[lang] || DICTIONARIES[DEFAULT_LANGUAGE];
  let text = dict[key] || DICTIONARIES[DEFAULT_LANGUAGE][key] || String(key);

  if (params) {
    Object.entries(params).forEach(([paramKey, paramVal]) => {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
    });
  }

  return text;
}

export function isValidLanguage(code: string): code is SupportedLanguage {
  return SUPPORTED_LANGUAGES.some((lang) => lang.code === code);
}
