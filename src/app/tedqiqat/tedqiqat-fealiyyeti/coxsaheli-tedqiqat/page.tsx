"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HubIcon from "@mui/icons-material/Hub";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import PageHero from "@/components/shared/PageHero";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

const SECTION_THEME: Record<
  string,
  { gradient: string; soft: string; text: string; glow: string; Icon: typeof HubIcon }
> = {
  initiatives: {
    gradient: "from-blue-600 to-indigo-700",
    soft: "from-blue-500/15 to-indigo-500/5",
    text: "text-blue-700 dark:text-blue-300",
    glow: "shadow-blue-500/30",
    Icon: HubIcon,
  },
  ecosystem: {
    gradient: "from-emerald-500 to-teal-600",
    soft: "from-emerald-500/15 to-teal-500/5",
    text: "text-emerald-600 dark:text-emerald-300",
    glow: "shadow-emerald-500/30",
    Icon: GroupsIcon,
  },
  industry: {
    gradient: "from-[#ee7c7e] to-[#fb7185]",
    soft: "from-[#ee7c7e]/15 to-rose-500/5",
    text: "text-[#ee7c7e]",
    glow: "shadow-[#ee7c7e]/30",
    Icon: RocketLaunchIcon,
  },
  metrics: {
    gradient: "from-amber-500 to-orange-600",
    soft: "from-amber-500/15 to-orange-500/5",
    text: "text-amber-600 dark:text-amber-300",
    glow: "shadow-amber-500/30",
    Icon: EmojiEventsIcon,
  },
};

type Highlight = { title: string; content: string };
type Section = {
  id: string;
  title: string;
  text: string;
  highlightsTitle?: string;
  highlights?: Highlight[];
  bullets?: string[];
};

export default function MultidisciplinaryResearchPage() {
  const t = useTranslation();
  const { lang } = useLanguage();
  const p = (t.pages.research as unknown as {
    multidisciplinary: {
      eyebrow: string;
      title: string;
      subtitle: string;
      breadcrumb: string;
      intro: string;
      sections: Section[];
      closing: string;
      documentsTitle: string;
      documents: { label: string; href: string }[];
    };
  }).multidisciplinary;

  const researchHref = lang === "az" ? "/tedqiqat" : "/research";

  return (
    <main className="min-h-screen bg-page dark:bg-[#0b1330] selection:bg-[#ee7c7e]/30">
      <PageHero
        title={p.title}
        description={p.subtitle}
        eyebrow={p.eyebrow}
        breadcrumbs={[
          { label: t.nav.sections.research, href: researchHref },
          { label: p.breadcrumb },
        ]}
      />

      <section className="relative max-w-[1400px] mx-auto px-4 md:px-10 lg:px-16 -mt-12 pb-20 z-10 space-y-10">
        {/* INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900/70 backdrop-blur-xl border-2 border-[#1a2355]/15 dark:border-white/10 p-6 md:p-10 shadow-xl"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ee7c7e]/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#3b82f6] text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                <HubIcon sx={{ fontSize: 22 }} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#ee7c7e]">
                {lang === "az" ? "Fənlərarası baxış" : "Interdisciplinary outlook"}
              </span>
            </div>
            <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed">
              {p.intro}
            </p>
          </div>
        </motion.div>

        {/* SECTIONS */}
        {p.sections.map((section, idx) => {
          const theme = SECTION_THEME[section.id] ?? SECTION_THEME.initiatives;
          const Icon = theme.Icon;
          const num = String(idx + 1).padStart(2, "0");

          return (
            <motion.article
              key={section.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className={`group relative bg-white dark:bg-slate-900/70 backdrop-blur-xl rounded-[1.75rem] border-2 border-[#1a2355]/10 dark:border-white/10 p-6 md:p-8 overflow-hidden ${theme.glow}`}
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.gradient} opacity-80`} />
              <div className={`absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br ${theme.soft} blur-3xl rounded-full pointer-events-none`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white shadow-lg ${theme.glow}`}>
                      <Icon sx={{ fontSize: 24 }} />
                    </div>
                    <h2 className="text-lg md:text-xl font-black text-[#1a2355] dark:text-white leading-snug tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <span className={`text-3xl font-black tabular-nums tracking-tighter leading-none ${theme.text} opacity-30`}>
                    {num}
                  </span>
                </div>

                <p className="text-sm md:text-base text-gray-700 dark:text-slate-300 leading-relaxed">
                  {section.text}
                </p>

                {section.highlights && section.highlights.length > 0 && (
                  <>
                    {section.highlightsTitle && (
                      <p className="mt-6 mb-4 text-xs font-black uppercase tracking-[0.25em] text-[#1a2355]/70 dark:text-white/60">
                        {section.highlightsTitle}
                      </p>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.highlights.map((h) => (
                        <div
                          key={h.title}
                          className="rounded-2xl border border-[#1a2355]/10 dark:border-white/10 bg-white/60 dark:bg-slate-800/60 p-4"
                        >
                          <p className="text-sm font-black text-[#1a2355] dark:text-white mb-1.5">
                            {h.title}
                          </p>
                          <p className="text-xs md:text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                            {h.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <CheckCircleIcon className={theme.text} sx={{ fontSize: 18, marginTop: "2px", flexShrink: 0 }} />
                        <span className="text-sm md:text-[15px] text-gray-700 dark:text-slate-300 leading-relaxed">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          );
        })}

        {/* CLOSING */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1a2355] to-[#0f172a] text-white p-6 md:p-10 shadow-xl"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ee7c7e]/25 blur-3xl rounded-full pointer-events-none" />
          <p className="relative text-sm md:text-base leading-relaxed text-white/90">
            {p.closing}
          </p>
        </motion.div>

        {/* DOCUMENTS */}
        <section className="pt-8 border-t border-[#1a2355]/15 dark:border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-9 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
            <h2 className="text-xl font-black text-[#1a2355] dark:text-white tracking-tight">
              {p.documentsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {p.documents.map((doc) => (
              <Link
                key={doc.label}
                href={doc.href}
                className="group relative flex items-center justify-between bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border-2 border-[#1a2355]/10 dark:border-white/10 p-5 transition-all duration-500 overflow-hidden hover:-translate-y-0.5 hover:border-transparent hover:shadow-xl"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a2355] to-[#3b82f6] opacity-70 group-hover:opacity-100 transition-opacity" />
                <span className="flex items-center gap-3">
                  <span className="inline-flex w-9 h-9 rounded-xl items-center justify-center bg-gradient-to-br from-[#1a2355] to-[#3b82f6] text-white shadow-md">
                    <DescriptionIcon sx={{ fontSize: 18 }} />
                  </span>
                  <span className="text-sm font-black text-[#1a2355] dark:text-white group-hover:text-[#ee7c7e] transition-colors">
                    {doc.label}
                  </span>
                </span>
                <ChevronRightIcon className="text-[#1a2355]/40 dark:text-white/40 group-hover:text-[#ee7c7e] transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
