"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import TranslateIcon from "@mui/icons-material/Translate";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { hasStudyPlan } from "@/data/studyPlans";

type Program = { name: string; slug: string; english: boolean; russian: boolean };
type Faculty = { name: string; cycle: string; programs: Program[] };

export default function DiscoverProgramsPage() {
    const t = useTranslation();
    const p = t.pages.internationalization.exploreProgram;
    const fp = p.foreignPrograms;
    const l = fp.labels;

    // Availability indicator for a language column — links to the study plan when one exists
    const LangCell = ({ active, label, slug, lang }: { active: boolean; label: string; slug: string; lang: "en" | "ru" }) => {
        const base = "flex items-center justify-center gap-2 px-3 py-2 rounded-xl border text-xs font-black transition-all";

        if (active && hasStudyPlan(slug, lang)) {
            return (
                <Link
                    href={`/beynelmillesme/xarici-telebeler/proqramlari-kesf-edin/${slug}-${lang}`}
                    title={`${label} — ${l.viewPlan}`}
                    className={`${base} group/cell bg-[#1a2355] border-[#1a2355] text-white hover:bg-[#ee7c7e] hover:border-[#ee7c7e] shadow-md shadow-blue-900/10`}
                >
                    <MenuBookIcon sx={{ fontSize: 16 }} />
                    <span className="hidden sm:inline">{l.viewPlan}</span>
                    <span className="sm:hidden">{label}</span>
                    <ArrowForwardIcon sx={{ fontSize: 13 }} className="opacity-0 -ml-2 group-hover/cell:opacity-100 group-hover/cell:ml-0 transition-all duration-300" />
                </Link>
            );
        }

        return (
            <div
                className={`${base} ${
                    active
                        ? "bg-[#ee7c7e]/10 border-[#ee7c7e]/30 text-[#ee7c7e]"
                        : "bg-gray-50 dark:bg-slate-800/60 border-gray-100 dark:border-slate-700 text-gray-300 dark:text-slate-600"
                }`}
                title={active ? `${label} — ${l.available}` : `${label} — ${l.notAvailable}`}
            >
                {active ? <CheckCircleIcon sx={{ fontSize: 16 }} /> : <RemoveIcon sx={{ fontSize: 16 }} />}
                <span className="hidden sm:inline">{label}</span>
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* HERO */}
            <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[4rem] lg:rounded-bl-[16rem] transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330] via-[#0b1330]/80 to-transparent hidden lg:block" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ee7c7e]/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-12">
                    <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 lg:mb-16">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{p.breadcrumb}</span>
                    </nav>

                    <div className="flex-1 flex flex-col justify-center">
                        <div className="max-w-5xl">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                                    {p.eyebrow}
                                </span>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                                    {p.title}
                                </h1>
                                <p className="text-lg lg:text-xl text-white/80 font-medium mb-10 max-w-4xl leading-relaxed">
                                    {p.description}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20 py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-8 space-y-16">
                        {/* Foreign-language programmes */}
                        <section className="space-y-10">
                            <div>
                                <h2 className="text-3xl lg:text-4xl font-black text-[#1a2355] dark:text-white tracking-tight flex items-center gap-4">
                                    <div className="w-2 h-9 bg-[#ee7c7e] rounded-full" />
                                    {fp.heading}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 text-base font-medium leading-relaxed mt-4 max-w-3xl">
                                    {fp.subheading}
                                </p>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ee7c7e]/10 border border-[#ee7c7e]/30 text-[#ee7c7e] text-xs font-black">
                                    <CheckCircleIcon sx={{ fontSize: 16 }} />
                                    {fp.legend.english}
                                </span>
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ee7c7e]/10 border border-[#ee7c7e]/30 text-[#ee7c7e] text-xs font-black">
                                    <CheckCircleIcon sx={{ fontSize: 16 }} />
                                    {fp.legend.russian}
                                </span>
                            </div>

                            {/* Faculty groups */}
                            <div className="space-y-8">
                                {fp.faculties.map((faculty: Faculty, fIdx: number) => (
                                    <motion.div
                                        key={faculty.name}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: fIdx * 0.08, duration: 0.6 }}
                                        className="bg-white dark:bg-slate-900 rounded-[1.75rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-900/5 overflow-hidden"
                                    >
                                        {/* Faculty header */}
                                        <div className="relative bg-gradient-to-br from-[#1a2355] to-[#13365E] px-8 py-6 flex items-center gap-4">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                            <div className="relative z-10 w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                                                <SchoolIcon className="text-[#ee7c7e]" sx={{ fontSize: 22 }} />
                                            </div>
                                            <div className="relative z-10 min-w-0">
                                                <h3 className="text-lg lg:text-xl font-black text-white tracking-tight leading-snug">
                                                    {faculty.name}
                                                </h3>
                                                <span className="inline-block mt-1 text-[#ee7c7e] text-[11px] font-black uppercase tracking-[0.2em]">
                                                    {faculty.cycle}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Column labels */}
                                        <div className="hidden md:grid grid-cols-12 gap-4 px-8 pt-6 pb-3 text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 dark:text-slate-500 border-b border-gray-100 dark:border-slate-800">
                                            <div className="col-span-6">{l.program}</div>
                                            <div className="col-span-3 text-center">{l.english}</div>
                                            <div className="col-span-3 text-center">{l.russian}</div>
                                        </div>

                                        {/* Programme rows */}
                                        <div className="divide-y divide-gray-100 dark:divide-slate-800">
                                            {faculty.programs.map((program: Program, pIdx: number) => (
                                                <div
                                                    key={program.name}
                                                    className="grid grid-cols-1 md:grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-gray-50/60 dark:hover:bg-slate-800/40 transition-colors"
                                                >
                                                    <div className="md:col-span-6 flex items-start gap-3">
                                                        <span className="shrink-0 w-6 h-6 rounded-lg bg-[#1a2355]/5 dark:bg-white/5 text-[#1a2355] dark:text-white/60 text-[11px] font-black flex items-center justify-center mt-0.5">
                                                            {pIdx + 1}
                                                        </span>
                                                        <p className="text-[#1a2355] dark:text-white font-bold text-sm leading-snug">
                                                            {program.name}
                                                        </p>
                                                    </div>
                                                    <div className="md:col-span-3">
                                                        <LangCell active={program.english} label={l.english} slug={program.slug} lang="en" />
                                                    </div>
                                                    <div className="md:col-span-3">
                                                        <LangCell active={program.russian} label={l.russian} slug={program.slug} lang="ru" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* CTA Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative rounded-[2rem] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2355] via-[#1a2355] to-[#13365E]" />
                            <div className="absolute top-0 left-0 w-64 h-64 bg-[#ee7c7e]/15 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ee7c7e]/10 rounded-full translate-y-1/3 translate-x-1/4 blur-3xl" />
                            <div className="relative z-10 p-10 lg:p-16 text-white flex flex-col md:flex-row md:items-center gap-8">
                                <div className="flex-1">
                                    <h2 className="text-3xl lg:text-4xl font-black mb-4 tracking-tight">{p.ctaTitle}</h2>
                                    <p className="text-white/80 text-base lg:text-lg font-medium leading-relaxed">{p.ctaDescription}</p>
                                </div>
                                <Link
                                    href="/beynelmillesme/xarici-telebeler/qebul"
                                    className="shrink-0 inline-flex items-center gap-3 px-8 py-4 bg-[#ee7c7e] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:text-[#1a2355] transition-all duration-300 shadow-lg shadow-[#ee7c7e]/30"
                                >
                                    {p.ctaButton}
                                    <ArrowForwardIcon sx={{ fontSize: 18 }} />
                                </Link>
                            </div>
                        </motion.section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-8">
                            <div className="p-10 rounded-[2rem] bg-[#1a2355] text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <div className="relative z-10">
                                    <TranslateIcon className="text-[#ee7c7e] mb-6" sx={{ fontSize: 40 }} />
                                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">AzTU</h3>
                                    <p className="text-white/60 text-sm font-medium mb-6">
                                        {fp.subheading}
                                    </p>
                                    <div className="w-12 h-1 bg-[#ee7c7e] rounded-full" />
                                </div>
                            </div>

                            <section className="pt-10 border-t border-gray-200 dark:border-slate-800">
                                <h2 className="text-xl font-black text-[#1a2355] dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                                    {p.relatedTitle}
                                </h2>
                                <div className="space-y-4">
                                    {p.related.map((link: { title: string; href: string }) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="group flex items-center justify-between bg-white dark:bg-slate-800/50 p-5 rounded-[1.25rem] border border-gray-100 dark:border-slate-700 hover:border-[#1a2355] dark:hover:border-[#ee7c7e] transition-all duration-300 shadow-sm hover:shadow-xl"
                                        >
                                            <span className="text-[#1a2355] dark:text-white font-black text-sm group-hover:text-[#ee7c7e] transition-colors">
                                                {link.title}
                                            </span>
                                            <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-[#1a2355] group-hover:text-white transition-all duration-300">
                                                <ChevronRightIcon sx={{ fontSize: 18 }} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
