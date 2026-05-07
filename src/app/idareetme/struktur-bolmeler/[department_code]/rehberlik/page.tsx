"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import VerifiedIcon from "@mui/icons-material/Verified";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import ComingSoon from "@/components/shared/ComingSoon";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import Loading from "@/components/loading/Loading";
import { getDepartmentBySlug, getImageUrl } from "@/services/departmentService/departmentService";
import type { DepartmentDetail, Education, WorkingHour } from "@/types/department";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
    params: Promise<{ department_code: string }>;
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

export default function DepartmentLeadershipPage({ params }: Props) {
    const { department_code: departmentSlug } = use(params);
    const { lang: currentLang } = useLanguage();
    const [department, setDepartment] = useState<DepartmentDetail | null | undefined>(undefined);

    useEffect(() => {
        getDepartmentBySlug(departmentSlug, currentLang).then(setDepartment);
    }, [departmentSlug, currentLang]);

    if (department === undefined) return <Loading />;
    if (department === null) return null;

    const director = department.director;
    const profileImage = director ? getImageUrl(director.profile_image) : null;
    const directorFullName = director
        ? [director.first_name, director.last_name, director.father_name].filter(Boolean).join(" ")
        : "";

    const workingHours: WorkingHour[] = Array.isArray(director?.working_hours)
        ? director.working_hours
        : [];
    const educations: Education[] = Array.isArray(director?.educations) ? director.educations : [];
    const sortedEducations = [...educations].sort((a, b) => {
        const ay = parseInt(String(a.year ?? "0"), 10) || 0;
        const by = parseInt(String(b.year ?? "0"), 10) || 0;
        return ay - by;
    });

    const t = {
        leadership: currentLang === "az" ? "Şöbə rəhbəri" : "Department Head",
        bio: currentLang === "az" ? "Bioqrafiya" : "Biography",
        office: currentLang === "az" ? "Otaq" : "Room",
        reception: currentLang === "az" ? "Qəbul saatları" : "Office hours",
        receptionSub:
            currentLang === "az" ? "Tələbə və əməkdaş qəbulu" : "Open hours for students & staff",
        education: currentLang === "az" ? "Təhsil" : "Education",
        educationEyebrow: currentLang === "az" ? "Akademik yol" : "Academic journey",
        milestones: currentLang === "az" ? "mərhələ" : "milestones",
        contact: currentLang === "az" ? "Əlaqə" : "Contact",
        noData: currentLang === "az" ? "Rəhbərlik haqqında məlumat tapılmadı" : "Leadership information not found",
    };

    if (!director) {
        return (
            <div className="space-y-10">
                <ComingSoon label={t.noData} />
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {/* HERO ROW */}
            <section className="relative overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900/60 backdrop-blur-xl border-2 border-[#1a2355]/15 dark:border-white/10 p-5 md:p-8 shadow-xl">
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ee7c7e]/15 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Photo */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                            className="relative max-w-xs lg:max-w-none mx-auto"
                        >
                            <div className="absolute -top-2 -left-2 w-16 h-16 border-t-[3px] border-l-[3px] border-[#ee7c7e] rounded-tl-[1.5rem] z-20 pointer-events-none" />
                            <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-[3px] border-r-[3px] border-[#ee7c7e] rounded-br-[1.5rem] z-20 pointer-events-none" />
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl bg-gradient-to-br from-[#1a2355] to-[#0f172a] flex items-center justify-center">
                                {profileImage ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={profileImage}
                                        alt={directorFullName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <PersonIcon sx={{ fontSize: 120, color: "white", opacity: 0.25 }} />
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Identity + quick contact */}
                    <div className="lg:col-span-8 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.05 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ee7c7e]/10 border border-[#ee7c7e]/30 mb-3">
                                <VerifiedIcon sx={{ fontSize: 13 }} className="text-[#ee7c7e]" />
                                <span className="text-[#ee7c7e] text-[10px] font-black uppercase tracking-[0.3em]">
                                    {t.leadership}
                                </span>
                            </span>
                            <h1 className="text-2xl md:text-4xl font-black text-[#1a2355] dark:text-white tracking-tight leading-[1.1] mb-2">
                                {directorFullName}
                            </h1>
                            {director.scientific_title && (
                                <p className="text-xs md:text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-[0.25em]">
                                    {director.scientific_title}
                                </p>
                            )}
                            {director.scientific_degree && (
                                <p className="text-[#ee7c7e] text-[11px] font-black uppercase tracking-[0.25em] mt-2">
                                    {director.scientific_degree}
                                </p>
                            )}

                            <div className="mt-6 flex flex-wrap gap-2.5">
                                {director.email && (
                                    <a
                                        href={`mailto:${director.email}`}
                                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1a2355] text-white font-bold text-xs hover:bg-[#ee7c7e] transition-colors shadow-md shadow-[#1a2355]/20"
                                    >
                                        <EmailIcon sx={{ fontSize: 14 }} />
                                        <span className="truncate max-w-[200px]">{director.email}</span>
                                    </a>
                                )}
                                {director.phone && (
                                    <a
                                        href={`tel:${director.phone}`}
                                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-[#1a2355]/15 dark:border-white/10 text-[#1a2355] dark:text-white font-bold text-xs hover:border-[#ee7c7e] hover:text-[#ee7c7e] transition-colors"
                                    >
                                        <PhoneIcon sx={{ fontSize: 14 }} />
                                        {director.phone}
                                    </a>
                                )}
                                {director.room_number && (
                                    <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-[#1a2355]/15 dark:border-white/10 text-[#1a2355] dark:text-white font-bold text-xs">
                                        <LocationOnIcon sx={{ fontSize: 14 }} />
                                        {t.office} {director.room_number}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* WORKING HOURS */}
            {workingHours.length > 0 && (
                <section className="relative overflow-hidden rounded-2xl bg-[#1a2355] text-white p-5 md:p-6">
                    <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#ee7c7e]/20 blur-3xl rounded-full pointer-events-none" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-5">
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/15 border border-[#ee7c7e]/30 flex items-center justify-center">
                                <AccessTimeIcon className="text-[#ee7c7e]" sx={{ fontSize: 20 }} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e]">
                                    {t.reception}
                                </p>
                                <p className="text-xs font-bold text-white/70">{t.receptionSub}</p>
                            </div>
                        </div>
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {workingHours.map((wh, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md"
                                >
                                    <span className="text-[10px] uppercase tracking-widest text-white/50 font-black">
                                        {wh.day}
                                    </span>
                                    <span className="text-xs font-black tabular-nums">{wh.time_range}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* BIOGRAPHY */}
            {director.bio && (
                <section className="relative bg-white dark:bg-slate-900/60 backdrop-blur-xl border-2 border-[#1a2355]/15 dark:border-white/10 rounded-2xl p-5 md:p-8 shadow-md overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#1a2355] via-[#ee7c7e] to-[#1a2355]" />
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-1.5 h-7 bg-[#ee7c7e] rounded-full" />
                        <h2 className="text-lg md:text-xl font-black text-[#1a2355] dark:text-white tracking-tight">
                            {t.bio}
                        </h2>
                    </div>
                    <SanitizedHtml
                        html={director.bio}
                        className="prose prose-sm md:prose-base max-w-none text-gray-600 dark:text-slate-300 leading-relaxed text-justify font-medium"
                    />
                </section>
            )}

            {/* EDUCATION TIMELINE */}
            {sortedEducations.length > 0 && (
                <section>
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-7">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#3b82f6] flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <SchoolIcon className="text-white" sx={{ fontSize: 22 }} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e] mb-0.5">
                                    {t.educationEyebrow}
                                </p>
                                <h2 className="text-xl md:text-2xl font-black text-[#1a2355] dark:text-white tracking-tight">
                                    {t.education}
                                </h2>
                            </div>
                        </div>
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-[#1a2355]/15 dark:border-white/10 text-[10px] font-black uppercase tracking-widest text-[#1a2355] dark:text-white">
                            <AutoAwesomeIcon sx={{ fontSize: 12 }} className="text-[#ee7c7e]" />
                            {sortedEducations.length} {t.milestones}
                        </span>
                    </div>

                    <div className="relative">
                        <div className="absolute left-5 md:left-7 top-1.5 bottom-1.5 w-[3px] bg-gradient-to-b from-[#1a2355] via-[#ee7c7e] to-[#1a2355] rounded-full" />

                        <ol className="space-y-4">
                            {sortedEducations.map((edu, index) => {
                                const palette = TIMELINE_GRADIENTS[index % TIMELINE_GRADIENTS.length];
                                const dotGlow = TIMELINE_DOT_GLOW[index % TIMELINE_DOT_GLOW.length];
                                const year = edu.year ? String(edu.year) : "";

                                return (
                                    <motion.li
                                        key={`${edu.degree}-${index}`}
                                        initial={{ opacity: 0, y: 14 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.45, delay: index * 0.07 }}
                                        className="relative pl-14 md:pl-20"
                                    >
                                        <span
                                            className={`absolute left-5 md:left-7 top-5 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br ${palette} ${dotGlow} ring-4 ring-white dark:ring-slate-900 z-10`}
                                        />
                                        <span className="absolute left-5 md:left-7 top-5 translate-y-[-1px] h-[2px] w-7 md:w-10 bg-gradient-to-r from-[#1a2355]/40 to-transparent dark:from-white/30" />

                                        <div className="group relative bg-white dark:bg-slate-900/70 backdrop-blur-xl rounded-xl border-2 border-[#1a2355]/10 dark:border-white/10 p-4 shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 overflow-hidden">
                                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${palette} opacity-70 group-hover:opacity-100 transition-opacity`} />
                                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#ee7c7e]/5 blur-3xl rounded-full group-hover:bg-[#ee7c7e]/15 transition-colors" />

                                            <div className="relative z-10 flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    {year && (
                                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em] text-white bg-gradient-to-r ${palette} mb-2 shadow-sm`}>
                                                            {year}
                                                        </span>
                                                    )}
                                                    <h3 className="text-sm md:text-base font-black text-[#1a2355] dark:text-white leading-snug">
                                                        {edu.degree}
                                                    </h3>
                                                    {edu.university && (
                                                        <p className="mt-1 text-xs text-gray-500 dark:text-slate-400 font-medium leading-snug">
                                                            {edu.university}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${palette} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}>
                                                    <SchoolIcon sx={{ fontSize: 18 }} />
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
        </div>
    );
}
