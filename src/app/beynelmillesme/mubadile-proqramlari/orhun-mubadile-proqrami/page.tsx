"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import SchoolIcon from '@mui/icons-material/School';
import LaunchIcon from '@mui/icons-material/Launch';

export default function OrhunExchangePage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.internationalization.orhunExchange;

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* HERO SECTION */}
            <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48">
                {/* Background Graphics */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330] via-[#0b1330]/80 to-transparent hidden lg:block" />
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#ee7c7e]/5 rounded-full blur-3xl animate-pulse" />
                </div>

                <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-12">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 lg:mb-16">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                            {t.common.home}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={lang === "az" ? "/beynelmillesme" : "/internationalization"} className="hover:text-white transition-colors">
                            {t.nav.sections.internationalAffairs || "Internationalization"}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{p.breadcrumb}</span>
                    </nav>

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
                            <p className="text-xl lg:text-2xl text-white/80 max-w-3xl leading-relaxed">
                                {p.subtitle}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTIONS */}
            <div className="relative z-10 -mt-24 px-4 md:px-10 lg:px-20 pb-24">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* OVERVIEW */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 bg-white dark:bg-slate-800/50 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 dark:border-slate-700 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                            <PublicIcon sx={{ fontSize: 120 }} />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                                    <LanguageIcon />
                                </div>
                                <h2 className="text-2xl lg:text-3xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight">
                                    {t.nav.items.about || "About"}
                                </h2>
                            </div>
                            <div className="space-y-6">
                                {p.description.split('\n\n').map((paragraph: string, idx: number) => (
                                    <p key={idx} className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* COUNTRIES & LINKS */}
                    <div className="space-y-8">
                        {/* COUNTRIES */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-[#1a2355] dark:bg-slate-900 rounded-[2.5rem] p-8 shadow-xl relative overflow-hidden group"
                        >
                            <div className="relative z-10">
                                <h3 className="text-xl font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-[#ee7c7e] rounded-full" />
                                    {p.countriesTitle}
                                </h3>
                                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                                    {p.countriesDescription}
                                </p>
                                <ul className="space-y-4">
                                    {p.countries.map((country: string, idx: number) => (
                                        <li key={idx} className="flex items-center gap-3 text-white font-medium">
                                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#ee7c7e] text-xs">
                                                0{idx + 1}
                                            </div>
                                            {country}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* LINKS */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-slate-800/50 rounded-[2.5rem] p-8 shadow-xl border border-gray-100 dark:border-slate-700"
                        >
                            <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-[#ee7c7e] rounded-full" />
                                {p.linksTitle}
                            </h3>
                            <div className="space-y-4">
                                <a 
                                    href="https://turkunib.org" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-[#1a2355] hover:text-white transition-all duration-300 group/link"
                                >
                                    <div className="flex items-center gap-3">
                                        <SchoolIcon className="text-[#ee7c7e]" />
                                        <span className="font-bold text-sm">{p.officialWebsite}</span>
                                    </div>
                                    <LaunchIcon sx={{ fontSize: 18 }} className="opacity-50 group-hover/link:opacity-100 transition-opacity" />
                                </a>
                                <a 
                                    href="https://orhunprogrami.org" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-[#1a2355] hover:text-white transition-all duration-300 group/link"
                                >
                                    <div className="flex items-center gap-3">
                                        <PublicIcon className="text-[#ee7c7e]" />
                                        <span className="font-bold text-sm">{p.programPage}</span>
                                    </div>
                                    <LaunchIcon sx={{ fontSize: 18 }} className="opacity-50 group-hover/link:opacity-100 transition-opacity" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* RELATED LINKS */}
                <section className="mt-24 pt-20 border-t border-gray-200 dark:border-slate-800 max-w-[1600px] mx-auto">
                    <h2 className="text-xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                        <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                        {t.common.moreInSection}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {p.related.map((link: any) => (
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
                </section>
            </div>
        </main>
    );
}
