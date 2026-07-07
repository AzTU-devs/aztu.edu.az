"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ComingSoon from "@/components/shared/ComingSoon";
import StaffPageHeader from "@/components/faculty/StaffPageHeader";
import { FACULTY_PALETTES } from "@/components/faculty/ui";
import { getFacultyBySlug } from "@/services/facultyService/facultyService";
import type { FacultyDetail, PersonnelItem } from "@/types/faculty";
import { useLanguage } from "@/context/LanguageContext";
import GroupsIcon from "@mui/icons-material/Groups";
import GavelIcon from "@mui/icons-material/Gavel";

interface Props {
    params: Promise<{ facultyId: string }>;
}

export default function ElmiSuraPage({ params }: Props) {
    const { facultyId: facultySlug } = use(params);
    const { lang: currentLang } = useLanguage();
    const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
    const [loading, setLoading] = useState(true);

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

    const members: PersonnelItem[] = faculty?.scientific_council ?? [];

    return (
        <div className="space-y-8">
            <StaffPageHeader
                icon={GavelIcon}
                eyebrow={currentLang === "az" ? "Kollegial idarəetmə" : "Collegial governance"}
                title={currentLang === "az" ? "Fakültə Elmi Şurası" : "Faculty Scientific Council"}
                description={
                    currentLang === "az"
                        ? "Fakültənin elmi və tədris fəaliyyətini tənzimləyən ali kollegial idarəetmə orqanının tərkibi."
                        : "Composition of the supreme collegial body that governs scientific and academic work of the faculty."
                }
                stats={
                    members.length > 0
                        ? [{ label: currentLang === "az" ? "Üzv" : "Members", value: members.length, icon: GroupsIcon }]
                        : undefined
                }
            />

            {loading ? (
                <div className="space-y-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-[72px] animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
                    ))}
                </div>
            ) : members.length === 0 ? (
                <ComingSoon
                    label={
                        currentLang === "az"
                            ? "Elmi şura üzvləri haqqında məlumat əlavə ediləcək"
                            : "Information about scientific council members will be added soon"
                    }
                />
            ) : (
                <div className="space-y-2.5">
                    {members.map((m, idx) => {
                        const palette = FACULTY_PALETTES[idx % FACULTY_PALETTES.length];
                        const fullName = [m.first_name, m.last_name, m.father_name]
                            .filter(Boolean)
                            .join(" ");
                        return (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: Math.min(idx * 0.025, 0.3), duration: 0.35 }}
                                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:hover:border-white/20 md:gap-5 md:p-5"
                            >
                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold tabular-nums text-white ${palette.dot}`}
                                >
                                    {String(idx + 1).padStart(2, "0")}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-[15px] font-bold leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-[#ee7c7e] dark:text-white md:text-base">
                                        {fullName || "—"}
                                    </p>
                                    {m.scientific_degree && (
                                        <p className="mt-0.5 truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                                            {m.scientific_degree}
                                        </p>
                                    )}
                                </div>

                                {m.duty && (
                                    <span
                                        className={`hidden shrink-0 items-center rounded-full border px-3 py-1 text-[11px] font-semibold sm:inline-flex ${palette.chip}`}
                                    >
                                        {m.duty}
                                    </span>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
