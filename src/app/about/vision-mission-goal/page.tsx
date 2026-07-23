"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { getAboutPage } from "@/services/aboutService/aboutService";
import type { AboutPage } from "@/types/about";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import FlagIcon from "@mui/icons-material/Flag";
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";
import SanitizedHtml from "@/components/shared/SanitizedHtml";

const PAGE_KEY = "vision-mission-goal";

/** The card icons are part of the design, so they live here rather than in the CMS. */
const BLOCK_ICONS: Record<string, typeof TrackChangesIcon> = {
    mission: TrackChangesIcon,
    vision: VisibilityIcon,
    goal: FlagIcon,
};

interface CardView {
    key: string;
    title: string;
    bodyHtml: string;
}

interface LinkView {
    label: string;
    url: string;
}

export default function VisionMissionGoalPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.visionMissionGoal;

    const [page, setPage] = useState<AboutPage | null>(null);

    useEffect(() => {
        let cancelled = false;
        getAboutPage(PAGE_KEY, lang).then((result) => {
            if (!cancelled) setPage(result);
        });
        return () => {
            cancelled = true;
        };
    }, [lang]);

    // The CMS is the source of truth once the page is published; until then the
    // built-in copy keeps the page complete rather than blank.
    const title = page?.title || p.title;
    const descriptionHtml = page?.description || `<p>${p.subtitle}</p>`;
    const linksTitle = page?.links_title || t.common.moreInSection;

    const cards: CardView[] = page?.blocks?.length
        ? page.blocks.map((block) => ({
              key: block.block_key,
              title: block.title ?? "",
              bodyHtml: block.body ?? "",
          }))
        : [
              { key: "mission", title: p.missionTitle, bodyHtml: `<p>${p.missionText}</p>` },
              { key: "vision", title: p.visionTitle, bodyHtml: `<p>${p.visionText}</p>` },
              { key: "goal", title: p.goalTitle, bodyHtml: `<p>${p.goalText}</p>` },
          ];

    const links: LinkView[] = page?.links?.length
        ? page.links.map((link) => ({ label: link.label ?? "", url: link.url ?? "#" }))
        : p.related.map((link: { title: string; href: string }) => ({
              label: link.title,
              url: link.href,
          }));

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* HERO */}
            <div className="relative flex min-h-[52vh] flex-col pt-36 lg:pt-40">
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <AboutHeroVideoBg />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-16 md:px-10 lg:px-16">
                    <nav className="mb-10 flex items-center gap-1.5 text-[11px] text-white/55">
                        <Link href="/" className="flex items-center gap-1 transition-colors hover:text-white">
                            <HomeIcon sx={{ fontSize: 13 }} />
                            {t.common.home}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 11 }} />
                        <Link
                            href={lang === "az" ? "/haqqimizda" : "/about"}
                            className="transition-colors hover:text-white"
                        >
                            {t.nav.sections.about}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 11 }} />
                        <span className="font-semibold text-[#ee7c7e]">{p.breadcrumb}</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="max-w-3xl"
                    >
                        <span className="mb-5 inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ee7c7e] backdrop-blur-md">
                            {p.eyebrow}
                        </span>
                        <h1 className="mb-5 text-3xl font-black leading-[1.08] tracking-tight text-white md:text-4xl lg:text-5xl">
                            {title}
                        </h1>
                        <SanitizedHtml
                            html={descriptionHtml}
                            className="prose prose-invert max-w-2xl text-base leading-relaxed lg:text-lg [&_p]:text-white/75"
                        />
                    </motion.div>
                </div>
            </div>

            {/* STATEMENT CARDS */}
            <div className="relative z-10 -mt-12 px-4 pb-20 md:px-10 lg:px-16">
                <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-5">
                    {cards.map((card, index) => {
                        const Icon = BLOCK_ICONS[card.key] ?? TrackChangesIcon;
                        // Alternating light/dark, so three stacked statements read as
                        // distinct cards rather than one long block.
                        const dark = index % 2 === 1;

                        return (
                            <motion.article
                                key={card.key}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.45, delay: index * 0.06 }}
                                className={`group relative overflow-hidden rounded-2xl p-6 transition-shadow duration-300 md:p-8 lg:p-10 ${
                                    dark
                                        ? "bg-[#1a2355] shadow-lg shadow-[#1a2355]/20 dark:bg-slate-900"
                                        : "border border-slate-200/80 bg-white shadow-sm hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50"
                                }`}
                            >
                                {/* Watermark — decorative, and deliberately restrained. */}
                                <Icon
                                    aria-hidden
                                    sx={{ fontSize: 96 }}
                                    className={`pointer-events-none absolute -right-4 -top-4 transition-opacity duration-500 ${
                                        dark
                                            ? "text-white/[0.04] group-hover:text-white/[0.07]"
                                            : "text-[#1a2355]/[0.035] group-hover:text-[#1a2355]/[0.06]"
                                    }`}
                                />

                                <div className="relative z-10">
                                    <div className="mb-5 flex items-center gap-3">
                                        <span
                                            className={`flex h-9 w-9 items-center justify-center rounded-lg text-[#ee7c7e] ${
                                                dark ? "bg-white/10" : "bg-[#ee7c7e]/10"
                                            }`}
                                        >
                                            <Icon sx={{ fontSize: 18 }} />
                                        </span>
                                        <h2
                                            className={`text-base font-black uppercase tracking-wide lg:text-lg ${
                                                dark ? "text-white" : "text-[#1a2355] dark:text-white"
                                            }`}
                                        >
                                            {card.title}
                                        </h2>
                                    </div>

                                    <div className="relative pl-6">
                                        <FormatQuoteIcon
                                            aria-hidden
                                            sx={{ fontSize: 34 }}
                                            style={{ left: "-0.35rem" }}
                                            className={`absolute -top-1 ${
                                                dark ? "text-white/15" : "text-[#ee7c7e]/20"
                                            }`}
                                        />
                                        <SanitizedHtml
                                            html={card.bodyHtml}
                                            className={`prose max-w-3xl text-base font-medium italic leading-relaxed lg:text-lg ${
                                                dark
                                                    ? "prose-invert [&_p]:text-white/90"
                                                    : "prose-slate dark:prose-invert [&_p]:text-slate-600 dark:[&_p]:text-slate-300"
                                            }`}
                                        />
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                {/* MORE IN THIS SECTION */}
                {links.length > 0 && (
                    <section className="mx-auto mt-16 max-w-[1400px] border-t border-slate-200 pt-12 dark:border-slate-800">
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
            </div>
        </main>
    );
}
