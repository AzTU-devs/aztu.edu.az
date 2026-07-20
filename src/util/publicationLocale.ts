import type { PublicationQuartile } from "@/types/scientificActivity";

// Localized month names for dates written as "İyun 2025", "Mart 2026" etc.
const MONTH_EN: Record<string, string> = {
  Yanvar: "January", Fevral: "February", Mart: "March", Aprel: "April",
  May: "May", İyun: "June", İyul: "July", Avqust: "August",
  Sentyabr: "September", Oktyabr: "October", Noyabr: "November", Dekabr: "December",
};

/** `date` is free text, kept verbatim — only month names are swapped for EN. */
export function localizeDate(date: string, lang: string): string {
  if (lang !== "en") return date;
  return date.replace(
    /Yanvar|Fevral|Mart|Aprel|May|İyun|İyul|Avqust|Sentyabr|Oktyabr|Noyabr|Dekabr/g,
    (m) => MONTH_EN[m] ?? m
  );
}

export const QUARTILE_STYLES: Record<PublicationQuartile, string> = {
  Q1: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Q2: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  Q3: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Q4: "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
};
