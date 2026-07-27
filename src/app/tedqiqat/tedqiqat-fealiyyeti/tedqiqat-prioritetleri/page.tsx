"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import ScienceIcon from "@mui/icons-material/Science";
import HubIcon from "@mui/icons-material/Hub";

import PageHero from "@/components/shared/PageHero";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { getResearchPage } from "@/services/researchService/researchService";
import type { ResearchPage } from "@/types/research";

const PAGE_KEY = "research-priorities";

/**
 * The icons and gradients are a visual system, not editable content, so they
 * stay here and cycle by card index. The CMS supplies only the text; the sixth
 * theme onward repeats, which keeps any number of priorities looking coherent.
 */
const PRIORITY_THEME = [
    { icon: PsychologyIcon, gradient: "from-blue-600 to-indigo-700", soft: "from-blue-500/15 to-indigo-500/5", text: "text-blue-700 dark:text-blue-300" },
    { icon: ElectricBoltIcon, gradient: "from-amber-500 to-orange-600", soft: "from-amber-500/15 to-orange-500/5", text: "text-amber-600 dark:text-amber-300" },
    { icon: PrecisionManufacturingIcon, gradient: "from-[#ee7c7e] to-[#fb7185]", soft: "from-[#ee7c7e]/15 to-rose-500/5", text: "text-[#ee7c7e]" },
    { icon: RocketLaunchIcon, gradient: "from-purple-500 to-violet-700", soft: "from-purple-500/15 to-violet-500/5", text: "text-purple-600 dark:text-purple-300" },
    { icon: NaturePeopleIcon, gradient: "from-emerald-500 to-teal-600", soft: "from-emerald-500/15 to-teal-500/5", text: "text-emerald-600 dark:text-emerald-300" },
    { icon: HubIcon, gradient: "from-cyan-500 to-sky-600", soft: "from-cyan-500/15 to-sky-500/5", text: "text-cyan-600 dark:text-cyan-300" },
];

interface PriorityView {
    title: string;
    descriptionHtml: string;
}

interface LinkView {
    label: string;
    url: string;
}

export default function ResearchPrioritiesPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.research.priorities;

    const [page, setPage] = useState<ResearchPage | null>(null);

    useEffect(() => {
        let cancelled = false;
        getResearchPage(PAGE_KEY, lang).then((result) => {
            if (!cancelled) setPage(result);
        });
        return () => {
            cancelled = true;
        };
    }, [lang]);

    const researchHref = lang === "az" ? "/tedqiqat" : "/research";
    const fallbackItems = p.items ?? [];

    // The CMS is the source of truth once published; until then the built-in
    // copy keeps the page complete rather than blank.
    const title = page?.title || p.title;
    const heroDescription = page?.description
        ? undefined
        : (p as { subtitle?: string }).subtitle;
    const heroDescriptionHtml = page?.description ?? null;

    const outlookHtml =
        page?.body_html ||
        `<p>${(p as { description?: string }).description ??
            (lang === "az"
                ? "AzTU-nun strateji elmi hədəfləri."
                : "AzTU's strategic scientific goals.")}</p>`;

    const linksTitle = page?.links_title || t.common.moreInSection;

    const priorities: PriorityView[] = page?.priorities?.length
        ? page.priorities.map((priority) => ({
              title: priority.title ?? "",
              descriptionHtml: priority.description ?? "",
          }))
        : fallbackItems.map((item: { title: string; content: string }) => ({
              title: item.title,
              descriptionHtml: `<p>${item.content}</p>`,
          }));

    const links: LinkView[] = page?.links?.length
        ? page.links.map((link) => ({ label: link.label ?? "", url: link.url ?? "#" }))
        : [];

    return (
        <main className="min-h-screen bg-page dark:bg-[#0b1330] selection:bg-[#ee7c7e]/30">
            <PageHero
                title={title}
                description={heroDescription}
                eyebrow={p.eyebrow}
                breadcrumbs={[
                    { label: t.nav.sections.research, href: researchHref },
                    { label: p.breadcrumb },
                ]}
            >
                {heroDescriptionHtml ? (
                    <SanitizedHtml
                        html={heroDescriptionHtml}
                        className="prose prose-invert mt-4 max-w-2xl text-base leading-relaxed [&_p]:text-white/80"
                    />
                ) : null}
            </PageHero>

            <section className="relative z-10 mx-auto -mt-12 max-w-[1400px] space-y-8 px-4 pb-20 md:px-10 lg:px-16">
                {/* STRATEGIC OUTLOOK */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/50 md:p-8"
                >
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#ee7c7e]/10 blur-3xl" />
                    <div className="relative z-10">
                        <div className="mb-3 flex items-center gap-3">
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#1a2355] to-[#3b82f6] text-white shadow-md shadow-blue-500/20">
                                <ScienceIcon sx={{ fontSize: 18 }} />
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e]">
                                {lang === "az" ? "Strateji baxış" : "Strategic outlook"}
                            </span>
                        </div>
                        <SanitizedHtml
                            html={outlookHtml}
                            className="prose prose-slate max-w-none text-sm leading-relaxed dark:prose-invert md:text-base [&_p]:text-slate-600 dark:[&_p]:text-slate-300"
                        />
                    </div>
                </motion.div>

                {/* PRIORITY CARDS */}
                {priorities.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        {priorities.map((priority, index) => {
                            const theme = PRIORITY_THEME[index % PRIORITY_THEME.length];
                            const Icon = theme.icon;

                            return (
                                <motion.article
                                    key={`${priority.title}-${index}`}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.45, delay: (index % 2) * 0.06 }}
                                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50"
                                >
                                    {/* Soft tint that warms on hover. */}
                                    <div
                                        aria-hidden
                                        className={`pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gradient-to-br ${theme.soft} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                                    />

                                    <div className="relative z-10 flex items-start gap-4">
                                        <span
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${theme.gradient} text-white shadow-md`}
                                        >
                                            <Icon sx={{ fontSize: 22 }} />
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <div className="mb-2 flex items-center gap-2">
                                                <span className={`text-xs font-black ${theme.text}`}>
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                                <h2 className="text-base font-black leading-snug tracking-tight text-[#1a2355] dark:text-white lg:text-lg">
                                                    {priority.title}
                                                </h2>
                                            </div>
                                            <SanitizedHtml
                                                html={priority.descriptionHtml}
                                                className="prose prose-slate max-w-none text-sm leading-relaxed dark:prose-invert [&_p]:text-slate-600 dark:[&_p]:text-slate-300"
                                            />
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                )}

                {/* MORE IN THIS SECTION */}
                {links.length > 0 && (
                    <section className="border-t border-slate-200 pt-10 dark:border-slate-800">
                        <h2 className="mb-6 flex items-center gap-2.5 text-sm font-black uppercase tracking-wide text-[#1a2355] dark:text-white">
                            <span className="h-5 w-1.5 rounded-full bg-[#ee7c7e]" />
                            {linksTitle}
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {links.map((link, index) => (
                                <Link
                                    key={`${link.url}-${index}`}
                                    href={link.url}
                                    className="group flex items-center justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ee7c7e]/50 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50"
                                >
                                    <span className="text-sm font-bold text-[#1a2355] transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                                        {link.label}
                                    </span>
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-[#1a2355] transition-all duration-300 group-hover:bg-[#1a2355] group-hover:text-white dark:bg-slate-700 dark:text-white">
                                        <ChevronRightIcon
                                            sx={{ fontSize: 17 }}
                                            className="transition-transform group-hover:translate-x-0.5"
                                        />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </section>
        </main>
    );
}
