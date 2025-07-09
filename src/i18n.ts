import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Tạo các file JSON chứa bản dịch
import enTranslation from "./locales/en.json";
import viTranslation from "./locales/vi.json";

i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ trình duyệt
  .use(initReactI18next) // Kết nối i18next với React
  .init({
    debug: true, // Bật debug trong môi trường dev
    fallbackLng: "en", // Ngôn ngữ dự phòng
    interpolation: {
      escapeValue: false, // React đã tự chống XSS
    },
    resources: {
      en: {
        translation: enTranslation,
      },
      vi: {
        translation: viTranslation,
      },
    },
  });

export default i18n;
