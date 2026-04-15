"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { setDefaultLang } from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";
import { translateDepartmentSlug, getDepartments } from "@/services/departmentService/departmentService";
import { translateInstituteSlug, getResearchInstitutes } from "@/services/researchInstituteService/researchInstituteService";

type LanguageContextType = {
  lang: Lang;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "az",
  toggleLang: () => {},
});

function getLangFromPathname(pathname: string): Lang {
  const first = pathname.split("/").filter(Boolean)[0];
  if (first === "en") return "en";
  return "az";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Deriving lang directly from pathname for instant sync during render
  const langFromUrl = useMemo(() => getLangFromPathname(pathname), [pathname]);
  const [lang, setLang] = useState<Lang>(langFromUrl);

  // Sync state if URL changes externally
  useEffect(() => {
    if (lang !== langFromUrl) {
      setLang(langFromUrl);
    }
    setDefaultLang(langFromUrl);
    document.documentElement.lang = langFromUrl;
    localStorage.setItem("aztu-lang", langFromUrl);
    
    // Warm up caches
    getDepartments({ lang: langFromUrl });
    getResearchInstitutes({ lang: langFromUrl });
  }, [langFromUrl]);

  const toggleLang = () => {
    const newLang: Lang = lang === "az" ? "en" : "az";
    const segments = pathname.split("/").filter(Boolean);
    
    if (segments[0] === "az" || segments[0] === "en") {
      segments[0] = newLang;
      
      // Translate slugs for the new Academic/Faculties structure
      const isAcademicFaculties = (segments[1] === "academic" && segments[2] === "faculties") || 
                                  (segments[1] === "akademik" && segments[2] === "fakulteler") ||
                                  (segments[1] === "faculties");

      if (isAcademicFaculties) {
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

          // If we were in the old flat structure, expand it
          if (segments[1] === "faculties") {
              const facultyId = segments[2];
              const subPage = segments[3];
              const subSubPage = segments[4];
              
              segments.splice(1, 1, newLang === "en" ? "academic" : "akademik", newLang === "en" ? "faculties" : "fakulteler");
              // Now segments[1] is academic/akademik, segments[2] is faculties/fakulteler, segments[3] is facultyId
              if (subPage) {
                  let translatedSub = subPage;
                  if (newLang === "en") {
                      if (subMapping[subPage]) translatedSub = subMapping[subPage];
                  } else {
                      if (reverseSubMapping[subPage]) translatedSub = reverseSubMapping[subPage];
                  }
                  segments[4] = translatedSub;
              }
              if (subSubPage) {
                  let translatedSubSub = subSubPage;
                  if (newLang === "en") {
                      if (subSubMapping[subSubPage]) translatedSubSub = subSubMapping[subSubPage];
                  } else {
                      if (reverseSubSubMapping[subSubPage]) translatedSubSub = reverseSubSubMapping[subSubPage];
                  }
                  segments[5] = translatedSubSub;
              }
          } else {
              // We are already in the new structure
              segments[1] = newLang === "en" ? "academic" : "akademik";
              segments[2] = newLang === "en" ? "faculties" : "fakulteler";
              
              if (segments[4]) {
                  if (newLang === "en") {
                      if (subMapping[segments[4]]) segments[4] = subMapping[segments[4]];
                      if (segments[5] && subSubMapping[segments[5]]) segments[5] = subSubMapping[segments[5]];
                  } else {
                      if (reverseSubMapping[segments[4]]) segments[4] = reverseSubMapping[segments[4]];
                      if (segments[5] && reverseSubSubMapping[segments[5]]) segments[5] = reverseSubSubMapping[segments[5]];
                  }
              }
          }
      }

      // Translate slugs for research institutes
      if ((segments[1] === "research" || segments[1] === "tedqiqat") && segments[2] && segments[3]) {
        const azToEnResearch: Record<string, string> = {
            "tedqiqat-fealiyyeti": "research-activity",
            "tedqiqat-institutlari": "research-institutes",
            "tedqiqat-prioritetleri": "tedqiqat-prioritetleri",
            "tedqiqat-layiheleri": "research-projects",
            "eqli-mulkiyyet-ve-patentler": "intellectual-property-and-patents",
            "performans-ve-qiymetlendirme": "performance-and-evaluation",
            "daxili-qrant-proqramlari": "daxili-qrant-proqramlari",
            "konfranslar-ve-tedbirler": "conferences-and-events",
            "seminarlar-ve-telimler": "seminars-and-trainings",
            "direktor": "director",
            "heyet": "staff",
            "elaqe": "contact"
        };
        const enToAzResearch: Record<string, string> = {
            "research-activity": "tedqiqat-fealiyyeti",
            "research-institutes": "tedqiqat-institutlari",
            "tedqiqat-prioritetleri": "tedqiqat-prioritetleri",
            "research-projects": "tedqiqat-layiheleri",
            "intellectual-property-and-patents": "eqli-mulkiyyet-ve-patentler",
            "performance-and-evaluation": "performans-ve-qiymetlendirme",
            "internal-grant-programs": "daxili-qrant-proqramlari",
            "conferences-and-events": "konfranslar-ve-tedbirler",
            "seminars-and-trainings": "seminarlar-ve-telimler",
            "director": "direktor",
            "staff": "heyet",
            "contact": "elaqe"
        };

        if (newLang === "en") {
            segments[1] = "research";
            if (azToEnResearch[segments[2]]) segments[2] = azToEnResearch[segments[2]];
            if (azToEnResearch[segments[3]]) segments[3] = azToEnResearch[segments[3]];
            if (segments[4]) segments[4] = translateInstituteSlug(segments[4], "en");
            if (segments[5] && azToEnResearch[segments[5]]) segments[5] = azToEnResearch[segments[5]];
        } else {
            segments[1] = "tedqiqat";
            if (enToAzResearch[segments[2]]) segments[2] = enToAzResearch[segments[2]];
            if (enToAzResearch[segments[3]]) segments[3] = enToAzResearch[segments[3]];
            if (segments[4]) segments[4] = translateInstituteSlug(segments[4], "az");
            if (segments[5] && enToAzResearch[segments[5]]) segments[5] = enToAzResearch[segments[5]];
        }
      }

      // Translate slugs for departments
      if ((segments[1] === "management" || segments[1] === "idareetme") && segments[2] && segments[3]) {
        const azToEnDept: Record<string, string> = {
            "struktur-bolmeler": "structural-units",
            "haqqimizda": "about",
            "rehberlik": "leadership",
            "emekdaslar": "staff"
        };
        const enToAzDept: Record<string, string> = {
            "structural-units": "struktur-bolmeler",
            "about": "haqqimizda",
            "leadership": "rehberlik",
            "staff": "emekdaslar"
        };

        if (newLang === "en") {
            segments[1] = "management";
            if (azToEnDept[segments[2]]) segments[2] = azToEnDept[segments[2]];
            if (segments[3]) segments[3] = translateDepartmentSlug(segments[3], "en");
            if (segments[4] && azToEnDept[segments[4]]) segments[4] = azToEnDept[segments[4]];
        } else {
            segments[1] = "idareetme";
            if (enToAzDept[segments[2]]) segments[2] = enToAzDept[segments[2]];
            if (segments[3]) segments[3] = translateDepartmentSlug(segments[3], "az");
            if (segments[4] && enToAzDept[segments[4]]) segments[4] = enToAzDept[segments[4]];
        }
      }

      // Translate slugs for Rector
      if ((segments[1] === "about" || segments[1] === "haqqimizda") && 
          (segments[2] === "leadership-and-management" || segments[2] === "rehbetlik-ve-idareetme") &&
          (segments[3] === "rector" || segments[3] === "rektor")) {
          if (newLang === "en") {
              segments[1] = "about";
              segments[2] = "leadership-and-management";
              segments[3] = "rector";
          } else {
              segments[1] = "haqqimizda";
              segments[2] = "rehbetlik-ve-idareetme";
              segments[3] = "rektor";
          }
      }

      // Translate slugs for Vision & Mission
      if ((segments[1] === "about" || segments[1] === "haqqimizda") && 
          (segments[2] === "vision-mission" || segments[2] === "vizyon-ve-missiya")) {
          if (newLang === "en") {
              segments[1] = "about";
              segments[2] = "vision-mission";
              if (segments[3] === "vizyon") segments[3] = "vision";
              if (segments[3] === "missiya") segments[3] = "mission";
          } else {
              segments[1] = "haqqimizda";
              segments[2] = "vizyon-ve-missiya";
              if (segments[3] === "vision") segments[3] = "vizyon";
              if (segments[3] === "mission") segments[3] = "missiya";
          }
      }
    } else {
      segments.unshift(newLang);
    }
    
    // Optimistically update local state before navigation to reduce flicker
    setLang(newLang);
    router.push("/" + segments.join("/"));
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
