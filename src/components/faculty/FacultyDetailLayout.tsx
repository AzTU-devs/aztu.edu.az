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
        <div className="min-h-screen transition-colors overflow-hidden bg-white">
            {/* Stunning Banner - VIBRANT BLUE */}
            <div className="relative overflow-hidden bg-[#0b1330] pt-32 pb-16 px-4 md:px-8 lg:px-12 w-full min-h-[450px] flex flex-col justify-end">
                {/* Background Texture/Pattern */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10" 
                     style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
                    >
                        <source src="/heroBgVideos/research.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* Background Image of AzTU - fallback or overlay */}
                <div 
                    className="absolute inset-0 z-0 opacity-10 grayscale-[0.5]"
                    style={{
                        backgroundImage: 'url("/aztu.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                
                {/* Multi-layer Overlays for Vibrancy on Blue */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1330] via-[#0b1330]/80 to-transparent z-0" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a2355]/60 to-transparent z-0" />

                {/* Vibrant Glow Orbs */}
                <div className="absolute inset-0 overflow-hidden opacity-30 z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-500/20 blur-[200px] rounded-full translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-[#ee7c7e]/15 blur-[150px] rounded-full -translate-x-1/4 translate-y-1/4" />
                </div>
                
                <div className="relative z-20 w-full">
                    <motion.nav 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-white/50 text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex-wrap"
                    >
                        <div className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                            <Link href="/" className="hover:text-[#ee7c7e] transition-colors flex items-center gap-2 group">
                                <HomeIcon sx={{ fontSize: 14 }} className="group-hover:scale-110 transition-transform" />
                                {currentLang === "az" ? "Ana" : "Home"}
                            </Link>
                            <ChevronRightIcon sx={{ fontSize: 12 }} className="text-[#ee7c7e]" />
                            <Link href={institutesListPath} className="hover:text-white transition-colors">
                                {currentLang === "az" ? "Fakültələr" : "Faculties"}
                            </Link>
                            <ChevronRightIcon sx={{ fontSize: 12 }} className="text-[#ee7c7e]" />
                            <span className="text-[#ee7c7e] font-black truncate max-w-[200px]">
                                {faculty?.title ?? facultySlug}
                            </span>
                        </div>
                    </motion.nav>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-8 leading-[0.9] max-w-5xl tracking-tighter drop-shadow-2xl">
                            {faculty?.title ?? facultySlug}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-6">
                            {faculty?.faculty_code && (
                                <div className="inline-flex items-center px-6 py-2.5 rounded-2xl bg-[#ee7c7e] text-white font-black text-[10px] tracking-[0.3em] shadow-xl shadow-[#ee7c7e]/30">
                                    {faculty.faculty_code}
                                </div>
                            )}
                            <div className="h-px w-12 bg-white/20" />
                            <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.5em]">
                                {currentLang === "az" ? "Fakültə Portalı" : "Faculty Portal"}
                            </span>
                        </div>
                    </motion.div>
                </div>
                
                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent z-20 opacity-60 shadow-[0_0_20px_#ee7c7e]" />
            </div>

            {/* Mobile sidebar toggle - Sticky */}
            <div className="lg:hidden sticky top-0 z-30 px-6 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-xl flex items-center justify-between shadow-xl shadow-blue-900/5">
                <span className="text-[10px] font-black text-[#1a2355] uppercase tracking-widest">
                    {currentLang === "az" ? "Portal Naviqasiyası" : "Portal Navigation"}
                </span>
                <button
                    onClick={() => setSidebarOpen((o) => !o)}
                    className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-50 text-[#1a2355] transition-all active:scale-95 border border-gray-100 shadow-sm"
                    aria-label="Toggle sidebar"
                >
                    {sidebarOpen ? (
                        <CloseIcon sx={{ fontSize: 20 }} />
                    ) : (
                        <MenuIcon sx={{ fontSize: 20 }} />
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
                        className="lg:hidden fixed inset-0 z-40 bg-blue-900/20 backdrop-blur-md"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="absolute left-0 top-0 bottom-0 w-[300px] bg-white overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-8">
                                <div className="mb-8 flex items-center justify-between border-b-2 border-gray-50 pb-4">
                                    <span className="text-xl font-black text-[#1a2355] uppercase tracking-tighter">Menyu</span>
                                    <button onClick={() => setSidebarOpen(false)} className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
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
                <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
                     style={{ backgroundImage: 'radial-gradient(#1a2355 1.5px, transparent 1.5px)', backgroundSize: '50px 50px' }} />

                <div className="flex flex-col lg:flex-row px-4 md:px-8 lg:px-12 py-16 gap-12 w-full relative z-10">
                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block lg:w-80 flex-shrink-0">
                        <div className="sticky top-28 space-y-8">
                            <FacultySidebar facultyId={facultySlug} />
                            
                            {/* Sidebar decorative card */}
                            <div className="rounded-[2.5rem] bg-[#1a2355] p-10 text-white overflow-hidden relative group shadow-2xl shadow-blue-900/20">
                                <div className="absolute -right-4 -bottom-4 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-[#ee7c7e]/20 transition-all duration-700" />
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent opacity-40" />
                                
                                <h3 className="text-xl font-black uppercase tracking-tighter mb-4 relative z-10">{currentLang === "az" ? "Yardım?" : "Help?"}</h3>
                                <p className="text-white/50 text-[11px] mb-8 relative z-10 leading-relaxed font-bold">
                                    {currentLang === "az" ? "Fakültə ilə bağlı suallarınız üçün bizimlə əlaqə saxlayın." : "Contact us for your questions about the faculty."}
                                </p>
                                <Link 
                                    href={`/${currentLang}/${currentLang === "az" ? "akademik/fakulteler" : "academic/faculties"}/${facultySlug}/${currentLang === "az" ? "haqqimizda/elaqe" : "about/contact"}`}
                                    className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] bg-[#ee7c7e] text-white hover:bg-white hover:text-[#1a2355] px-8 py-4 rounded-2xl transition-all duration-500 relative z-10 shadow-xl shadow-black/20 active:scale-95"
                                >
                                    {currentLang === "az" ? "Əlaqə" : "Contact"}
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
