"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import BiotechIcon from "@mui/icons-material/Biotech";
import ScienceIcon from "@mui/icons-material/Science";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { FacultyPanel, EmptyState } from "@/components/faculty/ui";
import { useLanguage } from "@/context/LanguageContext";
import { useScientificActivity } from "@/context/ScientificActivityContext";
import { getImageUrl } from "@/services/researchInstituteService/researchInstituteService";

const plainText = (html?: string | null) =>
  html ? html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "";

export default function LaboratoriyalarPage() {
  const { lang: currentLang } = useLanguage();
  const { data, loading } = useScientificActivity();

  const items = data?.sections.laboratories.items ?? [];

  return (
    <div className="space-y-8">
      <FacultyPanel
        title={currentLang === "az" ? "Laboratoriyalar" : "Laboratories"}
        eyebrow={currentLang === "az" ? "Elmi fəaliyyət" : "Scientific Activity"}
        icon={BiotechIcon}
      >
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon={BiotechIcon}
            title={currentLang === "az" ? "Məlumat tapılmadı" : "No data found"}
            hint={
              currentLang === "az"
                ? "Bu kafedra üçün laboratoriya əlavə edilməyib."
                : "No laboratories have been added for this department."
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((lab, idx) => {
              const path =
                currentLang === "az"
                  ? `/az/tedqiqat/tedqiqat-fealiyyeti/tedqiqat-laboratoriyalari/${lab.id}`
                  : `/en/research/research-activity/research-laboratories/${lab.id}`;
              const img = getImageUrl(lab.image_url);

              return (
                <motion.div
                  key={lab.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.3), ease: [0.23, 1, 0.32, 1] }}
                  className="h-full"
                >
                  <Link
                    href={path}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:hover:border-white/20"
                  >
                    {img ? (
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          src={img}
                          alt={lab.title ?? ""}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex h-40 w-full items-center justify-center bg-slate-50 dark:bg-white/5">
                        <ScienceIcon sx={{ fontSize: 40, color: "#1a2355", opacity: 0.15 }} />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-base font-semibold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                        {lab.title}
                      </h3>

                      {plainText(lab.html_content) && (
                        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
                          {plainText(lab.html_content)}
                        </p>
                      )}

                      {(lab.room_number || lab.authorized_person) && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {lab.room_number && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">
                              <MeetingRoomIcon sx={{ fontSize: 13 }} />
                              {lab.room_number}
                            </span>
                          )}
                          {lab.authorized_person && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">
                              <PersonOutlineIcon sx={{ fontSize: 13 }} />
                              {lab.authorized_person}
                            </span>
                          )}
                        </div>
                      )}

                      <span className="mt-auto flex items-center gap-1.5 pt-4 text-[11px] font-bold uppercase tracking-widest text-[#1a2355] transition-colors group-hover:text-[#ee7c7e] dark:text-blue-400">
                        {currentLang === "az" ? "Ətraflı" : "View more"}
                        <ChevronRightIcon
                          sx={{ fontSize: 16 }}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </FacultyPanel>
    </div>
  );
}
