"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import SchoolIcon from "@mui/icons-material/School";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { motion } from "framer-motion";
import { getFaculties, type FacultySummary } from "@/services/facultyService/facultyService";

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
            <main className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
                {/* Page Banner */}
                <div className="bg-[#1a2355] px-4 md:px-10 lg:px-20 pt-40 pb-16">
                    <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-6 flex-wrap">
                        <Link href="/" className="hover:text-white/70 transition-colors">Ana səhifə</Link>
                        <ChevronRightIcon sx={{ fontSize: 13 }} />
                        <span className="text-white/60">Fakültələr</span>
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Fakültələr</h1>
                    <p className="text-white/70 text-base max-w-xl">
                        Azərbaycan Texniki Universitetinin akademik fakültələri ilə tanış olun.
                    </p>
                </div>

                {/* Content */}
                <section className="px-4 md:px-10 lg:px-20 py-12">
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="animate-pulse bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 h-44" />
                            ))}
                        </div>
                    ) : faculties.length === 0 ? (
                        <div className="text-center py-24 text-gray-400 font-semibold text-lg">
                            Fakültə tapılmadı.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {faculties.map((faculty, i) => (
                                <motion.div
                                    key={faculty.id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                >
                                    <Link
                                        href={`/faculties/${faculty.faculty_code}/haqqimizda`}
                                        className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 flex flex-col gap-4 hover:shadow-xl transition-all duration-300 block"
                                    >
                                        {/* Header */}
                                        <div className="flex items-center justify-between">
                                            <div className="w-12 h-12 rounded-xl bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center">
                                                <SchoolIcon sx={{ color: "#1a2355" }} />
                                            </div>
                                            <span className="text-xs font-bold text-[#1a2355] dark:text-blue-300 bg-[#1a2355]/10 dark:bg-[#1a2355]/20 px-3 py-1 rounded-full">
                                                {faculty.faculty_code}
                                            </span>
                                        </div>

                                        {/* Name */}
                                        <h2 className="text-[#1a2355] dark:text-white font-bold text-base leading-snug group-hover:text-[#ee7c7e] transition-colors duration-300">
                                            {faculty.title}
                                        </h2>

                                        {(faculty.cafedra_count !== undefined || faculty.deputy_dean_count !== undefined) && (
                                            <div className="text-sm text-gray-600 dark:text-gray-300">
                                                {faculty.cafedra_count !== undefined && <span>{faculty.cafedra_count} kafedra</span>}
                                                {faculty.cafedra_count !== undefined && faculty.deputy_dean_count !== undefined && <span> · </span>}
                                                {faculty.deputy_dean_count !== undefined && <span>{faculty.deputy_dean_count} dekan müavini</span>}
                                            </div>
                                        )}

                                        {/* CTA */}
                                        <div className="flex items-center gap-1 text-[#1a2355] dark:text-blue-400 font-semibold text-sm mt-auto w-fit">
                                            Ətraflı bax
                                            <ChevronRightIcon
                                                sx={{ fontSize: 18 }}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}
