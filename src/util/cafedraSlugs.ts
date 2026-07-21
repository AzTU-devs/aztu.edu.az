import type { ScientificSectionKey } from "@/types/scientificActivity";

/**
 * The six scientific-activity sub-sections. Order matches the server-computed
 * `available` array; the sidebar and the hub both filter this list by it.
 */
export const SCIENTIFIC_NAV: {
  key: ScientificSectionKey;
  az: string;
  en: string;
  azLabel: string;
  enLabel: string;
}[] = [
  { key: "research_areas", az: "tedqiqat-saheleri", en: "research-areas", azLabel: "Tədqiqat sahələri", enLabel: "Research Areas" },
  { key: "projects_grants", az: "elmi-layiheler-ve-qrantlar", en: "scientific-projects-and-grants", azLabel: "Elmi layihələr və qrantlar", enLabel: "Scientific Projects and Grants" },
  { key: "laboratories", az: "laboratoriyalar", en: "laboratories", azLabel: "Laboratoriyalar", enLabel: "Laboratories" },
  { key: "publications", az: "elmi-neshrler", en: "scientific-publications", azLabel: "Elmi nəşrlər", enLabel: "Scientific Publications" },
  { key: "patents", az: "patentler", en: "patents", azLabel: "Patentlər", enLabel: "Patents" },
  { key: "industry_cooperation", az: "senaye-ile-emekdasliq", en: "industry-cooperation", azLabel: "Sənaye ilə əməkdaşlıq", enLabel: "Cooperation with Industries" },
  { key: "international_cooperation", az: "beynelxalq-elmi-emekdasliq", en: "international-scientific-cooperation", azLabel: "Beynəlxalq elmi əməkdaşlıq", enLabel: "International Scientific Cooperation" },
];

/**
 * Cafedra sub-page slugs (EN → internal AZ folder names). Applied to the path
 * tail AFTER the cafedra code so EN department deep-links resolve to the real
 * App Router folders under /faculties/[facultyId]/kafedralar/[cafedraId]/…
 *
 * Shared by `middleware.ts` (rewrite) and `LanguageContext.tsx` (language
 * switcher) so the two cannot drift. These pairs deliberately live OUTSIDE the
 * global SLUG_MAP — that layer 307-redirects and would fight the tail translator.
 */
export const CAFEDRA_PAGE_MAP: Record<string, string> = {
  introduction: "giris",
  about: "haqqimizda",
  specialties: "ixtisaslar",
  specializations: "ixtisaslar",
  "scientific-activity": "elmi-fealiyyet",
  "head-of-department": "kafedra-mudiri",
  staff: "emekdaslar",
  news: "xeberler",
  contact: "elaqe",
  "research-areas": "tedqiqat-saheleri",
  "scientific-projects-and-grants": "elmi-layiheler-ve-qrantlar",
  laboratories: "laboratoriyalar",
  "scientific-publications": "elmi-neshrler",
  "patents": "patentler",
  "industry-cooperation": "senaye-ile-emekdasliq",
  "international-scientific-cooperation": "beynelxalq-elmi-emekdasliq",
  other: "diger",
};

/** AZ folder name → EN slug. Used by the language switcher only. */
export const CAFEDRA_PAGE_MAP_REVERSE: Record<string, string> = {
  giris: "introduction",
  haqqimizda: "about",
  ixtisaslar: "specializations",
  "elmi-fealiyyet": "scientific-activity",
  "kafedra-mudiri": "head-of-department",
  emekdaslar: "staff",
  xeberler: "news",
  elaqe: "contact",
  "tedqiqat-saheleri": "research-areas",
  "elmi-layiheler-ve-qrantlar": "scientific-projects-and-grants",
  laboratoriyalar: "laboratories",
  "elmi-neshrler": "scientific-publications",
  "patentler": "patents",
  "senaye-ile-emekdasliq": "industry-cooperation",
  "beynelxalq-elmi-emekdasliq": "international-scientific-cooperation",
  diger: "other",
};

/**
 * Translates every segment of a cafedra page tail. Segments with no mapping —
 * cafedra codes, numeric publication years — pass through untouched.
 */
export function translateCafedraTail(tail: string[], lang: "az" | "en"): string[] {
  const map = lang === "az" ? CAFEDRA_PAGE_MAP : CAFEDRA_PAGE_MAP_REVERSE;
  return tail.map((seg) => map[seg] ?? seg);
}
