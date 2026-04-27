"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import DownloadIcon from '@mui/icons-material/Download';
import ArticleIcon from '@mui/icons-material/Article';
import InfoIcon from '@mui/icons-material/Info';

export default function OpenAccessPolicyPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.research.publications.openAccessPolicy;

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* HERO SECTION */}
            <div className="relative min-h-[50vh] flex flex-col pt-44 lg:pt-48">
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
                        <Link href={lang === "az" ? "/tedqiqat" : "/research"} className="hover:text-white transition-colors">
                            {t.nav.sections.research || "Research"}
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

                            <div className="mt-10">
                                <a 
                                    href={p.pdfUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#ee7c7e] text-white font-black text-sm uppercase tracking-widest hover:bg-[#d66a6c] transition-all duration-300 shadow-xl shadow-[#ee7c7e]/20"
                                >
                                    <DownloadIcon />
                                    {p.downloadButton}
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTIONS */}
            <div className="relative z-10 -mt-12 px-4 md:px-10 lg:px-20 pb-24">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* SIDEBAR: Document Info */}
                    <div className="lg:col-span-4 order-2 lg:order-1">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="sticky top-32 p-8 rounded-[2.5rem] bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 shadow-xl"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-[#1a2355]/5 flex items-center justify-center text-[#1a2355] dark:text-white">
                                    <InfoIcon />
                                </div>
                                <h3 className="text-lg font-black text-[#1a2355] dark:text-white uppercase tracking-tight">Document Info</h3>
                            </div>

                            <div className="space-y-6">
                                {Object.entries(p.documentInfo).filter(([key]) => key !== 'title' && key !== 'location').map(([key, value]) => (
                                    <div key={key} className="group">
                                        <span className="block text-[10px] font-black uppercase tracking-widest text-[#ee7c7e] mb-1">
                                            {key.replace(/([A-Z])/g, ' $1')}
                                        </span>
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                            {value as string}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-700">
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                    {p.documentInfo.location}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-slate-800/50 rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-xl border border-gray-100 dark:border-slate-700"
                        >
                            <div className="prose prose-slate prose-lg dark:prose-invert max-w-none">
                                {p.content.map((section: any) => (
                                    <section key={section.id} className="mb-12 last:mb-0">
                                        <h2 className="text-2xl lg:text-3xl font-black text-[#1a2355] dark:text-white mb-6 flex items-start gap-4">
                                            <span className="text-[#ee7c7e] shrink-0 opacity-20">
                                                <ArticleIcon sx={{ fontSize: 32 }} />
                                            </span>
                                            {section.title}
                                        </h2>
                                        <div className="space-y-4">
                                            {section.text.split('\n\n').map((para: string, idx: number) => (
                                                <p key={idx} className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                                    {para}
                                                </p>
                                            ))}
                                            {section.list && (
                                                <ul className="grid grid-cols-1 gap-4 mt-8">
                                                    {section.list.map((item: string, idx: number) => (
                                                        <li key={idx} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                                                            <div className="w-6 h-6 rounded-full bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] text-xs font-black shrink-0 mt-1">
                                                                {idx + 1}
                                                            </div>
                                                            <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                                                {item}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </motion.div>

                        {/* RELATED LINKS */}
                        <section className="mt-16 pt-16 border-t border-gray-200 dark:border-slate-800">
                            <h2 className="text-xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                                <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                                {t.common.moreInSection}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                </div>
            </div>
        </main>
    );
}
