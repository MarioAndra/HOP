import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// استيراد ملفات اللغة
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';
import translationDE from './locales/de/translation.json';

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
  de: { translation: translationDE }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'querystring', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        try {
          if (format === 'number') return new Intl.NumberFormat(lng).format(value)
          if (format === 'percent') return new Intl.NumberFormat(lng, { style: 'percent', maximumFractionDigits: 1 }).format(value)
          if (format === 'currency') return new Intl.NumberFormat(lng, { style: 'currency', currency: 'EUR' }).format(value)
          if (format === 'date') return new Intl.DateTimeFormat(lng, { dateStyle: 'medium' }).format(value)
        } catch (e) {}
        return value
      }
    }
  });

export default i18n;