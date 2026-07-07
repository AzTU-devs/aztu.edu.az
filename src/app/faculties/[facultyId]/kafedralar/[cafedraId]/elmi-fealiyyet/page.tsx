"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FacultyPanel, EmptyState, FACULTY_PALETTES } from "@/components/faculty/ui";
import ScienceIcon from "@mui/icons-material/Science";
import BusinessIcon from "@mui/icons-material/Business";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FlagIcon from "@mui/icons-material/Flag";
import SettingsIcon from "@mui/icons-material/Settings";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail } from "@/types/cafedra";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function ElmiFealiyyetPage({ params }: Props) {
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

  if (!cafedra && !loading) return null;

  const sections = [
    { title: currentLang === "az" ? "Laboratoriyalar" : "Laboratories", data: cafedra?.laboratories, icon: ScienceIcon },
    { title: currentLang === "az" ? "Elmi-tədqiqat işləri" : "Research Works", data: cafedra?.research_works, icon: AutoStoriesIcon },
    { title: currentLang === "az" ? "Layihələr" : "Projects", data: cafedra?.projects, icon: LightbulbIcon },
    { title: currentLang === "az" ? "Tərəfdaş şirkətlər" : "Partner Companies", data: cafedra?.partner_companies, icon: BusinessIcon },
    { title: currentLang === "az" ? "Məqsədlər" : "Objectives", data: cafedra?.objectives, icon: FlagIcon },
    { title: currentLang === "az" ? "Vəzifələr" : "Duties", data: cafedra?.duties, icon: SettingsIcon },
  ].filter(s => s.data && s.data.length > 0);

  return (
    <div className="space-y-8">
      <FacultyPanel
        title={currentLang === "az" ? "Elmi-tədqiqat fəaliyyəti" : "Scientific Research Activity"}
        eyebrow={currentLang === "az" ? "Kafedra" : "Department"}
        icon={ScienceIcon}
      >
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {currentLang === "az"
            ? "Kafedranın elmi potensialı, həyata keçirilən tədqiqat layihələri və sənaye tərəfdaşlıqları haqqında məlumat."
            : "Information about the department's scientific potential, ongoing research projects, and industrial partnerships."}
        </p>

        {loading ? (
          <div className="space-y-12">
            {[1, 2].map(i => (
              <div key={i} className="space-y-6">
                <div className="h-11 w-48 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {[1, 2].map(j => <div key={j} className="h-32 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />)}
                </div>
              </div>
            ))}
          </div>
        ) : sections.length === 0 ? (
          <EmptyState
            icon={ScienceIcon}
            title={currentLang === "az" ? "Məlumat tapılmadı" : "No data found"}
            hint={currentLang === "az"
              ? "Bu kafedra üçün elmi fəaliyyət məlumatı hələ əlavə edilməyib."
              : "No scientific activity information has been added for this department yet."}
          />
        ) : (
          <div className="space-y-12">
            {sections.map((sec, groupIdx) => {
              const Icon = sec.icon;
              const palette = FACULTY_PALETTES[groupIdx % FACULTY_PALETTES.length];
              return (
                <motion.div
                  key={groupIdx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: Math.min(groupIdx * 0.05, 0.3) }}
                >
                  <div className="mb-5 flex items-center gap-3.5">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${palette.tint}`}>
                      <Icon sx={{ fontSize: 22 }} />
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white md:text-xl">
                      {sec.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {sec.data!.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: Math.min(idx * 0.04, 0.3) }}
                        className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:hover:border-white/20"
                      >
                        <div className="flex items-start gap-3">
                          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${palette.dot}`} />
                          <div>
                            <h4 className="text-base font-semibold leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                              {item.title}
                            </h4>
                            {item.description && (
                              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500 line-clamp-3 dark:text-slate-400">
                                {item.description}
                              </p>
                            )}
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
      </FacultyPanel>

      {/* Research news banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="rounded-2xl bg-[#1a2355] p-8 text-white shadow-sm md:p-10"
      >
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#ee7c7e]">
              <ScienceIcon sx={{ fontSize: 26 }} />
            </span>
            <div>
              <h2 className="text-xl font-bold tracking-tight md:text-2xl">
                {currentLang === "az" ? "Elmi potensialımızla tanış olun" : "Explore our scientific potential"}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
                {currentLang === "az"
                  ? "Kafedramız beynəlxalq standartlara uyğun tədqiqatlar aparır və sənaye üçün innovativ həllər hazırlayır."
                  : "Our department conducts research according to international standards and develops innovative solutions for industry."}
              </p>
            </div>
          </div>
          <Link
            href={`/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/xeberler`}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#ee7c7e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#f09395]"
          >
            {currentLang === "az" ? "Elmi xəbərlər" : "Research News"}
            <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
