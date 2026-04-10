"use client";

import { use, useEffect, useState } from "react";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail, GenericSection } from "@/types/cafedra";
import SectionBlock from "@/components/shared/SectionBlock";
import { useLanguage } from "@/context/LanguageContext";
import ScienceIcon from "@mui/icons-material/Science";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FlagIcon from "@mui/icons-material/Flag";
import SettingsIcon from "@mui/icons-material/Settings";
import { motion } from "framer-motion";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function ElmiFealiyyetPage({ params }: Props) {
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
    return <div className="animate-pulse space-y-8">
        {[1,2,3].map(i => (
            <div key={i} className="h-48 bg-gray-200 dark:bg-slate-800 rounded-3xl" />
        ))}
    </div>;
  }

  if (!cafedra) return null;

  const sections = [
    { title: lang === "az" ? "Laboratoriyalar" : "Laboratories", data: cafedra.laboratories, icon: <ScienceIcon /> },
    { title: lang === "az" ? "Elmi-tədqiqat işləri" : "Research Works", data: cafedra.research_works, icon: <AssignmentIcon /> },
    { title: lang === "az" ? "Layihələr" : "Projects", data: cafedra.projects, icon: <LightbulbIcon /> },
    { title: lang === "az" ? "Tərəfdaş şirkətlər" : "Partner Companies", data: cafedra.partner_companies, icon: <BusinessIcon /> },
    { title: lang === "az" ? "Məqsədlər" : "Objectives", data: cafedra.objectives, icon: <FlagIcon /> },
    { title: lang === "az" ? "Vəzifələr" : "Duties", data: cafedra.duties, icon: <SettingsIcon /> },
    { title: lang === "az" ? "Fəaliyyət istiqamətləri" : "Directions of Action", data: cafedra.directions_of_action, icon: <SettingsIcon /> },
  ].filter(s => s.data && s.data.length > 0);

  return (
    <div className="space-y-8">
      {sections.length === 0 ? (
        <SectionBlock accent>
            <div className="text-center py-10">
                <p className="text-gray-500">{lang === "az" ? "Məlumat tapılmadı" : "No information found"}</p>
            </div>
        </SectionBlock>
      ) : (
        sections.map((sec, idx) => (
          <SectionBlock key={idx} title={sec.title} accent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sec.data.map((item, itemIdx) => (
                <motion.div
                  key={item.id || itemIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: itemIdx * 0.05 }}
                  className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-5 rounded-2xl hover:border-[#ee7c7e] hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1a2355]/5 dark:bg-[#1a2355]/20 flex items-center justify-center text-[#1a2355] dark:text-blue-400 group-hover:bg-[#ee7c7e]/10 group-hover:text-[#ee7c7e] transition-colors flex-shrink-0">
                        {sec.icon}
                    </div>
                    <div className="min-w-0">
                        <h4 className="font-bold text-[#1a2355] dark:text-white text-sm mb-1 leading-snug">{item.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionBlock>
        ))
      )}
    </div>
  );
}
