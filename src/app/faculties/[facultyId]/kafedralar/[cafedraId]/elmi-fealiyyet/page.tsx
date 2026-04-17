"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import ScienceIcon from "@mui/icons-material/Science";
import BusinessIcon from "@mui/icons-material/Business";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FlagIcon from "@mui/icons-material/Flag";
import SettingsIcon from "@mui/icons-material/Settings";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail } from "@/types/cafedra";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function ElmiFealiyyetPage({ params }: Props) {
  const { cafedraId } = use(params);
  const { lang: currentLang } = useLanguage();
  const [cafedra, setCafedra] = useState<CafedraDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCafedraByCode(cafedraId, currentLang)
      .then((result) => {
        setCafedra(result);
        setLoading(false);
      })
      .catch(() => {
        setCafedra(null);
        setLoading(false);
      });
  }, [cafedraId, currentLang]);

  if (!cafedra && !loading) return null;

  const sections = [
    { title: currentLang === "az" ? "Laboratoriyalar" : "Laboratories", data: cafedra?.laboratories, icon: ScienceIcon, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { title: currentLang === "az" ? "Elmi-tədqiqat işləri" : "Research Works", data: cafedra?.research_works, icon: AutoStoriesIcon, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { title: currentLang === "az" ? "Layihələr" : "Projects", data: cafedra?.projects, icon: LightbulbIcon, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { title: currentLang === "az" ? "Tərəfdaş şirkətlər" : "Partner Companies", data: cafedra?.partner_companies, icon: BusinessIcon, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
    { title: currentLang === "az" ? "Məqsədlər" : "Objectives", data: cafedra?.objectives, icon: FlagIcon, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" },
    { title: currentLang === "az" ? "Vəzifələr" : "Duties", data: cafedra?.duties, icon: SettingsIcon, color: "text-slate-600", bg: "bg-slate-50 dark:bg-slate-900/20" },
  ].filter(s => s.data && s.data.length > 0);

  return (
    <div className="space-y-10">
      <SectionBlock title={currentLang === "az" ? "Elmi-tədqiqat fəaliyyəti" : "Scientific Research Activity"} accent>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-10 max-w-2xl">
          {currentLang === "az" 
            ? "Kafedranın elmi potensialı, həyata keçirilən tədqiqat layihələri və sənaye tərəfdaşlıqları haqqında məlumat." 
            : "Information about the department's scientific potential, ongoing research projects, and industrial partnerships."}
        </p>

        {loading ? (
          <div className="space-y-12">
             {[1,2].map(i => (
               <div key={i} className="space-y-6">
                 <div className="h-8 w-48 bg-gray-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {[1,2].map(j => <div key={j} className="h-32 rounded-2xl bg-gray-100 dark:bg-slate-800 animate-pulse" />)}
                 </div>
               </div>
             ))}
          </div>
        ) : sections.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-slate-700">
             <ScienceIcon sx={{ fontSize: 48, color: "#1a2355" }} className="opacity-10 mb-4" />
             <p className="text-gray-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest">
                {currentLang === "az" ? "Məlumat tapılmadı" : "No data found"}
             </p>
          </div>
        ) : (
          <div className="space-y-16">
            {sections.map((sec, groupIdx) => {
              const Icon = sec.icon;
              return (
                <motion.div 
                  key={groupIdx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: groupIdx * 0.1 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                     <div className={`w-12 h-12 rounded-2xl ${sec.bg} ${sec.color} flex items-center justify-center shadow-sm`}>
                        <Icon sx={{ fontSize: 24 }} />
                     </div>
                     <h3 className="text-xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight">
                       {sec.title}
                     </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sec.data!.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (groupIdx * 0.1) + (idx * 0.05) }}
                        className="group relative bg-white dark:bg-slate-800 border-2 border-gray-50 dark:border-slate-700 rounded-[1.5rem] p-6 hover:border-[#ee7c7e] hover:shadow-xl hover:shadow-[#1a2355]/5 transition-all duration-500"
                      >
                         <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 dark:bg-slate-700/30 rounded-bl-[3rem] -mr-6 -mt-6 transition-transform group-hover:scale-110" />
                         
                         <div className="relative z-10">
                            <h4 className="font-black text-[#1a2355] dark:text-white text-base leading-tight mb-3 group-hover:text-[#ee7c7e] transition-colors">
                              {item.title}
                            </h4>
                            {item.description && (
                              <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-3 font-medium">
                                {item.description}
                              </p>
                            )}
                         </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </SectionBlock>

      {/* Stunning Research Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#1a2355] to-[#2a3a8a] p-10 md:p-16 text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-40 -mt-40" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
                {currentLang === "az" ? "Elmi potensialımızla tanış olun" : "Explore our scientific potential"}
              </h2>
              <p className="text-white/70 text-lg mb-8 font-medium">
                {currentLang === "az" 
                  ? "Kafedramız beynəlxalq standartlara uyğun tədqiqatlar aparır və sənaye üçün innovativ həllər hazırlayır." 
                  : "Our department conducts research according to international standards and develops innovative solutions for industry."}
              </p>
              <div className="flex flex-wrap gap-4">
                 <Link href={`/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/xeberler`} className="px-8 py-4 rounded-2xl bg-[#ee7c7e] hover:bg-[#f09395] text-white font-black text-sm transition-all shadow-lg shadow-red-900/20 active:scale-95">
                   {currentLang === "az" ? "Elmi xəbərlər" : "Research News"}
                 </Link>
              </div>
           </div>
           <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl relative group">
              <ScienceIcon sx={{ fontSize: 80 }} className="text-[#ee7c7e] group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/10 animate-[spin_20s_linear_infinite]" />
           </div>
        </div>
      </motion.div>
    </div>
  );
}
