"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import { getFacultyBySlug } from "@/services/facultyService/facultyService";
import type { CafedraDetail } from "@/types/cafedra";
import type { FacultyDetail } from "@/types/faculty";

import CafedraSidebar from "@/components/cafedra/CafedraSidebar";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
    children: React.ReactNode;
    params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function CafedraDetailLayout({ children, params }: Props) {
    const { facultyId, cafedraId } = use(params);
    const { lang: currentLang } = useLanguage();
    const [cafedra, setCafedra] = useState<CafedraDetail | null>(null);
    const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        getCafedraByCode(cafedraId, currentLang).then(setCafedra);
        getFacultyBySlug(facultyId, currentLang).then(setFaculty);
    }, [facultyId, cafedraId, currentLang]);

    const academicPrefix = currentLang === "az" ? "akademik" : "academic";
    const facultyPrefix = currentLang === "az" ? "fakulteler" : "faculties";
    const facultyBase = `/${currentLang}/${academicPrefix}/${facultyPrefix}/${facultyId}`;

    const breadcrumbs = [
        { label: currentLang === "az" ? "Ana səhifə" : "Home", href: "/", icon: <HomeIcon sx={{ fontSize: 16 }} /> },
        { label: currentLang === "az" ? "Fakültələr" : "Faculties", href: `/${currentLang}/${academicPrefix}/${facultyPrefix}` },
        { label: faculty?.title ?? facultyId, href: `${facultyBase}/${currentLang === "az" ? "haqqimizda" : "about"}` },
        { label: currentLang === "az" ? "Kafedralar" : "Departments", href: `${facultyBase}/${currentLang === "az" ? "kafedralar" : "departments"}` },
        { label: cafedra?.title ?? cafedraId, isCurrent: true },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
            {/* Stunning Banner */}
            <div className="relative overflow-hidden bg-[#1a2355] pt-32 pb-16 md:pt-40 md:pb-24">
                {/* Background Image of AzTU */}
                <div 
                    className="absolute inset-0 z-0 opacity-20 grayscale hover:grayscale-0 transition-all duration-1000"
                    style={{
                        backgroundImage: 'url("/aztu.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                
                {/* Abstract background elements */}
                <div className="absolute inset-0 overflow-hidden opacity-20 z-10">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-400/20 to-transparent skew-x-12 transform translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#ee7c7e]/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
                </div>
                
                <div className="relative px-4 md:px-10 lg:px-12 w-full z-20">
                    <motion.nav 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 text-white/50 text-sm mb-6 flex-wrap"
                    >
                        {breadcrumbs.map((bc, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                {bc.isCurrent ? (
                                    <span className="text-[#ee7c7e] font-medium truncate max-w-[200px]">{bc.label}</span>
                                ) : (
                                    <>
                                        <Link href={bc.href!} className="hover:text-white transition-colors flex items-center gap-1">
                                            {bc.icon}
                                            {bc.label}
                                        </Link>
                                        <ChevronRightIcon sx={{ fontSize: 14 }} />
                                    </>
                                )}
                            </div>
                        ))}
                    </motion.nav>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.15] max-w-4xl tracking-tight">
                            {cafedra?.title ?? cafedraId}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-3">
                            {cafedra?.cafedra_code && (
                                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm tracking-wider">
                                    {cafedra.cafedra_code}
                                </span>
                            )}
                            <div className="h-1 w-12 bg-[#ee7c7e] rounded-full" />
                            <span className="text-white/60 text-sm font-medium uppercase tracking-widest">
                                {currentLang === "az" ? "Kafedra Portalı" : "Department Portal"}
                            </span>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom wave decoration */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-50 dark:bg-slate-900 z-20" 
                     style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }} />
            </div>

            {/* Mobile sidebar toggle - Sticky */}
            <div className="lg:hidden sticky top-0 z-30 px-4 md:px-10 py-4 border-b border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md flex items-center justify-between shadow-sm">
                <span className="text-sm font-bold text-[#1a2355] dark:text-white uppercase tracking-wider">
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
                            className="absolute left-0 top-0 bottom-0 w-[280px] bg-white dark:bg-slate-800 overflow-y-auto shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="mb-8 flex items-center justify-between">
                                    <span className="text-xl font-bold text-[#1a2355] dark:text-white">Menyu</span>
                                    <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
                                        <CloseIcon />
                                    </button>
                                </div>
                                <CafedraSidebar facultyId={facultyId} cafedraId={cafedraId} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main layout */}
            <div className="flex flex-col lg:flex-row px-4 md:px-10 lg:px-12 py-12 gap-10 w-full">
                {/* Desktop Sidebar */}
                <aside className="hidden lg:block lg:w-72 flex-shrink-0">
                    <div className="sticky top-28 space-y-6">
                        <CafedraSidebar facultyId={facultyId} cafedraId={cafedraId} />
                        
                        {/* Sidebar decorative card */}
                        <div className="rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#2a3a8a] p-6 text-white overflow-hidden relative group">
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
                            <h3 className="text-lg font-bold mb-2 relative z-10">{currentLang === "az" ? "Yardım Lazımdır?" : "Need Help?"}</h3>
                            <p className="text-white/70 text-sm mb-4 relative z-10">
                                {currentLang === "az" ? "Kafedra ilə bağlı suallarınız üçün bizimlə əlaqə saxlayın." : "Contact us for your questions about the department."}
                            </p>
                            <Link 
                                href={`${facultyBase}/${currentLang === "az" ? "kafedralar" : "departments"}/${cafedraId}/${currentLang === "az" ? "haqqimizda/elaqe" : "about/contact"}`}
                                className="inline-flex items-center gap-2 text-xs font-bold bg-[#ee7c7e] hover:bg-[#ee7c7e]/90 px-4 py-2 rounded-lg transition-colors relative z-10 shadow-lg shadow-black/10"
                            >
                                {currentLang === "az" ? "Əlaqəyə keç" : "Contact Us"}
                                <ChevronRightIcon sx={{ fontSize: 14 }} />
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* Content */}
                <main className="flex-1 min-w-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
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
