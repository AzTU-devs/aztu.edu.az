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

import Timeline from "@/components/shared/Timeline";

export default function HistoryPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.history;

    return (
        <main className="min-h-screen bg-[#050816] selection:bg-[#ee7c7e]/30 overflow-hidden">
            {/* STUNNING BACKGROUND ELEMENTS */}
            <div className="bg-mesh opacity-100" />
            <div className="bg-grid-premium opacity-10" />

            {/* HERO SECTION */}
            <div className="relative min-h-[80vh] flex flex-col pt-44 lg:pt-48">
                {/* Background Graphics */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-transparent" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000 opacity-50" />
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#ee7c7e]/10 rounded-full blur-3xl animate-pulse" />
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
                <div className="max-w-[1400px] mx-auto bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] shadow-2xl border-2 border-[#ee7c7e]/20 p-8 lg:p-12">
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
                                <div className="w-16 h-16 rounded-2xl bg-[#ee7c7e]/10 text-[#ee7c7e] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300 shadow-lg">
                                    {STAT_ICONS[i]}
                                </div>
                                <span className="text-3xl lg:text-4xl font-black text-white mb-1">{s.value}</span>
                                <span className="text-xs font-black uppercase tracking-widest text-white/40">{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* TIMELINE SECTION */}
            <div className="px-4 md:px-10 lg:px-20 py-24 relative">
                <div className="max-w-5xl mx-auto">
                    <Timeline items={p.milestones} />
                </div>
            </div>

            {/* RELATED LINKS */}
            <div className="px-4 md:px-10 lg:px-20 py-24 bg-slate-900/40 backdrop-blur-3xl border-t border-white/5">
                <div className="max-w-[1400px] mx-auto">
                    <h2 className="text-2xl font-black text-white mb-10 flex items-center gap-4">
                        <div className="w-2.5 h-10 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
                        {t.common.moreInSection}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {p.related.map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href}
                                className="group flex items-center justify-between bg-slate-900/40 p-8 rounded-[2rem] border-2 border-white/5 hover:border-[#ee7c7e]/40 transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(238,124,126,0.1)]"
                            >
                                <span className="text-white font-black text-base group-hover:text-[#ee7c7e] transition-colors">{link.title}</span>
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-500 shadow-lg">
                                    <ChevronRightIcon sx={{ fontSize: 24 }} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
