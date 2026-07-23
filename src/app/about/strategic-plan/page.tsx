"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { getAboutPage } from "@/services/aboutService/aboutService";
import { getImageUrl } from "@/services/departmentService/departmentService";
import type { AboutPage } from "@/types/about";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";
import SanitizedHtml from "@/components/shared/SanitizedHtml";

const PAGE_KEY = "strategic-plan";

interface PillarView {
    title: string;
    descriptionHtml: string;
    tags: string[];
}

interface ListView {
    key: string;
    style: string;
    title: string;
    items: string[];
}

interface LinkView {
    label: string;
    url: string;
}

export default function StrategicPlanPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.strategicPlan;

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
    const pillarsTitle =
        page?.pillars_title || (lang === "az" ? "Strateji Sütunlar" : "Strategic Pillars");

    // Either an uploaded file's stored path or a URL an editor pasted.
    const documentUrl = page?.document_url
        ? getImageUrl(page.document_url)
        : p.pdfUrl;
    const documentLabel =
        page?.document_label ||
        (lang === "az" ? "Tam sənədi yüklə" : "Download Full Document");

    const pillars: PillarView[] = page?.pillars?.length
        ? page.pillars.map((pillar) => ({
              title: pillar.title ?? "",
              descriptionHtml: pillar.description ?? "",
              tags: pillar.tags ?? [],
          }))
        : p.pillars.map(
              (pillar: { title: string; description: string; targets: string[] }) => ({
                  title: pillar.title,
                  descriptionHtml: `<p>${pillar.description}</p>`,
                  tags: pillar.targets ?? [],
              })
          );

    const lists: ListView[] = page?.lists?.length
        ? page.lists.map((entry) => ({
              key: entry.list_key,
              style: entry.style,
              title: entry.title ?? "",
              items: entry.items ?? [],
          }))
        : [
              { key: "values", style: "bullet", title: p.valuesTitle, items: p.values },
              { key: "kpis", style: "number", title: p.targetsTitle, items: p.targets },
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
                            className="prose prose-invert mb-7 max-w-2xl text-base leading-relaxed lg:text-lg [&_p]:text-white/75"
                        />

                        {documentUrl ? (
                            <a
                                href={documentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2.5 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#1a2355] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ee7c7e] hover:text-white"
                            >
                                <FileDownloadIcon sx={{ fontSize: 18 }} />
                                {documentLabel}
                            </a>
                        ) : null}
                    </motion.div>
                </div>
            </div>

            <div className="px-4 pb-20 pt-16 md:px-10 lg:px-16">
                {/* STRATEGIC PILLARS
                    Each card leads with a large ghosted ordinal, so the set reads
                    as a numbered sequence without a heavy badge. */}
                {pillars.length > 0 && (
                    <section className="mx-auto max-w-[1400px]">
                        <div className="mb-8">
                            <h2 className="text-xl font-black tracking-tight text-[#1a2355] dark:text-white lg:text-2xl">
                                {pillarsTitle}
                            </h2>
                            <span className="mt-2 block h-1 w-14 rounded-full bg-[#ee7c7e]" />
                        </div>

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            {pillars.map((pillar, index) => (
                                <motion.article
                                    key={`${pillar.title}-${index}`}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.45, delay: (index % 2) * 0.06 }}
                                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700/60 dark:bg-slate-800/50"
                                >
                                    {/* Accent rail that fills in on hover. */}
                                    <span
                                        aria-hidden
                                        className="absolute inset-y-0 left-0 w-0.5 bg-[#ee7c7e]/0 transition-colors duration-300 group-hover:bg-[#ee7c7e]"
                                    />

                                    <div className="flex items-start gap-4">
                                        <span
                                            aria-hidden
                                            className="select-none text-3xl font-black leading-none text-[#1a2355]/10 dark:text-white/10"
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="mb-2 text-base font-black leading-snug tracking-tight text-[#1a2355] dark:text-white lg:text-lg">
                                                {pillar.title}
                                            </h3>

                                            <SanitizedHtml
                                                html={pillar.descriptionHtml}
                                                className="prose prose-slate mb-4 max-w-none text-sm leading-relaxed dark:prose-invert lg:text-[15px] [&_p]:text-slate-600 dark:[&_p]:text-slate-300"
                                            />

                                            {pillar.tags.length > 0 && (
                                                <ul className="flex flex-wrap gap-1.5">
                                                    {pillar.tags.map((tag) => (
                                                        <li
                                                            key={tag}
                                                            className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:bg-slate-700/60 dark:text-slate-300"
                                                        >
                                                            {tag}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </section>
                )}

                {/* VALUES + KPIs — bulleted and numbered, side by side. */}
                {lists.length > 0 && (
                    <section className="mx-auto mt-14 grid max-w-[1400px] grid-cols-1 gap-5 lg:grid-cols-2">
                        {lists.map((list, listIndex) => {
                            const numbered = list.style === "number";

                            return (
                                <motion.div
                                    key={list.key}
                                    initial={{ opacity: 0, y: 18 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.45, delay: listIndex * 0.06 }}
                                    className={`rounded-2xl p-6 lg:p-8 ${
                                        numbered
                                            ? "bg-[#1a2355] shadow-lg shadow-[#1a2355]/20 dark:bg-slate-900"
                                            : "border border-slate-200/80 bg-white shadow-sm dark:border-slate-700/60 dark:bg-slate-800/50"
                                    }`}
                                >
                                    <h2
                                        className={`mb-5 text-base font-black uppercase tracking-wide lg:text-lg ${
                                            numbered ? "text-white" : "text-[#1a2355] dark:text-white"
                                        }`}
                                    >
                                        {list.title}
                                    </h2>

                                    <ul className="space-y-3">
                                        {list.items.map((item, index) => (
                                            <li key={item} className="flex items-start gap-3">
                                                {numbered ? (
                                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#ee7c7e]/15 text-[10px] font-black text-[#ee7c7e]">
                                                        {index + 1}
                                                    </span>
                                                ) : (
                                                    <span
                                                        aria-hidden
                                                        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ee7c7e]"
                                                    />
                                                )}
                                                <span
                                                    className={`text-sm leading-relaxed lg:text-[15px] ${
                                                        numbered
                                                            ? "text-white/85"
                                                            : "text-slate-600 dark:text-slate-300"
                                                    }`}
                                                >
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </section>
                )}

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
