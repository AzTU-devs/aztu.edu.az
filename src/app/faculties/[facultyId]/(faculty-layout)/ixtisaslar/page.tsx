"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FacultyPanel } from "@/components/faculty/ui";
import SchoolIcon from "@mui/icons-material/School";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getFacultyBySlug } from "@/services/facultyService/facultyService";
import type { Specialization, FacultyDetail } from "@/types/faculty";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ facultyId: string }>;
}

const degreeMeta: Record<string, { label: string; icon: any; tile: string }> = {
  bachelor: { label: "Bakalavr", icon: SchoolIcon, tile: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  master: { label: "Magistr", icon: WorkspacePremiumIcon, tile: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  phd: { label: "Doktorantura", icon: HistoryEduIcon, tile: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
};

export default function IxtisaslarPage({ params }: Props) {
  const { facultyId: facultySlug } = use(params);
  const { lang: currentLang } = useLanguage();
  const [, setFaculty] = useState<FacultyDetail | null>(null);
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

  const grouped = allSpecs.reduce<Record<string, Specialization[]>>((acc, s) => {
    const key = s.degree || 'bachelor';
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {});

  const t = {
    title: currentLang === "az" ? "Tədris proqramları" : "Academic Programs",
    description: currentLang === "az"
      ? "Fakültə üzrə tədris olunan bütün ixtisaslar və təhsil pillələri haqqında məlumat."
      : "Information about all specializations and levels of education offered by the faculty.",
    duration: currentLang === "az" ? "Müddət" : "Duration",
    years: currentLang === "az" ? "il" : "yrs",
    degreeSuffix: currentLang === "az" ? "pilləsi" : "Degree",
    applyNow: currentLang === "az" ? "İndi müraciət et" : "Apply Now",
    getConsultation: currentLang === "az" ? "Məsləhət al" : "Get Consultation",
    bannerTitle: currentLang === "az" ? "Gələcəyin mühəndisi olmaq üçün ilk addımı atın" : "Take the first step to becoming a future engineer",
    bannerDesc: currentLang === "az"
      ? "Proqramlarımız müasir sənaye tələblərinə uyğun hazırlanıb. Sizə ən uyğun ixtisası seçin."
      : "Our programs are designed to modern industry requirements. Choose the specialization that fits you best.",
  };

  return (
    <div className="space-y-8">
      <FacultyPanel title={t.title} eyebrow={currentLang === "az" ? "İxtisaslar" : "Programs"} icon={MenuBookIcon}>
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {t.description}
        </p>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => <div key={i} className="h-40 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />)}
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([degree, specs]) => {
              const meta = degreeMeta[degree] || degreeMeta.bachelor;
              const Icon = meta.icon;
              return (
                <div key={degree}>
                  <div className="mb-5 flex items-center gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${meta.tile}`}>
                      <Icon sx={{ fontSize: 22 }} />
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white md:text-xl">
                      {meta.label} <span className="font-medium text-slate-400">· {t.degreeSuffix}</span>
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {specs.map((spec, idx) => (
                      <motion.div
                        key={spec.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="group flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-[#101733] dark:hover:border-white/20 md:flex-row md:items-center"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-3">
                            <span className="text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                              {spec.name}
                            </span>
                            {spec.code && (
                              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-400">
                                {spec.code}
                              </span>
                            )}
                          </div>
                          {spec.description && (
                            <p className="max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                              {spec.description}
                            </p>
                          )}
                        </div>

                        <div className="flex shrink-0 items-center gap-2 border-t border-slate-100 pt-4 dark:border-white/10 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                          <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{spec.duration_years}</span>
                          <span className="text-xs font-semibold uppercase text-[#ee7c7e]">{t.years}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </FacultyPanel>

      {/* Apply banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#1a2355] p-8 text-white md:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#ee7c7e]/15 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="mb-4 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
            {t.bannerTitle}
          </h2>
          <p className="mb-8 leading-relaxed text-white/70">
            {t.bannerDesc}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://portal.edu.az"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#ee7c7e] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#1a2355]"
            >
              {t.applyNow}
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </a>
            <Link
              href={`/${currentLang}/academic/faculties/${facultySlug}/about/contact`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              {t.getConsultation}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
