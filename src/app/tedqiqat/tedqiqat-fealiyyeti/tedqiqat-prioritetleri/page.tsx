"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import ScienceIcon from "@mui/icons-material/Science";
import HubIcon from "@mui/icons-material/Hub";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import PageHero from "@/components/shared/PageHero";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

const PRIORITIES_THEME = [
    {
        icon: PsychologyIcon,
        gradient: "from-blue-600 to-indigo-700",
        soft: "from-blue-500/15 to-indigo-500/5",
        text: "text-blue-700 dark:text-blue-300",
        glow: "shadow-blue-500/30",
    },
    {
        icon: ElectricBoltIcon,
        gradient: "from-amber-500 to-orange-600",
        soft: "from-amber-500/15 to-orange-500/5",
        text: "text-amber-600 dark:text-amber-300",
        glow: "shadow-amber-500/30",
    },
    {
        icon: PrecisionManufacturingIcon,
        gradient: "from-[#ee7c7e] to-[#fb7185]",
        soft: "from-[#ee7c7e]/15 to-rose-500/5",
        text: "text-[#ee7c7e]",
        glow: "shadow-[#ee7c7e]/30",
    },
    {
        icon: RocketLaunchIcon,
        gradient: "from-purple-500 to-violet-700",
        soft: "from-purple-500/15 to-violet-500/5",
        text: "text-purple-600 dark:text-purple-300",
        glow: "shadow-purple-500/30",
    },
    {
        icon: NaturePeopleIcon,
        gradient: "from-emerald-500 to-teal-600",
        soft: "from-emerald-500/15 to-teal-500/5",
        text: "text-emerald-600 dark:text-emerald-300",
        glow: "shadow-emerald-500/30",
    },
    {
        icon: HubIcon,
        gradient: "from-cyan-500 to-sky-600",
        soft: "from-cyan-500/15 to-sky-500/5",
        text: "text-cyan-600 dark:text-cyan-300",
        glow: "shadow-cyan-500/30",
    },
];

export default function ResearchPrioritiesPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.research.priorities;
    const items = p.items ?? [];

    const homeHref = "/";
    const researchHref = lang === "az" ? "/tedqiqat" : "/research";
    const description =
        (p as { description?: string }).description ??
        (lang === "az"
            ? "AzTU-nun strateji elmi hədəfləri."
            : "AzTU's strategic scientific goals.");

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
                {/* INTRO + STAT STRIP */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="relative overflow-hidden rounded-[12px] bg-white dark:bg-slate-900/70 backdrop-blur-xl border-2 border-[#1a2355]/15 dark:border-white/10 p-6 md:p-8 shadow-xl"
                >
                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ee7c7e]/15 blur-3xl rounded-full pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        <div className="lg:col-span-8">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#3b82f6] text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                                    <ScienceIcon sx={{ fontSize: 20 }} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#ee7c7e]">
                                    {lang === "az" ? "Strateji baxış" : "Strategic outlook"}
                                </span>
                            </div>
                            <p className="text-sm md:text-base text-gray-600 dark:text-slate-300 leading-relaxed">
                                {description}
                            </p>
                        </div>

                        <div className="lg:col-span-4 grid grid-cols-2 gap-3">
                            <div className="bg-gradient-to-br from-[#1a2355] to-[#0f172a] rounded-2xl p-4 text-white relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#ee7c7e]/20 blur-3xl rounded-full" />
                                <p className="relative text-[9px] uppercase tracking-widest text-white/50 font-black">
                                    {lang === "az" ? "İstiqamət" : "Directions"}
                                </p>
                                <p className="relative text-3xl font-black tabular-nums tracking-tighter mt-1">
                                    {items.length}
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 border-2 border-[#1a2355]/15 dark:border-white/10 rounded-2xl p-4">
                                <p className="text-[9px] uppercase tracking-widest text-gray-400 dark:text-slate-400 font-black">
                                    {lang === "az" ? "Sahə" : "Domain"}
                                </p>
                                <p className="text-sm font-black text-[#1a2355] dark:text-white mt-1 leading-snug">
                                    {lang === "az" ? "Mühəndislik və texnologiya" : "Engineering & technology"}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* PRIORITIES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {items.map((item: { title: string; content: string }, i: number) => {
                        const theme = PRIORITIES_THEME[i % PRIORITIES_THEME.length];
                        const Icon = theme.icon;
                        const cleanTitle = item.title.replace(/^[0-9.]+\s*/, "");
                        const num = String(i + 1).padStart(2, "0");

                        return (
                            <motion.article
                                key={item.title}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.4) }}
                                className={`group relative h-full bg-white dark:bg-slate-900/70 backdrop-blur-xl rounded-[12px] border-2 border-[#1a2355]/10 dark:border-white/10 p-6 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:border-transparent hover:shadow-2xl ${theme.glow}`}
                            >
                                <div
                                    className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${theme.soft} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                                />
                                <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-[#ee7c7e]/10 to-transparent blur-3xl rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-125" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-start justify-between gap-3 mb-4">
                                        <div
                                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white shadow-lg ${theme.glow} group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500`}
                                        >
                                            <Icon sx={{ fontSize: 24 }} />
                                        </div>
                                        <span
                                            className={`text-3xl font-black tabular-nums tracking-tighter leading-none ${theme.text} opacity-30 group-hover:opacity-70 transition-opacity`}
                                        >
                                            {num}
                                        </span>
                                    </div>

                                    <h2 className="text-base md:text-lg font-black text-[#1a2355] dark:text-white leading-snug tracking-tight group-hover:text-[#ee7c7e] transition-colors mb-3">
                                        {cleanTitle}
                                    </h2>

                                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed flex-1">
                                        {item.content}
                                    </p>

                                    <div className="mt-5 pt-4 border-t border-[#1a2355]/10 dark:border-white/5 flex items-center justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-[0.13em] text-[#1a2355]/50 dark:text-white/40">
                                            {lang === "az" ? "Tədqiqat istiqaməti" : "Research direction"}
                                        </span>
                                        <span className={`inline-flex w-7 h-7 rounded-full items-center justify-center bg-gradient-to-br ${theme.gradient} text-white shadow-sm`}>
                                            <ArrowForwardIcon sx={{ fontSize: 14 }} />
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                {/* RELATED LINKS */}
                <section className="pt-8 border-t border-[#1a2355]/15 dark:border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-9 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
                        <h2 className="text-xl font-black text-[#1a2355] dark:text-white tracking-tight">
                            {t.common.moreInSection}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            {
                                title: lang === "az" ? "Tədqiqat İnstitutları" : "Research Institutes",
                                href:
                                    lang === "az"
                                        ? "/tedqiqat/tedqiqat-fealiyyeti/tedqiqat-institutlari"
                                        : "/research/research-activity/research-institutes",
                                gradient: "from-blue-600 to-indigo-700",
                            },
                            {
                                title: lang === "az" ? "Tədqiqat Layihələri" : "Research Projects",
                                href:
                                    lang === "az"
                                        ? "/tedqiqat/tedqiqat-fealiyyeti/tedqiqat-layiheleri"
                                        : "/research/research-activity/research-projects",
                                gradient: "from-[#ee7c7e] to-[#f97316]",
                            },
                            {
                                title: lang === "az" ? "Daxili Qrantlar" : "Internal Grants",
                                href:
                                    lang === "az"
                                        ? "/tedqiqat/performans-ve-qiymetlendirme/daxili-qrant-proqramlari"
                                        : "/research/performance-and-evaluation/internal-grant-programs",
                                gradient: "from-emerald-500 to-teal-600",
                            },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`group relative flex items-center justify-between bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border-2 border-[#1a2355]/10 dark:border-white/10 p-5 transition-all duration-500 overflow-hidden hover:-translate-y-0.5 hover:border-transparent hover:shadow-xl`}
                            >
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${link.gradient} opacity-70 group-hover:opacity-100 transition-opacity`} />
                                <span className="text-sm font-black text-[#1a2355] dark:text-white group-hover:text-[#ee7c7e] transition-colors">
                                    {link.title}
                                </span>
                                <span className={`inline-flex w-9 h-9 rounded-xl items-center justify-center bg-gradient-to-br ${link.gradient} text-white shadow-md group-hover:scale-105 transition-transform`}>
                                    <ChevronRightIcon sx={{ fontSize: 18 }} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* HIDDEN: home anchor for accessibility tools */}
                <Link href={homeHref} className="sr-only">
                    <HomeIcon /> Home
                </Link>
            </section>
        </main>
    );
}
