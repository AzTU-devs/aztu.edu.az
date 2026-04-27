"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FacultySidebar from "@/components/faculty/FacultySidebar";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
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
                if (result) {
                    setFaculty(result);
                }
            })
            .catch(() => {});
    }, [facultySlug, currentLang]);

    const institutesListPath = `/${currentLang}/${currentLang === "az" ? "akademik/fakulteler" : "academic/faculties"}`;

    return (
        <div className="min-h-screen transition-colors overflow-hidden">
            {/* Stunning Banner */}
            <div className="relative overflow-hidden bg-[#0b1330] pt-40 pb-20 px-4 md:px-10 lg:px-12 w-full min-h-[500px] flex flex-col justify-end">
                {/* Background Texture/Pattern */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10" 
                     style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                    >
                        <source src="/heroBgVideos/research.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* Background Image of AzTU - fallback or overlay */}
                <div
                    className="absolute inset-0 z-0 opacity-10 grayscale"
                    style={{
                        backgroundImage: 'url("/aztu.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                
                {/* Multi-layer Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1330] via-[#0b1330]/60 to-transparent z-0" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330]/80 via-transparent to-transparent z-0" />

                <div className="absolute inset-0 overflow-hidden opacity-20 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#ee7c7e]/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
                </div>
                
                <div className="relative z-20 w-full">
                    <motion.nav 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mb-10 flex-wrap"
                    >
                        <Link href="/" className="hover:text-[#ee7c7e] transition-colors flex items-center gap-1 group">
                            <HomeIcon sx={{ fontSize: 14 }} className="group-hover:scale-110 transition-transform" />
                            {currentLang === "az" ? "Ana səhifə" : "Home"}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={institutesListPath} className="hover:text-white transition-colors">
                            {currentLang === "az" ? "Fakültələr" : "Faculties"}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-black truncate max-w-[250px]">
                            {faculty?.title ?? facultySlug}
                        </span>
                    </motion.nav>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-[1] max-w-4xl tracking-tighter">
                            {faculty?.title ?? facultySlug}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-4">
                            {faculty?.faculty_code && (
                                <div className="inline-flex items-center px-5 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-xs tracking-[0.2em]">
                                    {faculty.faculty_code}
                                </div>
                            )}
                            <div className="h-px w-12 bg-[#ee7c7e]" />
                            <span className="text-white/60 text-xs font-black uppercase tracking-[0.3em]">
                                {currentLang === "az" ? "Fakültə Portalı" : "Faculty Portal"}
                            </span>
                        </div>
                    </motion.div>
                </div>
                
                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ee7c7e]/30 to-transparent z-20" />
            </div>

            {/* Mobile sidebar toggle - Sticky */}
            <div className="lg:hidden sticky top-0 z-30 px-4 md:px-10 py-4 border-b border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md flex items-center justify-between shadow-sm">
                <span className="text-xs font-black text-[#1a2355] dark:text-white uppercase tracking-widest">
                    {currentLang === "az" ? "Naviqasiya" : "Navigation"}
                </span>
                <button
                    onClick={() => setSidebarOpen((o) => !o)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-700 text-[#1a2355] dark:text-white transition-all active:scale-95"
                    aria-label="Toggle sidebar"
                >
                    {sidebarOpen ? (
                        <CloseIcon />
                    ) : (
                        <MenuIcon />
                    )}
                </button>
            </div>

            {/* Mobile sidebar overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute left-0 top-0 bottom-0 w-[300px] bg-white dark:bg-slate-800 overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-8">
                                <div className="mb-10 flex items-center justify-between">
                                    <span className="text-xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter">Menyu</span>
                                    <button onClick={() => setSidebarOpen(false)} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                                        <CloseIcon />
                                    </button>
                                </div>
                                <FacultySidebar facultyId={facultySlug} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Area with Pattern */}
            <div className="relative">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
                     style={{ backgroundImage: 'radial-gradient(#1a2355 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />

                <div className="flex flex-col lg:flex-row px-4 md:px-10 lg:px-20 py-16 gap-16 w-full max-w-[1600px] mx-auto relative z-10">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block lg:w-80 flex-shrink-0">
                        <div className="sticky top-28 space-y-8">
                            <FacultySidebar facultyId={facultySlug} />
                            
                            {/* Sidebar decorative card */}
                            <div className="rounded-[2.5rem] bg-[#1a2355] p-10 text-white overflow-hidden relative group shadow-2xl">
                                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-500" />
                                <h3 className="text-xl font-black uppercase tracking-tighter mb-4 relative z-10">{currentLang === "az" ? "Yardım Lazımdır?" : "Need Help?"}</h3>
                                <p className="text-white/60 text-sm mb-8 relative z-10 leading-relaxed font-medium">
                                    {currentLang === "az" ? "Fakültə ilə bağlı suallarınız üçün bizimlə əlaqə saxlayın." : "Contact us for your questions about the faculty."}
                                </p>
                                <Link 
                                    href={`/${currentLang}/${currentLang === "az" ? "akademik/fakulteler" : "academic/faculties"}/${facultySlug}/${currentLang === "az" ? "haqqimizda/elaqe" : "about/contact"}`}
                                    className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] bg-[#ee7c7e] hover:bg-[#f09395] px-8 py-4 rounded-2xl transition-all relative z-10 shadow-xl shadow-black/20 active:scale-95"
                                >
                                    {currentLang === "az" ? "Əlaqəyə keç" : "Contact Us"}
                                    <ChevronRightIcon sx={{ fontSize: 16 }} />
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Content */}
                    <main className="flex-1 min-w-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {children}
                        </motion.div>
                    </main>
                </div>
            </div>
        </div>
    );
}
