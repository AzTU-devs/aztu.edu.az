"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FacultyPanel, EmptyState, FACULTY_PALETTES } from "@/components/faculty/ui";
import ScienceIcon from "@mui/icons-material/Science";
import BusinessIcon from "@mui/icons-material/Business";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import BiotechIcon from "@mui/icons-material/Biotech";
import PublicIcon from "@mui/icons-material/Public";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLanguage } from "@/context/LanguageContext";
import { useScientificActivity } from "@/context/ScientificActivityContext";
import { SCIENTIFIC_NAV } from "@/util/cafedraSlugs";
import type { ScientificSectionKey } from "@/types/scientificActivity";

const SECTION_ICONS: Record<ScientificSectionKey, React.ElementType> = {
  research_areas: ScienceIcon,
  projects_grants: LightbulbIcon,
  laboratories: BiotechIcon,
  publications: MenuBookIcon,
  industry_cooperation: BusinessIcon,
  international_cooperation: PublicIcon,
};

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function ElmiFealiyyetPage({ params }: Props) {
  const { facultyId, cafedraId } = use(params);
  const { lang: currentLang } = useLanguage();
  const { data, loading } = useScientificActivity();

  const academicPrefix = currentLang === "az" ? "akademik" : "academic";
  const facultyPrefix = currentLang === "az" ? "fakulteler" : "faculties";
  const kafedraSlug = currentLang === "az" ? "kafedralar" : "departments";
  const base = `/${currentLang}/${academicPrefix}/${facultyPrefix}/${facultyId}/${kafedraSlug}/${cafedraId}`;
  const researchBase = `${base}/${currentLang === "az" ? "elmi-fealiyyet" : "scientific-activity"}`;

  const available = data?.available ?? [];
  const cards = SCIENTIFIC_NAV.filter((s) => available.includes(s.key));

  return (
    <div className="space-y-8">
      <FacultyPanel
        title={currentLang === "az" ? "Elmi-tədqiqat fəaliyyəti" : "Scientific Research Activity"}
        eyebrow={currentLang === "az" ? "Kafedra" : "Department"}
        icon={ScienceIcon}
      >
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {currentLang === "az"
            ? "Kafedranın elmi potensialı, həyata keçirilən tədqiqat layihələri və sənaye tərəfdaşlıqları haqqında məlumat."
            : "Information about the department's scientific potential, ongoing research projects, and industrial partnerships."}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
            ))}
          </div>
        ) : cards.length === 0 ? (
          <EmptyState
            icon={ScienceIcon}
            title={currentLang === "az" ? "Məlumat tapılmadı" : "No data found"}
            hint={
              currentLang === "az"
                ? "Bu kafedra üçün elmi fəaliyyət məlumatı hələ əlavə edilməyib."
                : "No scientific activity information has been added for this department yet."
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {cards.map((section, idx) => {
              const Icon = SECTION_ICONS[section.key];
              const palette = FACULTY_PALETTES[idx % FACULTY_PALETTES.length];
              return (
                <motion.div
                  key={section.key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.04, 0.3), ease: [0.23, 1, 0.32, 1] }}
                >
                  <Link
                    href={`${researchBase}/${currentLang === "az" ? section.az : section.en}`}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:hover:border-white/20"
                  >
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${palette.tint}`}>
                      <Icon sx={{ fontSize: 22 }} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-semibold leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                        {currentLang === "az" ? section.azLabel : section.enLabel}
                      </span>
                      <span className={`mt-1.5 inline-flex items-center gap-1 text-[13px] font-semibold ${palette.text}`}>
                        {currentLang === "az" ? "Bax" : "View"}
                        <ChevronRightIcon
                          sx={{ fontSize: 16 }}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </span>
                  </Link>
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
            href={`${base}/${currentLang === "az" ? "haqqimizda/xeberler" : "about/news"}`}
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
