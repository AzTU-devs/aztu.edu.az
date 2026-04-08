"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import PersonCard from "@/components/shared/PersonCard";
import { getFacultyBySlug, getImageUrl } from "@/services/facultyService/facultyService";
import type { FacultyDetail, PersonnelItem } from "@/types/faculty";
import type { Lang } from "@/util/apiClient";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default function DekanMuavinleriPage({ params }: Props) {
  const { facultyId: facultySlug } = use(params);
  const { lang: currentLang } = useLanguage();
  const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getFacultyBySlug(facultySlug, currentLang)
      .then((result) => {
        setFaculty(result);
        setLoading(false);
      })
      .catch(() => {
        setFaculty(null);
        setLoading(false);
      });
  }, [facultySlug, currentLang]);

  const deputyDeans: PersonnelItem[] = faculty?.deputy_deans ?? [];

  return (
    <div className="space-y-6">
      <SectionBlock title={currentLang === "az" ? "Dekan müavinləri" : "Deputy Deans"} accent>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-64 rounded-3xl bg-gray-100 dark:bg-slate-800 animate-pulse" />)}
          </div>
        ) : deputyDeans.length === 0 ? (
          <ComingSoon label={currentLang === "az" ? "Dekan müavinləri haqqında məlumat əlavə ediləcək" : "Information about deputy deans will be added soon"} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deputyDeans.map((vd, index) => {
              const fullName = [vd.first_name, vd.last_name, vd.father_name].filter(Boolean).join(" ");
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:border-[#ee7c7e]/20 transition-all duration-500 group"
                >
                  <PersonCard
                    fullName={fullName || "Naməlum əməkdaş"}
                    title={vd.duty || vd.scientific_name}
                    academicDegree={vd.scientific_degree}
                    photoUrl={getImageUrl(vd.profile_image)}
                    email={vd.email}
                    phone={vd.phone}
                  />
                  <div className="mt-6 pt-4 border-t border-gray-50 dark:border-slate-700 flex justify-center">
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ee7c7e]">
                       {vd.duty || (currentLang === "az" ? "Dekan Müavini" : "Deputy Dean")}
                     </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </SectionBlock>
    </div>
  );
}
