"use client";

import { use, useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail, GenericSection } from "@/types/cafedra";
import { useLanguage } from "@/context/LanguageContext";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import { FacultyPanel, FACULTY_PALETTES, EmptyState } from "@/components/faculty/ui";

// Material Icons
import InfoIcon from "@mui/icons-material/Info";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ScienceIcon from "@mui/icons-material/Science";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import PublicIcon from "@mui/icons-material/Public";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
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
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-900"
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

export default function CafedraGirisPage({ params }: Props) {
  const { cafedraId } = use(params);
  const { lang: currentLang } = useLanguage();
  const [cafedra, setCafedra] = useState<CafedraDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCafedraByCode(cafedraId, currentLang).then((data) => {
      setCafedra(data);
      setLoading(false);
    });
  }, [cafedraId, currentLang]);

  const stats = cafedra ? [
    { label: currentLang === "az" ? "Bakalavr" : "Bachelor", value: cafedra.bachelor_programs_count, icon: SchoolIcon },
    { label: currentLang === "az" ? "Magistr" : "Master", value: cafedra.master_programs_count, icon: SchoolIcon },
    { label: currentLang === "az" ? "Doktorantura" : "PhD", value: cafedra.phd_programs_count, icon: SchoolIcon },
    { label: currentLang === "az" ? "Laboratoriyalar" : "Laboratories", value: cafedra.laboratories_count, icon: ScienceIcon },
    { label: currentLang === "az" ? "Beynəlxalq əlaqələr" : "Int. Relations", value: cafedra.international_collaborations_count, icon: PublicIcon },
    { label: currentLang === "az" ? "Sənaye əlaqələri" : "Industrial Coll.", value: cafedra.industrial_collaborations_count, icon: BusinessIcon },
    { label: currentLang === "az" ? "Patentlər/Layihələr" : "Patents/Projects", value: cafedra.projects_patents_count, icon: ScienceIcon },
  ].filter(s => s.value > 0) : [];

  const renderContentSection = (id: string, title: string, items?: GenericSection[], htmlContent?: string) => {
    if ((!items || items.length === 0) && !htmlContent) return null;

    const Icon = SECTION_ICONS[id] ?? InfoIcon;

    return (
      <div id={id} className="scroll-mt-28">
        <FacultyPanel title={title} icon={Icon}>
          {htmlContent ? (
            <div className="prose prose-sm md:prose-base max-w-none text-justify leading-relaxed text-slate-600 dark:text-slate-300 dark:prose-invert">
              <SanitizedHtml html={htmlContent} />
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
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  if (!cafedra) {
    return (
      <EmptyState
        icon={InfoIcon}
        title={currentLang === "az" ? "Məlumat tapılmadı" : "No information found"}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* 1. About Section */}
      {renderContentSection("haqqinda", currentLang === "az" ? "Kafedra haqqında" : "About Department", undefined, cafedra.html_content)}

      {/* 2. Metrics Section */}
      {stats.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} index={i} />
          ))}
        </div>
      )}

      {/* 3. SDG Section */}
      {cafedra.sdgs && cafedra.sdgs.length > 0 && (
        <div id="sustainability" className="scroll-mt-28">
          <FacultyPanel
            title={currentLang === "az" ? "Davamlı İnkişaf Məqsədləri" : "Sustainable Development Goals"}
            eyebrow="United Nations"
            icon={PublicIcon}
          >
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {cafedra.sdgs.map((sdgId, idx) => (
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
      <div className="sticky top-16 z-20 -mx-4 border-y border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 lg:top-2">
        <div className="no-scrollbar mx-auto flex gap-2 overflow-x-auto">
          {navSections.map((s) => {
            const hasContent =
              (s.id === "haqqinda" && cafedra.html_content) ||
              (s.id === "sustainability" && cafedra.sdgs?.length > 0) ||
              (s.id === "meqsed" && cafedra.objectives?.length > 0) ||
              (s.id === "vezifeler" && cafedra.duties?.length > 0) ||
              (s.id === "istiqametler" && cafedra.directions_of_action?.length > 0) ||
              (s.id === "laboratoriyalar" && cafedra.laboratories?.length > 0) ||
              (s.id === "tedqiqat" && cafedra.research_works?.length > 0) ||
              (s.id === "layiheler" && cafedra.projects?.length > 0) ||
              (s.id === "partnyorlar" && cafedra.partner_companies?.length > 0);

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

      {/* 4. Other Sections */}
      <div className="space-y-8 pb-8">
        {renderContentSection("meqsed", currentLang === "az" ? "Fəaliyyət məqsədləri" : "Strategic Objectives", cafedra.objectives)}
        {renderContentSection("vezifeler", currentLang === "az" ? "Vəzifələr" : "Duties & Responsibilities", cafedra.duties)}
        {renderContentSection("istiqametler", currentLang === "az" ? "Fəaliyyət istiqamətləri" : "Directions of Action", cafedra.directions_of_action)}
        {renderContentSection("laboratoriyalar", currentLang === "az" ? "Laboratoriyalar" : "Laboratories", cafedra.laboratories)}
        {renderContentSection("tedqiqat", currentLang === "az" ? "Elmi tədqiqat işləri" : "Scientific Research", cafedra.research_works)}
        {renderContentSection("layiheler", currentLang === "az" ? "Layihələr" : "Projects & Initiatives", cafedra.projects)}
        {renderContentSection("partnyorlar", currentLang === "az" ? "Partnyor şirkətlər" : "Industrial Partners", cafedra.partner_companies)}
      </div>
    </div>
  );
}
