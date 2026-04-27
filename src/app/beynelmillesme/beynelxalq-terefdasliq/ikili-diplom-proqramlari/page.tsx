"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from '@mui/icons-material/Public';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function DoubleDegreeProgramsPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.internationalization.doubleDegreePrograms;

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* HERO SECTION */}
            <div className="relative min-h-[70vh] flex flex-col pt-44 lg:pt-48">
                {/* Background Graphics */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330] via-[#0b1330]/80 to-transparent hidden lg:block" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ee7c7e]/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-12">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 lg:mb-16">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                            Home
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
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-20">
                        {/* Current Programs */}
                        <section>
                            <h2 className="text-3xl font-black text-[#1a2355] dark:text-white mb-12 flex items-center gap-4">
                                <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full" />
                                {p.currentProgramsTitle}
                            </h2>
                            
                            <div className="space-y-8">
                                {p.countries.map((country, idx) => (
                                    <motion.div
                                        key={country.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 p-8 lg:p-12 shadow-xl shadow-blue-900/5 hover:shadow-2xl transition-all duration-500 group"
                                    >
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-2xl bg-[#1a2355]/5 dark:bg-[#ee7c7e]/10 flex items-center justify-center text-[#1a2355] dark:text-[#ee7c7e] group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                                                <PublicIcon />
                                            </div>
                                            <h3 className="text-2xl font-black text-[#1a2355] dark:text-white">{country.name}</h3>
                                        </div>
                                        <ul className="space-y-4">
                                            {country.programs.map((program, pIdx) => (
                                                <li key={pIdx} className="flex gap-4 text-gray-600 dark:text-gray-300">
                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ee7c7e] shrink-0" />
                                                    <span className="font-medium">{program}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Why Choose */}
                        <section className="bg-[#1a2355] rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee7c7e]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                            <div className="relative z-10">
                                <h2 className="text-3xl font-black mb-12 flex items-center gap-4">
                                    <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full" />
                                    {p.whyChooseTitle}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {p.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                            <CheckCircleOutlineIcon className="text-[#ee7c7e] shrink-0" />
                                            <p className="font-medium text-white/90">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="sticky top-28 space-y-8">
                            {/* CTA Card */}
                            <div className="p-10 rounded-[3rem] bg-white dark:bg-slate-900 border-2 border-[#1a2355]/10 dark:border-[#ee7c7e]/20 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-[#1a2355] text-white flex items-center justify-center mb-8 shadow-xl shadow-blue-900/20">
                                        <SchoolIcon />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-4">AzTU Academic Excellence</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-10">
                                        Empowering the next generation of engineers and technologists through innovation and research-driven education.
                                    </p>
                                    <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-[#ee7c7e] text-white px-8 py-4 rounded-2xl shadow-xl shadow-[#ee7c7e]/20 hover:scale-[1.02] active:scale-95 transition-all">
                                        Join Us
                                        <ChevronRightIcon sx={{ fontSize: 16 }} />
                                    </Link>
                                </div>
                            </div>

                            {/* Related Section */}
                            <section className="pt-12 border-t border-gray-200 dark:border-slate-800">
                                <h2 className="text-xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                                    {t.common.moreInSection}
                                </h2>
                                <div className="space-y-4">
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
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
