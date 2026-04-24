"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import ScienceIcon from "@mui/icons-material/Science";
import BusinessIcon from "@mui/icons-material/Business";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { laboratoriesData } from "@/data/laboratories";
import { useLanguage } from "@/context/LanguageContext";
import { notFound } from "next/navigation";

export default function LaboratoryDetailPage() {
    const { id } = useParams();
    const { lang: currentLang } = useLanguage();

    // Find the lab by id
    const lab = laboratoriesData
        .flatMap(dept => dept.labs)
        .find(l => l.id === id);

    if (!lab) {
        notFound();
    }

    const t = {
        home: currentLang === "az" ? "Ana səhifə" : "Home",
        research: currentLang === "az" ? "Tədqiqat" : "Research",
        activity: currentLang === "az" ? "Tədqiqat fəaliyyəti" : "Research activity",
        labs: currentLang === "az" ? "Tədqiqat laboratoriyaları" : "Research laboratories",
        department: currentLang === "az" ? "Kafedra" : "Department",
        description: currentLang === "az" ? "Təsvir" : "Description",
        objectives: currentLang === "az" ? "Tədris Məqsədləri" : "Educational Objectives",
        contact: currentLang === "az" ? "Əlaqə" : "Contact",
    };

    const breadcrumbs = [
        { label: t.home, href: "/" },
        { label: t.research, href: currentLang === "az" ? "/tedqiqat" : "/research" },
        { label: t.activity, href: currentLang === "az" ? "/tedqiqat/tedqiqat-fealiyyeti" : "/research/research-activity" },
        { label: t.labs, href: currentLang === "az" ? "/tedqiqat/tedqiqat-fealiyyeti/tedqiqat-laboratoriyalari" : "/research/research-activity/research-laboratories" },
        { label: lab.name[currentLang as "az" | "en"] }
    ];

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors pb-20">
            {/* Header Banner */}
            <div className="relative overflow-hidden bg-[#0b1330] pt-40 pb-20 px-4 md:px-10 lg:px-12 w-full min-h-[400px] flex flex-col justify-end">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-30"
                    >
                        <source src="/heroBgVideos/research.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1330] via-[#0b1330]/80 to-transparent" />
                </div>

                <div className="relative z-20 w-full">
                    <motion.nav 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 text-white/50 text-sm mb-6 flex-wrap font-black uppercase tracking-[0.3em]"
                    >
                        {breadcrumbs.map((crumb, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                {crumb.href ? (
                                    <Link href={crumb.href} className="hover:text-white transition-colors flex items-center gap-1">
                                        {i === 0 && <HomeIcon sx={{ fontSize: 16 }} />}
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="text-[#ee7c7e]">{crumb.label}</span>
                                )}
                                {i < breadcrumbs.length - 1 && <ChevronRightIcon sx={{ fontSize: 13 }} />}
                            </div>
                        ))}
                    </motion.nav>
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl md:text-4xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tighter max-w-4xl"
                    >
                        {lab.name[currentLang as "az" | "en"]}
                    </motion.h1>
                </div>
            </div>

            {/* Content Section */}
            <section className="px-4 md:px-10 lg:px-12 py-12 -mt-10 relative z-30 w-full">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 dark:border-slate-700"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <InfoIcon />
                                </div>
                                <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight">
                                    {t.description}
                                </h2>
                            </div>
                            <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
                                {lab.description[currentLang as "az" | "en"]}
                            </p>
                        </motion.div>

                        {/* Objectives Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 dark:border-slate-700"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                    <SchoolIcon />
                                </div>
                                <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight">
                                    {t.objectives}
                                </h2>
                            </div>
                            <p className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
                                {lab.educationalObjectives[currentLang as "az" | "en"]}
                            </p>
                        </motion.div>

                        {/* Image Placeholder Container */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="aspect-video bg-gray-200 dark:bg-slate-700 rounded-[2.5rem] flex items-center justify-center border-4 border-dashed border-gray-300 dark:border-slate-600 overflow-hidden relative"
                        >
                            <ScienceIcon sx={{ fontSize: 80, opacity: 0.1 }} />
                            <span className="absolute bottom-4 right-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                Photo Gallery Space
                            </span>
                        </motion.div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">
                        {/* Department Info */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-[#1a2355] rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-900/20"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    <BusinessIcon />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-white/60">
                                    {t.department}
                                </h3>
                            </div>
                            <p className="text-xl font-black leading-tight">
                                {lab.department[currentLang as "az" | "en"]}
                            </p>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-slate-700"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                                    <ContactSupportIcon />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">
                                    {t.contact}
                                </h3>
                            </div>
                            <p className="text-[#1a2355] dark:text-white font-bold">
                                {lab.contact || (currentLang === "az" ? "Məlumat yoxdur" : "No information available")}
                            </p>
                        </motion.div>

                        {/* Quick Action */}
                        <Link 
                            href={currentLang === "az" ? "/tedqiqat/tedqiqat-fealiyyeti/tedqiqat-laboratoriyalari" : "/research/research-activity/research-laboratories"}
                            className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 group hover:bg-gray-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                        >
                            <span className="font-black uppercase tracking-widest text-xs text-[#1a2355] dark:text-blue-400">
                                {currentLang === "az" ? "Bütün laboratoriyalar" : "All laboratories"}
                            </span>
                            <ChevronRightIcon className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
