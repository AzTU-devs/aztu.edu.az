"use client";

import { motion } from "framer-motion";
import ScienceIcon from "@mui/icons-material/Science";
import { FacultyPanel, EmptyState, FACULTY_PALETTES } from "@/components/faculty/ui";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import { useLanguage } from "@/context/LanguageContext";
import { useScientificActivity } from "@/context/ScientificActivityContext";

export default function TedqiqatSaheleriPage() {
  const { lang: currentLang } = useLanguage();
  const { data, loading } = useScientificActivity();

  const section = data?.sections.research_areas;
  const items = section?.items ?? [];

  return (
    <div className="space-y-8">
      <FacultyPanel
        title={currentLang === "az" ? "Tədqiqat sahələri" : "Research Areas"}
        eyebrow={currentLang === "az" ? "Elmi fəaliyyət" : "Scientific Activity"}
        icon={ScienceIcon}
      >
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
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
                icon={ScienceIcon}
                title={currentLang === "az" ? "Məlumat tapılmadı" : "No data found"}
                hint={
                  currentLang === "az"
                    ? "Tədqiqat sahələri hələ əlavə edilməyib."
                    : "No research areas have been added yet."
                }
              />
            ) : (
              <div className="space-y-4">
                {items.map((item, idx) => {
                  const palette = FACULTY_PALETTES[idx % FACULTY_PALETTES.length];
                  return (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.3), ease: [0.23, 1, 0.32, 1] }}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-[#101733] dark:hover:border-white/20 md:p-6"
                    >
                      <div className="flex items-start gap-3.5">
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${palette.tint}`}>
                          {idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-semibold leading-tight tracking-tight text-slate-900 dark:text-white md:text-lg">
                            {item.title}
                          </h3>
                          {(item.html_content || item.description) && (
                            <SanitizedHtml
                              html={item.html_content ?? item.description ?? ""}
                              className="mt-2.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300"
                            />
                          )}
                        </div>
                      </div>
                    </motion.article>
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
