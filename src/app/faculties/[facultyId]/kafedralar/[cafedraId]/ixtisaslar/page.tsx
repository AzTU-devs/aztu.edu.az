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
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail, CafedraSpecialization } from "@/types/cafedra";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

const degreeMeta: Record<string, { label: string; icon: any; tile: string }> = {
  bachelor: { label: "Bakalavr", icon: SchoolIcon, tile: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  master: { label: "Magistr", icon: WorkspacePremiumIcon, tile: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  phd: { label: "Doktorantura", icon: HistoryEduIcon, tile: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
};

export default function CafedraIxtisaslarPage({ params }: Props) {
  const { facultyId, cafedraId } = use(params);
  const { lang: currentLang } = useLanguage();
  const [cafedra, setCafedra] = useState<CafedraDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCafedraByCode(cafedraId, currentLang)
      .then((result) => {
        setCafedra(result);
        setLoading(false);
      })
      .catch(() => {
        setCafedra(null);
        setLoading(false);
      });
  }, [cafedraId, currentLang]);

  // Using mock data if API doesn't provide specializations yet, to show the layout
  const specializations: CafedraSpecialization[] = [
    {
      id: 1,
      name: currentLang === "az" ? "İnformasiya texnologiyaları" : "Information Technologies",
      code: "050628",
      degree: "bachelor",
      duration_years: 4,
      description: currentLang === "az" ? "Şəbəkə texnologiyaları, informasiya təhlükəsizliyi və proqram təminatı hazırlığı." : "Network technologies, information security and software development.",
    },
    {
      id: 2,
      name: currentLang === "az" ? "Kompüter mühəndisliyi" : "Computer Engineering",
      code: "050627",
      degree: "bachelor",
      duration_years: 4,
      description: currentLang === "az" ? "Kompüter sistemləri, aparat təminatı və alqoritmik həllər." : "Computer systems, hardware and algorithmic solutions.",
    },
    {
      id: 3,
      name: currentLang === "az" ? "Kompüter elmləri" : "Computer Science",
      code: "060627",
      degree: "master",
      duration_years: 2,
      description: currentLang === "az" ? "Süni intellekt, maşın öyrənməsi və böyük verilənlər təhlili." : "Artificial intelligence, machine learning and big data analytics.",
    },
  ];

  const grouped = specializations.reduce<Record<string, CafedraSpecialization[]>>(
    (acc, s) => {
      const key = s.degree;
      if (!acc[key]) acc[key] = [];
      acc[key].push(s);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-8">
      <FacultyPanel
        title={currentLang === "az" ? "Kafedra ixtisasları" : "Departmental Programs"}
        eyebrow={currentLang === "az" ? "İxtisaslar" : "Programs"}
        icon={MenuBookIcon}
      >
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {currentLang === "az"
            ? "Kafedra tərəfindən tədris olunan bütün ixtisaslar və təhsil pillələri haqqında ətraflı məlumat."
            : "Detailed information about all specializations and levels of education offered by the department."}
        </p>

        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
            ))}
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
                      {currentLang === "az" ? `${meta.label} pilləsi` : `${meta.label} Degree`}
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
                        className="group flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:hover:border-white/20 md:flex-row md:items-center"
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

                        <div className="flex shrink-0 flex-col items-end gap-0.5 border-t border-slate-100 pt-4 dark:border-white/10 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                            {currentLang === "az" ? "Müddət" : "Duration"}
                          </span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                              {spec.duration_years}
                            </span>
                            <span className="text-xs font-semibold uppercase text-[#ee7c7e]">
                              {currentLang === "az" ? "İL" : "YEARS"}
                            </span>
                          </div>
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
            {currentLang === "az" ? "Akademik karyeranızı bizimlə qurun" : "Build your academic career with us"}
          </h2>
          <p className="mb-8 leading-relaxed text-white/70">
            {currentLang === "az"
              ? "Kafedramızın təklif etdiyi yüksək keyfiyyətli təhsil proqramları ilə gələcəyinizə investisiya edin."
              : "Invest in your future with the high-quality educational programs offered by our department."}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://portal.edu.az"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#ee7c7e] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white hover:text-[#1a2355]"
            >
              {currentLang === "az" ? "İndi müraciət et" : "Apply Now"}
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </a>
            <Link
              href={`/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/elaqe`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              {currentLang === "az" ? "Məlumat al" : "Get Information"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
