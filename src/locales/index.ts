import az from "./az";
import en from "./en";
import type { Lang } from "@/util/apiClient";

export type Locale = typeof az;

const locales: Record<Lang, Locale> = { az, en };

export function getLocale(lang: Lang): Locale {
  return locales[lang];
}

export { az, en };
