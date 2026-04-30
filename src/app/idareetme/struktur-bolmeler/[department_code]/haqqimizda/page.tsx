"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";

import SanitizedHtml from "@/components/shared/SanitizedHtml";
import Loading from "@/components/loading/Loading";
import { getDepartmentBySlug } from "@/services/departmentService/departmentService";
import type { SectionItem, DepartmentDetail } from "@/types/department";
import { useLanguage } from "@/context/LanguageContext";

import InfoIcon from "@mui/icons-material/Info";
import FlagIcon from "@mui/icons-material/Flag";
import SettingsIcon from "@mui/icons-material/Settings";

interface Props {
    params: Promise<{ department_code: string }>;
}

const PALETTES = [
    "from-blue-600 to-indigo-700",
    "from-emerald-500 to-teal-600",
    "from-[#ee7c7e] to-[#f97316]",
    "from-purple-500 to-violet-700",
    "from-amber-500 to-orange-600",
    "from-cyan-500 to-sky-600",
];

function renderItem(item: SectionItem | string): React.ReactNode {
    if (typeof item === "string") return item;
    if (item.html_content) return <SanitizedHtml html={item.html_content} className="prose-sm" />;
    return item.title || item.description;
}

export default function DepartmentAboutPage({ params }: Props) {
    const { department_code: departmentSlug } = use(params);
    const { lang: currentLang } = useLanguage();
    const [department, setDepartment] = useState<DepartmentDetail | null | undefined>(undefined);

    useEffect(() => {
        getDepartmentBySlug(departmentSlug, currentLang).then(setDepartment);
    }, [departmentSlug, currentLang]);

    if (department === undefined) return <Loading />;
    if (department === null) return null;

    const t = {
        about: currentLang === "az" ? "Şöbə haqqında" : "About department",
        objectives: currentLang === "az" ? "Məqsədlər" : "Objectives",
        functions: currentLang === "az" ? "Əsas funksiyalar" : "Core functions",
    };

    const objectives = department.objectives || [];
    const functions = department.core_functions || [];

    return (
        <div className="space-y-8">
            {/* About */}
            {department.about_html && (
                <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-white dark:bg-slate-900/60 backdrop-blur-xl border-2 border-[#1a2355]/15 dark:border-white/10 rounded-2xl p-5 md:p-7 shadow-md overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#1a2355] via-[#ee7c7e] to-[#1a2355]" />
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#3b82f6] text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                            <InfoIcon sx={{ fontSize: 20 }} />
                        </div>
                        <h2 className="text-lg md:text-xl font-black text-[#1a2355] dark:text-white tracking-tight">
                            {t.about}
                        </h2>
                    </div>
                    <SanitizedHtml
                        html={department.about_html}
                        className="prose prose-sm md:prose-base max-w-none text-gray-600 dark:text-slate-300 leading-relaxed text-justify"
                    />
                </motion.section>
            )}

            {/* Objectives + Functions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {objectives.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative bg-white dark:bg-slate-900/60 backdrop-blur-xl border-2 border-[#1a2355]/15 dark:border-white/10 rounded-2xl p-5 md:p-7 shadow-md overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ee7c7e] to-[#f97316]" />
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ee7c7e] to-[#f97316] text-white flex items-center justify-center shadow-md shadow-[#ee7c7e]/30">
                                <FlagIcon sx={{ fontSize: 20 }} />
                            </div>
                            <h2 className="text-lg md:text-xl font-black text-[#1a2355] dark:text-white tracking-tight">
                                {t.objectives}
                            </h2>
                        </div>
                        <ul className="space-y-3">
                            {objectives.map((obj: SectionItem, idx: number) => {
                                const palette = PALETTES[idx % PALETTES.length];
                                return (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.04, duration: 0.35 }}
                                        className="group flex gap-3 items-start"
                                    >
                                        <span className={`mt-1.5 shrink-0 w-2.5 h-2.5 rounded-full bg-gradient-to-br ${palette} ring-4 ring-[#ee7c7e]/0 group-hover:ring-[#ee7c7e]/15 transition-all`} />
                                        <div className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed font-medium flex-1 min-w-0">
                                            {renderItem(obj)}
                                        </div>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </motion.section>
                )}

                {functions.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="relative bg-white dark:bg-slate-900/60 backdrop-blur-xl border-2 border-[#1a2355]/15 dark:border-white/10 rounded-2xl p-5 md:p-7 shadow-md overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1a2355] to-[#3b82f6]" />
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#3b82f6] text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                                <SettingsIcon sx={{ fontSize: 20 }} />
                            </div>
                            <h2 className="text-lg md:text-xl font-black text-[#1a2355] dark:text-white tracking-tight">
                                {t.functions}
                            </h2>
                        </div>
                        <ul className="space-y-3">
                            {functions.map((func: SectionItem, idx: number) => {
                                const palette = PALETTES[(idx + 1) % PALETTES.length];
                                return (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.04, duration: 0.35 }}
                                        className="group flex gap-3 items-start"
                                    >
                                        <span className={`mt-1.5 shrink-0 w-2.5 h-2.5 rounded-full bg-gradient-to-br ${palette} ring-4 ring-[#1a2355]/0 group-hover:ring-[#1a2355]/15 transition-all`} />
                                        <div className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed font-medium flex-1 min-w-0">
                                            {renderItem(func)}
                                        </div>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </motion.section>
                )}
            </div>
        </div>
    );
}
