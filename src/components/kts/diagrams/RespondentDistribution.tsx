"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const SLICES = [
  { az: "Ümumi tələbə məmnunluq sorğusu", en: "Overall student satisfaction survey", count: 1551, pct: 31.3, color: "#3b82f6" },
  { az: "Workshop sorğuları (ümumi)", en: "Workshop surveys (overall)", count: 2059, pct: 41.6, color: "#10b981" },
  { az: "I kurs tələbələri (2024)", en: "First-year students (2024)", count: 666, pct: 13.5, color: "#8b5cf6" },
  { az: "Demoqrafik sorğu", en: "Demographic survey", count: 409, pct: 8.3, color: "#f59e0b" },
  { az: "Akademik heyət məmnunluq sorğusu", en: "Academic staff satisfaction", count: 134, pct: 2.7, color: "#ec4899" },
  { az: "Əcnəbi tələbələri (2025)", en: "International students (2025)", count: 95, pct: 1.9, color: "#06b6d4" },
  { az: "Workshop sorğuları (ortalama)", en: "Workshop surveys (average)", count: 57, pct: 1.2, color: "#a3a3a3" },
];

const TOTAL = 4949;

export default function RespondentDistribution() {
  const { lang } = useLanguage();
  const title = lang === "az" ? "Respondentlərin paylanması" : "Respondent distribution";
  const period = "2024 – 2026";
  const subtitle = lang === "az" ? "Tədris ili üzrə ümumi sorğular" : "Overall surveys for the academic year";
  const totalLabel = lang === "az" ? "Ümumi" : "Total";
  const respondentLabel = lang === "az" ? "respondent" : "respondents";
  const categoryLabel = lang === "az" ? "Sorğu kateqoriyası" : "Survey category";
  const countLabel = lang === "az" ? "Respondent sayı" : "Respondents";
  const pctLabel = lang === "az" ? "Pay (%)" : "Share (%)";
  const footnote =
    lang === "az"
      ? "Bütün sorğular üzrə iştirak edən respondentlərin ümumi sayı."
      : "Total number of respondents across all surveys.";

  // Donut math
  const radius = 70;
  const stroke = 28;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="w-full rounded-[12px] overflow-hidden border-2 border-[#1a2355]/30 dark:border-white/5 bg-gradient-to-br from-white via-blue-50/40 to-white dark:from-[#0b1632] dark:via-[#0d1b3e] dark:to-[#0b1632] p-6 md:p-8 mb-8">
      <div className="mb-6">
        <h3 className="text-lg font-black uppercase tracking-tight text-[#1a2355] dark:text-white">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {period} · {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
        {/* Donut */}
        <div className="md:col-span-2 flex justify-center">
          <div className="relative">
            <svg width="220" height="220" viewBox="0 0 200 200" className="-rotate-90">
              <circle cx="100" cy="100" r={radius} fill="none" stroke="currentColor" className="text-gray-200 dark:text-white/5" strokeWidth={stroke} />
              {SLICES.map((s, i) => {
                const length = (s.pct / 100) * circumference;
                const dasharray = `${length} ${circumference - length}`;
                const el = (
                  <motion.circle
                    key={i}
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={stroke}
                    strokeDasharray={dasharray}
                    strokeDashoffset={-offset}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.06 }}
                  />
                );
                offset += length;
                return el;
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[10px] uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400 font-black">{totalLabel}</p>
              <p className="text-3xl font-black text-[#1a2355] dark:text-white leading-none mt-1">
                {TOTAL.toLocaleString()}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">{respondentLabel}</p>
            </div>
          </div>
        </div>

        {/* Legend table */}
        <div className="md:col-span-3 bg-white/70 dark:bg-[#0b1632]/60 rounded-2xl border border-[#1a2355]/15 dark:border-white/5 overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400 border-b border-[#1a2355]/10 dark:border-white/5">
            <div className="col-span-7">{categoryLabel}</div>
            <div className="col-span-3 text-right">{countLabel}</div>
            <div className="col-span-2 text-right">{pctLabel}</div>
          </div>
          {SLICES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="grid grid-cols-12 px-4 py-2 items-center text-xs border-b border-[#1a2355]/5 dark:border-white/5 last:border-0"
            >
              <div className="col-span-7 flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="truncate text-[#1a2355] dark:text-white">{lang === "az" ? s.az : s.en}</span>
              </div>
              <div className="col-span-3 text-right font-bold text-[#1a2355] dark:text-white">
                {s.count.toLocaleString()}
              </div>
              <div className="col-span-2 text-right text-gray-500 dark:text-gray-400">{s.pct}%</div>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[11px] text-gray-500 dark:text-gray-400 italic">{footnote}</p>
    </div>
  );
}
