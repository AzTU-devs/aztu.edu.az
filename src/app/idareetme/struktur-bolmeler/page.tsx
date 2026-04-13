"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BusinessIcon from "@mui/icons-material/Business";
import { motion } from "framer-motion";

import DepartmentCard from "@/components/department/DepartmentCard";
import { getDepartments } from "@/services/departmentService/departmentService";
import type { DepartmentSummary } from "@/types/department";
import { useLanguage } from "@/context/LanguageContext";

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" as const },
    }),
};

export default function DepartmentsPage() {
  const { lang: currentLang } = useLanguage();
  const [departments, setDepartments] = useState<DepartmentSummary[] | "ERROR" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDepartments({ start: 0, end: 100, lang: currentLang })
      .then((result) => {
        setDepartments(result);
      })
      .finally(() => setLoading(false));
  }, [currentLang]);

  const t = {
    home: currentLang === "az" ? "Ana səhifə" : "Home",
    departments: currentLang === "az" ? "Struktur Bölmələr" : "Structural Units",
    title: currentLang === "az" ? "Struktur Bölmələr" : "Structural Units",
    description: currentLang === "az" 
        ? "Azərbaycan Texniki Universitetinin inzibati və akademik idarəetməsini təmin edən bütün şöbələr barədə ətraflı məlumat."
        : "Detailed information about all departments ensuring the administrative and academic management of Azerbaijan Technical University.",
    noContent: currentLang === "az" ? "Məlumat tapılmadı." : "No units found.",
    error: currentLang === "az" ? "Xəta baş verdi" : "An error occurred",
    errorSub: currentLang === "az" ? "Zəhmət olmasa bir az sonra yenidən cəhd edin." : "Please try again later."
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors pb-20">
      {/* Stunning Page Banner */}
      <div className="relative overflow-hidden bg-[#1a2355] pt-40 pb-20 px-4 md:px-10 lg:px-12 w-full">
          {/* Background Image of AzTU */}
          <div 
              className="absolute inset-0 z-0 opacity-20 grayscale hover:grayscale-0 transition-all duration-1000"
              style={{
                  backgroundImage: 'url("/aztu.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
              }}
          />
          
          {/* Background abstract elements */}
          <div className="absolute inset-0 z-10 overflow-hidden opacity-20">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-400/10 -skew-x-12 transform translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#ee7c7e]/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
          </div>
          
          <div className="relative z-20 w-full">
              <motion.nav 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-white/40 text-xs mb-6 flex-wrap font-medium uppercase tracking-widest"
              >
                  <Link href="/" className="hover:text-white transition-colors">{t.home}</Link>
                  <ChevronRightIcon sx={{ fontSize: 13 }} />
                  <span className="text-[#ee7c7e]">{t.departments}</span>
              </motion.nav>
              <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
              >
                  {t.title}
              </motion.h1>
              <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-white/60 text-lg max-w-2xl font-medium leading-relaxed"
              >
                  {t.description}
              </motion.p>
          </div>
      </div>

      {/* Grid Content */}
      <section className="px-4 md:px-10 lg:px-12 py-16 -mt-10 relative z-30 w-full">
          {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="animate-pulse bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-700 p-10 h-64" />
                  ))}
              </div>
          ) : departments === "ERROR" ? (
              <div className="text-center py-24 px-6 bg-red-50 dark:bg-red-950/20 rounded-[3rem] border border-red-100 dark:border-red-900/30">
                <h3 className="text-red-500 dark:text-red-400 font-bold text-xl mb-2">{t.error}</h3>
                <p className="text-red-400 dark:text-red-500/70">{t.errorSub}</p>
              </div>
          ) : departments === null || departments.length === 0 ? (
              <div className="text-center py-32 bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-slate-700 shadow-sm">
                  <BusinessIcon sx={{ fontSize: 64, color: "#1a2355", opacity: 0.1 }} />
                  <p className="text-gray-400 font-black uppercase tracking-widest text-sm mt-4">
                      {t.noContent}
                  </p>
              </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {departments.map((dept, i) => (
                      <motion.div
                          key={dept.id}
                          custom={i}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          className="h-full"
                      >
                          <DepartmentCard department={dept} index={i} />
                      </motion.div>
                  ))}
              </div>
          )}
      </section>
    </main>
  );
}
