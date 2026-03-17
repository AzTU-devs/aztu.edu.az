"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { setDefaultLang } from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";

type LanguageContextType = {
  lang: Lang;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "az",
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("az");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("aztu-lang") as Lang | null;
    if (stored === "az" || stored === "en") {
      setLang(stored);
      setDefaultLang(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("aztu-lang", lang);
    setDefaultLang(lang);
    document.documentElement.lang = lang;
  }, [lang, mounted]);

  const toggleLang = () => setLang((l) => (l === "az" ? "en" : "az"));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
