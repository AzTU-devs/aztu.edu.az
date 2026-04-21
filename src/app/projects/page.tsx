"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getProjects, type ProjectItem } from "@/services/projectService/projectService";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";

const MONTHS_AZ = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
    "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr",
];

const MONTHS_EN = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

function formatDate(iso: string, lang: string) {
    if (!iso) return "";
    const d = new Date(iso);
    const months = lang === 'az' ? MONTHS_AZ : MONTHS_EN;
    return `${String(d.getUTCDate()).padStart(2, "0")} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

const cardVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] },
    }),
};

const ACCENT_COLORS = [
    "from-blue-600 to-indigo-600",
    "from-emerald-600 to-teal-600",
    "from-purple-600 to-violet-600",
    "from-orange-600 to-amber-600",
    "from-[#ee7c7e] to-[#f09395]",
];

const PAGE_SIZE = 12;

export default function ProjectsPage() {
    const { lang } = useLanguage();
    const t = useTranslation();
    const [projects, setProjects] = useState<ProjectItem[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setLoading(true);
        getProjects({ start: 0, end: PAGE_SIZE, lang }).then((res) => {
            setLoading(false);
            if (res && res !== "NO_CONTENT" && res !== "ERROR") {
                setProjects(res.projects);
                setTotal(res.total);
            }
        });
    }, [lang]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setLoadingMore(true);
        getProjects({ start: nextPage * PAGE_SIZE, end: (nextPage + 1) * PAGE_SIZE, lang }).then((res) => {
            setLoadingMore(false);
            if (res && res !== "NO_CONTENT" && res !== "ERROR") {
                setProjects((prev) => [...prev, ...res.projects]);
                setPage(nextPage);
            }
        });
    };

    const hasMore = projects.length < total;

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden pb-32">
            {/* STUNNING BACKGROUND ELEMENTS - MATCHING HOME PAGE */}
            <div className="bg-mesh" />
            <div className="bg-grid-premium" />

            <PageHero
                title={lang === 'az' ? 'Elmi Layihələr' : 'Research Projects'}
                description={lang === 'az' ? 'AzTU-nun elmi-tədqiqat və innovasiya layihələri ilə tanış olun.' : 'Explore the scientific research and innovation projects of AzTU.'}
                breadcrumbs={[
                    { label: lang === 'az' ? 'Layihələr' : 'Projects' }
                ]}
                eyebrow="Research & Innovation"
            />

            <PageContainer>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="h-80 rounded-[3rem] bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl animate-pulse border-2 border-[#1a2355]/10 dark:border-white/10" />
                        ))}
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-40 bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-[4rem] border-2 border-dashed border-[#1a2355]/20 dark:border-white/10 relative z-10">
                        <FolderOpenIcon sx={{ fontSize: 80, color: "#1a2355", opacity: 0.1 }} className="mb-6" />
                        <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-sm">
                            {lang === 'az' ? 'Layihə tapılmadı.' : 'No projects found.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
                        {projects.map((project, i) => {
                            const color = ACCENT_COLORS[i % ACCENT_COLORS.length];

                            return (
                                <motion.div
                                    key={project.project_id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <Link href={`/projects/${project.project_id}`} className="group block h-full">
                                        <div className="relative h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[3rem] shadow-2xl shadow-blue-900/5 border-2 border-[#1a2355]/10 dark:border-white/5 p-10 transition-all duration-700 overflow-hidden hover:-translate-y-2 hover:border-[#ee7c7e]/30">
                                            {/* Decorative Background */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a2355]/5 dark:bg-white/5 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-110" />
                                            <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                            
                                            <div className="relative z-10 flex flex-col h-full">
                                                <div className="flex items-center justify-between mb-8">
                                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                                                        <FolderOpenIcon sx={{ fontSize: 28 }} />
                                                    </div>
                                                    <div className="w-12 h-12 rounded-2xl bg-[#1a2355]/5 dark:bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-[#ee7c7e] group-hover:text-white border border-[#1a2355]/5">
                                                        <ChevronRightIcon sx={{ fontSize: 24 }} />
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-black text-[#1a2355] dark:text-white leading-[1.3] mb-6 group-hover:text-[#ee7c7e] transition-colors duration-500 tracking-tight">
                                                    {project.title}
                                                </h3>

                                                {project.description && (
                                                    <p className="text-sm text-gray-500 dark:text-white/40 leading-relaxed line-clamp-3 mb-10 font-medium">
                                                        {project.description}
                                                    </p>
                                                )}

                                                <div className="mt-auto pt-6 border-t border-[#1a2355]/5 dark:border-white/5">
                                                    <div className="flex items-center gap-2 text-gray-400 dark:text-white/20 text-[10px] font-black uppercase tracking-widest">
                                                        <CalendarMonthIcon sx={{ fontSize: 14, color: '#ee7c7e' }} />
                                                        <span>{formatDate(project.created_at, lang)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {hasMore && !loading && (
                    <div className="mt-24 flex justify-center">
                        <motion.button
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group px-12 py-5 bg-[#1a2355] text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] shadow-2xl shadow-blue-900/40 hover:bg-[#ee7c7e] hover:shadow-red-900/40 transition-all duration-500 flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingMore ? (
                                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            ) : (
                                <>
                                    {lang === 'az' ? 'Daha çox yüklə' : 'Load More'}
                                    <ChevronRightIcon className="rotate-90 group-hover:translate-y-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </div>
                )}
            </PageContainer>
        </main>
    );
}
