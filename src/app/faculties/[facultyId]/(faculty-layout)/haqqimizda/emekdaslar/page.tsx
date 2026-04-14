"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import ComingSoon from "@/components/shared/ComingSoon";
import { getFacultyBySlug, getImageUrl } from "@/services/facultyService/facultyService";
import type { FacultyDetail, PersonnelItem } from "@/types/faculty";
import type { Lang } from "@/util/apiClient";
import SearchIcon from "@mui/icons-material/Search";

import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default function EmekdaslarPage({ params }: Props) {
  const { facultyId: facultySlug } = use(params);
  const { lang: currentLang } = useLanguage();
  const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

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

  const workers: PersonnelItem[] = faculty?.workers ?? [];

  const filtered = workers.filter((w) => {
    const fullName = [w.first_name, w.last_name, w.father_name].filter(Boolean).join(" ").toLowerCase();
    const duty = (w.duty || w.scientific_name || "").toLowerCase();
    const q = search.toLowerCase();
    return fullName.includes(q) || duty.includes(q);
  });

  return (
    <div className="space-y-6">
      <SectionBlock title={currentLang === "az" ? "Fakültə əməkdaşları" : "Faculty Staff"} accent>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl">
          {currentLang === "az" 
            ? "Fakültənin fəaliyyətində yaxından iştirak edən inzibati və texniki heyət haqqında məlumat." 
            : "Information about administrative and technical staff involved in the faculty's daily operations."}
        </p>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-40 rounded-3xl bg-gray-100 dark:bg-slate-800 animate-pulse" />)}
          </div>
        ) : workers.length === 0 ? (
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
                const fullName = [w.first_name, w.last_name, w.father_name].filter(Boolean).join(" ");
                return (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="group"
                  >
                    <PersonCard
                      fullName={fullName || "Naməlum əməkdaş"}
                      title={w.duty || w.scientific_name}
                      academicDegree={w.scientific_degree}
                      photoUrl={getImageUrl(w.profile_image)}
                      email={w.email}
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
