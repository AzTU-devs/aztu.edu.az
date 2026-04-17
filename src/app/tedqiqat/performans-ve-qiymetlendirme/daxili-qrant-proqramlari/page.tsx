"use client";

import { useRef } from "react";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import GavelIcon from "@mui/icons-material/Gavel";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LaunchIcon from "@mui/icons-material/Launch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

const SECTION_ICONS = [
    GavelIcon,
    AccountTreeIcon,
    AssignmentTurnedInIcon,
];

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

interface SectionProps {
    section: {
        title: string;
        items: string[];
    };
    index: number;
    icon: React.ElementType;
}

function ContentCard({ section, index, icon: Icon }: SectionProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-100 dark:border-white/10 hover:border-[#ee7c7e]/30 transition-all duration-500 shadow-2xl overflow-hidden"
        >
            <div className="absolute -inset-24 bg-gradient-to-br from-[#ee7c7e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0 w-20 h-20 rounded-3xl bg-gray-50 dark:bg-white/10 flex items-center justify-center group-hover:bg-[#ee7c7e] group-hover:scale-110 transition-all duration-500 shadow-inner group-hover:shadow-[0_10px_30px_rgba(238,124,126,0.4)]">
                    <Icon className="text-[#1a2355] dark:text-white/90 group-hover:text-white transition-colors duration-500" sx={{ fontSize: 36 }} />
                </div>
                
                <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-black text-[#1a2355] dark:text-white mb-6 leading-tight group-hover:text-[#ee7c7e] transition-colors duration-300 tracking-tighter">
                        {section.title}
                    </h2>
                    <ul className="space-y-4">
                        {section.items.map((item, i) => (
                            <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (i * 0.05) }}
                                className="flex items-start gap-3 text-gray-600 dark:text-white/60 text-base md:text-lg font-medium"
                            >
                                <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#ee7c7e] flex-shrink-0" />
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <Icon sx={{ fontSize: 120 }} />
            </div>
            
            <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-[#ee7c7e] group-hover:w-full transition-all duration-700 ease-in-out" />
        </motion.section>
    );
}

export default function InternalGrantsPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.research.internalGrants;
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
                                {p.title.split(' ').map((word, i) => (
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
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 relative p-10 md:p-16 rounded-[3rem] bg-[#1a2355] dark:bg-white/[0.02] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.2)] overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ee7c7e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="relative z-10">
                                <h2 className="text-white/40 text-xs font-black uppercase tracking-[0.5em] mb-8">Haqqında</h2>
                                <p className="text-white text-xl md:text-3xl font-black leading-snug tracking-tight">
                                    {p.description}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative p-10 rounded-[3rem] bg-[#ee7c7e] flex flex-col items-center justify-center text-center shadow-2xl group hover:scale-[1.02] transition-transform duration-500"
                        >
                            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <LaunchIcon className="text-white" sx={{ fontSize: 40 }} />
                            </div>
                            <h3 className="text-white text-2xl font-black mb-6 leading-tight uppercase tracking-tighter">
                                {p.portalButton}
                            </h3>
                            <Link 
                                href="http://e-grant.aztu.edu.az/" 
                                target="_blank"
                                className="bg-white text-[#ee7c7e] font-black px-8 py-4 rounded-2xl hover:bg-[#1a2355] hover:text-white transition-all duration-300 shadow-xl"
                            >
                                Keçid Et
                            </Link>
                        </motion.div>
                    </div>

                    {/* Detailed Sections */}
                    <div className="space-y-12">
                        {p.sections.map((section, i) => (
                            <ContentCard key={i} section={section} index={i} icon={SECTION_ICONS[i]} />
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
                                { title: t.nav.items.researchInstitutes, href: lang === "az" ? "/tedqiqat/tedqiqat-fealiyyeti/tedqiqat-institutlari" : "/research/research-activity/research-institutes", color: "#ee7c7e" },
                                // { title: t.nav.items.projects, href: "/projects", color: "#2563eb" },
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
