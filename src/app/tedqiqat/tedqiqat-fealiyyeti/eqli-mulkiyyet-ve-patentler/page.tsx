"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

interface Patent {
    no: string;
    number: string;
    name: string;
    authors: string;
    link: string;
}

interface PatentYear {
    year: string;
    patents: Patent[];
}

function GridBackground() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <div 
                className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-10" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-10" />
        </div>
    );
}

export default function IntellectualPropertyPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.research.intellectualPropertyAndPatents;
    const [selectedPatent, setSelectedPatent] = useState<Patent | null>(null);
    const bannerRef = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

    const getEmbedLink = (url: string) => {
        if (url.includes('drive.google.com')) {
            return url.replace('/view', '/preview').replace('?usp=sharing', '');
        }
        return url;
    };

    return (
        <main className="min-h-screen bg-[#fafafa] dark:bg-[#0b1330] selection:bg-[#ee7c7e]/30">
            
            {/* FUTURISTIC HERO BANNER */}
            <section ref={bannerRef} className="relative h-[80vh] min-h-[600px] w-full flex items-center overflow-hidden bg-black">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-1000"
                    style={{ filter: "brightness(0.6) contrast(1.1) saturate(0.8)" }}
                >
                    <source src="/heroVideos/video9.mp4" type="video/mp4" />
                </video>

                <motion.div style={{ y }} className="absolute inset-0 z-10">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1330] via-transparent to-black/20" />
                    <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#0b1330]/60 to-transparent" />
                </motion.div>

                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ee7c7e]/10 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full" />
                </div>

                <div className="relative z-20 w-full px-[40px] md:px-[80px] xl:px-[120px]">
                    <div className="max-w-5xl">
                        <motion.nav 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-12"
                        >
                            <Link href="/" className="hover:text-[#ee7c7e] transition-colors flex items-center gap-2 group">
                                <HomeIcon sx={{ fontSize: 14 }} className="group-hover:scale-110 transition-transform" />
                                {t.common.home}
                            </Link>
                            <ChevronRightIcon sx={{ fontSize: 12 }} />
                            <span className="cursor-default">{t.nav.sections.research}</span>
                            <ChevronRightIcon sx={{ fontSize: 12 }} />
                            <span className="text-white/90">{p.breadcrumb}</span>
                        </motion.nav>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 mb-8 shadow-2xl">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ee7c7e] shadow-[0_0_12px_#ee7c7e] animate-pulse" />
                                <span className="text-white text-[12px] font-black uppercase tracking-[0.5em]">
                                    {p.eyebrow}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1.05] tracking-tighter drop-shadow-2xl">
                                {p.title.split(' ').map((word: string, i: number) => (
                                    <motion.span 
                                        key={i} 
                                        className="inline-block mr-4 last:mr-0"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </h1>
                            
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                                className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed border-l-4 border-[#ee7c7e] pl-8"
                            >
                                {p.subtitle}
                            </motion.p>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pb-8 z-20">
                    <div className="w-px h-16 bg-gradient-to-b from-white/20 via-[#ee7c7e] to-transparent" />
                </div>
            </section>

            {/* MAIN CONTENT AREA */}
            <div className="relative pt-24 pb-32">
                <GridBackground />
                
                <div className="max-w-[1400px] mx-auto px-[40px] md:px-[80px] xl:px-[120px]">
                    
                    {/* Visionary Intro Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative mb-32 p-10 md:p-16 rounded-[3rem] bg-[#1a2355] dark:bg-white/[0.02] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.2)] overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ee7c7e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative z-10 max-w-4xl">
                            {/* <h2 className="text-white/40 text-xs font-black uppercase tracking-[0.5em] mb-8">{t.common?.introduction || "Introduction"}</h2> */}
                            <p className="text-white text-lg md:text-2xl font-bold leading-relaxed tracking-tight opacity-90">
                                {p.description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Patents Tables by Year */}
                    <div className="space-y-24">
                        {[...p.years].reverse().map((yearData: PatentYear, yIndex: number) => (
                            <motion.div 
                                key={yearData.year}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: yIndex * 0.1 }}
                            >
                                <div className="flex items-center gap-6 mb-12">
                                    <h3 className="text-5xl md:text-7xl font-black text-[#1a2355] dark:text-white tracking-tighter opacity-20">{yearData.year}</h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-[#ee7c7e]/50 to-transparent" />
                                </div>

                                <div className="overflow-x-auto rounded-[2rem] border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl shadow-2xl">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-[#1a2355] dark:bg-[#ee7c7e] text-white">
                                                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest">{p.tableHeaders.no}</th>
                                                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest">{p.tableHeaders.number}</th>
                                                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest">{p.tableHeaders.name}</th>
                                                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest">{p.tableHeaders.authors}</th>
                                                <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-center">{p.tableHeaders.link}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                                            {yearData.patents.map((patent: Patent, pIndex: number) => (
                                                <tr key={pIndex} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-300">
                                                    <td className="px-6 py-6 text-sm font-bold text-gray-400 dark:text-white/30">{patent.no}</td>
                                                    <td className="px-6 py-6 text-sm font-black text-[#ee7c7e]">{patent.number}</td>
                                                    <td className="px-6 py-6 text-sm font-bold text-[#1a2355] dark:text-white/90 leading-snug max-w-md">{patent.name}</td>
                                                    <td className="px-6 py-6 text-xs font-medium text-gray-500 dark:text-white/60">{patent.authors}</td>
                                                    <td className="px-6 py-6 text-center">
                                                        <button 
                                                            onClick={() => setSelectedPatent(patent)}
                                                            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 text-[#1a2355] dark:text-white hover:bg-[#ee7c7e] hover:text-white transition-all duration-300"
                                                        >
                                                            <VisibilityIcon sx={{ fontSize: 18 }} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Document Viewer Modal */}
                    <AnimatePresence>
                        {selectedPatent && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-sm"
                            >
                                <motion.div 
                                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                    animate={{ scale: 1, opacity: 1, y: 0 }}
                                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                    className="relative w-full max-w-6xl h-full bg-white dark:bg-[#0b1330] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl"
                                >
                                    {/* Modal Header */}
                                    <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md">
                                        <div className="flex-1 min-w-0 mr-8">
                                            <p className="text-[#ee7c7e] text-[10px] font-black uppercase tracking-widest mb-1">{selectedPatent.number}</p>
                                            <h4 className="text-lg md:text-xl font-black text-[#1a2355] dark:text-white truncate">{selectedPatent.name}</h4>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Link 
                                                href={selectedPatent.link} 
                                                target="_blank"
                                                className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1a2355] dark:text-white/60 hover:text-[#ee7c7e] dark:hover:text-[#ee7c7e] transition-colors"
                                            >
                                                <LaunchIcon sx={{ fontSize: 14 }} />
                                                Open in Drive
                                            </Link>
                                            <button 
                                                onClick={() => setSelectedPatent(null)}
                                                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300"
                                            >
                                                <CloseIcon sx={{ fontSize: 20 }} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Iframe Viewer */}
                                    <div className="flex-1 relative bg-gray-100 dark:bg-black/20">
                                        <iframe 
                                            src={getEmbedLink(selectedPatent.link)} 
                                            className="w-full h-full border-none"
                                            allow="autoplay"
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* FUTURISTIC RELATED NAVIGATION */}
                    <div className="mt-40">
                        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                            <div className="max-w-xl">
                                <span className="text-[#ee7c7e] text-xs font-black uppercase tracking-[0.4em] mb-4 block">{t.common.moreInSection}</span>
                                <h3 className="text-3xl md:text-5xl font-black text-[#1a2355] dark:text-white tracking-tighter">Digər Maraqlı Bölmələr</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { title: t.pages.research.priorities.title, href: lang === "az" ? "/tedqiqat/tedqiqat-fealiyyeti/tedqiqat-prioritetleri" : "/research/research-activity/tedqiqat-prioritetleri", color: "#1a2355" },
                                { title: t.pages.research.researchProjects.title, href: lang === "az" ? "/tedqiqat/tedqiqat-fealiyyeti/tedqiqat-layiheleri" : "/research/research-activity/research-projects", color: "#ee7c7e" },
                                { title: t.nav.items.researchInstitutes, href: lang === "az" ? "/tedqiqat/tedqiqat-fealiyyeti/tedqiqat-institutlari" : "/research/research-activity/research-institutes", color: "#2563eb" },
                            ].map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.href}
                                    className="group relative h-64 rounded-[2.5rem] bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-10 flex flex-col justify-between hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 overflow-hidden"
                                >
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                                        style={{ backgroundColor: link.color }}
                                    />
                                    <div className="relative z-10 w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/10 flex items-center justify-center group-hover:bg-[#ee7c7e] transition-colors duration-500">
                                        <ArrowForwardIcon className="text-[#1a2355] dark:text-white group-hover:text-white -rotate-45 group-hover:rotate-0 transition-all duration-500" sx={{ fontSize: 24 }} />
                                    </div>
                                    <div className="relative z-10">
                                        <p className="text-[#1a2355] dark:text-white text-2xl font-black tracking-tighter leading-tight group-hover:text-[#ee7c7e] transition-colors">
                                            {link.title}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
