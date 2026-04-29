"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';

export default function ScholarshipOpportunitiesPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.internationalization.scholarship;

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* HERO SECTION */}
            <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
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
                                <p className="text-lg lg:text-xl text-white/80 font-medium mb-10 max-w-4xl leading-relaxed whitespace-pre-wrap">
                                    {p.description}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-16">
                        {p.programs.map((program: any, idx: number) => (
                            <motion.section
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-slate-900 rounded-[3rem] border border-gray-100 dark:border-slate-800 p-8 lg:p-12 shadow-2xl shadow-blue-900/5 overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                                
                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-[#1a2355] text-white flex items-center justify-center shadow-lg shadow-blue-900/20">
                                                <EmojiEventsIcon />
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-black text-[#1a2355] dark:text-white">{program.title}</h2>
                                        </div>
                                        {program.link && (
                                            <Link 
                                                href={program.link} 
                                                target="_blank"
                                                className="inline-flex items-center justify-center px-6 py-3 bg-[#ee7c7e]/10 text-[#ee7c7e] rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#ee7c7e] hover:text-white transition-all"
                                            >
                                                Official Website <ChevronRightIcon sx={{ fontSize: 16 }} />
                                            </Link>
                                        )}
                                    </div>

                                    <p className="text-gray-600 dark:text-gray-300 text-lg font-medium leading-relaxed mb-12">
                                        {program.description}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div>
                                            <h3 className="text-sm font-black text-[#1a2355] dark:text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                                <div className="w-1.5 h-6 bg-[#ee7c7e] rounded-full" />
                                                Objectives
                                            </h3>
                                            <ul className="space-y-4">
                                                {program.objectives.map((obj: string, i: number) => (
                                                    <li key={i} className="flex gap-3 text-gray-500 dark:text-gray-400 text-sm font-medium">
                                                        <CheckCircleIcon sx={{ fontSize: 16 }} className="text-[#ee7c7e] mt-0.5" />
                                                        {obj}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-sm font-black text-[#1a2355] dark:text-white uppercase tracking-[0.2em] mb-4">Study Levels</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {program.levels ? program.levels.map((level: string, i: number) => (
                                                        <span key={i} className="px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold border border-slate-100 dark:border-slate-700">
                                                            {level}
                                                        </span>
                                                    )) : program.requirements.map((req: string, i: number) => (
                                                        <span key={i} className="px-4 py-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs font-bold border border-amber-100 dark:border-amber-900/30">
                                                            {req}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-black text-[#1a2355] dark:text-white uppercase tracking-[0.2em] mb-4">Benefits</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {program.benefits?.map((benefit: string, i: number) => (
                                                        <span key={i} className="px-4 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold border border-green-100 dark:border-green-900/30">
                                                            {benefit}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {(program.nominationNote || program.selectionNote) && (
                                        <div className="mt-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 flex gap-4 items-center">
                                            <InfoIcon className="text-[#ee7c7e] shrink-0" />
                                            <p className="text-gray-500 dark:text-gray-400 text-sm italic font-medium">
                                                {program.nominationNote || program.selectionNote}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.section>
                        ))}
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-8">
                            {/* Academic Merit Card */}
                            <div className="p-10 rounded-[3rem] bg-[#1a2355] text-white shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-32 h-32 bg-[#ee7c7e]/20 rounded-full -translate-y-1/2 -translate-x-1/2 blur-2xl" />
                                <div className="relative z-10 text-center">
                                    <SchoolIcon className="text-[#ee7c7e] mb-6 mx-auto" sx={{ fontSize: 40 }} />
                                    <h3 className="text-2xl font-black mb-4 tracking-tighter uppercase">Academic Merit</h3>
                                    <p className="text-white/60 text-sm font-medium mb-8">
                                        AzTU rewards high-performing international students through internal grant programs.
                                    </p>
                                    <div className="text-4xl font-black text-[#ee7c7e] mb-2">GPA 91+</div>
                                    <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-black">Eligibility Criteria</div>
                                </div>
                            </div>

                            {/* Related Links */}
                            <div className="space-y-4">
                                <h3 className="text-[#1a2355] dark:text-white font-black uppercase tracking-widest text-xs mb-6 px-4">Helpful Links</h3>
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
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
