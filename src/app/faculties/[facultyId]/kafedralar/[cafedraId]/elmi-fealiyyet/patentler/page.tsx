"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { FacultyPanel, EmptyState, FACULTY_PALETTES } from "@/components/faculty/ui";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import { useLanguage } from "@/context/LanguageContext";
import { useScientificActivity } from "@/context/ScientificActivityContext";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function PatentlerPage({ params }: Props) {
  const { facultyId, cafedraId } = use(params);
  const { lang: currentLang } = useLanguage();
  const { data, loading } = useScientificActivity();

  const academicPrefix = currentLang === "az" ? "akademik" : "academic";
  const facultyPrefix = currentLang === "az" ? "fakulteler" : "faculties";
  const kafedraSlug = currentLang === "az" ? "kafedralar" : "departments";
  const sectionBase =
    `/${currentLang}/${academicPrefix}/${facultyPrefix}/${facultyId}/${kafedraSlug}/${cafedraId}` +
    `/${currentLang === "az" ? "elmi-fealiyyet/patentler" : "scientific-activity/patents"}`;

  const section = data?.sections.patents;
  const years = section?.years ?? [];

  return (
    <div className="space-y-8">
      <FacultyPanel
        title={currentLang === "az" ? "Patentlər" : "Patents"}
        eyebrow={currentLang === "az" ? "Qeydə alınmış ixtiralar" : "Registered inventions"}
        icon={WorkspacePremiumIcon}
      >
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
            ))}
          </div>
        ) : (
          <>
            {section?.intro_html && (
              <SanitizedHtml
                html={section.intro_html}
                className="mb-8 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300"
              />
            )}

            {years.length === 0 ? (
              <EmptyState
                icon={WorkspacePremiumIcon}
                title={currentLang === "az" ? "Məlumat tapılmadı" : "No data found"}
                hint={
                  currentLang === "az"
                    ? "Bu kafedra üçün patent əlavə edilməyib."
                    : "No patents have been added for this department."
                }
              />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {years.map((bucket, idx) => {
                  const palette = FACULTY_PALETTES[idx % FACULTY_PALETTES.length];
                  const slug = bucket.year === null ? (currentLang === "az" ? "diger" : "other") : String(bucket.year);
                  const label =
                    bucket.year === null ? (currentLang === "az" ? "Digər" : "Other") : String(bucket.year);
                  return (
                    <motion.div
                      key={slug}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.3), ease: [0.23, 1, 0.32, 1] }}
                    >
                      <Link
                        href={`${sectionBase}/${slug}`}
                        className="group flex h-full flex-col items-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:hover:border-white/20"
                      >
                        <span className={`text-3xl font-extrabold tracking-tight tabular-nums md:text-4xl ${palette.text}`}>
                          {label}
                        </span>
                        <span className="mt-1.5 text-[13px] font-medium text-slate-500 dark:text-slate-400">
                          {currentLang === "az"
                            ? `${bucket.count} patent`
                            : `${bucket.count} ${bucket.count === 1 ? "patent" : "patents"}`}
                        </span>
                        <span className="mt-auto flex items-center gap-1 pt-4 text-[11px] font-bold uppercase tracking-widest text-[#1a2355] transition-colors group-hover:text-[#ee7c7e] dark:text-blue-400">
                          {currentLang === "az" ? "Bax" : "View"}
                          <ChevronRightIcon
                            sx={{ fontSize: 15 }}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </FacultyPanel>
    </div>
  );
}
