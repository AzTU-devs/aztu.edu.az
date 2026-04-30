"use client";

import { use, useEffect, useMemo, useState } from "react";
import ComingSoon from "@/components/shared/ComingSoon";
import StaffCard from "@/components/faculty/StaffCard";
import StaffPageHeader from "@/components/faculty/StaffPageHeader";
import { getFacultyBySlug, getImageUrl } from "@/services/facultyService/facultyService";
import type { FacultyDetail, PersonnelItem } from "@/types/faculty";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import GroupsIcon from "@mui/icons-material/Groups";

import { useLanguage } from "@/context/LanguageContext";

interface Props {
    params: Promise<{ facultyId: string }>;
}

export default function EmekdaslarPage({ params }: Props) {
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
            const duty = (w.duty || w.scientific_name || "").toLocaleLowerCase(
                currentLang === "az" ? "az" : "en"
            );
            return fullName.includes(q) || duty.includes(q);
        });
    }, [workers, search, currentLang]);

    return (
        <div className="space-y-10">
            <StaffPageHeader
                icon={GroupIcon}
                eyebrow={currentLang === "az" ? "İnzibati və texniki heyət" : "Administrative & technical"}
                title={currentLang === "az" ? "Fakültə əməkdaşları" : "Faculty Staff"}
                description={
                    currentLang === "az"
                        ? "Fakültənin gündəlik fəaliyyətində iştirak edən inzibati və texniki heyət haqqında məlumat."
                        : "Administrative and technical staff supporting the daily operations of the faculty."
                }
                stats={
                    workers.length > 0
                        ? [
                              {
                                  label: currentLang === "az" ? "Əməkdaş" : "Staff",
                                  value: workers.length,
                                  icon: GroupsIcon,
                              },
                          ]
                        : undefined
                }
            />

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div
                            key={i}
                            className="h-64 rounded-[1.75rem] bg-gray-100 dark:bg-white/5 animate-pulse"
                        />
                    ))}
                </div>
            ) : workers.length === 0 ? (
                <ComingSoon
                    label={
                        currentLang === "az"
                            ? "Əməkdaşlar haqqında məlumat əlavə ediləcək"
                            : "Information about staff will be added soon"
                    }
                />
            ) : (
                <>
                    <div className="relative group">
                        <SearchIcon
                            sx={{ fontSize: 22 }}
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none group-focus-within:text-[#ee7c7e] transition-colors"
                        />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={
                                currentLang === "az" ? "Əməkdaş axtar..." : "Search staff member..."
                            }
                            className="w-full py-5 pl-16 pr-16 rounded-[2rem] bg-white dark:bg-slate-900/70 border-2 border-[#1a2355]/15 dark:border-white/10 text-[#1a2355] dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 text-sm font-bold outline-none focus:border-[#ee7c7e] transition-colors shadow-md"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 hover:bg-[#ee7c7e] hover:text-white text-[#1a2355] dark:text-white flex items-center justify-center transition-colors"
                            >
                                <CloseIcon sx={{ fontSize: 18 }} />
                            </button>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-xs uppercase tracking-widest font-black text-[#1a2355]/60 dark:text-white/50">
                        <span>
                            {currentLang === "az" ? "Göstərilir" : "Showing"}{" "}
                            <span className="text-[#ee7c7e] tabular-nums">{filtered.length}</span>{" "}
                            {currentLang === "az" ? "/" : "of"}{" "}
                            <span className="tabular-nums">{workers.length}</span>
                        </span>
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="text-[#ee7c7e] hover:text-[#1a2355] dark:hover:text-white transition-colors"
                            >
                                {currentLang === "az" ? "Sıfırla" : "Clear"}
                            </button>
                        )}
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-24 bg-white/70 backdrop-blur-xl rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-slate-700">
                            <div className="w-16 h-16 rounded-2xl bg-[#1a2355]/5 mx-auto flex items-center justify-center mb-5">
                                <SearchIcon sx={{ fontSize: 32 }} className="text-[#1a2355]/40" />
                            </div>
                            <p className="text-gray-400 dark:text-slate-500 text-sm font-black uppercase tracking-widest">
                                {currentLang === "az" ? "Nəticə tapılmadı" : "No results found"}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                            {filtered.map((w, index) => {
                                const fullName = [w.first_name, w.last_name, w.father_name]
                                    .filter(Boolean)
                                    .join(" ");
                                return (
                                    <StaffCard
                                        key={w.id}
                                        fullName={fullName || (currentLang === "az" ? "Naməlum" : "Unknown")}
                                        role={w.duty || w.scientific_name}
                                        degree={w.scientific_degree}
                                        photoUrl={getImageUrl(w.profile_image)}
                                        email={w.email}
                                        phone={w.phone}
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
