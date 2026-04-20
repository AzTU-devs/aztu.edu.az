"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import ComingSoon from "@/components/shared/ComingSoon";
import { getFacultyBySlug, getImageUrl } from "@/services/facultyService/facultyService";
import type { FacultyDetail, PersonnelItem } from "@/types/faculty";
import SearchIcon from "@mui/icons-material/Search";
import { useLanguage } from "@/context/LanguageContext";
import SchoolIcon from "@mui/icons-material/School";

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
    <div className="space-y-10">
      <SectionBlock title={currentLang === "az" ? "Akademik heyət" : "Academic Staff"} accent>
        <p className="text-gray-500 dark:text-white/40 text-sm font-black uppercase tracking-[0.2em] mb-12 max-w-2xl leading-relaxed">
          {currentLang === "az" 
            ? "Fakültənin tədris və elmi fəaliyyətini həyata keçirən professor-müəllim heyəti haqqında ətraflı məlumat." 
            : "Detailed information about the faculty and teaching staff conducting the academic and scientific activities of the faculty."}
        </p>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="h-40 rounded-[2rem] bg-gray-100 dark:bg-white/5 animate-pulse" />)}
          </div>
        ) : workers.length === 0 ? (
          <ComingSoon label={currentLang === "az" ? "Akademik heyət haqqında məlumat əlavə ediləcək" : "Information about academic staff will be added soon"} />
        ) : (
          <>
            <motion.div 
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative mb-12 group"
            >
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <SearchIcon sx={{ fontSize: 22, color: "#1a2355" }} className="opacity-40 group-focus-within:opacity-100 transition-opacity" />
              </div>
              <input
                type="text"
                placeholder={currentLang === "az" ? "Ad, soyad və ya elmi ad üzrə axtar..." : "Search staff by name or title..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-14 pr-8 py-5 border-2 border-gray-100 dark:border-white/5 rounded-[2rem] bg-gray-50 dark:bg-white/5 text-sm font-black text-[#1a2355] dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#ee7c7e] transition-all shadow-sm"
              />
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((w, index) => {
                const fullName = [w.first_name, w.last_name, w.father_name].filter(Boolean).join(" ");
                return (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <PersonCard
                      fullName={fullName || "Naməlum əməkdaş"}
                      title={w.scientific_name || w.duty}
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
              <div className="text-center py-32 bg-gray-50 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-white/10">
                <SearchIcon sx={{ fontSize: 64, color: "#1a2355", opacity: 0.1 }} className="mb-4" />
                <p className="text-gray-400 dark:text-white/30 text-sm font-black uppercase tracking-[0.3em]">
                  {currentLang === "az" ? "Nəticə tapılmadı" : "No results found"}
                </p>
              </div>
            )}
          </>
        )}
      </SectionBlock>

      {/* Stunning Staff Highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative p-10 rounded-[3rem] bg-[#1a2355] text-white shadow-2xl overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
           <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
              <SchoolIcon sx={{ fontSize: 48, color: '#ee7c7e' }} />
           </div>
           <div>
              <h4 className="text-3xl font-black uppercase tracking-tighter mb-4">
                {currentLang === "az" ? "Yüksək İxtisaslı Heyət" : "Highly Qualified Staff"}
              </h4>
              <p className="text-white/60 text-lg font-medium leading-relaxed max-w-3xl">
                {currentLang === "az" 
                  ? "Bizim heyət ölkənin qabaqcıl alimlərindən və təcrübəli mütəxəssislərindən ibarətdir." 
                  : "Our staff consists of the country's leading scientists and experienced specialists."}
              </p>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
