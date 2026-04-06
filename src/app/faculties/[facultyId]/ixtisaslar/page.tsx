"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import SchoolIcon from "@mui/icons-material/School";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getFacultyBySlug } from "@/services/facultyService/facultyService";
import type { Specialization, FacultyDetail } from "@/types/faculty";
import type { Lang } from "@/util/apiClient";

interface Props {
  params: Promise<{ facultyId: string }>;
}

const mockSpecializations: Specialization[] = [
  {
    id: 1,
    name: "Kompüter elmləri",
    code: "050627",
    degree: "bachelor",
    duration_years: 4,
    description: "Proqram təminatı mühəndisliyi, alqoritmlər, verilənlər bazaları.",
  },
  {
    id: 2,
    name: "İnformasiya texnologiyaları",
    code: "050628",
    degree: "bachelor",
    duration_years: 4,
    description: "Şəbəkə texnologiyaları, informasiya təhlükəsizliyi.",
  },
  {
    id: 3,
    name: "Kompüter elmləri",
    code: "060627",
    degree: "master",
    duration_years: 2,
    description: "Süni intellekt, maşın öyrənməsi, böyük verilənlər.",
  },
];

const degreeMeta: Record<string, { label: string; icon: any; color: string; bg: string }> = {
  bachelor: { 
    label: "Bakalavr", 
    icon: SchoolIcon, 
    color: "text-blue-600", 
    bg: "bg-blue-50 dark:bg-blue-900/20" 
  },
  master: { 
    label: "Magistr", 
    icon: WorkspacePremiumIcon, 
    color: "text-emerald-600", 
    bg: "bg-emerald-50 dark:bg-emerald-900/20" 
  },
  phd: { 
    label: "Doktorantura", 
    icon: HistoryEduIcon, 
    color: "text-purple-600", 
    bg: "bg-purple-50 dark:bg-purple-900/20" 
  },
};

export default function IxtisaslarPage({ params }: Props) {
  const { facultyId: facultySlug } = use(params);
  const searchParams = useSearchParams();
  const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const currentLang = ((): Lang => {
    const queryLang = searchParams?.get("lang");
    if (queryLang === "az" || queryLang === "en") {
      return queryLang;
    }
    return typeof navigator !== "undefined" && navigator.language?.startsWith("az") ? "az" : "en";
  })();

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

  const grouped = mockSpecializations.reduce<Record<string, Specialization[]>>(
    (acc, s) => {
      const key = s.degree;
      if (!acc[key]) acc[key] = [];
      acc[key].push(s);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-10">
      <SectionBlock title={currentLang === "az" ? "Tədris proqramları" : "Academic Programs"} accent>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-10 max-w-2xl">
          {currentLang === "az" 
            ? "Fakültə üzrə tədris olunan bütün ixtisaslar və təhsil pillələri haqqında məlumat." 
            : "Information about all specializations and levels of education offered by the faculty."}
        </p>

        {loading ? (
          <div className="space-y-8">
             {[1,2].map(i => <div key={i} className="h-48 rounded-[2rem] bg-gray-100 dark:bg-slate-800 animate-pulse" />)}
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(grouped).map(([degree, specs], groupIdx) => {
              const Icon = degreeMeta[degree].icon;
              return (
                <motion.div 
                  key={degree}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: groupIdx * 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                     <div className={`w-12 h-12 rounded-2xl ${degreeMeta[degree].bg} ${degreeMeta[degree].color} flex items-center justify-center shadow-sm`}>
                        <Icon sx={{ fontSize: 24 }} />
                     </div>
                     <h3 className="text-xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight">
                       {currentLang === "az" ? `${degreeMeta[degree].label} pilləsi` : `${degreeMeta[degree].label} Degree`}
                     </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {specs.map((spec, idx) => (
                      <motion.div
                        key={spec.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: (groupIdx * 0.2) + (idx * 0.1) }}
                        className="group relative bg-white dark:bg-slate-800 border-2 border-gray-50 dark:border-slate-700 rounded-[1.5rem] p-6 hover:border-[#ee7c7e] hover:shadow-xl hover:shadow-[#1a2355]/5 transition-all duration-500"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                              <span className="text-lg font-black text-[#1a2355] dark:text-white group-hover:text-[#ee7c7e] transition-colors">
                                {spec.name}
                              </span>
                              {spec.code && (
                                <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-slate-700 text-gray-400 font-mono text-[10px] font-bold">
                                  {spec.code}
                                </span>
                              )}
                            </div>
                            {spec.description && (
                              <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                                {spec.description}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-1 flex-shrink-0 border-t md:border-t-0 md:border-l border-gray-100 dark:border-slate-700 pt-4 md:pt-0 md:pl-8">
                             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Müddət</span>
                             <span className="text-lg font-black text-[#1a2355] dark:text-white">{spec.duration_years} {currentLang === "az" ? "İL" : "YEARS"}</span>
                          </div>
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

      {/* Stunning Apply Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[3rem] bg-[#1a2355] p-10 md:p-16 text-white shadow-2xl"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ee7c7e]/10 rounded-full blur-3xl -ml-32 -mb-32" />
        
        <div className="relative z-10 max-w-2xl">
           <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight">
             {currentLang === "az" ? "Gələcəyin mühəndisi olmaq üçün ilk addımı atın" : "Take the first step to becoming a future engineer"}
           </h2>
           <p className="text-white/70 text-lg mb-10 font-medium">
             {currentLang === "az" 
               ? "Bizim proqramlar müasir sənaye tələblərinə uyğun olaraq hazırlanıb. Sizə ən uyğun ixtisası seçin." 
               : "Our programs are designed according to modern industry requirements. Choose the specialization that fits you best."}
           </p>
           <div className="flex flex-wrap gap-4">
              <a href="https://portal.edu.az" target="_blank" className="px-8 py-4 rounded-2xl bg-[#ee7c7e] hover:bg-[#f09395] text-white font-black text-sm transition-all shadow-lg shadow-red-900/20 active:scale-95">
                {currentLang === "az" ? "İndi müraciət et" : "Apply Now"}
              </a>
              <Link href={`/faculties/${facultySlug}/haqqimizda/elaqe`} className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-black text-sm transition-all border border-white/10 active:scale-95">
                {currentLang === "az" ? "Məsləhət al" : "Get Consultation"}
              </Link>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
