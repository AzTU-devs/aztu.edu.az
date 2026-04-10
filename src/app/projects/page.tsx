"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getProjects, type ProjectItem } from "@/services/projectService/projectService";

const MONTHS_AZ = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
    "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr",
];

function formatDate(iso: string) {
    if (!iso) return "";
    const d = new Date(iso);
    return `${String(d.getUTCDate()).padStart(2, "0")} ${MONTHS_AZ[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.48, delay: i * 0.07, ease: "easeOut" as const },
    }),
};

const CARD_COLORS = [
    "border-blue-200 dark:border-blue-900/50",
    "border-emerald-200 dark:border-emerald-900/50",
    "border-purple-200 dark:border-purple-900/50",
    "border-orange-200 dark:border-orange-900/50",
];

const PAGE_SIZE = 8;

export default function ProjectsPage() {
    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setLoading(true);
        getProjects({ start: 0, end: PAGE_SIZE, lang: "az" }).then((res) => {
            setLoading(false);
            if (res && res !== "NO_CONTENT" && res !== "ERROR") {
                setProjects(res.projects);
                setTotal(res.total);
            }
        });
    }, []);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setLoadingMore(true);
        getProjects({ start: nextPage * PAGE_SIZE, end: (nextPage + 1) * PAGE_SIZE, lang: "az" }).then((res) => {
            setLoadingMore(false);
            if (res && res !== "NO_CONTENT" && res !== "ERROR") {
                setProjects((prev) => [...prev, ...res.projects]);
                setPage(nextPage);
            }
        });
    };

    const hasMore = projects.length < total;

    return (
        <>
            <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">

                {/* Banner */}
                <div className="bg-gradient-to-br from-[#0b1330] via-[#1a2355] to-[#13365E] px-4 md:px-10 lg:px-20 pt-36 pb-20 relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/3 pointer-events-none" />

                    <motion.nav
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-1.5 text-white/40 text-xs mb-6 flex-wrap"
                    >
                        <Link href="/" className="hover:text-white/70 transition-colors">Ana səhifə</Link>
                        <ChevronRightIcon sx={{ fontSize: 13 }} />
                        <span className="text-white/60">Layihələr</span>
                    </motion.nav>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-2"
                    >
                        Araşdırma &amp; İnnovasiya
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-3 flex items-center gap-4"
                    >
                        <FolderOpenIcon sx={{ fontSize: 44, opacity: 0.85 }} />
                        Layihələr
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.18 }}
                        className="text-white/70 text-base max-w-xl"
                    >
                        AzTU-nun elmi-tədqiqat və innovasiya layihələri ilə tanış olun.
                    </motion.p>
                </div>

                <div className="px-4 md:px-10 lg:px-20 py-10">
                    {loading && (
                        <div className="flex justify-center items-center py-32">
                            <div className="w-10 h-10 rounded-full border-4 border-[#1a2355] border-t-transparent animate-spin" />
                        </div>
                    )}

                    <AnimatePresence>
                        {!loading && projects.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-24 text-gray-400 font-semibold text-lg"
                            >
                                Layihə tapılmadı.
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {projects.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {projects.map((project, i) => (
                                <motion.div
                                    key={project.project_id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                >
                                    <Link href={`/projects/${project.project_id}`}>
                                        <div className={`group bg-white dark:bg-[#1e293b] rounded-2xl shadow-md border-2 ${CARD_COLORS[i % CARD_COLORS.length]} overflow-hidden flex flex-col cursor-pointer hover:shadow-xl transition-all duration-300 h-full`}>
                                            <div className="p-6 flex flex-col gap-3 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <FolderOpenIcon sx={{ color: "#1a2355", opacity: 0.6, fontSize: 22 }} />
                                                    <ChevronRightIcon
                                                        sx={{ fontSize: 18 }}
                                                        className="text-[#1a2355] dark:text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    />
                                                </div>

                                                <h3 className="text-[#1a2355] dark:text-white font-bold text-base leading-snug flex-1 group-hover:text-[#ee7c7e] transition-colors duration-300 line-clamp-3">
                                                    {project.title}
                                                </h3>

                                                {project.description && (
                                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
                                                        {project.description}
                                                    </p>
                                                )}

                                                <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-xs mt-auto pt-1">
                                                    <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                                    <span>{formatDate(project.created_at)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {hasMore && !loading && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex justify-center mt-14"
                        >
                            <motion.button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                whileHover={{ scale: loadingMore ? 1 : 1.04 }}
                                whileTap={{ scale: loadingMore ? 1 : 0.97 }}
                                className="group flex items-center gap-2 bg-[#1a2355] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#1a2355]/90 transition-colors duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loadingMore ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                        Yüklənir...
                                    </span>
                                ) : (
                                    <>
                                        Daha çox yüklə
                                        <ChevronRightIcon className="rotate-90 transition-transform duration-300 group-hover:translate-y-1" />
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </main>
            </>
    );
}
