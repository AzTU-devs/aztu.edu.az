"use client";

import { use, useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FacultyPanel, FACULTY_PALETTES } from "@/components/faculty/ui";
import InfoIcon from "@mui/icons-material/Info";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ScienceIcon from "@mui/icons-material/Science";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getFacultyBySlug } from "@/services/facultyService/facultyService";
import type { FacultyDetail, ContentSection } from "@/types/faculty";
import { useLanguage } from "@/context/LanguageContext";
import AssignedNewsSection from "@/components/news/AssignedNewsSection";

interface Props {
  params: Promise<{ facultyId: string }>;
}

function StatCard({ label, value, icon: Icon, index }: { label: string; value: number; icon: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const palette = FACULTY_PALETTES[index % FACULTY_PALETTES.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-[#101733]"
    >
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${palette.tint}`}>
        <Icon sx={{ fontSize: 24 }} />
      </div>
      <span className="block text-3xl font-bold tabular-nums tracking-tight text-slate-900 dark:text-white">
        {value}
      </span>
      <span className="mt-1 block text-[11px] font-semibold uppercase tracking-wide leading-snug text-slate-500 dark:text-slate-400">
        {label}
      </span>
    </motion.div>
  );
}

const SECTION_ICONS: Record<string, React.ElementType> = {
  haqqinda: InfoIcon,
  istiqametler: AccountTreeIcon,
  meqsed: TrackChangesIcon,
  vezifeler: AssignmentIcon,
  laboratoriyalar: ScienceIcon,
  tedqiqat: ScienceIcon,
  layiheler: AssignmentIcon,
  partnyorlar: BusinessIcon,
};

export default function FacultyHaqqimizdaPage({ params }: Props) {
  const { facultyId: facultySlug } = use(params);
  const { lang: currentLang } = useLanguage();
  const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFacultyBySlug(facultySlug, currentLang)
      .then((result) => {
        setFaculty(result);
        setLoading(false);
      })
      .catch(() => {
        setFaculty(null);
        setLoading(false);
      });
  }, [facultySlug, currentLang]);

  const stats = faculty ? [
    { label: currentLang === "az" ? "Kafedralar" : "Departments", value: faculty.cafedra_count, icon: AccountTreeIcon },
    { label: currentLang === "az" ? "Dekan müavinləri" : "Deputy Deans", value: faculty.deputy_dean_count, icon: PersonIcon },
    { label: currentLang === "az" ? "Bakalavr ixtisasları" : "Bachelor Programs", value: faculty.bachelor_programs_count, icon: SchoolIcon },
    { label: currentLang === "az" ? "Magistratura ixtisasları" : "Master Programs", value: faculty.master_programs_count, icon: SchoolIcon },
    { label: currentLang === "az" ? "Doktorantura ixtisasları" : "PhD Programs", value: faculty.phd_programs_count, icon: SchoolIcon },
    { label: currentLang === "az" ? "Laboratoriyalar" : "Laboratories", value: faculty.laboratories_count, icon: ScienceIcon },
    { label: currentLang === "az" ? "Beynəlxalq əlaqələr" : "Int. Collaborations", value: faculty.international_collaborations_count, icon: PublicIcon },
    { label: currentLang === "az" ? "Sənaye əməkdaşlığı" : "Industrial Partners", value: faculty.industrial_collaborations_count, icon: BusinessIcon },
    { label: currentLang === "az" ? "Layihə və patentlər" : "Projects & Patents", value: faculty.projects_patents_count, icon: AssignmentIcon },
  ].filter(s => s.value !== null && s.value !== undefined) : [];

  const renderContentSection = (id: string, title: string, items?: ContentSection[], htmlContent?: string) => {
    const hasItems = items && items.length > 0;
    const hasHtml = htmlContent !== undefined && htmlContent !== null && htmlContent !== "";
    if (!hasItems && !hasHtml) return null;

    const isAboutSection = id === "haqqinda";
    const Icon = SECTION_ICONS[id] ?? InfoIcon;

    return (
      <div id={id} className="scroll-mt-28">
        <FacultyPanel title={title} icon={Icon}>
          {htmlContent ? (
            <div className="relative">
              <motion.div
                initial={false}
                animate={{ height: isAboutSection && !isExpanded ? 220 : "auto" }}
                className="overflow-hidden"
              >
                <div
                  className="prose prose-sm md:prose-base max-w-none text-justify leading-relaxed text-slate-600 dark:text-slate-300 dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </motion.div>

              {isAboutSection && (
                <div className={!isExpanded
                  ? "absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-gradient-to-t from-white via-white/90 to-transparent dark:from-slate-900 dark:via-slate-900/90"
                  : "mt-5 flex justify-center"}
                >
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#1a2355] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ee7c7e]"
                  >
                    {isExpanded
                      ? (currentLang === "az" ? "Daha az" : "Read less")
                      : (currentLang === "az" ? "Daha çox oxu" : "Read more")}
                    <ExpandMoreIcon sx={{ fontSize: 18 }} className={isExpanded ? "rotate-180 transition-transform" : "transition-transform"} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {items?.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.04, 0.3) }}
                  className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition-colors hover:border-[#ee7c7e]/40 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ee7c7e]" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</p>
                    {item.description && (
                      <p className="mt-1 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{item.description}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </FacultyPanel>
      </div>
    );
  };

  const navSections = [
    { id: "haqqinda", title: currentLang === "az" ? "Haqqında" : "About" },
    { id: "sustainability", title: currentLang === "az" ? "DİM (SDG)" : "SDG" },
    { id: "meqsed", title: currentLang === "az" ? "Məqsədlər" : "Objectives" },
    { id: "vezifeler", title: currentLang === "az" ? "Vəzifələr" : "Duties" },
    { id: "istiqametler", title: currentLang === "az" ? "İstiqamətlər" : "Directions" },
    { id: "laboratoriyalar", title: currentLang === "az" ? "Laboratoriyalar" : "Laboratories" },
    { id: "tedqiqat", title: currentLang === "az" ? "Tədqiqat" : "Research" },
    { id: "layiheler", title: currentLang === "az" ? "Layihələr" : "Projects" },
    { id: "partnyorlar", title: currentLang === "az" ? "Partnyorlar" : "Partners" },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-64 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* About */}
      {renderContentSection("haqqinda", currentLang === "az" ? "Fakültə haqqında" : "About Faculty", undefined, faculty?.html_content)}

      {/* Directions of action */}
      {renderContentSection("istiqametler", currentLang === "az" ? "Fəaliyyət istiqamətləri" : "Directions of Action", faculty?.directions_of_action)}

      {/* Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} index={i} />
          ))}
        </div>
      )}

      {/* SDG */}
      {faculty?.sdgs && faculty.sdgs.length > 0 && (
        <div id="sustainability" className="scroll-mt-28">
          <FacultyPanel
            title={currentLang === "az" ? "Davamlı İnkişaf Məqsədləri" : "Sustainable Development Goals"}
            eyebrow="United Nations"
            icon={PublicIcon}
          >
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {faculty.sdgs.map((sdgId, idx) => (
                <motion.div
                  key={sdgId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: Math.min(idx * 0.04, 0.4) }}
                  whileHover={{ y: -4 }}
                  className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 shadow-sm dark:border-white/10"
                  title={`SDG Goal ${sdgId}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://open-sdg.github.io/sdg-translations/assets/img/goals/en/${sdgId}.png`}
                    alt={`SDG ${sdgId}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as any).style.display = 'none';
                      const p = (e.target as any).parentElement;
                      p.style.backgroundColor = '#1a2355';
                      p.innerText = sdgId;
                      p.style.display = 'flex';
                      p.style.alignItems = 'center';
                      p.style.justifyContent = 'center';
                      p.style.color = 'white';
                      p.style.fontSize = '1.5rem';
                      p.style.fontWeight = '700';
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </FacultyPanel>
        </div>
      )}

      {/* Sticky anchor nav */}
      {faculty && (
        <div className="sticky top-16 z-20 -mx-4 border-y border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 lg:top-2">
          <div className="no-scrollbar mx-auto flex gap-2 overflow-x-auto">
            {navSections.map((s) => {
              const hasContent =
                (s.id === "haqqinda" && (faculty.html_content !== undefined && faculty.html_content !== null && faculty.html_content !== "")) ||
                (s.id === "sustainability" && faculty.sdgs && faculty.sdgs.length > 0) ||
                (s.id === "meqsed" && faculty.objectives && faculty.objectives.length > 0) ||
                (s.id === "vezifeler" && faculty.duties && faculty.duties.length > 0) ||
                (s.id === "istiqametler" && faculty.directions_of_action && faculty.directions_of_action.length > 0) ||
                (s.id === "laboratoriyalar" && faculty.laboratories && faculty.laboratories.length > 0) ||
                (s.id === "tedqiqat" && faculty.research_works && faculty.research_works.length > 0) ||
                (s.id === "layiheler" && faculty.projects && faculty.projects.length > 0) ||
                (s.id === "partnyorlar" && faculty.partner_companies && faculty.partner_companies.length > 0);

              if (!hasContent) return null;

              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="whitespace-nowrap rounded-xl border border-slate-200 px-4 py-2 text-[13px] font-semibold text-slate-600 transition-all hover:border-[#ee7c7e] hover:bg-[#ee7c7e] hover:text-white dark:border-white/10 dark:text-slate-300"
                >
                  {s.title}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Remaining sections */}
      <div className="space-y-8 pb-8">
        {renderContentSection("meqsed", currentLang === "az" ? "Fəaliyyət məqsədləri" : "Strategic Objectives", faculty?.objectives)}
        {renderContentSection("vezifeler", currentLang === "az" ? "Vəzifələr" : "Duties & Responsibilities", faculty?.duties)}
        {renderContentSection("laboratoriyalar", currentLang === "az" ? "Laboratoriyalar" : "Laboratories", faculty?.laboratories)}
        {renderContentSection("tedqiqat", currentLang === "az" ? "Elmi tədqiqat işləri" : "Scientific Research", faculty?.research_works)}
        {renderContentSection("layiheler", currentLang === "az" ? "Layihələr" : "Projects & Initiatives", faculty?.projects)}
        {renderContentSection("partnyorlar", currentLang === "az" ? "Partnyor şirkətlər" : "Industrial Partners", faculty?.partner_companies)}
        {faculty?.faculty_code && <AssignedNewsSection facultyCode={faculty.faculty_code} />}
      </div>
    </div>
  );
}
