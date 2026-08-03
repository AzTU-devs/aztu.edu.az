"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PublicIcon from "@mui/icons-material/Public";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NumbersIcon from "@mui/icons-material/Numbers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LayersIcon from "@mui/icons-material/Layers";
import TranslateIcon from "@mui/icons-material/Translate";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LinkIcon from "@mui/icons-material/Link";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import AboutPageBanner from "@/components/about/AboutPageBanner";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import { useLanguage } from "@/context/LanguageContext";
import { getResearchPage } from "@/services/researchService/researchService";
import { getImageUrl } from "@/services/departmentService/departmentService";
import type { ResearchPage } from "@/types/research";

/**
 * Each journal is a backend `research_pages` document (template "journal"),
 * addressed on the site by its az or en slug. This maps the URL slug to the
 * page_key the API reads; the hero video is the section default (static), and
 * every other field comes from the CMS.
 */
const SLUG_TO_KEY: Record<string, string> = {
    "masin-elmi": "journal-machine-science",
    "machine-science": "journal-machine-science",
    "enerji-davamliligi-riskler-ve-qerarlarin-qebul-edilmesi": "journal-energy-sustainability",
    "energy-sustainability-risks-and-decision-making": "journal-energy-sustainability",
    "elmi-eserler": "journal-scientific-works",
    "scientific-works": "journal-scientific-works",
};

interface Props {
    params: Promise<{ slug: string }>;
}

interface DetailView {
    label: string;
    value: string;
    icon: typeof NumbersIcon;
    href?: string;
}

export default function ScientificJournalPage({ params }: Props) {
    const { slug } = use(params);
    const { lang } = useLanguage();
    const az = lang === "az";

    const pageKey = SLUG_TO_KEY[slug.toLowerCase()];

    const [page, setPage] = useState<ResearchPage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!pageKey) {
            setLoading(false);
            return;
        }
        let cancelled = false;
        setLoading(true);
        getResearchPage(pageKey, lang).then((result) => {
            if (!cancelled) {
                setPage(result);
                setLoading(false);
            }
        });
        return () => {
            cancelled = true;
        };
    }, [pageKey, lang]);

    const researchHref = az ? "/tedqiqat" : "/research";
    const journalsLabel = az ? "Elmi Jurnallar" : "Scientific Journals";

    // ── Loading ──────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <main className="min-h-screen bg-page">
                <AboutPageBanner
                    eyebrow={az ? "Tədqiqat" : "Research"}
                    title={journalsLabel}
                    subtitle={az ? "Elmi jurnal yüklənir…" : "Loading the journal…"}
                    breadcrumbs={[
                        { label: az ? "Tədqiqat" : "Research", href: researchHref },
                        { label: journalsLabel },
                    ]}
                />
                <div className="mx-auto flex max-w-[1400px] justify-center px-4 py-32">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#ee7c7e] border-t-transparent" />
                </div>
            </main>
        );
    }

    // ── Unknown slug or not published ──────────────────────────────────────────
    if (!pageKey || !page) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center bg-page px-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#1a2355] text-white shadow-2xl">
                    <AutoStoriesIcon sx={{ fontSize: 40 }} />
                </div>
                <h1 className="mt-8 text-center text-3xl font-black text-[#1a2355] dark:text-white">
                    {az ? "Jurnal tapılmadı" : "Journal not found"}
                </h1>
                <p className="mt-3 max-w-md text-center text-slate-500 dark:text-slate-400">
                    {az
                        ? "Bu jurnal mövcud deyil və ya hələ dərc olunmayıb."
                        : "This journal does not exist or has not been published yet."}
                </p>
                <Link
                    href={researchHref}
                    className="mt-8 inline-flex items-center gap-1.5 rounded-2xl bg-[#1a2355] px-7 py-3.5 font-bold text-white transition-colors hover:bg-[#1a2355]/90"
                >
                    {az ? "Tədqiqata qayıt" : "Back to Research"}
                    <ChevronRightIcon sx={{ fontSize: 18 }} />
                </Link>
            </main>
        );
    }

    // ── Loaded ─────────────────────────────────────────────────────────────────
    const journalName = page.journal_name || page.title || journalsLabel;
    const cover = page.image_url ? getImageUrl(page.image_url) : "";
    const buttonUrl = (page.button_url || "").trim();
    const buttonHref = buttonUrl
        ? buttonUrl.startsWith("http")
            ? buttonUrl
            : `https://${buttonUrl}`
        : "";
    const buttonLabel = page.button_label || (az ? "Jurnalın saytına keç" : "Visit the journal");

    const doiHref = page.doi
        ? page.doi.startsWith("http")
            ? page.doi
            : page.doi.startsWith("10.")
            ? `https://doi.org/${page.doi}`
            : ""
        : "";

    const details: DetailView[] = (
        [
            { label: "ISSN", value: page.issn, icon: NumbersIcon },
            { label: "E-ISSN", value: page.eissn, icon: NumbersIcon },
            { label: az ? "Nəşr ili" : "Publication Year", value: page.publication_year, icon: CalendarMonthIcon },
            { label: az ? "İllik buraxılış sayı" : "Issues per Year", value: page.yearly_count, icon: LayersIcon },
            { label: az ? "Dil" : "Language", value: page.journal_language, icon: TranslateIcon },
            { label: az ? "Təsisçi" : "Founder", value: page.founder, icon: AccountBalanceIcon },
            { label: "DOI", value: page.doi, icon: LinkIcon, href: doiHref || undefined },
        ] as Array<DetailView & { value: string | null }>
    ).filter((d): d is DetailView => Boolean(d.value && d.value.trim()));

    return (
        <main className="min-h-screen bg-page selection:bg-[#ee7c7e]/25">
            <AboutPageBanner
                eyebrow={az ? "Tədqiqat" : "Research"}
                title={journalName}
                subtitle={az ? "AzTU-nun elmi jurnalı" : "A scientific journal of AzTU"}
                breadcrumbs={[
                    { label: az ? "Tədqiqat" : "Research", href: researchHref },
                    { label: journalsLabel },
                    { label: journalName },
                ]}
            />

            {/* ── FLOATING JOURNAL CARD ─────────────────────────────────────── */}
            <section className="relative z-20 -mt-16 px-4 pb-4 md:px-10 lg:px-20">
                <div className="mx-auto max-w-[1400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-2xl shadow-[#1a2355]/10 dark:border-white/10 dark:bg-[#0f1836]"
                    >
                        <div className="grid md:grid-cols-[minmax(0,360px)_1fr]">
                            {/* Cover */}
                            <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a2355] to-[#0b1330] p-8 md:p-10">
                                <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#ee7c7e]/20 blur-3xl" />
                                <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
                                <div className="relative w-full max-w-[240px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                                    {cover ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={cover} alt={journalName} className="aspect-[3/4] w-full object-cover" />
                                    ) : (
                                        <div className="flex aspect-[3/4] w-full items-center justify-center bg-white/[0.04]">
                                            <AutoStoriesIcon sx={{ fontSize: 96, color: "white", opacity: 0.18 }} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex flex-col justify-center p-8 md:p-12">
                                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ee7c7e]/30 bg-[#ee7c7e]/10 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.25em] text-[#ee7c7e]">
                                    <AutoStoriesIcon sx={{ fontSize: 14 }} />
                                    {az ? "Elmi Jurnal" : "Scientific Journal"}
                                </span>
                                <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight text-[#1a2355] dark:text-white lg:text-4xl">
                                    {journalName}
                                </h1>

                                {page.description ? (
                                    <SanitizedHtml
                                        html={page.description}
                                        className="prose prose-slate mt-4 max-w-none text-[15px] leading-relaxed dark:prose-invert [&_p]:text-slate-600 dark:[&_p]:text-slate-300"
                                    />
                                ) : null}

                                {buttonHref ? (
                                    <a
                                        href={buttonHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group mt-7 inline-flex w-fit items-center gap-2.5 rounded-2xl bg-[#1a2355] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1a2355]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ee7c7e] hover:shadow-[#ee7c7e]/30"
                                    >
                                        {buttonLabel}
                                        <ArrowOutwardIcon
                                            sx={{ fontSize: 18 }}
                                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                        />
                                    </a>
                                ) : null}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── DETAILS GRID ──────────────────────────────────────────────── */}
            {details.length > 0 && (
                <section className="px-4 py-10 md:px-10 lg:px-20">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {details.map((detail, i) => {
                                const Icon = detail.icon;
                                return (
                                    <motion.div
                                        key={detail.label}
                                        initial={{ opacity: 0, y: 14 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                                        className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ee7c7e]/40 hover:shadow-md dark:border-white/10 dark:bg-[#0f1836]"
                                    >
                                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a2355]/5 text-[#1a2355] transition-colors group-hover:bg-[#ee7c7e]/10 group-hover:text-[#ee7c7e] dark:bg-white/5 dark:text-white">
                                            <Icon sx={{ fontSize: 18 }} />
                                        </span>
                                        <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#ee7c7e]">
                                            {detail.label}
                                        </p>
                                        {detail.href ? (
                                            <a
                                                href={detail.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-1 flex items-center gap-1 break-all text-sm font-bold text-[#1a2355] transition-colors hover:text-[#ee7c7e] dark:text-white"
                                            >
                                                {detail.value}
                                                <PublicIcon sx={{ fontSize: 13 }} />
                                            </a>
                                        ) : (
                                            <p className="mt-1 text-sm font-bold text-[#1a2355] dark:text-white">
                                                {detail.value}
                                            </p>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ── ABOUT THE JOURNAL ─────────────────────────────────────────── */}
            {page.body_html ? (
                <section className="px-4 py-14 md:px-10 lg:px-20">
                    <div className="mx-auto max-w-[1000px]">
                        <div className="mb-8 flex items-center gap-3">
                            <span className="h-8 w-1.5 rounded-full bg-[#ee7c7e]" />
                            <h2 className="text-2xl font-black tracking-tight text-[#1a2355] dark:text-white lg:text-3xl">
                                {az ? "Jurnal Haqqında" : "About the Journal"}
                            </h2>
                        </div>
                        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#0f1836] md:p-12">
                            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#ee7c7e]/[0.07] blur-3xl" />
                            <SanitizedHtml
                                html={page.body_html}
                                className="prose prose-slate relative z-10 max-w-none leading-relaxed dark:prose-invert md:prose-lg [&_p]:text-slate-600 dark:[&_p]:text-slate-300"
                            />
                        </div>
                    </div>
                </section>
            ) : null}

            {/* ── CTA BAND ──────────────────────────────────────────────────── */}
            {buttonHref ? (
                <section className="px-4 pb-24 pt-6 md:px-10 lg:px-20">
                    <div className="mx-auto max-w-[1400px]">
                        <div className="group relative flex flex-col items-center overflow-hidden rounded-[2.5rem] bg-[#1a2355] px-6 py-16 text-center text-white shadow-2xl md:px-20">
                            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl transition-transform duration-1000 group-hover:scale-125" />
                            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#ee7c7e]/10 blur-3xl" />
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ee7c7e] shadow-[0_0_40px_rgba(238,124,126,0.4)]">
                                <AutoStoriesIcon sx={{ fontSize: 32 }} />
                            </div>
                            <h3 className="relative mt-8 max-w-2xl text-2xl font-black leading-tight tracking-tight md:text-4xl">
                                {az
                                    ? "Jurnalın arxivinə daxil olun və məqalələri oxuyun"
                                    : "Access the journal archive and read the articles"}
                            </h3>
                            <a
                                href={buttonHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative mt-10 inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 text-[12px] font-black uppercase tracking-[0.2em] text-[#1a2355] shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#ee7c7e] hover:text-white"
                            >
                                {buttonLabel}
                                <PublicIcon sx={{ fontSize: 18 }} />
                            </a>
                        </div>
                    </div>
                </section>
            ) : null}
        </main>
    );
}
