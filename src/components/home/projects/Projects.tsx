"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { getProjects, type ProjectItem } from "@/services/projectService/projectService";
import { useLanguage } from "@/context/LanguageContext";
import { API_BASE_URL } from "@/util/apiClient";

const CARD_COLORS = [
    { bg: "bg-blue-50 border-blue-200 dark:bg-[#1e293b] dark:border-blue-900/50", accent: "text-blue-600 dark:text-blue-400", icon: "#1a2355" },
    { bg: "bg-emerald-50 border-emerald-200 dark:bg-[#1e293b] dark:border-emerald-900/50", accent: "text-emerald-600 dark:text-emerald-400", icon: "#047857" },
    { bg: "bg-purple-50 border-purple-200 dark:bg-[#1e293b] dark:border-purple-900/50", accent: "text-purple-600 dark:text-purple-400", icon: "#7c3aed" },
    { bg: "bg-orange-50 border-orange-200 dark:bg-[#1e293b] dark:border-orange-900/50", accent: "text-orange-600 dark:text-orange-400", icon: "#ea580c" },
];

function formatYear(iso: string) {
    if (!iso) return "";
    return new Date(iso).getFullYear().toString();
}

export default function Projects() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const { lang } = useLanguage();

    useEffect(() => {
        getProjects({ start: 0, end: 4, lang }).then((res) => {
            if (res && res !== "NO_CONTENT" && res !== "ERROR") {
                setProjects(res.projects.slice(0, 4));
            }
        });
    }, [lang]);

    return (
        <section
            ref={sectionRef}
            className="px-4 md:px-10 lg:px-20 py-16 bg-white dark:bg-[#0a1120] relative overflow-hidden"
        >
            {/* Background accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4"
            >
                <div>
                    <p className="text-[#ee7c7e] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                        Araşdırma &amp; İnnovasiya
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1a2355] dark:text-white leading-tight">
                        Layihələr
                    </h2>
                </div>
                <Link href="/projects">
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="group flex items-center gap-2 bg-[#1a2355] py-2.5 px-5 rounded-xl text-white font-bold cursor-pointer hover:bg-[#0b1330] transition-colors duration-300"
                    >
                        Bütün Layihələr
                        <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </motion.button>
                </Link>
            </motion.div>

            {/* Loading skeleton */}
            {projects.length === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-gray-100 dark:bg-slate-800 rounded-2xl h-52" />
                    ))}
                </div>
            )}

            {/* Project Cards */}
            {projects.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {projects.map((project, idx) => {
                        const colors = CARD_COLORS[idx % CARD_COLORS.length];
                        return (
                            <motion.div
                                key={project.project_id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: 0.55,
                                    ease: "easeOut",
                                    delay: 0.1 + idx * 0.1,
                                }}
                                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                            >
                                <Link href={`/projects/${project.project_id}`}>
                                    <div className={`group rounded-2xl border-2 p-6 flex flex-col gap-3 hover:shadow-xl transition-all duration-300 cursor-pointer ${colors.bg}`}>
                                        <div className="flex items-center justify-between">
                                            <motion.div
                                                initial={{ rotate: 0 }}
                                                whileHover={{ rotate: 12 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <FolderOpenIcon sx={{ color: colors.icon, opacity: 0.7, fontSize: 22 }} />
                                            </motion.div>
                                            <ArrowOutwardIcon
                                                sx={{ fontSize: 16 }}
                                                className={`${colors.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                            />
                                        </div>

                                        <h3 className="text-[#1a2355] dark:text-white font-bold text-base leading-snug group-hover:text-[#1a2355]/80 dark:group-hover:text-white/80 transition-colors duration-300">
                                            {project.title}
                                        </h3>

                                        {project.description && (
                                            <p className="text-gray-600 dark:text-gray-400 text-sm flex-1 leading-relaxed line-clamp-3">
                                                {project.description}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-sm mt-auto pt-1">
                                            <CalendarMonthIcon sx={{ fontSize: 15 }} />
                                            <span>{formatYear(project.created_at)}</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
