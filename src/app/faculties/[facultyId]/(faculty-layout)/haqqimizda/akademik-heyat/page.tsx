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

export default function AkademikHeyatPage({ params }: Props) {
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
    const scientific = (w.scientific_name ?? w.scientific_degree ?? "").toLowerCase();
    const q = search.toLowerCase();
    return fullName.includes(q) || scientific.includes(q);
  });

  return (
    <div className="space-y-6">
      <SectionBlock title={currentLang === "az" ? "Akademik heyət" : "Academic Staff"} accent>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => <div key={i} className="h-48 rounded-3xl bg-gray-100 dark:bg-slate-800 animate-pulse" />)}
          </div>
        ) : workers.length === 0 ? (
          <ComingSoon label={currentLang === "az" ? "Akademik heyət haqqında məlumat əlavə ediləcək" : "Information about academic staff will be added soon"} />
        ) : (
          <>
            <motion.div 
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className="relative mb-10 group"
            >
              <SearchIcon
                sx={{ fontSize: 22, color: "#1a2355" }}
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity"
              />
              <input
                type="text"
                placeholder={currentLang === "az" ? "Ad, soyad və ya elmi ad üzrə axtar..." : "Search by name or title..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-[1.25rem] border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white text-sm font-medium shadow-sm focus:outline-none focus:ring-4 focus:ring-[#1a2355]/5 focus:border-[#1a2355]/30 transition-all"
              />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((w, index) => {
                const fullName = [w.first_name, w.last_name, w.father_name].filter(Boolean).join(" ");
                return (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PersonCard
                      fullName={fullName || "Naməlum əməkdaş"}
                      title={w.scientific_name || w.duty}
                      academicDegree={w.scientific_degree}
                      photoUrl={getImageUrl(w.profile_image)}
                      email={w.email}
                    />
                  </motion.div>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 dark:text-slate-500 py-20 text-sm font-medium italic"
              >
                {currentLang === "az" ? "Axtarışa uyğun nəticə tapılmadı" : "No results found for your search"}
              </motion.p>
            )}
          </>
        )}
      </SectionBlock>
    </div>
  );
}
