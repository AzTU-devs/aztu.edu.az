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
import MenuBookIcon from "@mui/icons-material/MenuBook";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail } from "@/types/cafedra";
import { useLanguage } from "@/context/LanguageContext";
import { getCafedraPublications, type PublicationQuartile } from "@/data/cafedraPublications";

// Localized country labels (source data is in Azerbaijani).
const COUNTRY_EN: Record<string, string> = {
  Kanada: "Canada",
  Macarıstan: "Hungary",
  Rusiya: "Russia",
  Estoniya: "Estonia",
  Yunanıstan: "Greece",
  Azərbaycan: "Azerbaijan",
  ABŞ: "USA",
};

// Localized month names for dates written as "İyun 2025", "Mart 2026" etc.
const MONTH_EN: Record<string, string> = {
  Yanvar: "January", Fevral: "February", Mart: "March", Aprel: "April",
  May: "May", İyun: "June", İyul: "July", Avqust: "August",
  Sentyabr: "September", Oktyabr: "October", Noyabr: "November", Dekabr: "December",
};

function localizeDate(date: string, lang: string): string {
  if (lang !== "en") return date;
  return date.replace(
    /Yanvar|Fevral|Mart|Aprel|May|İyun|İyul|Avqust|Sentyabr|Oktyabr|Noyabr|Dekabr/g,
    (m) => MONTH_EN[m] ?? m
  );
}

const QUARTILE_STYLES: Record<PublicationQuartile, string> = {
  Q1: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Q2: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  Q3: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Q4: "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
};

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

  const publications = getCafedraPublications(cafedraId);

  if (!cafedra && !loading && publications.length === 0) return null;

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
      {publications.length > 0 && (
        <FacultyPanel
          title={currentLang === "az" ? "Elmi məqalələr (Scopus / Web of Science)" : "Scientific Publications (Scopus / Web of Science)"}
          eyebrow={currentLang === "az" ? "Beynəlxalq indeksli nəşrlər" : "Internationally indexed publications"}
          icon={MenuBookIcon}
        >
          <p className="mb-8 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {currentLang === "az"
              ? "Kafedra əməkdaşlarının 2025–2026-cı illər üzrə beynəlxalq indeksli (Scopus, Web of Science) jurnallarda çap olunmuş elmi məqalələrinin siyahısı."
              : "List of scientific articles by the department's staff published in internationally indexed (Scopus, Web of Science) journals during 2025–2026."}
          </p>

          <ol className="space-y-4">
            {publications.map((pub) => (
              <motion.li
                key={pub.no}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:hover:border-white/20"
              >
                <div className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1a2355] text-sm font-bold text-white">
                    {pub.no}
                  </span>
                  <div className="min-w-0 flex-1">
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-start gap-1.5 text-base font-semibold leading-snug tracking-tight text-slate-900 transition-colors hover:text-[#ee7c7e] dark:text-white"
                    >
                      <span>{pub.title}</span>
                      <OpenInNewIcon sx={{ fontSize: 15 }} className="mt-1 shrink-0 text-slate-400 transition-colors group-hover:text-[#ee7c7e]" />
                    </a>

                    <p className="mt-2 text-[13px] italic leading-relaxed text-slate-500 dark:text-slate-400">
                      {pub.authors}
                    </p>

                    <p className="mt-1 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
                      {pub.journal}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#1a2355]/10 px-2.5 py-1 text-[11px] font-semibold text-[#1a2355] dark:bg-white/10 dark:text-white">
                        {pub.index}
                      </span>
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${QUARTILE_STYLES[pub.quartile]}`}>
                        {pub.quartile}
                      </span>
                      {pub.country && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">
                          {currentLang === "en" ? COUNTRY_EN[pub.country] ?? pub.country : pub.country}
                        </span>
                      )}
                      <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                        {localizeDate(pub.date, currentLang)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </FacultyPanel>
      )}

      {(loading || sections.length > 0 || publications.length === 0) && (
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
      )}

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
