"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import SchoolIcon from "@mui/icons-material/School";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { motion } from "framer-motion";
import { getFaculties, type FacultySummary } from "@/services/facultyService/facultyService";
import { slugify } from "@/util/slugify";

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" as const },
    }),
};

export default function FacultiesPage() {
    const [faculties, setFaculties] = useState<FacultySummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFaculties({ lang: "az" })
            .then((result) => {
                if (Array.isArray(result)) {
                    setFaculties(result);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <HeaderChanger />
            <main className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors pb-20">
                {/* Stunning Page Banner */}
                <div className="relative overflow-hidden bg-[#1a2355] pt-40 pb-20 px-4 md:px-10 lg:px-20">
                    {/* Background abstract elements */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-400/5 -skew-x-12 transform translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-[#ee7c7e]/5 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
                    
                    <div className="relative max-w-screen-2xl mx-auto">
                        <motion.nav 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-1.5 text-white/40 text-xs mb-6 flex-wrap font-medium uppercase tracking-widest"
                        >
                            <Link href="/" className="hover:text-white transition-colors">Ana səhifə</Link>
                            <ChevronRightIcon sx={{ fontSize: 13 }} />
                            <span className="text-[#ee7c7e]">Fakültələr</span>
                        </motion.nav>
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
                        >
                            Akademik Fakültələr
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/60 text-lg max-w-2xl font-medium leading-relaxed"
                        >
                            Azərbaycan Texniki Universitetinin zəngin təhsil ənənələrinə malik, 
                            müasir texnologiyalar və innovativ yanaşmalarla tədris aparan fakültələri.
                        </motion.p>
                    </div>
                </div>

                {/* Grid Content */}
                <section className="px-4 md:px-10 lg:px-20 py-16 -mt-10 relative z-10 max-w-screen-2xl mx-auto">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="animate-pulse bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-700 p-10 h-64" />
                            ))}
                        </div>
                    ) : faculties.length === 0 ? (
                        <div className="text-center py-32 bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-slate-700 shadow-sm">
                            <SchoolIcon sx={{ fontSize: 64, color: "#1a2355", opacity: 0.1 }} />
                            <p className="text-gray-400 font-black uppercase tracking-widest text-sm mt-4">
                                Məlumat tapılmadı.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {faculties.map((faculty, i) => {
                                const slug = slugify(faculty.title);
                                return (
                                    <motion.div
                                        key={faculty.id}
                                        custom={i}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="h-full"
                                    >
                                        <Link
                                            href={`/faculties/${slug}/haqqimizda`}
                                            className="group block relative h-full bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm hover:shadow-[0_20px_50px_rgba(26,35,85,0.1)] border-2 border-transparent hover:border-[#ee7c7e]/20 p-8 transition-all duration-500 overflow-hidden"
                                        >
                                            {/* Decorative Background */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-slate-700/30 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                            
                                            <div className="relative z-10 flex flex-col h-full">
                                                {/* Card Header */}
                                                <div className="flex items-center justify-between mb-8">
                                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#2a3a8a] group-hover:from-[#ee7c7e] group-hover:to-[#f09395] flex items-center justify-center text-white shadow-lg shadow-blue-900/10 transition-all duration-500">
                                                        <SchoolIcon sx={{ fontSize: 28 }} />
                                                    </div>
                                                    <span className="text-[10px] font-black text-[#1a2355] dark:text-blue-300 bg-[#1a2355]/5 dark:bg-[#1a2355]/20 px-4 py-1.5 rounded-full uppercase tracking-widest">
                                                        {faculty.faculty_code}
                                                    </span>
                                                </div>

                                                {/* Faculty Title */}
                                                <h2 className="text-[#1a2355] dark:text-white font-black text-xl leading-tight group-hover:text-[#ee7c7e] transition-colors duration-300 mb-6">
                                                    {faculty.title}
                                                </h2>

                                                {/* Stats or Info */}
                                                {(faculty.cafedra_count !== undefined || faculty.deputy_dean_count !== undefined) && (
                                                    <div className="flex flex-wrap gap-4 mt-auto pt-6 border-t border-gray-50 dark:border-slate-700">
                                                        {faculty.cafedra_count !== undefined && (
                                                            <div className="flex flex-col">
                                                                <span className="text-xl font-black text-[#1a2355] dark:text-white leading-none">{faculty.cafedra_count}</span>
                                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Kafedra</span>
                                                            </div>
                                                        )}
                                                        {faculty.deputy_dean_count !== undefined && (
                                                            <div className="flex flex-col ml-auto text-right">
                                                                <span className="text-xl font-black text-[#1a2355] dark:text-white leading-none">{faculty.deputy_dean_count}</span>
                                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Müavin</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Read More Link */}
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#1a2355] dark:text-blue-400 mt-8 group-hover:text-[#ee7c7e] transition-colors">
                                                    Ətraflı Bax
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
            <Footer />
        </>
    );
}
