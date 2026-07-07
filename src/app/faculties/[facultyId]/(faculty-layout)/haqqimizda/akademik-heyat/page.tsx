"use client";

import { use, useEffect, useMemo, useState } from "react";
import ComingSoon from "@/components/shared/ComingSoon";
import StaffCard from "@/components/faculty/StaffCard";
import StaffPageHeader from "@/components/faculty/StaffPageHeader";
import { SearchBox, ResultCount, EmptyState } from "@/components/faculty/ui";
import { getFacultyBySlug, getImageUrl } from "@/services/facultyService/facultyService";
import type { FacultyDetail, PersonnelItem } from "@/types/faculty";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
    params: Promise<{ facultyId: string }>;
}

export default function AkademikHeyatPage({ params }: Props) {
    const { facultyId: facultySlug } = use(params);
    const { lang: currentLang } = useLanguage();
    const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setLoading(true);
        getFacultyBySlug(facultySlug, currentLang)
            .then((result) => {
                setFaculty(result);
                setLoading(false);
            })
            .catch(() => {
                setFaculty(null);
                setLoading(false);
            });
    }, [facultySlug, currentLang]);

    const workers: PersonnelItem[] = faculty?.workers ?? [];

    const filtered = useMemo(() => {
        const q = search.trim().toLocaleLowerCase(currentLang === "az" ? "az" : "en");
        if (!q) return workers;
        return workers.filter((w) => {
            const fullName = [w.first_name, w.last_name, w.father_name]
                .filter(Boolean)
                .join(" ")
                .toLocaleLowerCase(currentLang === "az" ? "az" : "en");
            const scientific = (w.scientific_name ?? w.scientific_degree ?? "").toLocaleLowerCase(
                currentLang === "az" ? "az" : "en"
            );
            return fullName.includes(q) || scientific.includes(q);
        });
    }, [workers, search, currentLang]);

    return (
        <div className="space-y-8">
            <StaffPageHeader
                icon={SchoolIcon}
                eyebrow={currentLang === "az" ? "Tədris və elm" : "Teaching & research"}
                title={currentLang === "az" ? "Akademik heyət" : "Academic Staff"}
                description={
                    currentLang === "az"
                        ? "Fakültənin tədris və elmi fəaliyyətini həyata keçirən professor-müəllim heyəti haqqında ətraflı məlumat."
                        : "Detailed information about the faculty members and lecturers leading academic and scientific work."
                }
                stats={
                    workers.length > 0
                        ? [{ label: currentLang === "az" ? "Heyət" : "Members", value: workers.length, icon: GroupsIcon }]
                        : undefined
                }
            />

            {loading ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-60 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
                    ))}
                </div>
            ) : workers.length === 0 ? (
                <ComingSoon
                    label={
                        currentLang === "az"
                            ? "Akademik heyət haqqında məlumat əlavə ediləcək"
                            : "Information about academic staff will be added soon"
                    }
                />
            ) : (
                <>
                    <SearchBox
                        value={search}
                        onChange={setSearch}
                        onClear={() => setSearch("")}
                        placeholder={
                            currentLang === "az"
                                ? "Ad, soyad və ya elmi ad üzrə axtar..."
                                : "Search staff by name or title..."
                        }
                    />
                    <ResultCount
                        filtered={filtered.length}
                        total={workers.length}
                        showLabel={currentLang === "az" ? "Göstərilir" : "Showing"}
                        ofLabel={currentLang === "az" ? "/" : "of"}
                        onClear={search ? () => setSearch("") : undefined}
                        clearLabel={currentLang === "az" ? "Sıfırla" : "Clear"}
                    />

                    {filtered.length === 0 ? (
                        <EmptyState
                            title={currentLang === "az" ? "Nəticə tapılmadı" : "No results found"}
                            hint={
                                currentLang === "az"
                                    ? "Axtarış sözünü dəyişin və ya filtri sıfırlayın."
                                    : "Try a different keyword or clear the search."
                            }
                        />
                    ) : (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {filtered.map((w, index) => {
                                const fullName = [w.first_name, w.last_name, w.father_name]
                                    .filter(Boolean)
                                    .join(" ");
                                return (
                                    <StaffCard
                                        key={w.id}
                                        fullName={fullName || (currentLang === "az" ? "Naməlum" : "Unknown")}
                                        role={w.scientific_name || w.duty}
                                        degree={w.scientific_degree}
                                        photoUrl={getImageUrl(w.profile_image)}
                                        email={w.email}
                                        index={index}
                                    />
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
