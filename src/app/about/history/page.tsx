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
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";
import SanitizedHtml from "@/components/shared/SanitizedHtml";

const PAGE_KEY = "history";

interface MilestoneView {
    year: string;
    title: string;
    descriptionHtml: string;
}

interface LinkView {
    label: string;
    url: string;
}

export default function HistoryPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.history;

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

    const milestones: MilestoneView[] = page?.milestones?.length
        ? page.milestones.map((milestone) => ({
              year: milestone.year ?? "",
              title: milestone.title ?? "",
              descriptionHtml: milestone.description ?? "",
          }))
        : p.milestones.map((milestone: { year: string; title: string; description: string }) => ({
              year: milestone.year,
              title: milestone.title,
              descriptionHtml: `<p>${milestone.description}</p>`,
          }));

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

            {/* TIMELINE
                A centre spine with cards alternating either side on desktop,
                collapsing to a single left-anchored rail on smaller screens. */}
            <div className="px-4 pb-20 pt-16 md:px-10 lg:px-16">
                <div className="relative mx-auto max-w-[1200px]">
                    {/* The spine. Fades out at both ends so it reads as a thread
                        rather than a hard rule. */}
                    <span
                        aria-hidden
                        className="absolute bottom-0 left-[13px] top-0 w-px bg-gradient-to-b from-transparent via-[#ee7c7e]/35 to-transparent lg:left-1/2 lg:-translate-x-1/2"
                    />

                    <ol className="space-y-8 lg:space-y-2">
                        {milestones.map((milestone, index) => {
                            const flip = index % 2 === 1;

                            return (
                                <li key={`${milestone.year}-${index}`} className="relative">
                                    {/* Node on the spine, aligned with the card's first line. */}
                                    <span
                                        aria-hidden
                                        className="absolute left-[13px] top-7 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#ee7c7e] ring-4 ring-[#f8fafc] dark:ring-[#0f172a] lg:left-1/2"
                                    />

                                    <div className="lg:grid lg:grid-cols-2 lg:gap-14">
                                        <motion.article
                                            initial={{ opacity: 0, y: 18 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-60px" }}
                                            transition={{ duration: 0.45 }}
                                            className={`group ml-9 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50 lg:ml-0 lg:my-6 lg:p-6 ${
                                                flip
                                                    ? "lg:col-start-2"
                                                    : "lg:col-start-1 lg:text-right"
                                            }`}
                                        >
                                            <span
                                                className={`mb-2.5 inline-flex items-center rounded-md bg-[#ee7c7e]/10 px-2.5 py-1 text-xs font-black tracking-wide text-[#ee7c7e] ${
                                                    flip ? "" : "lg:ml-auto"
                                                }`}
                                            >
                                                {milestone.year}
                                            </span>

                                            <h2 className="mb-2 text-base font-black leading-snug tracking-tight text-[#1a2355] dark:text-white lg:text-lg">
                                                {milestone.title}
                                            </h2>

                                            <SanitizedHtml
                                                html={milestone.descriptionHtml}
                                                className={`prose prose-slate max-w-none text-sm leading-relaxed dark:prose-invert lg:text-[15px] [&_p]:text-slate-600 dark:[&_p]:text-slate-300 ${
                                                    flip ? "" : "lg:[&_p]:text-right"
                                                }`}
                                            />
                                        </motion.article>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>

                {/* MORE IN THIS SECTION */}
                {links.length > 0 && (
                    <section className="mx-auto mt-16 max-w-[1200px] border-t border-slate-200 pt-12 dark:border-slate-800">
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
