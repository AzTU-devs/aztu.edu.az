"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import ApartmentIcon from "@mui/icons-material/Apartment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { getDepartments } from "@/services/departmentService/departmentService";
import type { DepartmentSummary } from "@/types/department";
import { useLanguage } from "@/context/LanguageContext";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import { slugify } from "@/util/slugify";

/** First letters of the unit name — used as the card's monogram. */
function monogram(name: string): string {
    const words = name.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return "—";
    if (words.length === 1) return words[0].slice(0, 2).toLocaleUpperCase("az");
    return (words[0][0] + words[1][0]).toLocaleUpperCase("az");
}

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
        eyebrow: currentLang === "az" ? "İdarəetmə" : "Management",
        description:
            currentLang === "az"
                ? "Azərbaycan Texniki Universitetinin inzibati və akademik idarəetməsini təmin edən bütün şöbələr."
                : "Departments running the administrative and academic management of Azerbaijan Technical University.",
        noContent: currentLang === "az" ? "Məlumat tapılmadı." : "No units found.",
        error: currentLang === "az" ? "Xəta baş verdi" : "An error occurred",
        errorSub:
            currentLang === "az"
                ? "Zəhmət olmasa bir az sonra yenidən cəhd edin."
                : "Please try again later.",
        searchPlaceholder:
            currentLang === "az" ? "Şöbə adı ilə axtar…" : "Search by unit name…",
        units: currentLang === "az" ? "şöbə" : "units",
        showing: currentLang === "az" ? "Göstərilir" : "Showing",
        of: currentLang === "az" ? "/" : "of",
        clear: currentLang === "az" ? "Sıfırla" : "Clear",
        explore: currentLang === "az" ? "Ətraflı" : "Explore",
        emptyTitle: currentLang === "az" ? "Heç nə tapılmadı" : "No matches",
        emptyHint:
            currentLang === "az"
                ? "Axtarış sözünü dəyişin və ya filtri sıfırlayın."
                : "Try a different keyword.",
    };

    const list = useMemo(
        () => (Array.isArray(departments) ? departments : []),
        [departments]
    );
    const filtered = useMemo(() => {
        const locale = currentLang === "az" ? "az" : "en";
        const q = query.trim().toLocaleLowerCase(locale);
        if (!q) return list;
        return list.filter((d) => d.department_name.toLocaleLowerCase(locale).includes(q));
    }, [list, query, currentLang]);

    return (
        <main className="min-h-screen pb-28 transition-colors">
            <PageHero
                title={t.title}
                description={t.description}
                breadcrumbs={[{ label: t.title }]}
                eyebrow={t.eyebrow}
            />

            <PageContainer>
                {/* Toolbar — count and search share one row and one height */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="relative z-10 -mt-10 mb-10 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-[#1a2355]/5 dark:border-white/10 dark:bg-slate-900 sm:flex-row sm:items-center"
                >
                    <div className="flex shrink-0 items-center gap-3 px-3 py-1">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a2355] text-white">
                            <ApartmentIcon sx={{ fontSize: 21 }} />
                        </span>
                        <div>
                            <p className="text-2xl font-black leading-none tabular-nums tracking-tighter text-[#1a2355] dark:text-white">
                                {loading ? "—" : list.length}
                            </p>
                            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                                {t.units}
                            </p>
                        </div>
                    </div>

                    <span className="hidden h-10 w-px bg-slate-200 dark:bg-white/10 sm:block" />

                    <div className="group relative flex-1">
                        <SearchIcon
                            sx={{ fontSize: 20 }}
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#ee7c7e]"
                        />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t.searchPlaceholder}
                            className="h-12 w-full rounded-xl border border-transparent bg-slate-50/80 pl-12 pr-12 text-sm font-semibold text-[#1a2355] outline-none transition-colors placeholder:text-slate-400 focus:border-[#ee7c7e] focus:bg-white dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                aria-label={t.clear}
                                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-[#ee7c7e] hover:text-white"
                            >
                                <CloseIcon sx={{ fontSize: 17 }} />
                            </button>
                        )}
                    </div>
                </motion.div>

                {query && !loading && list.length > 0 && (
                    <p className="mb-6 text-[11px] font-black uppercase tracking-[0.22em] text-slate-400">
                        {t.showing} <span className="tabular-nums text-[#ee7c7e]">{filtered.length}</span>{" "}
                        {t.of} <span className="tabular-nums">{list.length}</span>
                    </p>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900"
                            />
                        ))}
                    </div>
                ) : departments === "ERROR" ? (
                    <div className="rounded-2xl border border-red-100 bg-red-50 px-6 py-20 text-center dark:border-red-900/30 dark:bg-red-950/20">
                        <h3 className="mb-2 text-xl font-black text-red-500 dark:text-red-400">{t.error}</h3>
                        <p className="text-red-400 dark:text-red-500/70">{t.errorSub}</p>
                    </div>
                ) : list.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 py-24 text-center dark:border-white/10">
                        <ApartmentIcon sx={{ fontSize: 52 }} className="text-slate-200 dark:text-slate-700" />
                        <p className="mt-4 text-sm font-black uppercase tracking-[0.2em] text-slate-400">
                            {t.noContent}
                        </p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 py-20 text-center dark:border-white/10">
                        <SearchIcon sx={{ fontSize: 38 }} className="text-slate-300 dark:text-slate-600" />
                        <h3 className="mt-4 text-lg font-black text-[#1a2355] dark:text-white">
                            {t.emptyTitle}
                        </h3>
                        <p className="mb-6 mt-1 text-sm text-slate-500">{t.emptyHint}</p>
                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#1a2355] px-5 py-2.5 text-xs font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#ee7c7e]"
                        >
                            {t.clear}
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filtered.map((dept, i) => {
                            const slug = slugify(dept.department_name);
                            const path =
                                currentLang === "az"
                                    ? `/az/idareetme/struktur-bolmeler/${slug}/haqqimizda`
                                    : `/en/management/structural-units/${slug}/about`;

                            return (
                                <motion.div
                                    key={dept.id}
                                    layout
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: Math.min(i * 0.035, 0.35) }}
                                >
                                    <Link
                                        href={path}
                                        className="group relative flex h-full min-h-[176px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1a2355]/25 hover:shadow-xl hover:shadow-[#1a2355]/10 dark:border-white/10 dark:bg-slate-900 dark:hover:border-white/25"
                                    >
                                        {/* Accent rule that draws on hover */}
                                        <span className="absolute left-0 right-0 top-0 h-[3px] origin-left scale-x-0 bg-[#ee7c7e] transition-transform duration-500 group-hover:scale-x-100" />

                                        <div className="relative z-10 mb-5 flex items-center justify-between">
                                            {/* Monogram doubles as the unit's mark */}
                                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a2355] text-[15px] font-black tracking-tight text-white transition-colors duration-300 group-hover:bg-[#ee7c7e] dark:bg-white/10 dark:group-hover:bg-[#ee7c7e]">
                                                {monogram(dept.department_name)}
                                            </span>
                                        </div>

                                        <h2 className="relative z-10 mb-5 line-clamp-3 text-[17px] font-black leading-snug tracking-tight text-[#1a2355] transition-colors duration-300 group-hover:text-[#ee7c7e] dark:text-white">
                                            {dept.department_name}
                                        </h2>

                                        <div className="relative z-10 mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-white/5">
                                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 transition-colors group-hover:text-[#1a2355] dark:group-hover:text-white">
                                                {t.explore}
                                            </span>
                                            <ArrowForwardIcon
                                                sx={{ fontSize: 18 }}
                                                className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#ee7c7e] dark:text-slate-600"
                                            />
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
