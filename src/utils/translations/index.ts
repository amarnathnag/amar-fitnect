
import { toast } from '@/hooks/use-toast';
import { Language, TranslationKey } from './types';
import { commonTranslations } from './common';
import { workoutTranslations } from './workout';
import { dietTranslations } from './diet';
import { exerciseTranslations } from './exercise';

// Combine all translations
export const translations: Record<TranslationKey, Record<Language, string>> = {
  ...commonTranslations,
  ...workoutTranslations,
  ...dietTranslations,
  ...exerciseTranslations
};

export { Language, TranslationKey } from './types';

export const translateText = (key: string, language: Language): string => {
  if (!translations[key]) {
    console.warn(`Translation missing for key: ${key}`);
    return key;
  }
  return translations[key][language] || translations[key].english;
};

export const notifyLanguageChange = (language: Language): void => {
  toast({
    title: translateText("language_changed", language),
    duration: 2000,
  });
};
