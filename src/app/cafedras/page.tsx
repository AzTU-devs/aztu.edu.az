"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { getCafedras } from "@/services/cafedraService/cafedraService";
import type { CafedraSummary } from "@/types/cafedra";
import { useLanguage } from "@/context/LanguageContext";

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, delay: i * 0.05, ease: "easeOut" as const },
    }),
};

export default function CafedrasPage() {
    const { lang: currentLang } = useLanguage();
    const [cafedras, setCafedras] = useState<CafedraSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCafedras({ start: 0, end: 200, lang: currentLang })
            .then((res) => {
                if (Array.isArray(res)) {
                    setCafedras(res);
                } else {
                    setCafedras([]);
                    if (res === "ERROR") setError(true);
                }
            })
            .finally(() => setLoading(false));
    }, [currentLang]);

    const t = {
        home: currentLang === "az" ? "Ana səhifə" : "Home",
        cafedras: currentLang === "az" ? "Kafedralar" : "Departments",
        title: currentLang === "az" ? "Akademik Kafedralar" : "Academic Departments",
        description: currentLang === "az" 
            ? "Azərbaycan Texniki Universitetinin müxtəlif elm sahələri üzrə ixtisaslaşmış, yüksək ixtisaslı kadr hazırlığı həyata keçirən kafedraları."
            : "The departments of Azerbaijan Technical University specialized in various scientific fields, conducting high-qualified personnel training.",
        noContent: currentLang === "az" ? "Məlumat tapılmadı." : "No data found.",
        error: currentLang === "az" ? "Xəta baş verdi." : "Error occurred.",
        viewMore: currentLang === "az" ? "Ətraflı Bax" : "View More",
        faculty: currentLang === "az" ? "Fakültə" : "Faculty"
    };

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors pb-20">
            {/* Stunning Page Banner */}
            <div className="relative overflow-hidden bg-[#1a2355] pt-40 pb-20 px-4 md:px-10 lg:px-12 w-full">
                {/* Background Image of AzTU */}
                <div 
                    className="absolute inset-0 z-0 opacity-20 grayscale hover:grayscale-0 transition-all duration-1000"
                    style={{
                        backgroundImage: 'url("/aztu.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                
                {/* Background abstract elements */}
                <div className="absolute inset-0 z-10 overflow-hidden opacity-20">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-400/10 -skew-x-12 transform translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#ee7c7e]/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
                </div>
                
                <div className="relative z-20 w-full">
                    <motion.nav 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 text-white/40 text-xs mb-6 flex-wrap font-medium uppercase tracking-widest"
                    >
                        <Link href="/" className="hover:text-white transition-colors">{t.home}</Link>
                        <ChevronRightIcon sx={{ fontSize: 13 }} />
                        <span className="text-[#ee7c7e]">{t.cafedras}</span>
                    </motion.nav>
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
                    >
                        {t.title}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 text-lg max-w-2xl font-medium leading-relaxed"
                    >
                        {t.description}
                    </motion.p>
                </div>
            </div>

            {/* Grid Content */}
            <section className="px-4 md:px-10 lg:px-12 py-16 -mt-10 relative z-30 w-full">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="animate-pulse bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-700 p-10 h-64" />
                        ))}
                    </div>
                ) : error ? (
                    <div className="text-center py-32 bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-red-100 dark:border-red-900/20 shadow-sm">
                        <p className="text-red-400 font-black uppercase tracking-widest text-sm">
                            {t.error}
                        </p>
                    </div>
                ) : cafedras.length === 0 ? (
                    <div className="text-center py-32 bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-slate-700 shadow-sm">
                        <MenuBookIcon sx={{ fontSize: 64, color: "#1a2355", opacity: 0.1 }} />
                        <p className="text-gray-400 font-black uppercase tracking-widest text-sm mt-4">
                            {t.noContent}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {cafedras.map((cafedra, i) => {
                            const academicPrefix = currentLang === "az" ? "akademik" : "academic";
                            const facultyPrefix = currentLang === "az" ? "fakulteler" : "faculties";
                            const baseLink = `/${currentLang}/${academicPrefix}/${facultyPrefix}/${cafedra.faculty_code}/kafedralar/${cafedra.cafedra_code}/giris`;

                            return (
                                <motion.div
                                    key={cafedra.id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="h-full"
                                >
                                    <Link
                                        href={baseLink}
                                        className="group block relative h-full bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-[0_20px_50px_rgba(26,35,85,0.1)] border-2 border-transparent hover:border-[#ee7c7e]/20 p-8 transition-all duration-500 overflow-hidden"
                                    >
                                        {/* Decorative Background */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-slate-700/30 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                        
                                        <div className="relative z-10 flex flex-col h-full">
                                            {/* Card Header */}
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#2a3a8a] group-hover:from-[#ee7c7e] group-hover:to-[#f09395] flex items-center justify-center text-white shadow-lg shadow-blue-900/10 transition-all duration-500">
                                                    <MenuBookIcon sx={{ fontSize: 28 }} />
                                                </div>
                                                <span className="text-[10px] font-black text-[#1a2355] dark:text-blue-300 bg-[#1a2355]/5 dark:bg-[#1a2355]/20 px-4 py-1.5 rounded-full uppercase tracking-widest">
                                                    {cafedra.cafedra_code}
                                                </span>
                                            </div>

                                            {/* Cafedra Title */}
                                            <h2 className="text-[#1a2355] dark:text-white font-black text-xl leading-tight group-hover:text-[#ee7c7e] transition-colors duration-300 mb-6">
                                                {cafedra.cafedra_name || (cafedra as any).title || cafedra.cafedra_code}
                                            </h2>

                                            {/* Info */}
                                            <div className="mt-auto pt-6 border-t border-gray-50 dark:border-slate-700">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.faculty}</span>
                                                    <span className="text-sm font-black text-[#1a2355] dark:text-white truncate mt-1">{cafedra.faculty_code}</span>
                                                </div>
                                            </div>

                                            {/* Read More Link */}
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1a2355] dark:text-blue-400 mt-8 group-hover:text-[#ee7c7e] transition-colors">
                                                {t.viewMore}
                                                <ChevronRightIcon
                                                    sx={{ fontSize: 16 }}
                                                    className="transition-transform duration-300 group-hover:translate-x-2"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}
