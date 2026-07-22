"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SchoolIcon from "@mui/icons-material/School";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import LayersIcon from "@mui/icons-material/Layers";
import { getFaculties, type FacultySummary } from "@/services/facultyService/facultyService";
import { slugify } from "@/util/slugify";
import { useLanguage } from "@/context/LanguageContext";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";

const FACULTY_PALETTES = [
    {
        gradient: "from-blue-600 to-indigo-700",
        soft: "from-blue-500/10 to-indigo-500/5",
        ring: "border-blue-500/20",
        text: "text-blue-700",
        glow: "shadow-blue-500/30",
        accent: "bg-blue-500",
    },
    {
        gradient: "from-emerald-500 to-teal-600",
        soft: "from-emerald-500/10 to-teal-500/5",
        ring: "border-emerald-500/20",
        text: "text-emerald-700",
        glow: "shadow-emerald-500/30",
        accent: "bg-emerald-500",
    },
    {
        gradient: "from-[#ee7c7e] to-[#f97316]",
        soft: "from-[#ee7c7e]/10 to-orange-500/5",
        ring: "border-[#ee7c7e]/20",
        text: "text-[#ee7c7e]",
        glow: "shadow-[#ee7c7e]/30",
        accent: "bg-[#ee7c7e]",
    },
    {
        gradient: "from-purple-500 to-violet-700",
        soft: "from-purple-500/10 to-violet-500/5",
        ring: "border-purple-500/20",
        text: "text-purple-700",
        glow: "shadow-purple-500/30",
        accent: "bg-purple-500",
    },
    {
        gradient: "from-amber-500 to-orange-600",
        soft: "from-amber-500/10 to-orange-500/5",
        ring: "border-amber-500/20",
        text: "text-amber-700",
        glow: "shadow-amber-500/30",
        accent: "bg-amber-500",
    },
    {
        gradient: "from-cyan-500 to-sky-600",
        soft: "from-cyan-500/10 to-sky-500/5",
        ring: "border-cyan-500/20",
        text: "text-cyan-700",
        glow: "shadow-cyan-500/30",
        accent: "bg-cyan-500",
    },
];

export default function FacultiesPage() {
    const { lang: currentLang } = useLanguage();
    const [faculties, setFaculties] = useState<FacultySummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setLoading(true);
        getFaculties({ lang: currentLang })
            .then((result) => {
                if (Array.isArray(result)) setFaculties(result);
            })
            .finally(() => setLoading(false));
    }, [currentLang]);

    const t = {
        faculties: currentLang === "az" ? "Fakültələr" : "Faculties",
        title: currentLang === "az" ? "Akademik Fakültələr" : "Academic Faculties",
        description:
            currentLang === "az"
                ? "AzTU-nun zəngin təhsil ənənələrinə malik, müasir mühəndislik təhsilini ən yüksək standartlarda təqdim edən fakültələri."
                : "Faculties of Azerbaijan Technical University offering modern engineering education built on a rich academic legacy.",
        noContent: currentLang === "az" ? "Məlumat tapılmadı." : "No data found.",
        cafedra: currentLang === "az" ? "Kafedra" : "Departments",
        deputy: currentLang === "az" ? "Müavin" : "Deputies",
        viewMore: currentLang === "az" ? "Ətraflı bax" : "Explore",
        searchPlaceholder:
            currentLang === "az" ? "Fakültə adına görə axtar..." : "Search faculties by name...",
        showing: currentLang === "az" ? "Göstərilir" : "Showing",
        of: currentLang === "az" ? "/" : "of",
        clearSearch: currentLang === "az" ? "Filtri sıfırla" : "Clear search",
        statTotal: currentLang === "az" ? "fakültə" : "faculties",
        statTotalSub: currentLang === "az" ? "AzTU-da aktiv akademik bölmələr" : "Active academic divisions at AzTU",
        emptySearchTitle:
            currentLang === "az" ? "Heç bir nəticə tapılmadı" : "No matching faculties found",
        emptySearchHint:
            currentLang === "az" ? "Axtarış sözünü dəyişin və ya filtri sıfırlayın." : "Try a different keyword or clear the search.",
    };

    const filtered = useMemo(() => {
        const q = query
            .trim()
            .toLocaleLowerCase(currentLang === "az" ? "az" : "en");
        if (!q) return faculties;
        return faculties.filter((f) =>
            f.title.toLocaleLowerCase(currentLang === "az" ? "az" : "en").includes(q)
        );
    }, [query, faculties, currentLang]);

    const totalCafedras = useMemo(
        () => faculties.reduce((sum, f) => sum + (f.cafedra_count || 0), 0),
        [faculties]
    );

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden pb-32 bg-page">
            <div className="bg-mesh opacity-100" />
            <div className="bg-grid-premium opacity-10" />

            <div className="fixed top-1/4 -left-20 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full animate-pulse pointer-events-none" />
            <div
                className="fixed bottom-1/4 -right-20 w-[600px] h-[600px] bg-[#ee7c7e]/5 blur-[150px] rounded-full animate-pulse pointer-events-none"
                style={{ animationDelay: "2s" }}
            />

            <PageHero
                title={t.title}
                description={t.description}
                breadcrumbs={[{ label: t.faculties }]}
                eyebrow="Academic Excellence"
            />

            <PageContainer fullWidth>
                {/* CONTROLS BAR */}
                <div className="-mt-24 relative z-10 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                        {/* Stat tile */}
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-5 relative bg-white dark:bg-slate-900/70 backdrop-blur-xl rounded-[1.5rem] border-2 border-[#1a2355]/15 dark:border-white/10 p-6 shadow-xl overflow-hidden"
                        >
                            <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#ee7c7e]/10 blur-3xl rounded-full" />
                            <div className="relative z-10 flex items-center gap-5">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#3b82f6] text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/25">
                                    <LayersIcon sx={{ fontSize: 30 }} />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-4xl font-black text-[#1a2355] dark:text-white tabular-nums tracking-tighter">
                                            {faculties.length}
                                        </span>
                                        <span className="text-xs uppercase tracking-widest font-black text-gray-500 dark:text-slate-400">
                                            {t.statTotal}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1.5">
                                        {totalCafedras > 0
                                            ? `${totalCafedras} ${t.cafedra.toLowerCase()} · ${t.statTotalSub}`
                                            : t.statTotalSub}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Search */}
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
                                    className="w-full h-full min-h-[88px] pl-16 pr-16 rounded-[1.5rem] bg-white dark:bg-slate-900/70 border-2 border-[#1a2355]/15 dark:border-white/10 text-[#1a2355] dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 text-sm font-bold outline-none focus:border-[#ee7c7e] transition-colors shadow-xl"
                                />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => setQuery("")}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 hover:bg-[#ee7c7e] hover:text-white text-[#1a2355] dark:text-white flex items-center justify-center transition-colors"
                                        aria-label={t.clearSearch}
                                    >
                                        <CloseIcon sx={{ fontSize: 18 }} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Showing N of M */}
                    {!loading && faculties.length > 0 && (
                        <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-widest font-black text-[#1a2355]/60 dark:text-white/50">
                            <span>
                                {t.showing} <span className="text-[#ee7c7e] tabular-nums">{filtered.length}</span> {t.of}{" "}
                                <span className="tabular-nums">{faculties.length}</span>
                            </span>
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    className="text-[#ee7c7e] hover:text-[#1a2355] dark:hover:text-white transition-colors"
                                >
                                    {t.clearSearch}
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* GRID */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 relative z-10">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="animate-pulse bg-white/60 backdrop-blur-xl rounded-[1.75rem] border-2 border-[#1a2355]/10 p-8 h-80"
                            />
                        ))}
                    </div>
                ) : faculties.length === 0 ? (
                    <div className="text-center py-32 bg-white/60 backdrop-blur-3xl rounded-[2rem] border-2 border-dashed border-gray-200 shadow-xl relative z-10">
                        <SchoolIcon
                            sx={{ fontSize: 80, color: "#ee7c7e", opacity: 0.2 }}
                            className="mb-6 animate-pulse"
                        />
                        <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-sm">{t.noContent}</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-24 bg-white/60 backdrop-blur-3xl rounded-[2rem] border-2 border-dashed border-gray-200 shadow-xl relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-[#1a2355]/5 mx-auto flex items-center justify-center mb-5">
                            <SearchIcon sx={{ fontSize: 32 }} className="text-[#1a2355]/40" />
                        </div>
                        <h3 className="text-lg font-black text-[#1a2355] mb-2">{t.emptySearchTitle}</h3>
                        <p className="text-sm text-gray-500 mb-6">{t.emptySearchHint}</p>
                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a2355] text-white text-xs font-black uppercase tracking-widest hover:bg-[#ee7c7e] transition-colors"
                        >
                            {t.clearSearch}
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 relative z-10">
                        {filtered.map((faculty, i) => {
                            const slug = slugify(faculty.title);
                            const academicPrefix = currentLang === "az" ? "akademik" : "academic";
                            const facultyPrefix = currentLang === "az" ? "fakulteler" : "faculties";
                            const baseLink = `/${currentLang}/${academicPrefix}/${facultyPrefix}/${slug}`;
                            const aboutLink = `${baseLink}/${currentLang === "az" ? "haqqimizda" : "about"}`;
                            const palette = FACULTY_PALETTES[i % FACULTY_PALETTES.length];

                            return (
                                <motion.div
                                    key={faculty.faculty_code}
                                    layout
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.55,
                                        delay: Math.min(i * 0.04, 0.4),
                                        ease: [0.23, 1, 0.32, 1],
                                    }}
                                    className="h-full"
                                >
                                    <Link
                                        href={aboutLink}
                                        className={`group relative block h-full rounded-[1.75rem] bg-white dark:bg-slate-900/70 backdrop-blur-xl border-2 border-[#1a2355]/10 dark:border-white/10 p-7 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:border-transparent hover:shadow-2xl ${palette.glow}`}
                                    >
                                        {/* Top color band */}
                                        <div
                                            className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${palette.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
                                        />
                                        {/* Soft tinted background on hover */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${palette.soft} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                                        />
                                        {/* Floating corner blob */}
                                        <div className="absolute -top-12 -right-12 w-44 h-44 bg-gradient-to-br from-[#ee7c7e]/10 to-transparent blur-3xl rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-125" />

                                        <div className="relative z-10 flex flex-col h-full">
                                            {/* Top row: icon + code */}
                                            <div className="flex items-center justify-between mb-7">
                                                <div
                                                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${palette.gradient} flex items-center justify-center text-white shadow-xl ${palette.glow} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}
                                                >
                                                    <SchoolIcon sx={{ fontSize: 28 }} />
                                                </div>
                                                {faculty.faculty_code && (
                                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-2 border-gray-100 dark:border-white/10 px-3 py-1.5 rounded-xl group-hover:border-[#ee7c7e]/50 group-hover:text-[#ee7c7e] transition-colors bg-white/70 dark:bg-slate-900/40">
                                                        {faculty.faculty_code}
                                                    </span>
                                                )}
                                            </div>

                                            <h2 className="text-[#1a2355] dark:text-white font-black text-xl lg:text-[1.3rem] leading-[1.2] mb-7 tracking-tight group-hover:text-[#ee7c7e] transition-colors duration-500 line-clamp-3">
                                                {faculty.title}
                                            </h2>

                                            {/* Bottom row: stats + arrow */}
                                            <div className="mt-auto pt-5 border-t border-gray-100 dark:border-white/5 grid grid-cols-2 gap-4">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <AccountTreeIcon sx={{ fontSize: 16 }} className={palette.text} />
                                                        <span className="text-2xl font-black text-[#1a2355] dark:text-white leading-none tabular-nums">
                                                            {faculty.cafedra_count || 0}
                                                        </span>
                                                    </div>
                                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                                        {t.cafedra}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col text-right">
                                                    <div className="flex items-center gap-2 justify-end mb-1">
                                                        <span className="text-2xl font-black text-[#1a2355] dark:text-white leading-none tabular-nums">
                                                            {faculty.deputy_dean_count || 0}
                                                        </span>
                                                        <GroupsIcon sx={{ fontSize: 16 }} className={palette.text} />
                                                    </div>
                                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                                        {t.deputy}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex items-center justify-between">
                                                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#1a2355]/50 dark:text-white/40 group-hover:text-[#1a2355] dark:group-hover:text-white transition-colors">
                                                    <span className={`w-1.5 h-1.5 rounded-full ${palette.accent}`} />
                                                    {t.viewMore}
                                                </span>
                                                <div
                                                    className={`w-11 h-11 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center transition-all duration-500 group-hover:bg-gradient-to-br group-hover:${palette.gradient} group-hover:text-white group-hover:translate-x-1 shadow-md border border-gray-100 dark:border-white/10`}
                                                >
                                                    <ChevronRightIcon sx={{ fontSize: 22 }} />
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
