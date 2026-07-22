"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";

const BARS = [
  { az: "Ümumi tələbə məmnunluğu", en: "Overall student satisfaction", value: 76.4, color: "#3b82f6" },
  { az: "I kurs tələbələri", en: "First-year students", value: 72.8, color: "#0ea5e9" },
  { az: "Əcnəbi tələbələr", en: "International students", value: 86.2, color: "#10b981" },
  { az: "Demoqrafik sorğu", en: "Demographic survey", value: 74.3, color: "#8b5cf6" },
  { az: "Əmək bazarı", en: "Labour market", value: 84.0, color: "#f59e0b" },
  { az: "Akademik heyət", en: "Academic staff", value: 81.5, color: "#ec4899" },
];

const STATS = [
  { az: "Ümumi məmnunluq", en: "Overall satisfaction", value: 78.6, color: "#3b82f6", icon: SentimentSatisfiedAltIcon },
  { az: "Akademik məmnunluq", en: "Academic satisfaction", value: 86.2, color: "#10b981", icon: SchoolIcon },
  { az: "İştirak nisbəti", en: "Participation rate", value: 68.1, color: "#ec4899", icon: GroupsIcon },
];

export default function SatisfactionLevels() {
  const { lang } = useLanguage();
  const title = lang === "az" ? "Məmnunluq Səviyyəsi" : "Satisfaction Level";
  const period = "2024 – 2025";
  const subtitle = lang === "az" ? "Tədris ili üzrə sorğular" : "Surveys for the academic year";
  const surveysLabel = lang === "az" ? "Sorğular üzrə məmnunluq səviyyəsi (%)" : "Satisfaction level by survey (%)";
  const overallLabel = lang === "az" ? "Ümumi göstəricilər" : "Overall indicators";

  return (
    <div className="w-full rounded-[1.5rem] overflow-hidden border-2 border-[#1a2355]/30 dark:border-white/5 bg-gradient-to-br from-white via-blue-50/40 to-white dark:from-[#0b1632] dark:via-[#0d1b3e] dark:to-[#0b1632] p-6 md:p-8 mb-8">
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <h3 className="text-lg font-black uppercase tracking-tight text-[#1a2355] dark:text-white">{title}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {period} · {subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="lg:col-span-2 bg-white/70 dark:bg-[#0b1632]/60 rounded-2xl border border-[#1a2355]/15 dark:border-white/5 p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-4">
            {surveysLabel}
          </p>
          <div className="flex items-end gap-3 h-52">
            {BARS.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-black text-[#1a2355] dark:text-white">{b.value}%</span>
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${b.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease: "easeOut" }}
                  className="w-full rounded-t-lg"
                  style={{ background: `linear-gradient(180deg, ${b.color}, ${b.color}99)` }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-3">
            {BARS.map((b, i) => (
              <p key={i} className="flex-1 text-[10px] text-center text-gray-600 dark:text-gray-400 leading-tight">
                {lang === "az" ? b.az : b.en}
              </p>
            ))}
          </div>
        </div>

        {/* Side stats */}
        <div className="space-y-3">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
            {overallLabel}
          </p>
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white/80 dark:bg-[#0b1632]/60 rounded-2xl border border-[#1a2355]/15 dark:border-white/5 p-4 flex items-center gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${s.color}15` }}
                >
                  <Icon sx={{ fontSize: 20, color: s.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                    {lang === "az" ? s.az : s.en}
                  </p>
                  <p className="text-xl font-black text-[#1a2355] dark:text-white leading-none mt-0.5">
                    {s.value}%
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
