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
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";

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
    <main className="min-h-screen transition-colors duration-500 pb-32">
      <PageHero
        title={t.title}
        description={t.description}
        breadcrumbs={[
            { label: t.departments }
        ]}
        eyebrow="Administrative Units"
      />

      <PageContainer>
          {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="animate-pulse bg-white dark:bg-slate-800/50 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-700 p-10 h-64" />
                  ))}
              </div>
          ) : departments === "ERROR" ? (
              <div className="text-center py-24 px-6 bg-red-50 dark:bg-red-950/20 rounded-[3rem] border border-red-100 dark:border-red-900/30">
                <h3 className="text-red-500 dark:text-red-400 font-bold text-xl mb-2">{t.error}</h3>
                <p className="text-red-400 dark:text-red-500/70">{t.errorSub}</p>
              </div>
          ) : departments === null || departments.length === 0 ? (
              <div className="text-center py-32 bg-white dark:bg-slate-800/50 backdrop-blur-md rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-slate-700 shadow-sm">
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
      </PageContainer>
    </main>
  );
}
