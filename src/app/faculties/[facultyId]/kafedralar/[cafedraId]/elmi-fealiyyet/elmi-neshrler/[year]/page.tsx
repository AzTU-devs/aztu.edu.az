"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FacultyPanel, EmptyState } from "@/components/faculty/ui";
import { useLanguage } from "@/context/LanguageContext";
import { useScientificActivity } from "@/context/ScientificActivityContext";
import { localizeDate, QUARTILE_STYLES } from "@/util/publicationLocale";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string; year: string }>;
}

export default function ElmiNeshrlerYearPage({ params }: Props) {
  const { facultyId, cafedraId, year } = use(params);
  const { lang: currentLang } = useLanguage();
  const { data, loading } = useScientificActivity();

  const academicPrefix = currentLang === "az" ? "akademik" : "academic";
  const facultyPrefix = currentLang === "az" ? "fakulteler" : "faculties";
  const kafedraSlug = currentLang === "az" ? "kafedralar" : "departments";
  const hubHref =
    `/${currentLang}/${academicPrefix}/${facultyPrefix}/${facultyId}/${kafedraSlug}/${cafedraId}` +
    `/${currentLang === "az" ? "elmi-fealiyyet/elmi-neshrler" : "scientific-activity/scientific-publications"}`;

  // The middleware rewrites the EN "other" segment to the AZ folder "diger";
  // accept both so a hand-typed URL in either language resolves.
  const isOther = year === "diger" || year === "other";
  const heading = isOther ? (currentLang === "az" ? "Digər" : "Other") : year;

  const publications = (data?.sections.publications.items ?? []).filter((pub) =>
    isOther ? pub.year === null : pub.year === Number(year)
  );

  return (
    <div className="space-y-8">
      <Link
        href={hubHref}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-500 transition-colors hover:text-[#ee7c7e] dark:text-slate-400"
      >
        <ArrowBackIcon sx={{ fontSize: 16 }} />
        {currentLang === "az" ? "Bütün illər" : "All years"}
      </Link>

      <FacultyPanel
        title={
          currentLang === "az"
            ? `${heading} — Elmi nəşrlər`
            : `${heading} — Scientific Publications`
        }
        eyebrow={currentLang === "az" ? "Beynəlxalq indeksli nəşrlər" : "Internationally indexed publications"}
        icon={MenuBookIcon}
      >
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
            ))}
          </div>
        ) : publications.length === 0 ? (
          <EmptyState
            icon={MenuBookIcon}
            title={currentLang === "az" ? "Məlumat tapılmadı" : "No data found"}
            hint={
              currentLang === "az"
                ? "Bu il üzrə elmi nəşr tapılmadı."
                : "No publications were found for this year."
            }
          />
        ) : (
          <ol className="space-y-4">
            {publications.map((pub) => (
              <motion.li
                key={pub.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-[#101733] dark:hover:border-white/20"
              >
                <div className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1a2355] text-sm font-bold text-white">
                    {pub.no}
                  </span>
                  <div className="min-w-0 flex-1">
                    <a
                      href={pub.url ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-start gap-1.5 text-base font-semibold leading-snug tracking-tight text-slate-900 transition-colors hover:text-[#ee7c7e] dark:text-white"
                    >
                      <span>{pub.title}</span>
                      {pub.url && (
                        <OpenInNewIcon sx={{ fontSize: 15 }} className="mt-1 shrink-0 text-slate-400 transition-colors group-hover:text-[#ee7c7e]" />
                      )}
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
                      {pub.quartile && (
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${QUARTILE_STYLES[pub.quartile]}`}>
                          {pub.quartile}
                        </span>
                      )}
                      {pub.country && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">
                          {pub.country}
                        </span>
                      )}
                      {pub.date && (
                        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                          {localizeDate(pub.date, currentLang)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        )}
      </FacultyPanel>
    </div>
  );
}
