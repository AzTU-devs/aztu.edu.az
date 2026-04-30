"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ComingSoon from "@/components/shared/ComingSoon";
import StaffPageHeader from "@/components/faculty/StaffPageHeader";
import { STAFF_PALETTES } from "@/components/faculty/StaffCard";
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
        <div className="space-y-10">
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
                        ? [
                              {
                                  label: currentLang === "az" ? "Üzv" : "Members",
                                  value: members.length,
                                  icon: GroupsIcon,
                              },
                          ]
                        : undefined
                }
            />

            {loading ? (
                <div className="space-y-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-20 rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse"
                        />
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
                <div className="space-y-3">
                    {members.map((m, idx) => {
                        const palette = STAFF_PALETTES[idx % STAFF_PALETTES.length];
                        const fullName = [m.first_name, m.last_name, m.father_name]
                            .filter(Boolean)
                            .join(" ");
                        return (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: Math.min(idx * 0.03, 0.3), duration: 0.4 }}
                                className="group relative bg-white dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl border-2 border-[#1a2355]/10 dark:border-white/10 overflow-hidden hover:-translate-x-0.5 hover:border-transparent hover:shadow-xl transition-all duration-300"
                            >
                                <div
                                    className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${palette.gradient}`}
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-r ${palette.soft} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                                />

                                <div className="relative z-10 flex items-center gap-4 md:gap-6 p-4 md:p-5 pl-6 md:pl-8">
                                    {/* Number badge */}
                                    <div
                                        className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${palette.gradient} text-white flex items-center justify-center shadow-md ${palette.glow} text-sm font-black tabular-nums`}
                                    >
                                        {String(idx + 1).padStart(2, "0")}
                                    </div>

                                    {/* Name + degree */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-base md:text-lg font-black text-[#1a2355] dark:text-white leading-tight tracking-tight group-hover:text-[#ee7c7e] transition-colors truncate">
                                            {fullName || "—"}
                                        </p>
                                        {m.scientific_degree && (
                                            <p className="text-[10px] font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest mt-1 truncate">
                                                {m.scientific_degree}
                                            </p>
                                        )}
                                    </div>

                                    {/* Duty */}
                                    {m.duty && (
                                        <span
                                            className={`hidden sm:inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${palette.chip}`}
                                        >
                                            {m.duty}
                                        </span>
                                    )}
                                </div>

                                {/* Mobile duty under */}
                                {m.duty && (
                                    <div className="sm:hidden relative z-10 px-6 pb-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${palette.chip}`}
                                        >
                                            {m.duty}
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
