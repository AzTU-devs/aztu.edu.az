"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PublicIcon from "@mui/icons-material/Public";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import EnergySavingsLeafOutlinedIcon from "@mui/icons-material/EnergySavingsLeafOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";
import RankingCertificates from "@/components/about/RankingCertificates";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

/* The locale arrays are heterogeneous by design — only some results carry a
   `note`, only the THE subject rows carry a `href` — so they are read through
   these shapes rather than through the inferred union. */
type RankResult = {
    label: string;
    value: string;
    year: string;
    note?: string;
    href?: string;
};

type RankingBody = {
    key: string;
    name: string;
    logo: string;
    tagline: string;
    criteria: string;
    methodologyUrl: string;
    profileUrl: string;
    profileLabel: string;
    results: readonly RankResult[];
};

/** One accent per ranking body, used only for the logo chip rule and hover. */
const BODY_ACCENT: Record<string, string> = {
    qs: "#F2683C",
    the: "#B71C3B",
    greenmetric: "#2E9E5B",
};

/** The three ranking-body logos are black-on-transparent, so on any dark
    surface they need an opaque white chip — the same treatment the home hero
    uses for its Scopus / Web of Science tiles. */
function LogoChip({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
    return (
        <span
            className={`flex items-center justify-center overflow-hidden rounded-xl bg-white px-3 py-2 shadow-md ${className}`}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} className="h-full w-full object-contain" />
        </span>
    );
}

function SectionHeading({
    icon: Icon,
    eyebrow,
    title,
    lead,
}: {
    icon: React.ElementType;
    eyebrow: string;
    title: string;
    lead?: string;
}) {
    return (
        <div className="max-w-3xl">
            <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e]">
                <Icon sx={{ fontSize: 16 }} />
                {eyebrow}
            </p>
            {/* No `dark:` colours here: this heading sits directly on `.bg-page`,
                which globals.css keeps white in both themes. */}
            <h2 className="text-3xl font-black leading-[1.1] tracking-tighter text-[#1a2355] md:text-4xl">
                {title}
            </h2>
            {lead && (
                <p className="mt-4 text-[15px] leading-relaxed text-slate-500 md:text-base">
                    {lead}
                </p>
            )}
        </div>
    );
}

export default function RankingsPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const r = t.pages.about.rankings;

    const bodies = r.bodies as readonly RankingBody[];
    const gmMaxScale = Math.max(...r.gmCategories.map((c) => c.max));

    return (
        <main className="min-h-screen bg-page selection:bg-[#ee7c7e]/30">
            {/* ─────────────────────────────────────────────────────────────
                HERO — the headline position, stated once, very large.
               ───────────────────────────────────────────────────────────── */}
            <header className="text-flow relative overflow-hidden bg-[#0a0c1a] pt-40 lg:pt-48">
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c1a] via-[#111827] to-[#0f172a]" />
                    <AboutHeroVideoBg />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c1a]/90 via-[#0a0c1a]/55 to-transparent" />
                    <div className="absolute -right-[8%] -top-[30%] h-[720px] w-[720px] rounded-full bg-blue-800/20 blur-[170px]" />
                    <div className="absolute -bottom-[35%] left-[4%] h-[540px] w-[540px] rounded-full bg-[#ee7c7e]/10 blur-[150px]" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-24 md:px-10 lg:px-20">
                    <Breadcrumbs
                        items={[
                            {
                                label: lang === "az" ? "Haqqımızda" : "About",
                                href: lang === "az" ? "/az/haqqimizda" : "/en/about",
                            },
                            { label: r.breadcrumb },
                        ]}
                    />

                    <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                            className="lg:col-span-7"
                        >
                            <span className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-3.5 py-1.5 backdrop-blur-xl">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#ee7c7e] shadow-[0_0_10px_#ee7c7e]" />
                                <span className="text-[10px] font-black uppercase tracking-[0.32em] text-white/85">
                                    {r.eyebrow}
                                </span>
                            </span>

                            <h1 className="max-w-3xl text-4xl font-black leading-[1.03] tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)] md:text-5xl xl:text-6xl">
                                {r.title}
                            </h1>

                            <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/65 md:text-lg">
                                {r.subtitle}
                            </p>

                            <div className="mt-9 flex flex-wrap items-center gap-3">
                                {bodies.map((body) => (
                                    <LogoChip
                                        key={body.key}
                                        src={body.logo}
                                        alt={body.name}
                                        className="h-11 w-[132px] md:h-12 md:w-[148px]"
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Headline rank — QS World, the figure the university leads with. */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                            className="lg:col-span-5"
                        >
                            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.07] p-8 shadow-2xl shadow-black/30 backdrop-blur-2xl md:p-10">
                                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#ee7c7e]/15 blur-3xl" />
                                <p className="relative z-10 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
                                    <EmojiEventsOutlinedIcon sx={{ fontSize: 15 }} className="text-[#ee7c7e]" />
                                    {r.glance[0].note}
                                </p>
                                <p className="relative z-10 mt-6 text-6xl font-black leading-none tracking-tighter text-white tabular-nums md:text-7xl">
                                    {r.glance[0].value}
                                </p>
                                <p className="relative z-10 mt-5 border-t border-white/10 pt-5 text-sm font-bold uppercase tracking-[0.2em] text-white/60">
                                    {r.glance[0].label}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </header>

            <div className="mx-auto w-full max-w-[1600px] px-4 md:px-10 lg:px-20">
                {/* ─────────────────────────────────────────────────────────
                    AT A GLANCE — lifted over the hero edge.
                   ───────────────────────────────────────────────────────── */}
                <section className="relative z-20 -mt-14">
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
                        {r.glance.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[0.06] transition-colors hover:border-[#ee7c7e]/50 dark:border-white/10 dark:bg-slate-900 md:p-7"
                            >
                                <span className="absolute inset-x-0 bottom-0 h-[3px] w-0 bg-[#ee7c7e] transition-all duration-500 group-hover:w-full" />
                                <p className="text-3xl font-black leading-none tracking-tighter text-[#1a2355] tabular-nums dark:text-white md:text-4xl">
                                    {item.value}
                                </p>
                                <p className="mt-3 text-[11px] font-black uppercase leading-tight tracking-[0.16em] text-[#1a2355]/70 dark:text-white/70 md:text-xs">
                                    {item.label}
                                </p>
                                <p className="mt-2 text-[11px] font-medium leading-snug text-slate-400 dark:text-slate-500">
                                    {item.note}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                    <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-slate-500 md:text-base">
                        {r.intro}
                    </p>
                </section>

                {/* ─────────────────────────────────────────────────────────
                    RANKING BODIES
                   ───────────────────────────────────────────────────────── */}
                <section id="ranking-systems" className="mt-24 scroll-mt-28">
                    <SectionHeading
                        icon={PublicIcon}
                        eyebrow={lang === "az" ? "Sistemlər" : "Systems"}
                        title={r.bodiesTitle}
                        lead={r.bodiesLead}
                    />

                    <div className="mt-10 space-y-6">
                        {bodies.map((body, index) => {
                            const accent = BODY_ACCENT[body.key] ?? "#ee7c7e";
                            return (
                                <motion.article
                                    key={body.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.55, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900"
                                >
                                    <div className="h-1 w-full" style={{ backgroundColor: accent }} />

                                    <div className="grid grid-cols-1 lg:grid-cols-12">
                                        {/* Identity rail */}
                                        <div className="border-b border-slate-100 p-6 dark:border-white/10 md:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
                                            <LogoChip
                                                src={body.logo}
                                                alt={body.name}
                                                className="h-14 w-[164px] border border-slate-200 dark:border-white/10"
                                            />
                                            <h3 className="mt-6 text-xl font-black leading-tight tracking-tight text-[#1a2355] dark:text-white">
                                                {body.name}
                                            </h3>
                                            <p className="mt-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                                                {body.tagline}
                                            </p>
                                            <p className="mt-5 text-[14px] leading-relaxed text-slate-500 dark:text-slate-400">
                                                {body.criteria}
                                            </p>

                                            <div className="mt-7 flex flex-wrap gap-2.5">
                                                <a
                                                    href={body.profileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-xl bg-[#1a2355] px-4 py-2.5 text-[11px] font-bold text-white transition-colors hover:bg-[#ee7c7e]"
                                                >
                                                    {body.profileLabel}
                                                    <NorthEastIcon sx={{ fontSize: 14 }} />
                                                </a>
                                                <a
                                                    href={body.methodologyUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-[11px] font-bold text-[#1a2355] transition-colors hover:border-[#ee7c7e] hover:text-[#ee7c7e] dark:border-white/10 dark:text-white"
                                                >
                                                    {r.methodologyLabel}
                                                    <NorthEastIcon sx={{ fontSize: 14 }} />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Results */}
                                        <div className="p-6 md:p-8 lg:col-span-8">
                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                {body.results.map((result) => {
                                                    const inner = (
                                                        <>
                                                            <div className="flex items-baseline justify-between gap-3">
                                                                <span className="text-2xl font-black leading-none tracking-tighter text-[#1a2355] tabular-nums dark:text-white">
                                                                    {result.value}
                                                                </span>
                                                                <span className="shrink-0 rounded-md bg-[#1a2355]/[0.06] px-2 py-0.5 text-[10px] font-black tabular-nums tracking-[0.12em] text-[#1a2355]/70 dark:bg-white/10 dark:text-white/70">
                                                                    {result.year}
                                                                </span>
                                                            </div>
                                                            <p className="mt-3 text-[13px] font-black leading-snug text-[#1a2355] dark:text-white">
                                                                {result.label}
                                                            </p>
                                                            {result.note && (
                                                                <p className="mt-1.5 text-[12px] leading-snug text-slate-400 dark:text-slate-500">
                                                                    {result.note}
                                                                </p>
                                                            )}
                                                            {result.href && (
                                                                <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#ee7c7e]">
                                                                    {r.subjectLinkLabel}
                                                                    <ArrowOutwardIcon sx={{ fontSize: 12 }} />
                                                                </span>
                                                            )}
                                                        </>
                                                    );

                                                    const shell =
                                                        "block rounded-xl border border-slate-200 bg-slate-50/60 px-5 py-5 transition-colors dark:border-white/10 dark:bg-white/5";

                                                    return result.href ? (
                                                        <a
                                                            key={`${result.label}-${result.year}`}
                                                            href={result.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className={`${shell} hover:border-[#ee7c7e]/60`}
                                                        >
                                                            {inner}
                                                        </a>
                                                    ) : (
                                                        <div key={`${result.label}-${result.year}`} className={shell}>
                                                            {inner}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </section>

                {/* ─────────────────────────────────────────────────────────
                    THE — SDG BREAKDOWN
                   ───────────────────────────────────────────────────────── */}
                <section id="sdg" className="mt-24 scroll-mt-28">
                    <SectionHeading
                        icon={PublicIcon}
                        eyebrow={lang === "az" ? "Dayanıqlı inkişaf" : "Sustainable development"}
                        title={r.sdgTitle}
                        lead={r.sdgLead}
                    />

                    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {r.sdgs.map((sdg, index) => {
                            /* The stronger band gets the coral treatment; everything
                               else stays neutral so the difference is readable at a
                               glance rather than decorative. */
                            const isStrong = sdg.band.startsWith("401");
                            return (
                                <motion.div
                                    key={sdg.code}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.3) }}
                                    className={`flex items-center gap-4 rounded-xl border px-5 py-4 transition-colors ${
                                        isStrong
                                            ? "border-[#ee7c7e]/50 bg-[#ee7c7e]/[0.07] dark:bg-slate-900"
                                            : "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900"
                                    }`}
                                >
                                    <span
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[10px] font-black tabular-nums ${
                                            isStrong
                                                ? "bg-[#ee7c7e] text-white"
                                                : "bg-[#1a2355] text-white"
                                        }`}
                                    >
                                        {sdg.code.replace("SDG ", "")}
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block text-[13px] font-black leading-snug text-[#1a2355] dark:text-white">
                                            {sdg.name}
                                        </span>
                                        <span className="mt-0.5 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                                            {sdg.code}
                                        </span>
                                    </span>
                                    <span className="shrink-0 text-sm font-black tabular-nums tracking-tight text-[#1a2355] dark:text-white">
                                        {sdg.band}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* ─────────────────────────────────────────────────────────
                    GREENMETRIC — the climb, then the category detail.
                   ───────────────────────────────────────────────────────── */}
                <section id="greenmetric" className="mt-24 scroll-mt-28">
                    <SectionHeading
                        icon={EnergySavingsLeafOutlinedIcon}
                        eyebrow={lang === "az" ? "Dayanıqlılıq" : "Sustainability"}
                        title={r.gmTitle}
                        lead={r.gmLead}
                    />

                    <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
                        {/* Year-on-year */}
                        <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:grid-cols-1">
                            {r.gmYears.map((entry, index) => {
                                const isLatest = index === r.gmYears.length - 1;
                                return (
                                    <motion.div
                                        key={entry.year}
                                        initial={{ opacity: 0, x: -14 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className={`relative overflow-hidden rounded-2xl border p-6 md:p-7 ${
                                            isLatest
                                                ? "border-transparent bg-[#1a2355] text-white shadow-xl shadow-[#1a2355]/20"
                                                : "border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900"
                                        }`}
                                    >
                                        {isLatest && (
                                            <span className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#ee7c7e]/25 blur-2xl" />
                                        )}
                                        <div className="relative z-10 flex items-center justify-between gap-3">
                                            <span
                                                className={`text-[10px] font-black uppercase tracking-[0.28em] ${
                                                    isLatest ? "text-white/55" : "text-slate-400 dark:text-slate-500"
                                                }`}
                                            >
                                                {entry.year}
                                            </span>
                                            {isLatest && (
                                                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#ee7c7e] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                                                    <TrendingUpIcon sx={{ fontSize: 13 }} />
                                                    {entry.note}
                                                </span>
                                            )}
                                        </div>

                                        <p
                                            className={`relative z-10 mt-5 text-5xl font-black leading-none tracking-tighter tabular-nums ${
                                                isLatest ? "text-white" : "text-[#1a2355] dark:text-white"
                                            }`}
                                        >
                                            {entry.rank}
                                        </p>
                                        <p
                                            className={`relative z-10 mt-2 text-[11px] font-black uppercase tracking-[0.2em] ${
                                                isLatest ? "text-white/60" : "text-slate-400 dark:text-slate-500"
                                            }`}
                                        >
                                            {r.gmRankLabel}
                                        </p>

                                        <p
                                            className={`relative z-10 mt-5 flex items-baseline justify-between gap-3 border-t pt-4 ${
                                                isLatest ? "border-white/15" : "border-slate-100 dark:border-white/10"
                                            }`}
                                        >
                                            <span
                                                className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                                                    isLatest ? "text-white/50" : "text-slate-400 dark:text-slate-500"
                                                }`}
                                            >
                                                {r.gmScoreLabel}
                                            </span>
                                            <span
                                                className={`text-lg font-black tabular-nums tracking-tight ${
                                                    isLatest ? "text-[#ee7c7e]" : "text-[#1a2355] dark:text-white"
                                                }`}
                                            >
                                                {entry.score}
                                            </span>
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Category bars — 2025 filled, 2024 marked, against each
                            category's own maximum. Bar widths are scaled against the
                            largest maximum so categories stay comparable to one
                            another and not just to themselves. */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900 lg:col-span-7 md:p-8">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#1a2355] dark:text-white">
                                {r.gmCategoriesTitle}
                            </h3>

                            <div className="mt-7 space-y-6">
                                {r.gmCategories.map((category, index) => {
                                    const trackPct = (category.max / gmMaxScale) * 100;
                                    const currentPct = (category.current / gmMaxScale) * 100;
                                    const previousPct = (category.previous / gmMaxScale) * 100;
                                    const improved = category.current >= category.previous;

                                    return (
                                        <div key={category.short}>
                                            <div className="mb-2 flex items-baseline justify-between gap-3">
                                                <span className="flex min-w-0 items-baseline gap-2">
                                                    <span className="shrink-0 text-[10px] font-black tracking-[0.16em] text-[#ee7c7e]">
                                                        {category.short}
                                                    </span>
                                                    <span className="truncate text-[13px] font-black text-[#1a2355] dark:text-white">
                                                        {category.name}
                                                    </span>
                                                </span>
                                                <span className="shrink-0 text-[12px] font-black tabular-nums text-[#1a2355] dark:text-white">
                                                    {category.current}
                                                    <span className="ml-1 font-bold text-slate-400 dark:text-slate-500">
                                                        / {category.max} {r.gmMaxLabel}
                                                    </span>
                                                </span>
                                            </div>

                                            {/* Track = this category's maximum, drawn to scale. */}
                                            <div className="relative h-3 w-full">
                                                <div
                                                    className="absolute inset-y-0 left-0 rounded-full bg-slate-100 dark:bg-white/[0.08]"
                                                    style={{ width: `${trackPct}%` }}
                                                />
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${currentPct}%` }}
                                                    viewport={{ once: true, margin: "-40px" }}
                                                    transition={{
                                                        duration: 0.9,
                                                        delay: 0.1 + index * 0.07,
                                                        ease: [0.23, 1, 0.32, 1],
                                                    }}
                                                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#1a2355] to-[#ee7c7e]"
                                                />
                                                {/* Last year's score, as a tick on the same scale. */}
                                                <span
                                                    className="absolute top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-[#1a2355]/45 dark:bg-white/50"
                                                    style={{ left: `${previousPct}%` }}
                                                    aria-hidden
                                                />
                                            </div>

                                            <p className="mt-1.5 text-[11px] font-semibold tabular-nums text-slate-400 dark:text-slate-500">
                                                2024: {category.previous}
                                                <span
                                                    className={`ml-2 font-black ${
                                                        improved ? "text-[#2E9E5B]" : "text-[#B71C3B]"
                                                    }`}
                                                >
                                                    {improved ? "+" : "−"}
                                                    {Math.abs(category.current - category.previous)}
                                                </span>
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <p className="mt-7 border-t border-slate-100 pt-5 text-[13px] leading-relaxed text-slate-500 dark:border-white/10 dark:text-slate-400">
                                {r.gmNote}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ─────────────────────────────────────────────────────────
                    CERTIFICATES — additive; renders nothing when the CMS
                    has none to serve.
                   ───────────────────────────────────────────────────────── */}
                <RankingCertificates />

                {/* ─────────────────────────────────────────────────────────
                    WHY RANKINGS MATTER + SOURCES
                   ───────────────────────────────────────────────────────── */}
                <section id="context" className="mt-24 grid scroll-mt-28 grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900 md:p-8 lg:col-span-7">
                        <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e]">
                            <VerifiedIcon sx={{ fontSize: 16 }} />
                            {lang === "az" ? "Kontekst" : "Context"}
                        </p>
                        <h2 className="text-2xl font-black tracking-tight text-[#1a2355] dark:text-white md:text-3xl">
                            {r.importanceTitle}
                        </h2>
                        <ol className="mt-7 space-y-3.5">
                            {r.importanceItems.map((item, i) => (
                                <li key={item} className="flex gap-4">
                                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#1a2355]/[0.06] text-[11px] font-black tabular-nums text-[#1a2355] dark:bg-white/10 dark:text-white">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-[15px] font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900 md:p-8 lg:col-span-5">
                        <p className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e]">
                            <LinkOutlinedIcon sx={{ fontSize: 16 }} />
                            {r.sourcesTitle}
                        </p>
                        <h2 className="text-2xl font-black tracking-tight text-[#1a2355] dark:text-white md:text-3xl">
                            {lang === "az" ? "Rəsmi nəşrlər" : "Official publications"}
                        </h2>
                        <ul className="mt-7 space-y-2.5">
                            {r.sources.map((source) => (
                                <li key={source.href}>
                                    <a
                                        href={source.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 px-4 py-3.5 transition-colors hover:border-[#ee7c7e]/60 dark:border-white/10"
                                    >
                                        <span className="text-[13px] font-black leading-snug text-[#1a2355] transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                                            {source.label}
                                        </span>
                                        <NorthEastIcon
                                            sx={{ fontSize: 15 }}
                                            className="shrink-0 text-slate-300 transition-colors group-hover:text-[#ee7c7e] dark:text-slate-600"
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* ─────────────────────────────────────────────────────────
                    RELATED
                   ───────────────────────────────────────────────────────── */}
                <section className="mb-24 mt-24">
                    <h2 className="flex items-center gap-3 text-xl font-black tracking-tight text-[#1a2355]">
                        <span className="h-7 w-1.5 rounded-full bg-[#ee7c7e]" />
                        {t.common.moreInSection}
                    </h2>
                    <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {r.related.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-5 transition-colors hover:border-[#ee7c7e]/60 dark:border-white/10 dark:bg-slate-900"
                            >
                                <span className="text-sm font-black text-[#1a2355] transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                                    {link.title}
                                </span>
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-[#1a2355] transition-colors group-hover:bg-[#1a2355] group-hover:text-white dark:bg-white/10 dark:text-white">
                                    <ChevronRightIcon
                                        sx={{ fontSize: 20 }}
                                        className="transition-transform group-hover:translate-x-0.5"
                                    />
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
