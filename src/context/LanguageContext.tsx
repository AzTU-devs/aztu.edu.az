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
      
      // Translate slugs if we're in the faculties section
      if (segments[1] === "faculties" && segments[3]) {
          const subMapping: Record<string, string> = {
              "haqqimizda": "about",
              "kafedralar": "departments",
              "ixtisaslar": "specializations",
              "beynelxalq-elaqeler": "international-relations"
          };
          const reverseSubMapping: Record<string, string> = {
              "about": "haqqimizda",
              "departments": "kafedralar",
              "specializations": "ixtisaslar",
              "international-relations": "beynelxalq-elaqeler"
          };

          const subSubMapping: Record<string, string> = {
              "dekan": "dean",
              "dekan-muavinleri": "deputy-deans",
              "elmi-sura": "scientific-council",
              "akademik-heyat": "academic-staff",
              "emekdaslar": "staff",
              "elaqe": "contact"
          };
          const reverseSubSubMapping: Record<string, string> = {
              "dean": "dekan",
              "deputy-deans": "dekan-muavinleri",
              "scientific-council": "elmi-sura",
              "academic-staff": "akademik-heyat",
              "staff": "emekdaslar",
              "contact": "elaqe"
          };

          if (newLang === "en") {
              // AZ -> EN
              if (subMapping[segments[3]]) segments[3] = subMapping[segments[3]];
              if (segments[4] && subSubMapping[segments[4]]) segments[4] = subSubMapping[segments[4]];
          } else {
              // EN -> AZ
              if (reverseSubMapping[segments[3]]) segments[3] = reverseSubMapping[segments[3]];
              if (segments[4] && reverseSubSubMapping[segments[4]]) segments[4] = reverseSubSubMapping[segments[4]];
          }
      }
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
