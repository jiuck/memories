import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en_base from "./locales/en/base.json";
import es_base from "./locales/es/base.json";

// the translations: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: { ...en_base },
  },
  es: {
    translation: { ...es_base },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "es", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    debug: true,
  });

export default i18n;
