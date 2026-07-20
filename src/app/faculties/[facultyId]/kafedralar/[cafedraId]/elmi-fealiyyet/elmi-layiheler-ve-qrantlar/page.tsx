"use client";

import { motion } from "framer-motion";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { FacultyPanel, EmptyState, FACULTY_PALETTES } from "@/components/faculty/ui";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import { useLanguage } from "@/context/LanguageContext";
import { useScientificActivity } from "@/context/ScientificActivityContext";

export default function ElmiLayihelerVeQrantlarPage() {
  const { lang: currentLang } = useLanguage();
  const { data, loading } = useScientificActivity();

  const section = data?.sections.projects_grants;
  const items = section?.items ?? [];

  return (
    <div className="space-y-8">
      <FacultyPanel
        title={currentLang === "az" ? "Elmi layihələr və qrantlar" : "Scientific Projects and Grants"}
        eyebrow={currentLang === "az" ? "Elmi fəaliyyət" : "Scientific Activity"}
        icon={LightbulbIcon}
      >
        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                icon={LightbulbIcon}
                title={currentLang === "az" ? "Məlumat tapılmadı" : "No data found"}
                hint={
                  currentLang === "az"
                    ? "Elmi layihə və qrant məlumatı hələ əlavə edilməyib."
                    : "No projects or grants have been added yet."
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {items.map((item, idx) => {
                  const palette = FACULTY_PALETTES[idx % FACULTY_PALETTES.length];
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.3), ease: [0.23, 1, 0.32, 1] }}
                      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:hover:border-white/20"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${palette.dot}`} />
                        <div className="min-w-0 flex-1">
                          {item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-start gap-1.5 text-base font-semibold leading-tight tracking-tight text-slate-900 transition-colors hover:text-[#ee7c7e] dark:text-white"
                            >
                              <span>{item.title}</span>
                              <OpenInNewIcon
                                sx={{ fontSize: 15 }}
                                className="mt-1 shrink-0 text-slate-400 transition-colors group-hover:text-[#ee7c7e]"
                              />
                            </a>
                          ) : (
                            <h3 className="text-base font-semibold leading-tight tracking-tight text-slate-900 dark:text-white">
                              {item.title}
                            </h3>
                          )}
                          {item.description && (
                            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
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
