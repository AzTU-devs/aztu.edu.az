"use client";

import { use, useEffect, useState } from "react";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail } from "@/types/cafedra";
import SectionBlock from "@/components/shared/SectionBlock";
import InfoIcon from "@mui/icons-material/Info";
import { useLanguage } from "@/context/LanguageContext";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import PublicIcon from "@mui/icons-material/Public";
import BusinessIcon from "@mui/icons-material/Business";
import { motion } from "framer-motion";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function CafedraGirisPage({ params }: Props) {
  const { cafedraId } = use(params);
  const { lang } = useLanguage();
  const [cafedra, setCafedra] = useState<CafedraDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCafedraByCode(cafedraId, lang).then((data) => {
      setCafedra(data);
      setLoading(false);
    });
  }, [cafedraId, lang]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 dark:bg-slate-800 rounded-2xl" />
          ))}
        </div>
        <div className="h-64 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
      </div>
    );
  }

  if (!cafedra) {
    return (
      <SectionBlock accent>
        <div className="text-center py-10">
          <p className="text-gray-500">{lang === "az" ? "Məlumat tapılmadı" : "No information found"}</p>
        </div>
      </SectionBlock>
    );
  }

  const stats = [
    { label: lang === "az" ? "Bakalavr" : "Bachelor", value: cafedra.bachelor_programs_count, icon: <SchoolIcon /> },
    { label: lang === "az" ? "Magistr" : "Master", value: cafedra.master_programs_count, icon: <SchoolIcon /> },
    { label: lang === "az" ? "Doktorantura" : "PhD", value: cafedra.phd_programs_count, icon: <SchoolIcon /> },
    { label: lang === "az" ? "Laboratoriyalar" : "Laboratories", value: cafedra.laboratories_count, icon: <ScienceIcon /> },
    { label: lang === "az" ? "Beynəlxalq əlaqələr" : "Int. Relations", value: cafedra.international_collaborations_count, icon: <PublicIcon /> },
    { label: lang === "az" ? "Sənaye əlaqələri" : "Industrial Coll.", value: cafedra.industrial_collaborations_count, icon: <BusinessIcon /> },
    { label: lang === "az" ? "Patentlər/Layihələr" : "Patents/Projects", value: cafedra.projects_patents_count, icon: <ScienceIcon /> },
  ].filter(s => s.value > 0);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col items-center text-center group hover:border-[#ee7c7e] transition-all duration-300"
            >
              <div className="text-[#1a2355] dark:text-blue-400 mb-2 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                {stat.icon}
              </div>
              <span className="text-2xl font-black text-[#1a2355] dark:text-white mb-1">
                {stat.value}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      )}

      {/* About Section */}
      <SectionBlock title={lang === "az" ? "Kafedra haqqında" : "About Department"} accent>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <SanitizedHtml html={cafedra.html_content} />
        </div>
      </SectionBlock>

      {/* SDGs */}
      {cafedra.sdgs && cafedra.sdgs.length > 0 && (
        <SectionBlock title={lang === "az" ? "Dayanıqlı İnkişaf Məqsədləri" : "Sustainable Development Goals"} accent>
          <div className="flex flex-wrap gap-4">
            {cafedra.sdgs.map((sdg) => (
              <div key={sdg} className="relative group">
                <img
                  src={`https://api.aztu.edu.az/static/sdg/E_SDG_Icons-${sdg < 10 ? '0' + sdg : sdg}.jpg`}
                  alt={`SDG ${sdg}`}
                  className="w-16 h-16 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                     (e.target as HTMLImageElement).src = `https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${sdg < 10 ? '0' + sdg : sdg}.png`;
                  }}
                />
              </div>
            ))}
          </div>
        </SectionBlock>
      )}
    </div>
  );
}
