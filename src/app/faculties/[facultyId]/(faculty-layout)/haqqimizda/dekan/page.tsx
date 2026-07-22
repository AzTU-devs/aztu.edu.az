"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ComingSoon from "@/components/shared/ComingSoon";
import { SectionHeading, FACULTY_PALETTES } from "@/components/faculty/ui";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import VerifiedIcon from "@mui/icons-material/Verified";

import { getFacultyBySlug, getImageUrl } from "@/services/facultyService/facultyService";
import type { FacultyDetail, Education } from "@/types/faculty";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
    params: Promise<{ facultyId: string }>;
}

export default function DekanPage({ params }: Props) {
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

    const director = faculty?.director;
    const directorFullName = director
        ? [director.first_name, director.last_name, director.father_name].filter(Boolean).join(" ")
        : "";

    const educations: Education[] =
        (director?.educations as Education[] | undefined) ??
        ((director as unknown as { education?: Education[] })?.education ?? []);

    const sortedEducations = [...educations].sort((a, b) => {
        const ay = parseInt(a.start_year, 10) || 0;
        const by = parseInt(b.start_year, 10) || 0;
        return by - ay;
    });

    if (loading) {
        return (
            <div className="animate-pulse space-y-8">
                <div className="flex flex-col gap-8 lg:flex-row">
                    <div className="aspect-[3/4] w-full rounded-2xl bg-slate-100 dark:bg-white/5 lg:w-72" />
                    <div className="flex-1 space-y-4">
                        <div className="h-10 w-2/3 rounded-lg bg-slate-100 dark:bg-white/5" />
                        <div className="h-5 w-1/3 rounded-lg bg-slate-100 dark:bg-white/5" />
                        <div className="h-40 w-full rounded-2xl bg-slate-100 dark:bg-white/5" />
                    </div>
                </div>
            </div>
        );
    }

    if (!director) {
        return (
            <ComingSoon
                label={currentLang === "az" ? "Dekan haqqında məlumat tapılmadı" : "Dean information not found"}
            />
        );
    }

    return (
        <div className="space-y-8">
            {/* Profile card */}
            <section className="grid grid-cols-1 gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#101733] md:p-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="aspect-[3/4] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-[#161f42]"
                    >
                        {director.profile_image ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                                src={getImageUrl(director.profile_image)}
                                alt={directorFullName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <span className="flex h-full w-full items-center justify-center">
                                <PersonIcon sx={{ fontSize: 100 }} className="text-slate-300 dark:text-slate-600" />
                            </span>
                        )}
                    </motion.div>
                </div>

                <div className="flex flex-col justify-center lg:col-span-8">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                    >
                        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#ee7c7e]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#e05b5d] dark:text-[#fb7185]">
                            <VerifiedIcon sx={{ fontSize: 14 }} />
                            {currentLang === "az" ? "Dekan" : "Dean"}
                        </span>
                        <h1 className="mb-2 text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-4xl">
                            {directorFullName}
                        </h1>
                        {director.scientific_title && (
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                {director.scientific_title}
                            </p>
                        )}

                        <div className="mt-6 flex flex-wrap gap-2.5">
                            {director.email && (
                                <a
                                    href={`mailto:${director.email}`}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#1a2355] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#ee7c7e]"
                                >
                                    <EmailIcon sx={{ fontSize: 16 }} />
                                    <span className="max-w-[220px] truncate">{director.email}</span>
                                </a>
                            )}
                            {director.phone && (
                                <a
                                    href={`tel:${director.phone}`}
                                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-[#ee7c7e] hover:text-[#ee7c7e] dark:border-white/10 dark:text-white"
                                >
                                    <PhoneIcon sx={{ fontSize: 16 }} />
                                    {director.phone}
                                </a>
                            )}
                            {director.room_number && (
                                <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:border-white/10 dark:text-white">
                                    <LocationOnIcon sx={{ fontSize: 16 }} />
                                    {director.room_number}
                                </span>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Working hours */}
            {director.working_hours && director.working_hours.length > 0 && (
                <section className="rounded-2xl bg-[#1a2355] p-6 text-white md:p-7">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center">
                        <div className="flex shrink-0 items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                                <AccessTimeIcon className="text-[#ee7c7e]" />
                            </span>
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#ee7c7e]">
                                    {currentLang === "az" ? "Qəbul saatları" : "Office hours"}
                                </p>
                                <p className="text-sm font-medium text-white/70">
                                    {currentLang === "az" ? "Tələbə və əməkdaş qəbulu" : "For students & staff"}
                                </p>
                            </div>
                        </div>
                        <div className="grid flex-1 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {director.working_hours.map((slot, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2.5"
                                >
                                    <span className="text-[11px] font-semibold uppercase tracking-wide text-white/50">{slot.day}</span>
                                    <span className="text-sm font-bold tabular-nums">{slot.time_range}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Biography */}
            {director.bio && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#101733] md:p-8">
                    <SectionHeading
                        icon={PersonIcon}
                        eyebrow={currentLang === "az" ? "Tərcümeyi-hal" : "Biography"}
                        title={currentLang === "az" ? "Dekan haqqında" : "About the Dean"}
                        className="mb-6"
                    />
                    <div
                        className="prose prose-sm md:prose-base max-w-none text-justify leading-relaxed text-slate-600 dark:text-slate-300 dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: director.bio }}
                    />
                </section>
            )}

            {/* Education timeline */}
            {sortedEducations.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#101733] md:p-8">
                    <SectionHeading
                        icon={SchoolIcon}
                        eyebrow={currentLang === "az" ? "Akademik yol" : "Academic journey"}
                        title={currentLang === "az" ? "Təhsil" : "Education"}
                        className="mb-8"
                    />
                    <div className="relative pl-6">
                        <div className="absolute left-[7px] top-1 bottom-1 w-px bg-slate-200 dark:bg-white/10" />
                        <ol className="space-y-6">
                            {sortedEducations.map((edu, index) => {
                                const palette = FACULTY_PALETTES[index % FACULTY_PALETTES.length];
                                const range = [edu.start_year, edu.end_year].filter(Boolean).join(" – ");
                                return (
                                    <motion.li
                                        key={`${edu.degree}-${index}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.4, delay: index * 0.06 }}
                                        className="relative"
                                    >
                                        <span className={`absolute -left-6 top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-white dark:ring-slate-900 ${palette.dot}`} />
                                        {range && (
                                            <span className={`mb-1.5 inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${palette.chip}`}>
                                                {range}
                                            </span>
                                        )}
                                        <h3 className="text-[15px] font-bold leading-snug text-slate-900 dark:text-white">{edu.degree}</h3>
                                        {edu.university && (
                                            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{edu.university}</p>
                                        )}
                                    </motion.li>
                                );
                            })}
                        </ol>
                    </div>
                </section>
            )}

            {/* Research fields */}
            {director.scientific_research_fields && director.scientific_research_fields.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#101733] md:p-8">
                    <SectionHeading
                        icon={ScienceIcon}
                        eyebrow={currentLang === "az" ? "Elmi maraq" : "Scholarly focus"}
                        title={currentLang === "az" ? "Tədqiqat sahələri" : "Research fields"}
                        className="mb-6"
                    />
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {director.scientific_research_fields.map((field, index) => {
                            const palette = FACULTY_PALETTES[(index + 1) % FACULTY_PALETTES.length];
                            return (
                                <motion.div
                                    key={`${field}-${index}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.4, delay: index * 0.04 }}
                                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 dark:border-white/10 dark:bg-white/5"
                                >
                                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${palette.tint}`}>
                                        <ScienceIcon sx={{ fontSize: 18 }} />
                                    </span>
                                    <p className="pt-1 text-sm font-medium leading-snug text-slate-700 dark:text-slate-200">{field}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
