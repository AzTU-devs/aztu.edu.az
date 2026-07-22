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
            className="relative section-padding"
        >
            <div className="shell !px-0">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-12 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <span className="w-6 h-px bg-[#ee7c7e]" />
                            <span className="eyebrow">{t.projects.sectionLabel}</span>
                        </div>
                        <h2 className="section-title">
                            {t.projects.sectionTitle}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <Link href="/projects">
                            <button className="group inline-flex items-center gap-3 rounded-full bg-[#1a2355] py-3 pl-6 pr-3 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-[#ee7c7e] cursor-pointer">
                                {t.projects.viewAll}
                                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                                    <ChevronRightIcon sx={{ fontSize: 18 }} />
                                </span>
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
                                <div key={i} className="bg-gray-100 dark:bg-white/5 rounded-[18px] h-64 border border-gray-100 dark:border-white/5" />
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
                                        <div className="surface-card group relative h-full flex flex-col p-7 transition-all duration-500 hover:-translate-y-1 overflow-hidden">
                                            {/* Top Interaction */}
                                            <div className="relative z-10 flex items-center justify-between mb-7">
                                                <div className="w-12 h-12 rounded-[18px] bg-[var(--surface-inset)] flex items-center justify-center transition-colors duration-500" style={{ color: variant.accent }}>
                                                    <FolderOpenIcon sx={{ fontSize: 24 }} />
                                                </div>
                                                <div className="w-9 h-9 rounded-full border border-[var(--line-strong)] flex items-center justify-center text-[var(--ink-subtle)] group-hover:text-white group-hover:bg-[#ee7c7e] group-hover:border-[#ee7c7e] transition-all duration-500">
                                                    <ArrowOutwardIcon sx={{ fontSize: 16 }} />
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
                                            <div className="relative z-10 mt-10 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center gap-2 text-[#ee7c7e] text-[10px] font-black uppercase tracking-[0.12em]">
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
