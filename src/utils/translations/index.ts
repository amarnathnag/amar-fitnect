
import { toast } from '@/hooks/use-toast';
import { Language, TranslationKey } from './types';
import { commonTranslations } from './common';
import { workoutTranslations } from './workout';
import { dietTranslations } from './diet';
import { exerciseTranslations } from './exercise';

// Combine all translations
export const translations = {
  ...commonTranslations,
  ...workoutTranslations,
  ...dietTranslations,
  ...exerciseTranslations
} as Record<TranslationKey, Record<Language, string>>;

// Use 'export type' syntax for types when isolatedModules is enabled
export type { Language, TranslationKey } from './types';

export const translateText = (key: string, language: Language): string => {
  if (!translations[key as TranslationKey]) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translations[key as TranslationKey][language] || translations[key as TranslationKey].english;
};

export const notifyLanguageChange = (language: Language): void => {
  toast({
    title: translateText("language_changed", language),
    duration: 2000,
  });
};
