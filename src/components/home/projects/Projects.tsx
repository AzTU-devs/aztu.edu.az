"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { getProjects, type ProjectItem } from "@/services/projectService/projectService";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

const CARD_VARIANTS = [
    { accent: "#3b82f6", glow: "rgba(59, 130, 246, 0.1)" },
    { accent: "#10b981", glow: "rgba(16, 185, 129, 0.1)" },
    { accent: "#8b5cf6", glow: "rgba(139, 92, 246, 0.1)" },
    { accent: "#f59e0b", glow: "rgba(245, 158, 11, 0.1)" },
];

function formatYear(iso: string) {
    if (!iso) return "";
    return new Date(iso).getFullYear().toString();
}

export default function Projects() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const t = useTranslation();
    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const [loading, setLoading] = useState(true);
    const { lang } = useLanguage();

    useEffect(() => {
        setLoading(true);
        getProjects({ start: 0, end: 4, lang }).then((res) => {
            if (res && res !== "NO_CONTENT" && res !== "ERROR") {
                setProjects(res.projects.slice(0, 4));
            }
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [lang]);

    return (
        <section
            ref={sectionRef}
            className="relative px-4 md:px-10 lg:px-20 py-24 bg-white dark:bg-[#0b1330] overflow-hidden transition-colors duration-500"
        >
            {/* BACKGROUND DECORATIONS */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.04]" 
                     style={{ backgroundImage: 'radial-gradient(#ee7c7e 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
                
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1a2355]/[0.03] dark:bg-[#1a2355]/[0.1] blur-[120px] rounded-full" />
                
                <div className="absolute right-10 top-1/2 -translate-y-1/2 select-none opacity-[0.02] dark:opacity-[0.05]">
                    <h1 className="text-[180px] font-black tracking-tighter leading-none text-[#1a2355] dark:text-white uppercase vertical-text" style={{ writingMode: 'vertical-rl' }}>Projects</h1>
                </div>
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 mb-6 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse shadow-[0_0_8px_#ee7c7e]" />
                            <span className="text-[#1a2355] dark:text-white text-[11px] font-black uppercase tracking-[0.4em]">
                                {t.projects.sectionLabel}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-[#1a2355] dark:text-white leading-tight tracking-tighter">
                            {t.projects.sectionTitle}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <Link href="/projects">
                            <button className="group flex items-center gap-4 bg-[#1a2355] dark:bg-white/5 backdrop-blur-xl py-4 px-8 rounded-2xl text-white dark:text-white font-black uppercase tracking-widest text-xs hover:bg-[#ee7c7e] dark:hover:bg-[#ee7c7e] transition-all duration-500 shadow-xl shadow-[#1a2355]/20 dark:shadow-none cursor-pointer">
                                {t.projects.viewAll}
                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <ChevronRightIcon sx={{ fontSize: 20 }} />
                                </div>
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* Loading Skeleton */}
                <AnimatePresence>
                    {loading && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-pulse"
                        >
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-gray-100 dark:bg-white/5 rounded-[2.5rem] h-64 border border-gray-100 dark:border-white/5" />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Project Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {projects.map((project, idx) => {
                            const variant = CARD_VARIANTS[idx % CARD_VARIANTS.length];
                            return (
                                <motion.div
                                    key={project.project_id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.23, 1, 0.32, 1],
                                        delay: 0.2 + idx * 0.08,
                                    }}
                                    className="h-full"
                                >
                                    <Link href={`/projects/${project.project_id}`}>
                                        <div className="group relative h-full flex flex-col bg-gray-50/50 dark:bg-white/5 backdrop-blur-sm border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-8 transition-all duration-500 hover:bg-white dark:hover:bg-white/[0.08] hover:shadow-2xl overflow-hidden">
                                            {/* Hover Glow */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                                                 style={{ background: `radial-gradient(circle at center, ${variant.glow}, transparent 70%)` }} />
                                            
                                            {/* Top Interaction */}
                                            <div className="relative z-10 flex items-center justify-between mb-8">
                                                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center shadow-sm transition-all duration-500 group-hover:scale-110" style={{ color: variant.accent }}>
                                                    <FolderOpenIcon sx={{ fontSize: 28 }} />
                                                </div>
                                                <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-[#ee7c7e] group-hover:border-[#ee7c7e] transition-all duration-500">
                                                    <ArrowOutwardIcon sx={{ fontSize: 18 }} />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="relative z-10 flex-1 flex flex-col gap-4">
                                                <h3 className="text-xl font-black text-[#1a2355] dark:text-white leading-tight tracking-tight group-hover:text-[#ee7c7e] transition-colors duration-300">
                                                    {project.title}
                                                </h3>
                                                {project.description && (
                                                    <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed line-clamp-3">
                                                        {project.description}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Footer Info */}
                                            <div className="relative z-10 mt-10 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center gap-2 text-[#ee7c7e] text-[10px] font-black uppercase tracking-[0.2em]">
                                                <CalendarMonthIcon sx={{ fontSize: 14 }} />
                                                <span>{formatYear(project.created_at)}</span>
                                            </div>

                                            {/* Animated Accent Line */}
                                            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#ee7c7e] group-hover:w-full transition-all duration-700 ease-out origin-left" />
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
