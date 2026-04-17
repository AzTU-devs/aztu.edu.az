"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getCafedras } from "@/services/cafedraService/cafedraService";
import { getFacultyBySlug } from "@/services/facultyService/facultyService";
import type { CafedraSummary } from "@/types/cafedra";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
    params: Promise<{ facultyId: string }>;
}

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, delay: i * 0.05, ease: "easeOut" as const },
    }),
};

export default function FacultyKafedralarPage({ params }: Props) {
    const { facultyId: facultySlug } = use(params);
    const { lang: currentLang } = useLanguage();
    const [cafedras, setCafedras] = useState<CafedraSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getFacultyBySlug(facultySlug, currentLang).then(faculty => {
            if (faculty) {
                getCafedras({ facultyCode: faculty.faculty_code, start: 0, end: 100, lang: currentLang }).then((res) => {
                    if (Array.isArray(res)) {
                        setCafedras(res);
                    } else {
                        setCafedras([]);
                    }
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        });
    }, [facultySlug, currentLang]);

    const t = {
        title: currentLang === "az" ? "Fakültə Kafedraları" : "Faculty Departments",
        description: currentLang === "az" 
            ? "Fakültə tərkibində fəaliyyət göstərən, müvafiq ixtisaslar üzrə kadr hazırlığı və elmi tədqiqatlar aparan kafedralar."
            : "Departments operating within the faculty, conducting personnel training and scientific research in relevant specializations.",
        noContent: currentLang === "az" ? "Kafedra tapılmadı." : "No departments found.",
        viewMore: currentLang === "az" ? "Ətraflı Bax" : "View More",
        deputy: currentLang === "az" ? "müavin" : "deputies"
    };

    return (
        <div className="space-y-10">
            <SectionBlock title={t.title} accent>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
                    {t.description}
                </p>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="animate-pulse bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-700 p-10 h-64" />
                        ))}
                    </div>
                ) : cafedras.length === 0 ? (
                    <div className="text-center py-32 bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-slate-700">
                        <MenuBookIcon sx={{ fontSize: 64, color: "#1a2355", opacity: 0.1 }} />
                        <p className="text-gray-400 font-black uppercase tracking-widest text-sm mt-4">
                            {t.noContent}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {cafedras.map((c, i) => {
                            const academicPrefix = currentLang === "az" ? "akademik" : "academic";
                            const facultyPrefix = currentLang === "az" ? "fakulteler" : "faculties";
                            const baseLink = `/${currentLang}/${academicPrefix}/${facultyPrefix}/${facultySlug}/kafedralar/${c.cafedra_code}/giris`;
                            
                            // Support both cafedra_name and title from API
                            const name = c.cafedra_name || (c as any).title || c.cafedra_code;

                            return (
                                <motion.div
                                    key={c.id}
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
                                                    {c.cafedra_code}
                                                </span>
                                            </div>

                                            {/* Cafedra Title */}
                                            <h2 className="text-[#1a2355] dark:text-white font-black text-xl leading-tight group-hover:text-[#ee7c7e] transition-colors duration-300 mb-6">
                                                {name}
                                            </h2>

                                            {/* Info */}
                                            {c.deputy_director_count > 0 && (
                                                <div className="mt-auto pt-6 border-t border-gray-50 dark:border-slate-700">
                                                    <div className="flex flex-col">
                                                        <span className="text-xl font-black text-[#1a2355] dark:text-white">{c.deputy_director_count}</span>
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{t.deputy}</span>
                                                    </div>
                                                </div>
                                            )}

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
            </SectionBlock>
        </div>
    );
}
