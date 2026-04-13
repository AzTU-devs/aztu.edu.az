"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ResearchInstituteSidebar from "@/components/researchInstitute/ResearchInstituteSidebar";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { getResearchInstituteBySlug, getImageUrl } from "@/services/researchInstituteService/researchInstituteService";
import type { ResearchInstituteDetail } from "@/types/researchInstitute";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export default function ResearchInstituteDetailLayout({ children, params }: Props) {
    const { slug: instituteSlug } = use(params);
    const { lang: currentLang } = useLanguage();
    const [institute, setInstitute] = useState<ResearchInstituteDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        // Reset state to clear stale data
        setInstitute(null);
        setLoading(true);

        getResearchInstituteBySlug(instituteSlug, currentLang)
            .then((result) => {
                if (result) {
                    setInstitute(result);
                }
            })
            .finally(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [instituteSlug, currentLang]);

    const t = {
        home: currentLang === "az" ? "Ana səhifə" : "Home",
        research: currentLang === "az" ? "Tədqiqat" : "Research",
        institutes: currentLang === "az" ? "Tədqiqat İnstitutları" : "Research Institutes",
        portal: currentLang === "az" ? "İnstitut Portalı" : "Institute Portal",
        navigation: currentLang === "az" ? "Naviqasiya" : "Navigation",
        menu: currentLang === "az" ? "Menyu" : "Menu",
        needHelp: currentLang === "az" ? "Yardım Lazımdır?" : "Need Help?",
        contactText: currentLang === "az" ? "İnstitutla bağlı suallarınız üçün bizimlə əlaqə saxlayın." : "Contact us for your questions about the institute.",
        contactBtn: currentLang === "az" ? "Əlaqəyə keç" : "Contact Us"
    };

    const institutesListPath = currentLang === "az"
        ? "/az/tedqiqat/tedqiqat-fealiyyeti/tedqiqat-institutlari"
        : "/en/research/research-activity/research-institutes";

    const logoUrl = getImageUrl(institute?.image_url);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
            {/* Stunning Banner */}
            <div className="relative overflow-hidden bg-[#1a2355] pt-32 pb-16 md:pt-40 md:pb-24">
                <div 
                    className="absolute inset-0 z-0 opacity-20 grayscale hover:grayscale-0 transition-all duration-1000"
                    style={{
                        backgroundImage: 'url("/aztu.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                
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
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 16 }} />
                            {t.home}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 14 }} />
                        <Link href={institutesListPath} className="hover:text-white transition-colors">
                            {t.institutes}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 14 }} />
                        <span className="text-[#ee7c7e] font-medium truncate max-w-[200px]">
                            {loading ? "..." : (institute?.name ?? "")}
                        </span>
                    </motion.nav>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                    >
                        <div className="flex flex-col md:flex-row md:items-center gap-8 mb-8">
                            {logoUrl ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-[2.5rem] bg-white p-6 flex items-center justify-center flex-shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-white/10 z-30"
                                >
                                    <img 
                                        src={logoUrl} 
                                        alt={institute?.name} 
                                        className="w-full h-full object-contain" 
                                    />
                                </motion.div>
                            ) : loading ? (
                                <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-[2.5rem] bg-white/10 animate-pulse border-4 border-white/5 z-30" />
                            ) : null}
                            <div className="flex-1">
                                {loading ? (
                                    <div className="h-12 w-3/4 bg-white/10 animate-pulse rounded-xl mb-4" />
                                ) : (
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] max-w-4xl tracking-tight mb-4">
                                        {institute?.name}
                                    </h1>
                                )}
                                <div className="flex flex-wrap items-center gap-3">
                                    {!loading && institute?.institute_code && (
                                        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm tracking-wider">
                                            {institute.institute_code}
                                        </span>
                                    )}
                                    <div className="h-1 w-12 bg-[#ee7c7e] rounded-full" />
                                    <span className="text-white/60 text-sm font-medium uppercase tracking-widest">
                                        {t.portal}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-50 dark:bg-slate-900 z-20" 
                     style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)" }} />
            </div>

            <div className="lg:hidden sticky top-0 z-30 px-4 md:px-10 py-4 border-b border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md flex items-center justify-between shadow-sm">
                <span className="text-sm font-bold text-[#1a2355] dark:text-white uppercase tracking-wider">
                    {t.navigation}
                </span>
                <button
                    onClick={() => setSidebarOpen((o) => !o)}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-slate-700 text-[#1a2355] dark:text-white transition-all active:scale-95"
                >
                    {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
            </div>

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
                                    <span className="text-xl font-bold text-[#1a2355] dark:text-white">{t.menu}</span>
                                    <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
                                        <CloseIcon />
                                    </button>
                                </div>
                                <ResearchInstituteSidebar instituteSlug={instituteSlug} />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col lg:flex-row px-4 md:px-10 lg:px-12 py-12 gap-10 w-full">
                <aside className="hidden lg:block lg:w-72 flex-shrink-0">
                    <div className="sticky top-28 space-y-6">
                        <ResearchInstituteSidebar instituteSlug={instituteSlug} />
                        <div className="rounded-[2rem] bg-gradient-to-br from-[#1a2355] to-[#2a3a8a] p-8 text-white overflow-hidden relative group">
                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
                            <h3 className="text-lg font-bold mb-2 relative z-10">{t.needHelp}</h3>
                            <p className="text-white/70 text-sm mb-6 relative z-10 leading-relaxed">
                                {t.contactText}
                            </p>
                            <Link 
                                href={`mailto:info@aztu.edu.az`}
                                className="inline-flex items-center gap-2 text-xs font-black bg-[#ee7c7e] hover:bg-[#ee7c7e]/90 px-6 py-3 rounded-xl transition-all relative z-10 shadow-lg shadow-black/10 active:scale-95"
                            >
                                {t.contactBtn}
                                <ChevronRightIcon sx={{ fontSize: 14 }} />
                            </Link>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 min-w-0">
                    <motion.div
                        key={currentLang + instituteSlug} // Forces re-render on language change
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
