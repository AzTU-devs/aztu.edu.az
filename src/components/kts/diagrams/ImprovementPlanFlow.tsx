"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import SearchIcon from "@mui/icons-material/Search";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import TuneIcon from "@mui/icons-material/Tune";
import CampaignIcon from "@mui/icons-material/Campaign";

const STEPS = [
  {
    color: "#3b82f6",
    icon: SearchIcon,
    az: { title: "Problemlərin müəyyən edilməsi", body: "Sorğular, audit və geribildirim ilə zəif sahələrin aşkarlanması." },
    en: { title: "Problem identification", body: "Spotting weak areas through surveys, audits and feedback." },
  },
  {
    color: "#8b5cf6",
    icon: EventNoteIcon,
    az: { title: "Planlaşdırma mərhələsi", body: "Strateji hədəflərə uyğun tədbir planının hazırlanması." },
    en: { title: "Planning phase", body: "Drafting an action plan aligned with strategic goals." },
  },
  {
    color: "#ec4899",
    icon: PlayCircleOutlineIcon,
    az: { title: "İcra mərhələsi", body: "Məsul şəxslərin təyinatı və tədbirlərin həyata keçirilməsi." },
    en: { title: "Execution phase", body: "Assigning owners and carrying out the planned actions." },
  },
  {
    color: "#f59e0b",
    icon: MonitorHeartIcon,
    az: { title: "Monitorinq və qiymətləndirmə", body: "İcra göstəricilərinin müntəzəm izlənməsi və ölçülməsi." },
    en: { title: "Monitoring & evaluation", body: "Continuously tracking and measuring execution metrics." },
  },
  {
    color: "#10b981",
    icon: TuneIcon,
    az: { title: "Təhlil və düzəlişlər", body: "Nəticələrin təhlili və zəruri düzəlişlərin aparılması." },
    en: { title: "Analysis & adjustments", body: "Reviewing results and applying the needed corrections." },
  },
  {
    color: "#06b6d4",
    icon: CampaignIcon,
    az: { title: "Hesabatlıq və yayım", body: "Nəticələrin maraqlı tərəflərlə şəffaf paylaşılması." },
    en: { title: "Reporting & dissemination", body: "Sharing outcomes transparently with stakeholders." },
  },
];

export default function ImprovementPlanFlow() {
  const { lang } = useLanguage();
  const eyebrow = lang === "az" ? "AzTU – Təkmilləşdirmə planı" : "AzTU – Improvement plan";
  const note =
    lang === "az"
      ? "Keyfiyyətin davamlı artırılması və strateji hədəflərə nail olmaq üçün mərhələli fəaliyyət planı."
      : "A staged action plan for continuous quality improvement and reaching strategic goals.";

  return (
    <div className="w-full rounded-[1.5rem] overflow-hidden border-2 border-[#1a2355]/30 dark:border-white/5 bg-gradient-to-br from-white via-blue-50/40 to-white dark:from-[#0b1632] dark:via-[#0d1b3e] dark:to-[#0b1632] p-6 md:p-8 mb-8">
      <div className="mb-6">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#ee7c7e]">{eyebrow}</p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{note}</p>
      </div>

      <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-blue-500 via-pink-500 to-cyan-500 opacity-30" />
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          const t = lang === "az" ? s.az : s.en;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="relative flex flex-col items-center text-center"
            >
              <div
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg z-10"
                style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)` }}
              >
                <Icon sx={{ fontSize: 24, color: "white" }} />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white dark:bg-[#0d1b3e] text-[10px] font-black flex items-center justify-center shadow border border-[#1a2355]/20 dark:border-white/10" style={{ color: s.color }}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <h4 className="mt-3 text-xs md:text-sm font-black uppercase tracking-tight text-[#1a2355] dark:text-white leading-tight">
                {t.title}
              </h4>
              <p className="mt-1 text-[11px] text-gray-600 dark:text-gray-400 leading-snug">{t.body}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
