"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BusinessIcon from "@mui/icons-material/Business";
import { FacultyPanel, EmptyState, FACULTY_PALETTES } from "@/components/faculty/ui";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import { useLanguage } from "@/context/LanguageContext";
import { useScientificActivity } from "@/context/ScientificActivityContext";
import { getImageUrl } from "@/services/researchInstituteService/researchInstituteService";

export default function SenayeIleEmekdasliqPage() {
  const { lang: currentLang } = useLanguage();
  const { data, loading } = useScientificActivity();

  const section = data?.sections.industry_cooperation;
  const items = section?.items ?? [];

  return (
    <div className="space-y-8">
      <FacultyPanel
        title={currentLang === "az" ? "Sənaye ilə əməkdaşlıq" : "Cooperation with Industries"}
        eyebrow={currentLang === "az" ? "Elmi fəaliyyət" : "Scientific Activity"}
        icon={BusinessIcon}
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

            {items.length === 0 ? (
              <EmptyState
                icon={BusinessIcon}
                title={currentLang === "az" ? "Məlumat tapılmadı" : "No data found"}
                hint={
                  currentLang === "az"
                    ? "Tərəfdaş şirkət hələ əlavə edilməyib."
                    : "No partner companies have been added yet."
                }
              />
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
                {items.map((partner, idx) => {
                  const palette = FACULTY_PALETTES[idx % FACULTY_PALETTES.length];
                  const logo = getImageUrl(partner.logo_url);
                  const monogram = (partner.title ?? "?").trim().charAt(0).toUpperCase();

                  const tile = (
                    <>
                      <span className="flex h-20 w-full items-center justify-center overflow-hidden rounded-xl bg-white dark:bg-white/95">
                        {logo ? (
                          <Image
                            src={logo}
                            alt={partner.title ?? ""}
                            width={160}
                            height={80}
                            className="h-full w-full object-contain p-3"
                          />
                        ) : (
                          <span className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold ${palette.tint}`}>
                            {monogram}
                          </span>
                        )}
                      </span>
                      <span className="mt-3 block text-center text-[13px] font-semibold leading-tight text-slate-900 transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                        {partner.title}
                      </span>
                      {partner.description && (
                        <span className="mt-1 block text-center text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
                          {partner.description}
                        </span>
                      )}
                    </>
                  );

                  const tileClass =
                    "group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:hover:border-white/20";

                  return (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.3), ease: [0.23, 1, 0.32, 1] }}
                      className="h-full"
                    >
                      {partner.website_url ? (
                        <a href={partner.website_url} target="_blank" rel="noopener noreferrer" className={tileClass}>
                          {tile}
                        </a>
                      ) : (
                        <div className={tileClass}>{tile}</div>
                      )}
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
