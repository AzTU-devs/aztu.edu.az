"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import PublicIcon from "@mui/icons-material/Public";
import ApartmentIcon from "@mui/icons-material/Apartment";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

const CATEGORIES = [
  {
    color: "#3b82f6",
    icon: SchoolIcon,
    az: { title: "Tədris və akademik keyfiyyət", items: [["Tədris proqramlarının akkreditasiyası", "95%"], ["Müasir kurikulumların payı", "90%"], ["Praktiki dərslərin nisbəti", "92%"]] },
    en: { title: "Teaching & academic quality", items: [["Accredited programmes", "95%"], ["Modernised curricula", "90%"], ["Practical sessions ratio", "92%"]] },
  },
  {
    color: "#0ea5e9",
    icon: GroupsIcon,
    az: { title: "Tələbə göstəriciləri", items: [["Məzun olma nisbəti", "95%"], ["Tələbə məmnunluğu", "85%"], ["İşə düzəlmə (məzun)", "78%"]] },
    en: { title: "Student indicators", items: [["Graduation rate", "95%"], ["Student satisfaction", "85%"], ["Graduate employment", "78%"]] },
  },
  {
    color: "#10b981",
    icon: WorkOutlineIcon,
    az: { title: "Əmək bazarı", items: [["İşəgötürən məmnunluğu", "87%"], ["Tərəfdaş şirkət sayı", "82%"], ["Stajirovka əhatəsi", "75%"]] },
    en: { title: "Labour market", items: [["Employer satisfaction", "87%"], ["Partner companies", "82%"], ["Internship coverage", "75%"]] },
  },
  {
    color: "#f59e0b",
    icon: PersonOutlineIcon,
    az: { title: "Akademik heyət", items: [["PhD dərəcəli müəllimlər", "85%"], ["İlkin tədqiqat publikasiyaları", "62%"], ["Müəllim inkişaf təlimləri", "75%"]] },
    en: { title: "Academic staff", items: [["PhD-holding faculty", "85%"], ["Research publications", "62%"], ["Staff development training", "75%"]] },
  },
  {
    color: "#8b5cf6",
    icon: ScienceOutlinedIcon,
    az: { title: "Elmi-tədqiqat fəaliyyəti", items: [["Elmi layihələr", "80%"], ["Beynəlxalq publikasiyalar", "70%"], ["Patent və ixtiralar", "65%"]] },
    en: { title: "Research activity", items: [["Research projects", "80%"], ["International publications", "70%"], ["Patents & inventions", "65%"]] },
  },
  {
    color: "#06b6d4",
    icon: PublicIcon,
    az: { title: "Beynəlxalq əlaqələr", items: [["Mübadilə proqramları", "78%"], ["Tərəfdaş universitetlər", "84%"], ["Beynəlxalq tələbə payı", "12%"]] },
    en: { title: "International relations", items: [["Exchange programmes", "78%"], ["Partner universities", "84%"], ["International student share", "12%"]] },
  },
  {
    color: "#ec4899",
    icon: ApartmentIcon,
    az: { title: "Xidmətlər və infrastruktur", items: [["Rəqəmsal xidmətlər", "92%"], ["Kampus infrastrukturu", "88%"], ["Kitabxana resursları", "85%"]] },
    en: { title: "Services & infrastructure", items: [["Digital services", "92%"], ["Campus infrastructure", "88%"], ["Library resources", "85%"]] },
  },
  {
    color: "#14b8a6",
    icon: VerifiedOutlinedIcon,
    az: { title: "İdarəetmə və keyfiyyət təminatı", items: [["Daxili audit əhatəsi", "100%"], ["Strateji hədəflərin icrası", "86%"], ["KT proseslərində iştirak", "82%"]] },
    en: { title: "Governance & quality assurance", items: [["Internal audit coverage", "100%"], ["Strategic goal execution", "86%"], ["QA process participation", "82%"]] },
  },
];

export default function KpiOverview() {
  const { lang } = useLanguage();
  const title = lang === "az" ? "AzTU – Əsas Göstəricilər (KPI)" : "AzTU – Key Performance Indicators (KPI)";
  const subtitle =
    lang === "az"
      ? "Universitetin strateji performans göstəriciləri"
      : "Strategic performance indicators of the university";

  return (
    <div className="w-full rounded-[2rem] overflow-hidden border-2 border-[#1a2355]/30 dark:border-white/5 bg-gradient-to-br from-white via-blue-50/40 to-white dark:from-[#0b1632] dark:via-[#0d1b3e] dark:to-[#0b1632] p-6 md:p-8 mb-8">
      <div className="mb-6">
        <h3 className="text-lg font-black uppercase tracking-tight text-[#1a2355] dark:text-white">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((c, i) => {
          const Icon = c.icon;
          const t = lang === "az" ? c.az : c.en;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="bg-white/80 dark:bg-[#0b1632]/60 rounded-2xl border border-[#1a2355]/15 dark:border-white/5 p-4 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${c.color}15` }}
                >
                  <Icon sx={{ fontSize: 18, color: c.color }} />
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#1a2355] dark:text-white leading-tight">
                  {String(i + 1).padStart(2, "0")}. {t.title}
                </span>
              </div>
              <div className="space-y-2">
                {t.items.map(([label, value], j) => (
                  <div key={j}>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-600 dark:text-gray-400 leading-tight pr-2">{label}</span>
                      <span className="font-black text-[#1a2355] dark:text-white" style={{ color: c.color }}>
                        {value}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-gray-200 dark:bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: value }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.04 + j * 0.05 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${c.color}, ${c.color}aa)` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
