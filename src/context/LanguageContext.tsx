"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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

function getLangFromPathname(pathname: string): Lang | null {
  const first = pathname.split("/").filter(Boolean)[0];
  if (first === "az" || first === "en") return first;
  return null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("az");

  useEffect(() => {
    const urlLang = getLangFromPathname(pathname);
    if (urlLang) {
      setLang(urlLang);
      setDefaultLang(urlLang);
      document.documentElement.lang = urlLang;
      localStorage.setItem("aztu-lang", urlLang);
    }
  }, [pathname]);

  const toggleLang = () => {
    const newLang: Lang = lang === "az" ? "en" : "az";
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "az" || segments[0] === "en") {
      segments[0] = newLang;
    } else {
      segments.unshift(newLang);
    }
    router.push("/" + segments.join("/"));
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
