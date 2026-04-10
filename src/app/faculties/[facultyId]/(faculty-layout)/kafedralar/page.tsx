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

export default function FacultyKafedralarPage({ params }: Props) {
    const { facultyId: facultySlug } = use(params);
    const { lang } = useLanguage();
    const [cafedras, setCafedras] = useState<CafedraSummary[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getFacultyBySlug(facultySlug, lang).then(faculty => {
            if (faculty) {
                getCafedras({ facultyCode: faculty.faculty_code, start: 0, end: 50, lang }).then((res) => {
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
    }, [facultySlug, lang]);

    return (
        <div className="space-y-6">
            <SectionBlock title={lang === "az" ? "Kafedralar" : "Departments"} accent>
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         {[1,2,3,4].map(i => <div key={i} className="h-32 rounded-[2.5rem] bg-gray-100 dark:bg-slate-800 animate-pulse" />)}
                    </div>
                )}

                {!loading && cafedras.length === 0 && (
                    <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-slate-700">
                        <MenuBookIcon sx={{ fontSize: 48, color: "#1a2355" }} className="opacity-10 mb-4" />
                        <p className="text-gray-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest">
                            {lang === "az" ? "Kafedra tapılmadı" : "No departments found"}
                        </p>
                    </div>
                )}

                {!loading && cafedras.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {cafedras.map((c, idx) => (
                            <motion.div
                                key={c.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link
                                    href={`/faculties/${facultySlug}/kafedralar/${c.cafedra_code}/giris`}
                                    className="group block relative h-full bg-white dark:bg-slate-800 border-2 border-gray-50 dark:border-slate-700 rounded-[2.5rem] p-8 hover:border-[#ee7c7e] hover:shadow-2xl hover:shadow-[#1a2355]/5 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-slate-700/30 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                                    
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#2a3a8a] flex items-center justify-center text-white shadow-lg shadow-blue-900/20 group-hover:bg-gradient-to-br group-hover:from-[#ee7c7e] group-hover:to-[#f09395] transition-all duration-500">
                                                <MenuBookIcon sx={{ fontSize: 24 }} />
                                            </div>
                                            <span className="text-[10px] font-black text-[#1a2355] dark:text-blue-300 bg-[#1a2355]/5 dark:bg-[#1a2355]/20 px-4 py-1.5 rounded-full uppercase tracking-widest group-hover:bg-[#ee7c7e]/10 group-hover:text-[#ee7c7e] transition-colors">
                                                {c.cafedra_code}
                                            </span>
                                        </div>

                                        <h3 className="font-black text-[#1a2355] dark:text-white text-lg leading-tight group-hover:text-[#ee7c7e] transition-colors duration-300 mb-6">
                                            {c.cafedra_name}
                                        </h3>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-[#1a2355] dark:group-hover:text-white transition-colors">
                                                {lang === "az" ? "Ətraflı məlumat" : "View details"}
                                                <ChevronRightIcon sx={{ fontSize: 16 }} className="transition-transform group-hover:translate-x-2" />
                                            </div>
                                            {c.deputy_director_count > 0 && (
                                                <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500">
                                                    {c.deputy_director_count} {lang === "az" ? "müavin" : "deputies"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </SectionBlock>
        </div>
    );
}
