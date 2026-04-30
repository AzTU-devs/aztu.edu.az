"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ComingSoon from "@/components/shared/ComingSoon";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import VerifiedIcon from "@mui/icons-material/Verified";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import { getFacultyBySlug, getImageUrl } from "@/services/facultyService/facultyService";
import type { FacultyDetail, Education } from "@/types/faculty";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
    params: Promise<{ facultyId: string }>;
}

const TIMELINE_GRADIENTS = [
    "from-[#1a2355] to-[#3b82f6]",
    "from-[#ee7c7e] to-[#fb7185]",
    "from-emerald-500 to-teal-500",
    "from-purple-500 to-fuchsia-500",
    "from-amber-500 to-orange-500",
    "from-cyan-500 to-sky-500",
];

const TIMELINE_DOT_GLOW = [
    "shadow-[0_0_22px_rgba(59,130,246,0.55)]",
    "shadow-[0_0_22px_rgba(238,124,126,0.55)]",
    "shadow-[0_0_22px_rgba(16,185,129,0.55)]",
    "shadow-[0_0_22px_rgba(168,85,247,0.55)]",
    "shadow-[0_0_22px_rgba(245,158,11,0.55)]",
    "shadow-[0_0_22px_rgba(34,211,238,0.55)]",
];

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
        return ay - by;
    });

    const heading = currentLang === "az" ? "Dekan haqqında" : "About the Dean";

    if (loading) {
        return (
            <div className="space-y-10">
                <div className="animate-pulse space-y-8">
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="w-full lg:w-80 space-y-6">
                            <div className="aspect-[3/4] rounded-[3rem] bg-gray-100 dark:bg-white/5" />
                            <div className="h-40 rounded-[2rem] bg-gray-100 dark:bg-white/5" />
                        </div>
                        <div className="flex-1 space-y-6">
                            <div className="h-12 w-2/3 bg-gray-100 dark:bg-white/5 rounded-xl" />
                            <div className="h-6 w-1/3 bg-gray-100 dark:bg-white/5 rounded-lg" />
                            <div className="h-64 w-full bg-gray-100 dark:bg-white/5 rounded-[2rem]" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!director) {
        return (
            <div className="space-y-10">
                <ComingSoon
                    label={currentLang === "az" ? "Dekan haqqında məlumat tapılmadı" : "Dean information not found"}
                />
            </div>
        );
    }

    return (
        <div className="space-y-16">
            {/* HERO ROW */}
            <section className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900/60 backdrop-blur-xl border-2 border-[#1a2355]/15 dark:border-white/10 p-6 md:p-10 shadow-xl">
                {/* decorative blobs */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ee7c7e]/15 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Photo */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                            className="relative"
                        >
                            <div className="absolute -top-3 -left-3 w-20 h-20 border-t-4 border-l-4 border-[#ee7c7e] rounded-tl-[2rem] z-20 pointer-events-none" />
                            <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-4 border-r-4 border-[#ee7c7e] rounded-br-[2rem] z-20 pointer-events-none" />
                            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-gradient-to-br from-[#1a2355] to-[#0f172a] flex items-center justify-center">
                                {director.profile_image ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={getImageUrl(director.profile_image)}
                                        alt={directorFullName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <PersonIcon sx={{ fontSize: 140, color: "white", opacity: 0.25 }} />
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Identity */}
                    <div className="lg:col-span-8 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ee7c7e]/10 border border-[#ee7c7e]/30 mb-4">
                                <VerifiedIcon sx={{ fontSize: 14 }} className="text-[#ee7c7e]" />
                                <span className="text-[#ee7c7e] text-[10px] font-black uppercase tracking-[0.3em]">
                                    {currentLang === "az" ? "Dekan" : "Dean"}
                                </span>
                            </span>
                            <h1 className="text-3xl md:text-5xl font-black text-[#1a2355] dark:text-white tracking-tight leading-[1.05] mb-3">
                                {directorFullName}
                            </h1>
                            {director.scientific_title && (
                                <p className="text-sm md:text-base font-bold text-gray-500 dark:text-slate-400 uppercase tracking-[0.25em]">
                                    {director.scientific_title}
                                </p>
                            )}

                            {/* Quick contact chips */}
                            <div className="mt-8 flex flex-wrap gap-3">
                                {director.email && (
                                    <a
                                        href={`mailto:${director.email}`}
                                        className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#1a2355] text-white font-bold text-xs hover:bg-[#ee7c7e] transition-colors shadow-lg shadow-[#1a2355]/20"
                                    >
                                        <EmailIcon sx={{ fontSize: 16 }} />
                                        <span className="truncate max-w-[220px]">{director.email}</span>
                                    </a>
                                )}
                                {director.phone && (
                                    <a
                                        href={`tel:${director.phone}`}
                                        className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#1a2355]/15 dark:border-white/10 text-[#1a2355] dark:text-white font-bold text-xs hover:border-[#ee7c7e] hover:text-[#ee7c7e] transition-colors"
                                    >
                                        <PhoneIcon sx={{ fontSize: 16 }} />
                                        {director.phone}
                                    </a>
                                )}
                                {director.room_number && (
                                    <span className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-[#1a2355]/15 dark:border-white/10 text-[#1a2355] dark:text-white font-bold text-xs">
                                        <LocationOnIcon sx={{ fontSize: 16 }} />
                                        {director.room_number}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* WORKING HOURS strip */}
            {director.working_hours && director.working_hours.length > 0 && (
                <section className="relative overflow-hidden rounded-[2rem] bg-[#1a2355] text-white p-6 md:p-8">
                    <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#ee7c7e]/20 blur-3xl rounded-full pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/15 border border-[#ee7c7e]/30 flex items-center justify-center">
                                <AccessTimeIcon className="text-[#ee7c7e]" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e]">
                                    {currentLang === "az" ? "Qəbul" : "Office hours"}
                                </p>
                                <p className="text-sm font-bold text-white/80">
                                    {currentLang === "az" ? "Tələbə və əməkdaş qəbulu" : "Open hours for students & staff"}
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                            {director.working_hours.map((slot, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
                                >
                                    <span className="text-[10px] uppercase tracking-widest text-white/50 font-black">
                                        {slot.day}
                                    </span>
                                    <span className="text-sm font-black tabular-nums">{slot.time_range}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* BIOGRAPHY */}
            {director.bio && (
                <section className="relative bg-white dark:bg-slate-900/60 backdrop-blur-xl border-2 border-[#1a2355]/15 dark:border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-md overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#1a2355] via-[#ee7c7e] to-[#1a2355]" />
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-8 bg-[#ee7c7e] rounded-full" />
                        <h2 className="text-xl md:text-2xl font-black text-[#1a2355] dark:text-white tracking-tight">
                            {heading}
                        </h2>
                    </div>
                    <div
                        className="prose prose-sm md:prose-base max-w-none text-gray-600 dark:text-slate-300 leading-relaxed text-justify font-medium"
                        dangerouslySetInnerHTML={{ __html: director.bio }}
                    />
                </section>
            )}

            {/* EDUCATION TIMELINE */}
            {sortedEducations.length > 0 && (
                <section>
                    <div className="flex items-center justify-between gap-6 mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#3b82f6] flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <SchoolIcon className="text-white" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e] mb-1">
                                    {currentLang === "az" ? "Akademik yol" : "Academic journey"}
                                </p>
                                <h2 className="text-2xl md:text-3xl font-black text-[#1a2355] dark:text-white tracking-tight">
                                    {currentLang === "az" ? "Təhsil" : "Education"}
                                </h2>
                            </div>
                        </div>
                        <span className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-[#1a2355]/15 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-[#1a2355] dark:text-white">
                            <AutoAwesomeIcon sx={{ fontSize: 14 }} className="text-[#ee7c7e]" />
                            {sortedEducations.length}{" "}
                            {currentLang === "az" ? "mərhələ" : "milestones"}
                        </span>
                    </div>

                    <div className="relative">
                        {/* Vertical timeline line */}
                        <div className="absolute left-6 md:left-8 top-2 bottom-2 w-[3px] bg-gradient-to-b from-[#1a2355] via-[#ee7c7e] to-[#1a2355] rounded-full" />

                        <ol className="space-y-6">
                            {sortedEducations.map((edu, index) => {
                                const palette = TIMELINE_GRADIENTS[index % TIMELINE_GRADIENTS.length];
                                const dotGlow = TIMELINE_DOT_GLOW[index % TIMELINE_DOT_GLOW.length];
                                const range = [edu.start_year, edu.end_year].filter(Boolean).join(" – ");

                                return (
                                    <motion.li
                                        key={`${edu.degree}-${index}`}
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, delay: index * 0.08 }}
                                        className="relative pl-16 md:pl-24"
                                    >
                                        {/* Dot */}
                                        <span
                                            className={`absolute left-6 md:left-8 top-7 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br ${palette} ${dotGlow} ring-4 ring-white dark:ring-slate-900 z-10`}
                                        />
                                        {/* Connector line into card */}
                                        <span className="absolute left-6 md:left-8 top-7 translate-y-[-1px] h-[2px] w-8 md:w-12 bg-gradient-to-r from-[#1a2355]/40 to-transparent dark:from-white/30" />

                                        {/* Card */}
                                        <div className="group relative bg-white dark:bg-slate-900/70 backdrop-blur-xl rounded-[1.75rem] border-2 border-[#1a2355]/10 dark:border-white/10 p-6 shadow-md hover:shadow-2xl hover:shadow-[#1a2355]/15 hover:border-transparent transition-all duration-300 overflow-hidden">
                                            <div
                                                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${palette} opacity-70 group-hover:opacity-100 transition-opacity`}
                                            />
                                            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#ee7c7e]/5 blur-3xl rounded-full group-hover:bg-[#ee7c7e]/15 transition-colors" />

                                            <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    {range && (
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white bg-gradient-to-r ${palette} mb-3 shadow-sm`}
                                                        >
                                                            {range}
                                                        </span>
                                                    )}
                                                    <h3 className="text-base md:text-lg font-black text-[#1a2355] dark:text-white leading-snug">
                                                        {edu.degree}
                                                    </h3>
                                                    {edu.university && (
                                                        <p className="mt-1.5 text-sm text-gray-500 dark:text-slate-400 font-medium">
                                                            {edu.university}
                                                        </p>
                                                    )}
                                                </div>

                                                <div
                                                    className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${palette} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}
                                                >
                                                    <SchoolIcon sx={{ fontSize: 22 }} />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.li>
                                );
                            })}
                        </ol>
                    </div>
                </section>
            )}

            {/* RESEARCH FIELDS */}
            {director.scientific_research_fields && director.scientific_research_fields.length > 0 && (
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ee7c7e] to-[#fb7185] flex items-center justify-center shadow-lg shadow-[#ee7c7e]/30">
                            <ScienceIcon className="text-white" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e] mb-1">
                                {currentLang === "az" ? "Elmi maraq" : "Scholarly focus"}
                            </p>
                            <h2 className="text-2xl md:text-3xl font-black text-[#1a2355] dark:text-white tracking-tight">
                                {currentLang === "az" ? "Tədqiqat sahələri" : "Research fields"}
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {director.scientific_research_fields.map((field, index) => {
                            const palette = TIMELINE_GRADIENTS[(index + 1) % TIMELINE_GRADIENTS.length];
                            return (
                                <motion.div
                                    key={`${field}-${index}`}
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.45, delay: index * 0.05 }}
                                    className="group relative bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border-2 border-[#1a2355]/10 dark:border-white/10 p-5 hover:border-transparent hover:shadow-xl hover:shadow-[#1a2355]/15 transition-all overflow-hidden"
                                >
                                    <div
                                        className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${palette}`}
                                    />
                                    <div className="flex items-start gap-3 relative z-10">
                                        <div
                                            className={`w-9 h-9 rounded-lg bg-gradient-to-br ${palette} flex items-center justify-center shrink-0 shadow-sm`}
                                        >
                                            <ScienceIcon sx={{ fontSize: 18 }} className="text-white" />
                                        </div>
                                        <p className="text-sm font-bold text-[#1a2355] dark:text-white leading-snug pt-1">
                                            {field}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
