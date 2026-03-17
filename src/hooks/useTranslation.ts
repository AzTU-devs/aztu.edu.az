"use client";

import { useLanguage } from "@/context/LanguageContext";
import { getLocale } from "@/locales";
import type { Locale } from "@/locales";

export function useTranslation(): Locale {
  const { lang } = useLanguage();
  return getLocale(lang);
}
