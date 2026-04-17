"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import LaunchIcon from "@mui/icons-material/Launch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

interface Journal {
    name: string;
    image?: string;
    issn?: string;
    doi?: string;
    founder?: string;
    language?: string;
    frequency?: string;
    chiefEditor?: string;
    about: string;
    scopeTitle?: string;
    scopeItems?: string[];
    editorialBoard?: string[];
    link: string;
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

function JournalCard({ journal, index }: { journal: Journal; index: number }) {
    const t = useTranslation();
    
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="group relative flex flex-col xl:flex-row gap-10 p-8 md:p-12 rounded-[3rem] bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-100 dark:border-white/10 hover:border-[#ee7c7e]/30 transition-all duration-500 shadow-2xl overflow-hidden"
        >
            {/* Hover Glow */}
            <div className="absolute -inset-24 bg-gradient-to-br from-[#ee7c7e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" />
            
            {/* Image Section */}
            <div className="xl:w-1/3 flex-shrink-0">
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-xl group-hover:scale-[1.02] transition-transform duration-500">
                    {journal.image ? (
                        <Image 
                            src={journal.image} 
                            alt={journal.name} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-white/20 p-8 text-center">
                            <MenuBookIcon sx={{ fontSize: 80, mb: 2, opacity: 0.5 }} />
                            <p className="text-sm font-bold uppercase tracking-widest">{journal.name}</p>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex flex-wrap gap-3 mb-6">
                        {journal.issn && (
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a2355]/5 dark:bg-white/5 border border-[#1a2355]/10 dark:border-white/10">
                                <FingerprintIcon sx={{ fontSize: 14 }} className="text-[#ee7c7e]" />
                                <span className="text-[10px] font-black uppercase tracking-wider dark:text-white/70">ISSN: {journal.issn}</span>
                            </div>
                        )}
                        {journal.doi && (
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ee7c7e]/5 border border-[#ee7c7e]/10">
                                <span className="text-[10px] font-black uppercase tracking-wider text-[#ee7c7e]">DOI: {journal.doi}</span>
                            </div>
                        )}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black text-[#1a2355] dark:text-white mb-8 leading-tight group-hover:text-[#ee7c7e] transition-colors duration-300 tracking-tighter">
                        {journal.name}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                            {journal.founder && (
                                <div className="flex items-center gap-3 text-gray-600 dark:text-white/60">
                                    <BusinessIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e]" />
                                    <span className="text-sm font-medium">{journal.founder}</span>
                                </div>
                            )}
                            {journal.language && (
                                <div className="flex items-center gap-3 text-gray-600 dark:text-white/60">
                                    <LanguageIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e]" />
                                    <span className="text-sm font-medium">{journal.language}</span>
                                </div>
                            )}
                            {journal.frequency && (
                                <div className="flex items-center gap-3 text-gray-600 dark:text-white/60">
                                    <CalendarMonthIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e]" />
                                    {/* <span className="text-sm font-medium">{journal.frequency} {t.common?.perYear || "Issues per year"}</span> */}
                                </div>
                            )}
                        </div>
                        {journal.chiefEditor && (
                            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                {/* <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ee7c7e] mb-3">{t.common?.chiefEditor || "Chief Editor"}</p> */}
                                <div className="flex items-start gap-3">
                                    <PersonIcon sx={{ fontSize: 18 }} className="text-[#1a2355] dark:text-white mt-0.5" />
                                    <p className="text-sm font-bold text-[#1a2355] dark:text-white/90 leading-snug">{journal.chiefEditor}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="text-gray-600 dark:text-white/60 text-base md:text-lg leading-relaxed whitespace-pre-wrap font-medium mb-10">
                        {journal.about}
                    </div>

                    {journal.scopeItems && (
                        <div className="mb-10">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#1a2355] dark:text-white mb-6">{journal.scopeTitle}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {journal.scopeItems.map((item: string, i: number) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ee7c7e] flex-shrink-0" />
                                        <span className="text-sm font-medium text-gray-600 dark:text-white/70">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {journal.editorialBoard && (
                        <div className="mb-10">
                            {/* <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#1a2355] dark:text-white mb-6">{t.common?.editorialBoard || "Editorial Board"}</h3> */}
                            <div className="flex flex-wrap gap-2">
                                {journal.editorialBoard.map((member: string, i: number) => (
                                    <span key={i} className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-600 dark:text-white/70 border border-gray-200/50 dark:border-white/10">
                                        {member}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-gray-100 dark:border-white/10">
                    <Link 
                        href={journal.link} 
                        target="_blank"
                        className="group/btn relative inline-flex items-center gap-4 bg-[#1a2355] dark:bg-[#ee7c7e] text-white font-black px-10 py-5 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        {/* <span className="relative z-10 uppercase tracking-[0.2em] text-xs">{t.common?.visitWebsite || "Visit Website"}</span> */}
                        <LaunchIcon className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" sx={{ fontSize: 18 }} />
                    </Link>
                </div>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-[#ee7c7e] group-hover:w-full transition-all duration-700 ease-in-out" />
        </motion.section>
    );
}

export default function SeminarsAndTrainingsPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.research.seminarsAndTrainings;
    const bannerRef = useRef(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);

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
                    <source src="/heroBgVideos/research.mp4" type="video/mp4" />
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
                        className="relative mb-32 p-10 md:p-16 rounded-[3rem] bg-[#1a2355] dark:bg-white/[0.02] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.2)] overflow-hidden text-center group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ee7c7e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <div className="relative z-10 max-w-4xl mx-auto">
                            {/* <h2 className="text-white/40 text-xs font-black uppercase tracking-[0.5em] mb-8">{t.common?.introduction || "Introduction"}</h2> */}
                            <p className="text-white text-xl md:text-3xl font-black leading-snug tracking-tight">
                                {p.description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Journals Section Header */}
                    <div className="mb-20">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-px bg-[#ee7c7e]" />
                            <span className="text-[#ee7c7e] text-xs font-black uppercase tracking-[0.4em]">{p.eyebrow}</span>
                        </div>
                        <h3 className="text-4xl md:text-6xl font-black text-[#1a2355] dark:text-white tracking-tighter">
                            {p.journalsTitle}
                        </h3>
                    </div>

                    {/* Journals Detailed Grid */}
                    <div className="space-y-16">
                        {p.journals.map((journal: Journal, i: number) => (
                            <JournalCard key={i} journal={journal} index={i} />
                        ))}
                    </div>

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
                                { title: t.pages.research.internalGrants.title, href: lang === "az" ? "/tedqiqat/performans-ve-qiymetlendirme/daxili-qrant-proqramlari" : "/research/performance-and-evaluation/internal-grant-programs", color: "#ee7c7e" },
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
