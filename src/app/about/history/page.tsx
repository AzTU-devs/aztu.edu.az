"use client";

import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

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
        <>
            <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">

                {/* Banner */}
                <div className="bg-gradient-to-br from-[#0b1330] via-[#1a2355] to-[#13365E] px-4 md:px-10 lg:px-20 pt-40 pb-16 relative overflow-hidden">
                    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/3 pointer-events-none" />

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-white/50 text-sm mb-6 flex-wrap">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 15 }} />
                            {t.common.home}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 14 }} />
                        <Link href="/about" className="hover:text-white transition-colors">
                            {t.nav.sections.about}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 14 }} />
                        <span className="text-white/80">{p.breadcrumb}</span>
                    </nav>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-[#ee7c7e] text-xs font-bold uppercase tracking-[0.2em] mb-3"
                    >
                        {p.eyebrow}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.08 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-4"
                    >
                        {p.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.16 }}
                        className="text-white/70 text-base max-w-2xl leading-relaxed"
                    >
                        {p.subtitle}
                    </motion.p>
                </div>

                {/* Stats strip */}
                <div className="bg-white dark:bg-[#1e293b] border-b border-gray-100 dark:border-slate-700">
                    <div className="px-4 md:px-10 lg:px-20 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {p.stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="flex flex-col items-center text-center gap-2"
                            >
                                <span className="text-[#1a2355] dark:text-[#5A9BD3]">{STAT_ICONS[i]}</span>
                                <span className="text-3xl font-extrabold text-[#1a2355] dark:text-white">{s.value}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="px-4 md:px-10 lg:px-20 py-14">
                    {/* Intro */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mb-16"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-[#1a2355] dark:text-white mb-5">
                            {p.legacyTitle}
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                            <p>{p.para1}</p>
                            <p>{p.para2}</p>
                            <p>{p.para3}</p>
                            <p>{p.para4}</p>
                        </div>
                    </motion.div>

                    {/* Timeline */}
                    <div className="max-w-4xl">
                        <h2 className="text-2xl font-bold text-[#1a2355] dark:text-white mb-10">
                            {p.milestonesTitle}
                        </h2>
                        <div className="relative">
                            {/* Vertical line */}
                            <div className="absolute left-[88px] md:left-[104px] top-0 bottom-0 w-px bg-gray-200 dark:bg-slate-700" />

                            <div className="flex flex-col gap-10">
                                {p.milestones.map((m, i) => (
                                    <motion.div
                                        key={m.year}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: i * 0.07 }}
                                        className="flex gap-6 md:gap-8 items-start"
                                    >
                                        {/* Year badge */}
                                        <div className="flex-shrink-0 w-[80px] md:w-[96px] text-right">
                                            <span className="inline-block bg-[#1a2355] dark:bg-[#1e3a5f] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                                                {m.year}
                                            </span>
                                        </div>

                                        {/* Dot */}
                                        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-[#ee7c7e] mt-1.5 ring-4 ring-white dark:ring-[#0f172a]" />

                                        {/* Content */}
                                        <div className="flex-1 pb-2">
                                            <h3 className="text-[#1a2355] dark:text-white font-bold text-base mb-1">
                                                {m.title}
                                            </h3>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                                {m.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Related links */}
                    <div className="max-w-4xl mt-16 pt-10 border-t border-gray-200 dark:border-slate-700">
                        <h2 className="text-lg font-bold text-[#1a2355] dark:text-white mb-5">
                            {t.common.moreInSection}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                { title: t.pages.about.vision.title, href: "/about/vision" },
                                { title: t.pages.about.mission.title, href: "/about/mission" },
                                { title: t.pages.about.rector.title, href: lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme/rektor" : "/about/leadership-and-management/rector" },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center justify-between bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-slate-700 rounded-xl px-5 py-3 hover:border-[#1a2355]/30 hover:shadow-md transition-all duration-200 group"
                                >
                                    <span className="text-[#1a2355] dark:text-white font-medium text-sm">
                                        {link.title}
                                    </span>
                                    <ChevronRightIcon
                                        sx={{ fontSize: 18, color: "#1a2355", opacity: 0.4 }}
                                        className="transition-transform duration-200 group-hover:translate-x-1"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            </>
    );
}
