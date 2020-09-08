import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend"

import en from "./locales/en/en";
import ar from "./locales/ar/ar";

i18n
.use(Backend)
.use(LanguageDetector)
.use(initReactI18next).init({
  // we init with resources
  resources: {
    en: en,
    ar: ar
  },
  fallbackLng: "en",
  debug: false,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true,
    useSuspense: false
  }
});

export default i18n;
