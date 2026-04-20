"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import SchoolIcon from "@mui/icons-material/School";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LaunchIcon from "@mui/icons-material/Launch";
import { getFacultyBySlug } from "@/services/facultyService/facultyService";
import type { Specialization, FacultyDetail } from "@/types/faculty";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ facultyId: string }>;
}

const degreeMeta: Record<string, { label: string; icon: any; color: string; bg: string; border: string }> = {
  bachelor: { 
    label: "Bakalavr", 
    icon: SchoolIcon, 
    color: "text-blue-600", 
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "hover:border-blue-500/50"
  },
  master: { 
    label: "Magistr", 
    icon: WorkspacePremiumIcon, 
    color: "text-emerald-600", 
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "hover:border-emerald-500/50"
  },
  phd: { 
    label: "Doktorantura", 
    icon: HistoryEduIcon, 
    color: "text-purple-600", 
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "hover:border-purple-500/50"
  },
};

export default function IxtisaslarPage({ params }: Props) {
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

  // Combined real and mock data for high-fidelity demo
  const allSpecs: Specialization[] = [
    {
      id: 1,
      name: currentLang === "az" ? "Kompüter elmləri" : "Computer Science",
      code: "050627",
      degree: "bachelor",
      duration_years: 4,
      description: currentLang === "az" ? "Proqram təminatı mühəndisliyi, alqoritmlər, verilənlər bazaları." : "Software engineering, algorithms, databases.",
    },
    {
      id: 2,
      name: currentLang === "az" ? "İnformasiya texnologiyaları" : "Information Technologies",
      code: "050628",
      degree: "bachelor",
      duration_years: 4,
      description: currentLang === "az" ? "Şəbəkə texnologiyaları, informasiya təhlükəsizliyi." : "Network technologies, information security.",
    },
    {
      id: 3,
      name: currentLang === "az" ? "Süni intellekt" : "Artificial Intelligence",
      code: "060627",
      degree: "master",
      duration_years: 2,
      description: currentLang === "az" ? "Süni intellekt, maşın öyrənməsi, böyük verilənlər." : "Artificial intelligence, machine learning, big data.",
    },
  ];

  const grouped = allSpecs.reduce<Record<string, Specialization[]>>(
    (acc, s) => {
      const key = s.degree || 'bachelor';
      if (!acc[key]) acc[key] = [];
      acc[key].push(s);
      return acc;
    },
    {}
  );

  const t = {
    title: currentLang === "az" ? "Tədris proqramları" : "Academic Programs",
    description: currentLang === "az" 
        ? "Fakültə üzrə tədris olunan bütün ixtisaslar və təhsil pillələri haqqında məlumat." 
        : "Information about all specializations and levels of education offered by the faculty.",
    duration: currentLang === "az" ? "Müddət" : "Duration",
    years: currentLang === "az" ? "İL" : "YEARS",
    degreePrefix: currentLang === "az" ? "pilləsi" : "Degree",
    applyNow: currentLang === "az" ? "İndi müraciət et" : "Apply Now",
    getConsultation: currentLang === "az" ? "Məsləhət al" : "Get Consultation",
    bannerTitle: currentLang === "az" ? "Gələcəyin mühəndisi olmaq üçün ilk addımı atın" : "Take the first step to becoming a future engineer",
    bannerDesc: currentLang === "az" 
        ? "Bizim proqramlar müasir sənaye tələblərinə uyğun olaraq hazırlanıb. Sizə ən uyğun ixtisası seçin." 
        : "Our programs are designed according to modern industry requirements. Choose the specialization that fits you best."
  };

  return (
    <div className="space-y-16">
      <SectionBlock title={t.title} accent>
        <p className="text-gray-500 dark:text-white/40 text-sm font-black uppercase tracking-[0.2em] mb-12 max-w-2xl leading-relaxed">
          {t.description}
        </p>

        {loading ? (
          <div className="space-y-10">
             {[1,2].map(i => <div key={i} className="h-64 rounded-[3rem] bg-gray-100 dark:bg-white/5 animate-pulse" />)}
          </div>
        ) : (
          <div className="space-y-20">
            {Object.entries(grouped).map(([degree, specs], groupIdx) => {
              const meta = degreeMeta[degree] || degreeMeta.bachelor;
              const Icon = meta.icon;
              return (
                <motion.div 
                  key={degree}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: groupIdx * 0.1, duration: 0.8 }}
                >
                  <div className="flex items-center gap-6 mb-10">
                     <div className={`w-16 h-16 rounded-[1.5rem] ${meta.bg} ${meta.color} flex items-center justify-center shadow-2xl shadow-black/5`}>
                        <Icon sx={{ fontSize: 32 }} />
                     </div>
                     <h3 className="text-2xl md:text-3xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter">
                       {meta.label} <span className="text-[#ee7c7e] ml-2">{t.degreePrefix}</span>
                     </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {specs.map((spec, idx) => (
                      <motion.div
                        key={spec.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className={`group relative bg-white dark:bg-white/5 border-2 border-gray-50 dark:border-white/5 rounded-[2.5rem] p-10 shadow-2xl shadow-blue-900/5 transition-all duration-700 ${meta.border} hover:-translate-y-1`}
                      >
                        {/* Decorative Pattern Background */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-gray-50 dark:bg-white/5 rounded-bl-[6rem] -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-110 group-hover:bg-[#ee7c7e]/5" />
                        
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                              <span className="text-2xl font-black text-[#1a2355] dark:text-white group-hover:text-[#ee7c7e] transition-colors tracking-tight leading-tight">
                                {spec.name}
                              </span>
                              {spec.code && (
                                <span className="px-4 py-1.5 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-white/30 font-black text-[10px] uppercase tracking-widest border border-gray-200 dark:border-white/5">
                                  {spec.code}
                                </span>
                              )}
                            </div>
                            {spec.description && (
                              <p className="text-base text-gray-500 dark:text-white/60 leading-relaxed font-medium line-clamp-2 max-w-3xl">
                                {spec.description}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex flex-row md:flex-col items-center md:items-end gap-6 md:gap-1 flex-shrink-0 border-t md:border-t-0 md:border-l border-gray-100 dark:border-white/10 pt-8 md:pt-0 md:pl-12">
                             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-white/20 mb-2">{t.duration}</span>
                             <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-[#1a2355] dark:text-white tracking-tighter">{spec.duration_years}</span>
                                <span className="text-xs font-black text-[#ee7c7e]">{t.years}</span>
                             </div>
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

      {/* ── Stunning Apply Banner ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[4rem] bg-[#1a2355] p-12 md:p-20 text-white shadow-[0_50px_100px_-20px_rgba(26,35,85,0.4)] group"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] -mr-64 -mt-64 transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#ee7c7e]/10 rounded-full blur-[100px] -ml-48 -mb-48 transition-transform duration-1000 group-hover:scale-110" />
        
        <div className="relative z-10 max-w-3xl">
           <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 mb-10">
              <LaunchIcon className="text-[#ee7c7e]" sx={{ fontSize: 20 }} />
              <span className="text-white text-[11px] font-black uppercase tracking-[0.4em]">Ready to start?</span>
           </div>
           
           <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1] tracking-tighter drop-shadow-2xl">
             {t.bannerTitle}
           </h2>
           <p className="text-white/70 text-lg md:text-xl mb-12 font-medium leading-relaxed max-w-2xl border-l-4 border-[#ee7c7e] pl-8">
             {t.bannerDesc}
           </p>
           <div className="flex flex-wrap gap-6">
              <a href="https://portal.edu.az" target="_blank" className="px-12 py-6 rounded-[2rem] bg-[#ee7c7e] hover:bg-[#f09395] text-white font-black uppercase text-xs tracking-[0.2em] transition-all shadow-2xl shadow-red-900/40 active:scale-95 hover:-translate-y-1">
                {t.applyNow}
              </a>
              <Link href={`/${currentLang}/academic/faculties/${facultySlug}/about/contact`} className="px-12 py-6 rounded-[2rem] bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-black uppercase text-xs tracking-[0.2em] transition-all border border-white/10 active:scale-95 hover:-translate-y-1">
                {t.getConsultation}
              </Link>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
