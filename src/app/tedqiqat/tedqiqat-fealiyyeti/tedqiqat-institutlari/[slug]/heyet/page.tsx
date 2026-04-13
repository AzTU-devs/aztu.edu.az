"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import ComingSoon from "@/components/shared/ComingSoon";
import { getResearchInstituteBySlug } from "@/services/researchInstituteService/researchInstituteService";
import type { ResearchInstituteDetail } from "@/types/researchInstitute";
import SearchIcon from "@mui/icons-material/Search";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ResearchInstituteStaffPage({ params }: Props) {
  const { slug } = use(params);
  const { lang: currentLang } = useLanguage();
  const [institute, setInstitute] = useState<ResearchInstituteDetail | null | undefined>(undefined);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getResearchInstituteBySlug(slug, currentLang).then(setInstitute);
  }, [slug, currentLang]);

  if (institute === undefined) return null;

  const staff = institute?.staff ?? [];

  const filtered = staff.filter((w) => {
    const fullName = w.full_name.toLowerCase();
    const duty = (w.title || "").toLowerCase();
    const q = search.toLowerCase();
    return fullName.includes(q) || duty.includes(q);
  });

  return (
    <div className="space-y-6">
      <SectionBlock title={currentLang === "az" ? "İnstitut əməkdaşları" : "Institute Staff"} accent>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl">
          {currentLang === "az" 
            ? "İnstitutun elmi və inzibati fəaliyyətində iştirak edən heyət haqqında məlumat." 
            : "Information about scientific and administrative staff involved in the institute's operations."}
        </p>

        {staff.length === 0 ? (
          <ComingSoon label={currentLang === "az" ? "Əməkdaşlar haqqında məlumat əlavə ediləcək" : "Information about staff will be added soon"} />
        ) : (
          <>
            <motion.div 
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative mb-12"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon sx={{ fontSize: 20, color: "#1a2355" }} className="opacity-40" />
              </div>
              <input
                type="text"
                placeholder={currentLang === "az" ? "Əməkdaş axtar..." : "Search staff member..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-11 pr-5 py-4 border-2 border-gray-100 dark:border-slate-700 rounded-2xl bg-gray-50/50 dark:bg-slate-800/50 text-sm font-bold text-[#1a2355] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#ee7c7e] transition-all"
              />
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((w, index) => {
                return (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="group"
                  >
                    <PersonCard
                      fullName={w.full_name || "Naməlum əməkdaş"}
                      title={w.title}
                      photoUrl={w.image_url || undefined}
                      email={w.email}
                      phone={w.phone}
                      size="sm"
                    />
                  </motion.div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 bg-gray-50 dark:bg-slate-800/20 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-slate-700">
                <SearchIcon sx={{ fontSize: 48, color: "#1a2355" }} className="opacity-10 mb-4" />
                <p className="text-gray-400 dark:text-slate-500 text-sm font-black uppercase tracking-widest">
                  {currentLang === "az" ? "Nəticə tapılmadı" : "No results found"}
                </p>
              </div>
            )}
          </>
        )}
      </SectionBlock>
    </div>
  );
}
