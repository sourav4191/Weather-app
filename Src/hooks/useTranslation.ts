import { useWeather } from "./useWeather";
import { translations, TranslationKeys } from "../utils/translations";

export function useTranslation(): TranslationKeys {
  const { language } = useWeather();
  return translations[language] || translations.EN;
}

// Helper function for other components
export function getTranslation(language: string): TranslationKeys {
  return translations[language] || translations.EN;
}
