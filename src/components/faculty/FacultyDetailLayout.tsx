"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FacultySidebar from "@/components/faculty/FacultySidebar";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { getFacultyBySlug } from "@/services/facultyService/facultyService";
import type { FacultyDetail } from "@/types/faculty";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
    children: React.ReactNode;
    params: Promise<{ facultyId: string }>;
}

export default function FacultyDetailLayout({ children, params }: Props) {
    const { facultyId: facultySlug } = use(params);
    const { lang: currentLang } = useLanguage();
    const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        getFacultyBySlug(facultySlug, currentLang)
            .then((result) => {
                if (result) setFaculty(result);
            })
            .catch(() => {});
    }, [facultySlug, currentLang]);

    const institutesListPath = `/${currentLang}/${currentLang === "az" ? "akademik/fakulteler" : "academic/faculties"}`;
    const contactPath = `/${currentLang}/${currentLang === "az" ? "akademik/fakulteler" : "academic/faculties"}/${facultySlug}/${currentLang === "az" ? "haqqimizda/elaqe" : "about/contact"}`;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
            {/* ── Hero banner ── */}
            <div className="relative overflow-hidden bg-[#0b1330] pt-32 pb-14 px-4 md:px-8 lg:px-12">
                {/* Video background */}
                <div className="absolute inset-0 z-0">
                    <video
                        key="academic-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                    >
                        <source
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://api-aztu.karamshukurlu.site"}/media/prod/hero/hero_videos/academic.mp4`}
                            type="video/mp4"
                        />
                    </video>
                    {/* Clean readable overlay */}
                    <div className="absolute inset-0 bg-[#0b1330]/70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1330] via-[#0b1330]/40 to-transparent" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-[1600px]">
                    {/* Breadcrumb */}
                    <motion.nav
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/60"
                    >
                        <Link href="/" className="flex items-center gap-1.5 transition-colors hover:text-white">
                            <HomeIcon sx={{ fontSize: 16 }} />
                            {currentLang === "az" ? "Ana səhifə" : "Home"}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 14 }} className="text-white/30" />
                        <Link href={institutesListPath} className="transition-colors hover:text-white">
                            {currentLang === "az" ? "Fakültələr" : "Faculties"}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 14 }} className="text-white/30" />
                        <span className="max-w-[160px] truncate font-semibold text-[#ee7c7e] md:max-w-none">
                            {faculty?.title ?? facultySlug}
                        </span>
                    </motion.nav>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    >
                        {faculty?.faculty_code && (
                            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#ee7c7e] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg shadow-[#ee7c7e]/25">
                                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                {faculty.faculty_code}
                            </span>
                        )}
                        <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                            {faculty?.title ?? facultySlug}
                        </h1>
                        <p className="mt-4 text-sm font-medium uppercase tracking-[0.14em] text-white/50">
                            {currentLang === "az" ? "Fakültə Portalı" : "Faculty Portal"}
                        </p>
                    </motion.div>
                </div>

                {/* thin accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a2355] via-[#ee7c7e] to-[#1a2355]" />
            </div>

            {/* ── Mobile sidebar toggle ── */}
            <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white/90 px-5 py-3.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90 lg:hidden">
                <span className="text-sm font-bold text-[#1a2355] dark:text-white">
                    {currentLang === "az" ? "Portal Naviqasiyası" : "Portal Navigation"}
                </span>
                <button
                    onClick={() => setSidebarOpen((o) => !o)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a2355] text-white transition active:scale-95"
                    aria-label="Toggle sidebar"
                >
                    {sidebarOpen ? <CloseIcon sx={{ fontSize: 20 }} /> : <MenuIcon sx={{ fontSize: 20 }} />}
                </button>
            </div>

            {/* ── Mobile sidebar drawer ── */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="absolute bottom-0 left-0 top-0 w-[min(320px,85vw)] overflow-y-auto bg-slate-50 p-5 dark:bg-slate-950"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-lg font-bold text-[#1a2355] dark:text-white">
                                    {currentLang === "az" ? "Menyu" : "Menu"}
                                </span>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition hover:text-gray-800 dark:bg-white/10 dark:text-white/60"
                                >
                                    <CloseIcon sx={{ fontSize: 20 }} />
                                </button>
                            </div>
                            <FacultySidebar facultyId={facultySlug} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Content area ── */}
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-4 py-12 md:px-8 lg:flex-row lg:px-12">
                {/* Desktop sidebar */}
                <aside className="hidden flex-shrink-0 lg:block lg:w-72 xl:w-80">
                    <div className="sticky top-24 space-y-5">
                        <FacultySidebar facultyId={facultySlug} />

                        {/* Help card */}
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a2355] to-[#2a3670] p-6 text-white shadow-sm">
                            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#ee7c7e]/20 blur-2xl" />
                            <div className="relative z-10">
                                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                                    <SupportAgentOutlinedIcon sx={{ fontSize: 22 }} />
                                </span>
                                <h3 className="text-lg font-bold">
                                    {currentLang === "az" ? "Köməyə ehtiyacınız var?" : "Need help?"}
                                </h3>
                                <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                                    {currentLang === "az"
                                        ? "Fakültə ilə bağlı suallarınız üçün bizimlə əlaqə saxlayın."
                                        : "Reach out to us for any questions about the faculty."}
                                </p>
                                <Link
                                    href={contactPath}
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#ee7c7e] px-5 py-3 text-[13px] font-bold text-white transition hover:bg-white hover:text-[#1a2355] active:scale-95"
                                >
                                    {currentLang === "az" ? "Əlaqə" : "Contact"}
                                    <ChevronRightIcon sx={{ fontSize: 16 }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main content */}
                <main className="min-w-0 flex-1">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
