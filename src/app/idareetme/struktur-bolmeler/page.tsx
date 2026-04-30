"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import BusinessIcon from "@mui/icons-material/Business";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LayersIcon from "@mui/icons-material/Layers";

import { getDepartments } from "@/services/departmentService/departmentService";
import type { DepartmentSummary } from "@/types/department";
import { useLanguage } from "@/context/LanguageContext";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import { slugify } from "@/util/slugify";

const PALETTES = [
    { gradient: "from-blue-600 to-indigo-700", soft: "from-blue-500/10 to-indigo-500/5", text: "text-blue-700", glow: "shadow-blue-500/30", accent: "bg-blue-500" },
    { gradient: "from-emerald-500 to-teal-600", soft: "from-emerald-500/10 to-teal-500/5", text: "text-emerald-700", glow: "shadow-emerald-500/30", accent: "bg-emerald-500" },
    { gradient: "from-[#ee7c7e] to-[#f97316]", soft: "from-[#ee7c7e]/10 to-orange-500/5", text: "text-[#ee7c7e]", glow: "shadow-[#ee7c7e]/30", accent: "bg-[#ee7c7e]" },
    { gradient: "from-purple-500 to-violet-700", soft: "from-purple-500/10 to-violet-500/5", text: "text-purple-700", glow: "shadow-purple-500/30", accent: "bg-purple-500" },
    { gradient: "from-amber-500 to-orange-600", soft: "from-amber-500/10 to-orange-500/5", text: "text-amber-700", glow: "shadow-amber-500/30", accent: "bg-amber-500" },
    { gradient: "from-cyan-500 to-sky-600", soft: "from-cyan-500/10 to-sky-500/5", text: "text-cyan-700", glow: "shadow-cyan-500/30", accent: "bg-cyan-500" },
];

export default function DepartmentsPage() {
    const { lang: currentLang } = useLanguage();
    const [departments, setDepartments] = useState<DepartmentSummary[] | "ERROR" | null>(null);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setLoading(true);
        getDepartments({ start: 0, end: 100, lang: currentLang })
            .then((result) => setDepartments(result))
            .finally(() => setLoading(false));
    }, [currentLang]);

    const t = {
        title: currentLang === "az" ? "Struktur Bölmələr" : "Structural Units",
        eyebrow: "Administrative Units",
        description:
            currentLang === "az"
                ? "Azərbaycan Texniki Universitetinin inzibati və akademik idarəetməsini təmin edən bütün şöbələr."
                : "Departments running the administrative and academic management of Azerbaijan Technical University.",
        noContent: currentLang === "az" ? "Məlumat tapılmadı." : "No units found.",
        error: currentLang === "az" ? "Xəta baş verdi" : "An error occurred",
        errorSub: currentLang === "az" ? "Zəhmət olmasa bir az sonra yenidən cəhd edin." : "Please try again later.",
        searchPlaceholder:
            currentLang === "az" ? "Şöbə adı ilə axtar..." : "Search by department name...",
        showing: currentLang === "az" ? "Göstərilir" : "Showing",
        of: currentLang === "az" ? "/" : "of",
        clear: currentLang === "az" ? "Sıfırla" : "Clear",
        statTotal: currentLang === "az" ? "şöbə" : "units",
        statSub: currentLang === "az" ? "AzTU-da fəaliyyət göstərən struktur bölmələri" : "Structural divisions across AzTU",
        viewMore: currentLang === "az" ? "Ətraflı" : "Explore",
        info: currentLang === "az" ? "Məlumat" : "Info",
        emptyTitle: currentLang === "az" ? "Heç nə tapılmadı" : "No matches",
        emptyHint: currentLang === "az" ? "Axtarış sözünü dəyişin və ya filtri sıfırlayın." : "Try a different keyword.",
    };

    const list = Array.isArray(departments) ? departments : [];
    const filtered = useMemo(() => {
        const q = query.trim().toLocaleLowerCase(currentLang === "az" ? "az" : "en");
        if (!q) return list;
        return list.filter((d) =>
            d.department_name.toLocaleLowerCase(currentLang === "az" ? "az" : "en").includes(q)
        );
    }, [list, query, currentLang]);

    return (
        <main className="min-h-screen transition-colors duration-500 pb-32">
            <PageHero
                title={t.title}
                description={t.description}
                breadcrumbs={[{ label: t.title }]}
                eyebrow={t.eyebrow}
            />

            <PageContainer>
                {/* Controls bar */}
                <div className="-mt-20 relative z-10 mb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-5 relative bg-white dark:bg-slate-900/70 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/15 dark:border-white/10 p-5 shadow-xl overflow-hidden"
                        >
                            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#ee7c7e]/10 blur-3xl rounded-full" />
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#3b82f6] text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25">
                                    <LayersIcon sx={{ fontSize: 26 }} />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-black text-[#1a2355] dark:text-white tabular-nums tracking-tighter">
                                            {list.length}
                                        </span>
                                        <span className="text-xs uppercase tracking-widest font-black text-gray-500 dark:text-slate-400">
                                            {t.statTotal}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1.5">{t.statSub}</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            className="lg:col-span-7"
                        >
                            <div className="relative h-full group">
                                <SearchIcon
                                    sx={{ fontSize: 22 }}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none group-focus-within:text-[#ee7c7e] transition-colors"
                                />
                                <input
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={t.searchPlaceholder}
                                    className="w-full h-full min-h-[80px] pl-16 pr-16 rounded-[2rem] bg-white dark:bg-slate-900/70 border-2 border-[#1a2355]/15 dark:border-white/10 text-[#1a2355] dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 text-sm font-bold outline-none focus:border-[#ee7c7e] transition-colors shadow-xl"
                                />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => setQuery("")}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 hover:bg-[#ee7c7e] hover:text-white text-[#1a2355] dark:text-white flex items-center justify-center transition-colors"
                                    >
                                        <CloseIcon sx={{ fontSize: 18 }} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {!loading && list.length > 0 && (
                        <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-widest font-black text-[#1a2355]/60 dark:text-white/50">
                            <span>
                                {t.showing}{" "}
                                <span className="text-[#ee7c7e] tabular-nums">{filtered.length}</span> {t.of}{" "}
                                <span className="tabular-nums">{list.length}</span>
                            </span>
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    className="text-[#ee7c7e] hover:text-[#1a2355] dark:hover:text-white transition-colors"
                                >
                                    {t.clear}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="animate-pulse bg-white/60 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/10 p-6 h-56"
                            />
                        ))}
                    </div>
                ) : departments === "ERROR" ? (
                    <div className="text-center py-20 px-6 bg-red-50 dark:bg-red-950/20 rounded-[2rem] border border-red-100 dark:border-red-900/30">
                        <h3 className="text-red-500 dark:text-red-400 font-bold text-xl mb-2">{t.error}</h3>
                        <p className="text-red-400 dark:text-red-500/70">{t.errorSub}</p>
                    </div>
                ) : list.length === 0 ? (
                    <div className="text-center py-24 bg-white/70 backdrop-blur-xl rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-slate-700">
                        <BusinessIcon sx={{ fontSize: 64, color: "#1a2355", opacity: 0.15 }} />
                        <p className="text-gray-400 font-black uppercase tracking-widest text-sm mt-4">{t.noContent}</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 bg-white/70 backdrop-blur-xl rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-slate-700">
                        <div className="w-16 h-16 rounded-2xl bg-[#1a2355]/5 mx-auto flex items-center justify-center mb-5">
                            <SearchIcon sx={{ fontSize: 32 }} className="text-[#1a2355]/40" />
                        </div>
                        <h3 className="text-lg font-black text-[#1a2355] mb-2">{t.emptyTitle}</h3>
                        <p className="text-sm text-gray-500 mb-6">{t.emptyHint}</p>
                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a2355] text-white text-xs font-black uppercase tracking-widest hover:bg-[#ee7c7e] transition-colors"
                        >
                            {t.clear}
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filtered.map((dept, i) => {
                            const palette = PALETTES[i % PALETTES.length];
                            const slug = slugify(dept.department_name);
                            const path =
                                currentLang === "az"
                                    ? `/az/idareetme/struktur-bolmeler/${slug}/haqqimizda`
                                    : `/en/management/structural-units/${slug}/about`;

                            return (
                                <motion.div
                                    key={dept.id}
                                    layout
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: Math.min(i * 0.04, 0.4) }}
                                    className="h-full"
                                >
                                    <Link
                                        href={path}
                                        className={`group relative block h-full bg-white dark:bg-slate-900/70 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/10 dark:border-white/10 p-6 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:border-transparent hover:shadow-2xl ${palette.glow}`}
                                    >
                                        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${palette.gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
                                        <div className={`absolute inset-0 bg-gradient-to-br ${palette.soft} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                                        <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-[#ee7c7e]/10 to-transparent blur-3xl rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-125" />

                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="flex items-center justify-between mb-5">
                                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${palette.gradient} flex items-center justify-center text-white shadow-lg ${palette.glow} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}>
                                                    <BusinessIcon sx={{ fontSize: 24 }} />
                                                </div>
                                                {dept.department_code && (
                                                    <span className="text-[10px] font-black text-gray-400 dark:text-slate-400 uppercase tracking-[0.2em] border-2 border-gray-100 dark:border-white/10 px-2.5 py-1 rounded-lg group-hover:border-[#ee7c7e]/50 group-hover:text-[#ee7c7e] transition-colors">
                                                        {dept.department_code}
                                                    </span>
                                                )}
                                            </div>

                                            <h2 className="text-base lg:text-lg font-black text-[#1a2355] dark:text-white leading-snug tracking-tight group-hover:text-[#ee7c7e] transition-colors duration-300 line-clamp-3 mb-5">
                                                {dept.department_name}
                                            </h2>

                                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                                                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#1a2355]/50 dark:text-white/40 group-hover:text-[#1a2355] dark:group-hover:text-white transition-colors">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${palette.accent}`} />
                                                    {t.viewMore}
                                                </span>
                                                <div className={`w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center transition-all duration-500 group-hover:bg-gradient-to-br group-hover:${palette.gradient} group-hover:text-white group-hover:translate-x-1 shadow-md border border-gray-100 dark:border-white/10`}>
                                                    <ChevronRightIcon sx={{ fontSize: 20 }} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </PageContainer>
        </main>
    );
}
