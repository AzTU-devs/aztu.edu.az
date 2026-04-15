"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const STAT_ICONS = [
    <CalendarMonthIcon key="cal" sx={{ fontSize: 32 }} />,
    <SchoolIcon key="school" sx={{ fontSize: 32 }} />,
    <PeopleIcon key="people" sx={{ fontSize: 32 }} />,
    <EmojiEventsIcon key="trophy" sx={{ fontSize: 32 }} />,
];

export default function HistoryPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.history;

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* HERO SECTION */}
            <div className="relative min-h-[80vh] flex flex-col pt-44 lg:pt-48">
                {/* Background Graphics */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330] via-[#0b1330]/80 to-transparent hidden lg:block" />
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-12">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 lg:mb-16">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                            Home
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={lang === "az" ? "/haqqimizda" : "/about"} className="hover:text-white transition-colors">
                            {t.nav.sections.about}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{p.breadcrumb}</span>
                    </nav>

                    <div className="flex-1 flex flex-col justify-center">
                        <div className="max-w-4xl">
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
                                <p className="text-xl lg:text-3xl text-white font-medium mb-10 max-w-3xl leading-relaxed border-l-4 border-[#ee7c7e] pl-8">
                                    {p.subtitle}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS STRIP */}
            <div className="relative z-20 -mt-16 px-4 md:px-10 lg:px-20 mb-24">
                <div className="max-w-[1400px] mx-auto bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl shadow-black/10 border border-gray-100 dark:border-slate-700 p-8 lg:p-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {p.stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#ee7c7e]/10 text-[#ee7c7e] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {STAT_ICONS[i]}
                                </div>
                                <span className="text-3xl lg:text-4xl font-black text-[#1a2355] dark:text-white mb-1">{s.value}</span>
                                <span className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-slate-500">{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* TIMELINE SECTION */}
            <div className="px-4 md:px-10 lg:px-20 py-24">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col gap-12 relative">
                        {/* Timeline line */}
                        <div className="absolute left-[39px] md:left-[47px] top-0 bottom-0 w-1 bg-gradient-to-b from-[#ee7c7e] via-[#1a2355] to-transparent rounded-full opacity-20" />

                        {p.milestones.map((m, i) => (
                            <motion.div
                                key={m.year}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.05 }}
                                className="flex gap-8 md:gap-12 items-start group"
                            >
                                {/* Year circle */}
                                <div className="flex-shrink-0 relative">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white dark:bg-slate-800 border-4 border-gray-50 dark:border-slate-700 flex items-center justify-center shadow-xl group-hover:border-[#ee7c7e] transition-colors duration-500 relative z-10">
                                        <span className="text-lg md:text-xl font-black text-[#1a2355] dark:text-white">{m.year}</span>
                                    </div>
                                    <div className="absolute inset-0 rounded-full bg-[#ee7c7e]/20 blur-xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                                </div>

                                {/* Content card */}
                                <div className="flex-1 bg-white dark:bg-slate-800/50 backdrop-blur-sm p-8 md:p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1">
                                    <h3 className="text-xl md:text-2xl font-black text-[#1a2355] dark:text-white mb-4 group-hover:text-[#ee7c7e] transition-colors">
                                        {m.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-base md:text-lg">
                                        {m.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RELATED LINKS */}
            <div className="px-4 md:px-10 lg:px-20 py-24 bg-white dark:bg-slate-900/50">
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="text-xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                        <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                        {t.common.moreInSection}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {p.related.map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href}
                                className="group flex items-center justify-between bg-white dark:bg-slate-800/50 p-6 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 hover:border-[#1a2355] dark:hover:border-[#ee7c7e] transition-all duration-300 shadow-sm hover:shadow-xl"
                            >
                                <span className="text-[#1a2355] dark:text-white font-black text-sm group-hover:text-[#ee7c7e] transition-colors">{link.title}</span>
                                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-[#1a2355] group-hover:text-white transition-all duration-300">
                                    <ChevronRightIcon sx={{ fontSize: 20 }} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
