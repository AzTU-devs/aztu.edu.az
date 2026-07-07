"use client";

import { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

import { getCafedras } from "@/services/cafedraService/cafedraService";
import { getFacultyBySlug } from "@/services/facultyService/facultyService";
import type { CafedraSummary } from "@/types/cafedra";
import { useLanguage } from "@/context/LanguageContext";
import StaffPageHeader from "@/components/faculty/StaffPageHeader";
import { SearchBox, ResultCount, EmptyState, FACULTY_PALETTES } from "@/components/faculty/ui";

interface Props {
    params: Promise<{ facultyId: string }>;
}

export default function FacultyKafedralarPage({ params }: Props) {
    const { facultyId: facultySlug } = use(params);
    const { lang: currentLang } = useLanguage();
    const [cafedras, setCafedras] = useState<CafedraSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    useEffect(() => {
        setLoading(true);
        getFacultyBySlug(facultySlug, currentLang).then((faculty) => {
            if (faculty) {
                getCafedras({ facultyCode: faculty.faculty_code, start: 0, end: 100, lang: currentLang }).then((res) => {
                    setCafedras(Array.isArray(res) ? res : []);
                    setLoading(false);
                });
            } else {
                setLoading(false);
            }
        });
    }, [facultySlug, currentLang]);

    const t = {
        title: currentLang === "az" ? "Fakültə Kafedraları" : "Faculty Departments",
        eyebrow: currentLang === "az" ? "Akademik bölmələr" : "Academic divisions",
        description:
            currentLang === "az"
                ? "Fakültə tərkibində fəaliyyət göstərən, müvafiq ixtisaslar üzrə kadr hazırlığı və elmi tədqiqatlar aparan kafedralar."
                : "Departments operating within the faculty — handling academic training and research in their respective specializations.",
        noContent: currentLang === "az" ? "Kafedra tapılmadı." : "No departments found.",
        viewMore: currentLang === "az" ? "Ətraflı bax" : "Explore",
        deputy: currentLang === "az" ? "Müavin" : "Deputies",
        searchPlaceholder: currentLang === "az" ? "Kafedra adı ilə axtar..." : "Search by department name...",
        showing: currentLang === "az" ? "Göstərilir" : "Showing",
        of: currentLang === "az" ? "/" : "of",
        clear: currentLang === "az" ? "Sıfırla" : "Clear",
        statTotal: currentLang === "az" ? "Kafedra" : "Departments",
        emptySearchTitle: currentLang === "az" ? "Heç bir nəticə tapılmadı" : "No matching departments found",
        emptySearchHint:
            currentLang === "az" ? "Axtarış sözünü dəyişin və ya filtri sıfırlayın." : "Try a different keyword or clear the search.",
    };

    const filtered = useMemo(() => {
        const q = query.trim().toLocaleLowerCase(currentLang === "az" ? "az" : "en");
        if (!q) return cafedras;
        return cafedras.filter((c) => {
            const name = c.cafedra_name || (c as unknown as { title?: string }).title || c.cafedra_code;
            return name.toLocaleLowerCase(currentLang === "az" ? "az" : "en").includes(q);
        });
    }, [query, cafedras, currentLang]);

    const totalDeputies = useMemo(
        () => cafedras.reduce((sum, c) => sum + (c.deputy_director_count || 0), 0),
        [cafedras]
    );

    return (
        <div className="space-y-8">
            <StaffPageHeader
                icon={AccountTreeIcon}
                eyebrow={t.eyebrow}
                title={t.title}
                description={t.description}
                stats={
                    cafedras.length > 0
                        ? [
                              { label: t.statTotal, value: cafedras.length, icon: MenuBookIcon },
                              { label: t.deputy, value: totalDeputies, icon: GroupsIcon },
                          ]
                        : undefined
                }
            />

            {!loading && cafedras.length > 0 && (
                <>
                    <SearchBox
                        value={query}
                        onChange={setQuery}
                        onClear={() => setQuery("")}
                        placeholder={t.searchPlaceholder}
                    />
                    <ResultCount
                        filtered={filtered.length}
                        total={cafedras.length}
                        showLabel={t.showing}
                        ofLabel={t.of}
                        onClear={query ? () => setQuery("") : undefined}
                        clearLabel={t.clear}
                    />
                </>
            )}

            {loading ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-48 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
                    ))}
                </div>
            ) : cafedras.length === 0 ? (
                <EmptyState icon={MenuBookIcon} title={t.noContent} />
            ) : filtered.length === 0 ? (
                <EmptyState
                    title={t.emptySearchTitle}
                    hint={t.emptySearchHint}
                    action={
                        <button
                            type="button"
                            onClick={() => setQuery("")}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#1a2355] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ee7c7e]"
                        >
                            {t.clear}
                        </button>
                    }
                />
            ) : (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {filtered.map((c, i) => {
                        const academicPrefix = currentLang === "az" ? "akademik" : "academic";
                        const facultyPrefix = currentLang === "az" ? "fakulteler" : "faculties";
                        const baseLink = `/${currentLang}/${academicPrefix}/${facultyPrefix}/${facultySlug}/kafedralar/${c.cafedra_code}/giris`;
                        const name = c.cafedra_name || (c as unknown as { title?: string }).title || c.cafedra_code;
                        const palette = FACULTY_PALETTES[i % FACULTY_PALETTES.length];

                        return (
                            <motion.div
                                key={c.id}
                                layout
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                            >
                                <Link
                                    href={baseLink}
                                    className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:hover:border-white/20"
                                >
                                    <div className="mb-5 flex items-center justify-between">
                                        <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${palette.tint}`}>
                                            <MenuBookIcon sx={{ fontSize: 24 }} />
                                        </span>
                                        {c.cafedra_code && (
                                            <span className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400 dark:border-white/10 dark:text-slate-500">
                                                {c.cafedra_code}
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="mb-5 line-clamp-3 text-lg font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                                        {name}
                                    </h2>

                                    <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4 dark:border-white/5">
                                        {c.deputy_director_count > 0 ? (
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <GroupsIcon sx={{ fontSize: 16 }} className={palette.text} />
                                                    <span className="text-xl font-bold tabular-nums leading-none text-slate-900 dark:text-white">
                                                        {c.deputy_director_count}
                                                    </span>
                                                </div>
                                                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                                    {t.deputy}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                                                <span className={`h-1.5 w-1.5 rounded-full ${palette.dot}`} />
                                                {t.viewMore}
                                            </span>
                                        )}

                                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all group-hover:bg-[#1a2355] group-hover:text-white dark:bg-white/5 dark:text-white/60">
                                            <ArrowForwardIcon sx={{ fontSize: 18 }} />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
