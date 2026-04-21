"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { motion, useScroll } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import { getProjectById, type ProjectDetail } from "@/services/projectService/projectService";
import { API_BASE_URL } from "@/util/apiClient";
import { useRef } from "react";

const MONTHS_AZ = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
    "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr",
];

function formatDate(iso: string) {
    if (!iso) return "";
    const d = new Date(iso);
    return `${String(d.getUTCDate()).padStart(2, "0")} ${MONTHS_AZ[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });

    useEffect(() => {
        setLoading(true);
        getProjectById(id, "az").then((data) => {
            setProject(data);
            setLoading(false);
        });
    }, [id]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1a2355] via-blue-400 to-[#ee7c7e] z-[60] origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            <main ref={containerRef} className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">

                {/* Hero banner */}
                <section className="relative bg-gradient-to-br from-[#060d1f] via-[#1a2355] to-[#0f2a4a] overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#ee7c7e]/10 blur-3xl pointer-events-none" />

                    <div className="relative z-10 px-4 md:px-10 lg:px-20 pt-36 pb-16">
                        <motion.nav
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.45 }}
                            className="flex items-center gap-1.5 text-white/40 text-xs mb-8 flex-wrap"
                        >
                            <Link href="/" className="hover:text-white/80 transition-colors">Ana səhifə</Link>
                            <ChevronRightIcon sx={{ fontSize: 14 }} />
                            <Link href="/projects" className="hover:text-white/80 transition-colors">Layihələr</Link>
                            <ChevronRightIcon sx={{ fontSize: 14 }} />
                            <span className="text-white/60 truncate max-w-xs">{project?.title ?? "..."}</span>
                        </motion.nav>

                        <motion.h1
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl mb-4"
                        >
                            {loading ? <span className="opacity-40">Yüklənir...</span> : (project?.title ?? "")}
                        </motion.h1>

                        {project?.created_at && (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.2 }}
                                className="flex items-center gap-1.5 text-white/40 text-sm"
                            >
                                <CalendarMonthIcon sx={{ fontSize: 14 }} />
                                <span>{formatDate(project.created_at)}</span>
                            </motion.div>
                        )}

                        {/* Cover image */}
                        {project?.bg_image && (
                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
                                className="relative w-full h-64 md:h-[380px] rounded-t-3xl overflow-hidden mt-10"
                            >
                                <Image
                                    src={`${API_BASE_URL}/${project.bg_image}`}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            </motion.div>
                        )}
                    </div>
                </section>

                {loading && (
                    <div className="flex justify-center items-center py-32">
                        <div className="w-10 h-10 rounded-full border-4 border-[#1a2355] border-t-transparent animate-spin" />
                    </div>
                )}

                {!loading && !project && (
                    <div className="text-center py-24 text-gray-400 font-semibold text-lg">
                        Layihə tapılmadı.
                    </div>
                )}

                {project && !loading && (
                    <section className="px-4 md:px-10 lg:px-20 py-14">
                        <div className="max-w-4xl mx-auto flex flex-col gap-8">
                            {project.description && (
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.55 }}
                                    className="text-gray-800 dark:text-gray-200 text-lg md:text-xl leading-relaxed font-medium border-l-4 border-[#1a2355] pl-6 bg-blue-50/60 dark:bg-blue-950/20 py-4 pr-4 rounded-r-xl"
                                >
                                    {project.description}
                                </motion.p>
                            )}

                            {project.html_content && (
                                <SanitizedHtml
                                    className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg"
                                    html={project.html_content}
                                />
                            )}

                            <Link href="/projects">
                                <motion.div
                                    whileHover={{ x: -3 }}
                                    transition={{ duration: 0.2 }}
                                    className="inline-flex items-center gap-2 text-[#1a2355] dark:text-white font-semibold text-sm bg-white dark:bg-[#1e293b] rounded-xl px-4 py-2.5 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                >
                                    <ArrowBackIcon sx={{ fontSize: 18 }} />
                                    Layihələrə qayıt
                                </motion.div>
                            </Link>
                        </div>
                    </section>
                )}
            </main>

            </>
    );
}
