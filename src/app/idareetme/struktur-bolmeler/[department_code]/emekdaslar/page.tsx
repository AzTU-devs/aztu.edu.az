"use client";

import { use, useEffect, useMemo, useState } from "react";

import ComingSoon from "@/components/shared/ComingSoon";
import StaffCard from "@/components/faculty/StaffCard";
import Loading from "@/components/loading/Loading";
import { SectionCard } from "@/components/department/ui";
import { getDepartmentBySlug, getImageUrl } from "@/services/departmentService/departmentService";
import type { DepartmentDetail } from "@/types/department";
import { useLanguage } from "@/context/LanguageContext";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import GroupsIcon from "@mui/icons-material/Groups";

interface Props {
    params: Promise<{ department_code: string }>;
}

export default function DepartmentStaffPage({ params }: Props) {
    const { department_code: departmentSlug } = use(params);
    const { lang: currentLang } = useLanguage();
    const [department, setDepartment] = useState<DepartmentDetail | null | undefined>(undefined);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getDepartmentBySlug(departmentSlug, currentLang).then(setDepartment);
    }, [departmentSlug, currentLang]);

    const workers = useMemo(() => department?.workers ?? [], [department]);

    const filtered = useMemo(() => {
        const locale = currentLang === "az" ? "az" : "en";
        const q = search.trim().toLocaleLowerCase(locale);
        if (!q) return workers;
        return workers.filter((w) => {
            const fullName = [w.first_name, w.last_name, w.father_name]
                .filter(Boolean)
                .join(" ")
                .toLocaleLowerCase(locale);
            return fullName.includes(q) || (w.duty || "").toLocaleLowerCase(locale).includes(q);
        });
    }, [workers, search, currentLang]);

    if (department === undefined) return <Loading />;
    if (department === null) return null;

    const t = {
        eyebrow: currentLang === "az" ? "İnzibati və texniki heyət" : "Administrative & technical",
        title: currentLang === "az" ? "Şöbə əməkdaşları" : "Department staff",
        placeholder: currentLang === "az" ? "Əməkdaş axtar…" : "Search staff…",
        showing: currentLang === "az" ? "Göstərilir" : "Showing",
        of: currentLang === "az" ? "/" : "of",
        clear: currentLang === "az" ? "Sıfırla" : "Clear",
        empty: currentLang === "az" ? "Nəticə tapılmadı" : "No results found",
        emptyHint:
            currentLang === "az" ? "Başqa ad və ya vəzifə yazın." : "Try a different name or role.",
        soon:
            currentLang === "az"
                ? "Əməkdaşlar haqqında məlumat əlavə ediləcək"
                : "Information about staff will be added soon",
    };

    if (workers.length === 0) return <ComingSoon label={t.soon} />;

    return (
        <SectionCard
            icon={GroupsIcon}
            eyebrow={t.eyebrow}
            title={t.title}
            action={
                <span className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-black tabular-nums uppercase tracking-[0.2em] text-slate-400 dark:border-white/10 dark:text-slate-500">
                    {String(workers.length).padStart(2, "0")}
                </span>
            }
        >
            {/* Search */}
            <div className="group relative mb-5">
                <SearchIcon
                    sx={{ fontSize: 20 }}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#ee7c7e]"
                />
                <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t.placeholder}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-12 pr-12 text-sm font-semibold text-[#1a2355] outline-none transition-colors placeholder:text-slate-400 focus:border-[#ee7c7e] focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                />
                {search && (
                    <button
                        type="button"
                        onClick={() => setSearch("")}
                        aria-label={t.clear}
                        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-[#ee7c7e] hover:text-white"
                    >
                        <CloseIcon sx={{ fontSize: 17 }} />
                    </button>
                )}
            </div>

            {search && (
                <p className="mb-5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                    {t.showing} <span className="tabular-nums text-[#ee7c7e]">{filtered.length}</span>{" "}
                    {t.of} <span className="tabular-nums">{workers.length}</span>
                </p>
            )}

            {filtered.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 py-16 text-center dark:border-white/10">
                    <SearchIcon sx={{ fontSize: 34 }} className="text-slate-300 dark:text-slate-600" />
                    <p className="mt-3 text-sm font-black text-[#1a2355] dark:text-white">{t.empty}</p>
                    <p className="mt-1 text-xs text-slate-400">{t.emptyHint}</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {filtered.map((w, index) => (
                        <StaffCard
                            key={w.id}
                            fullName={
                                [w.first_name, w.last_name, w.father_name].filter(Boolean).join(" ") ||
                                (currentLang === "az" ? "Naməlum" : "Unknown")
                            }
                            role={w.duty}
                            photoUrl={getImageUrl(w.profile_image)}
                            email={w.email}
                            phone={w.phone}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </SectionCard>
    );
}
