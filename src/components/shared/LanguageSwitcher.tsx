"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type Variant = "header-open" | "header-closed" | "drawer";

interface Props {
  variant?: Variant;
}

export default function LanguageSwitcher({ variant = "header-open" }: Props) {
  const { lang, toggleLang } = useLanguage();
  const label = lang === "az" ? "EN" : "AZ";

  if (variant === "header-open") {
    return (
      <motion.button
        onClick={toggleLang}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.15 }}
        className="rounded-lg w-10 h-10 flex items-center justify-center font-bold text-sm bg-[#1a2355] dark:bg-[#1e3a5f] text-white cursor-pointer"
        aria-label="Switch language"
      >
        {label}
      </motion.button>
    );
  }

  if (variant === "header-closed") {
    return (
      <motion.button
        onClick={toggleLang}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.15 }}
        className="rounded-lg w-10 h-10 flex items-center justify-center font-bold text-sm bg-white/10 text-white hover:bg-white/25 transition-all cursor-pointer"
        aria-label="Switch language"
      >
        {label}
      </motion.button>
    );
  }

  // drawer variant
  return (
    <button
      onClick={toggleLang}
      className="ml-auto rounded-lg w-8 h-8 flex items-center justify-center font-bold text-xs text-white bg-white/10 hover:bg-white/25 transition-all cursor-pointer"
      aria-label="Switch language"
    >
      {label}
    </button>
  );
}
