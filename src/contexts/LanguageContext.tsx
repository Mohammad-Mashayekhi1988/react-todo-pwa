import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Language = "fa" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const LanguageContext =
  createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] =
    useState<Language>(() => {
      const savedLanguage =
        localStorage.getItem("language");

      if (
        savedLanguage === "fa" ||
        savedLanguage === "en"
      ) {
        return savedLanguage;
      }

      return "fa";
    });

  useEffect(() => {
    localStorage.setItem(
      "language",
      language
    );
  }, [language]);
  useEffect(() => {
  document.documentElement.dir =
    language === "fa"
      ? "rtl"
      : "ltr";
}, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
    setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context =
    useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}