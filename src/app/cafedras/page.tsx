"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCafedras, CafedraInterface } from "@/services/cafedraService/cafedraService";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { motion } from "framer-motion";

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, delay: i * 0.06, ease: "easeOut" as const },
    }),
};

export default function CafedrasPage() {
    const [cafedras, setCafedras] = useState<CafedraInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCafedras({ start: 0, end: 100, lang: "az" })
            .then((res) => {
                if (Array.isArray(res)) {
                    setCafedras(res);
                } else {
                    setCafedras([]);
                    if (res === "ERROR") setError(true);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
                {/* Page Banner */}
                <div className="bg-[#1a2355] px-4 md:px-10 lg:px-20 pt-40 pb-16">
                    <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-6 flex-wrap">
                        <Link href="/" className="hover:text-white/70 transition-colors">Ana səhifə</Link>
                        <ChevronRightIcon sx={{ fontSize: 13 }} />
                        <span className="text-white/60">Kafedralar</span>
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Kafedralar</h1>
                    <p className="text-white/70 text-base">
                        Azərbaycan Texniki Universitetinin bütün kafedraları.
                    </p>
                </div>

                {/* Content */}
                <section className="px-4 md:px-10 lg:px-20 py-12">
                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-10 h-10 border-4 border-[#1a2355] border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    {error && !loading && (
                        <div className="text-center py-20 text-red-500 font-semibold">
                            Kafedralar yüklənərkən xəta baş verdi.
                        </div>
                    )}

                    {!loading && !error && cafedras.length === 0 && (
                        <div className="text-center py-20 text-gray-400 font-semibold">
                            Kafedra tapılmadı.
                        </div>
                    )}

                    {!loading && cafedras.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cafedras.map((cafedra, i) => (
                                <motion.div
                                    key={cafedra.id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                >
                                    <Link
                                        href={`/faculties/${cafedra.faculty_code}/kafedralar/${cafedra.cafedra_code}/giris`}
                                        className="group bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-gray-100 dark:border-slate-700 p-6 flex flex-col gap-4 hover:shadow-xl transition-all duration-300 block"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="w-12 h-12 rounded-xl bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center">
                                                <MenuBookIcon sx={{ color: '#1a2355' }} />
                                            </div>
                                            <span className="text-xs font-bold text-[#1a2355] dark:text-blue-300 bg-[#1a2355]/10 dark:bg-[#1a2355]/20 px-3 py-1 rounded-full">
                                                {cafedra.cafedra_code}
                                            </span>
                                        </div>

                                        <h2 className="text-[#1a2355] dark:text-white font-bold text-base leading-snug group-hover:text-[#ee7c7e] transition-colors duration-300">
                                            {cafedra.cafedra_name}
                                        </h2>

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
        </>
    );
}
