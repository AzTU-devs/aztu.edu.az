"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import ComingSoon from "@/components/shared/ComingSoon";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import Loading from "@/components/loading/Loading";
import { SectionCard, CARD } from "@/components/department/ui";
import { getDepartmentBySlug, getImageUrl } from "@/services/departmentService/departmentService";
import type { DepartmentDetail, Education, WorkingHour } from "@/types/department";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
    params: Promise<{ department_code: string }>;
}

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

    const t = {
        leadership: currentLang === "az" ? "Şöbə rəhbəri" : "Department head",
        profile: currentLang === "az" ? "Profil" : "Profile",
        bioEyebrow: currentLang === "az" ? "Peşəkar yol" : "Professional background",
        bio: currentLang === "az" ? "Bioqrafiya" : "Biography",
        office: currentLang === "az" ? "Otaq" : "Room",
        reception: currentLang === "az" ? "Qəbul saatları" : "Office hours",
        receptionEyebrow: currentLang === "az" ? "Tələbə və əməkdaş qəbulu" : "Open to students & staff",
        education: currentLang === "az" ? "Təhsil" : "Education",
        educationEyebrow: currentLang === "az" ? "Akademik yol" : "Academic journey",
        noData:
            currentLang === "az"
                ? "Rəhbərlik haqqında məlumat tapılmadı"
                : "Leadership information not found",
    };

    if (!director) return <ComingSoon label={t.noData} />;

    const profileImage = getImageUrl(director.profile_image);
    const fullName = [director.first_name, director.last_name, director.father_name]
        .filter(Boolean)
        .join(" ");

    const workingHours: WorkingHour[] = Array.isArray(director.working_hours)
        ? director.working_hours
        : [];
    const educations: Education[] = Array.isArray(director.educations) ? director.educations : [];
    const sortedEducations = [...educations].sort(
        (a, b) =>
            (parseInt(String(b.year ?? "0"), 10) || 0) - (parseInt(String(a.year ?? "0"), 10) || 0)
    );

    return (
        <div className="space-y-6">
            {/* PROFILE */}
            <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                className={`text-flow ${CARD} overflow-hidden`}
            >
                <div className="grid grid-cols-1 md:grid-cols-12">
                    {/* Portrait */}
                    <div className="relative md:col-span-4 lg:col-span-3">
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-[#1a2355] to-[#0f172a] md:h-full">
                            {profileImage ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={profileImage}
                                    alt={fullName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="flex h-full w-full items-center justify-center">
                                    <PersonIcon sx={{ fontSize: 110 }} className="text-white/15" />
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Identity */}
                    <div className="flex flex-col justify-center p-6 md:col-span-8 md:p-9 lg:col-span-9">
                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e]">
                            {t.leadership}
                        </p>
                        <h1 className="text-2xl font-black leading-[1.1] tracking-tight text-[#1a2355] dark:text-white md:text-4xl">
                            {fullName}
                        </h1>

                        {(director.scientific_title || director.scientific_degree) && (
                            <div className="mt-3 space-y-1">
                                {director.scientific_title && (
                                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                                        {director.scientific_title}
                                    </p>
                                )}
                                {director.scientific_degree && (
                                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                                        {director.scientific_degree}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="mt-7 flex flex-wrap gap-2.5">
                            {director.email && (
                                <a
                                    href={`mailto:${director.email}`}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#1a2355] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#ee7c7e]"
                                >
                                    <EmailIcon sx={{ fontSize: 15 }} />
                                    <span className="max-w-[220px] truncate">{director.email}</span>
                                </a>
                            )}
                            {director.phone && (
                                <a
                                    href={`tel:${director.phone}`}
                                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-[#1a2355] transition-colors hover:border-[#ee7c7e] hover:text-[#ee7c7e] dark:border-white/10 dark:text-white"
                                >
                                    <PhoneIcon sx={{ fontSize: 15 }} />
                                    {director.phone}
                                </a>
                            )}
                            {director.room_number && (
                                <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-[#1a2355] dark:border-white/10 dark:text-white">
                                    <LocationOnIcon sx={{ fontSize: 15 }} />
                                    {t.office} {director.room_number}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* OFFICE HOURS */}
            {workingHours.length > 0 && (
                <SectionCard
                    icon={AccessTimeIcon}
                    eyebrow={t.receptionEyebrow}
                    title={t.reception}
                    delay={0.04}
                >
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                        {workingHours.map((wh, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 dark:border-white/10 dark:bg-white/5"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                                    {wh.day}
                                </span>
                                <span className="text-sm font-black tabular-nums text-[#1a2355] dark:text-white">
                                    {wh.time_range}
                                </span>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            )}

            {/* BIOGRAPHY */}
            {director.bio && (
                <SectionCard
                    icon={ArticleOutlinedIcon}
                    eyebrow={t.bioEyebrow}
                    title={t.bio}
                    delay={0.06}
                >
                    <SanitizedHtml
                        html={director.bio}
                        className="text-flow prose prose-slate max-w-none text-[15px] leading-relaxed text-slate-600 dark:prose-invert dark:text-slate-300 md:text-base"
                    />
                </SectionCard>
            )}

            {/* EDUCATION TIMELINE */}
            {sortedEducations.length > 0 && (
                <SectionCard
                    icon={SchoolOutlinedIcon}
                    eyebrow={t.educationEyebrow}
                    title={t.education}
                    delay={0.08}
                >
                    <ol className="relative">
                        <span className="absolute bottom-3 left-[7px] top-3 w-px bg-slate-200 dark:bg-white/10" />
                        {sortedEducations.map((edu, index) => (
                            <motion.li
                                key={`${edu.degree}-${index}`}
                                initial={{ opacity: 0, x: -6 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
                                className="relative flex gap-5 pb-7 last:pb-0"
                            >
                                <span className="relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-[3px] border-white bg-[#1a2355] ring-1 ring-slate-200 dark:border-slate-900 dark:ring-white/15" />
                                <div className="min-w-0 flex-1">
                                    {edu.year && (
                                        <span className="mb-1.5 inline-block rounded-md bg-[#ee7c7e]/10 px-2 py-0.5 text-[10px] font-black tabular-nums uppercase tracking-[0.2em] text-[#ee7c7e]">
                                            {edu.year}
                                        </span>
                                    )}
                                    <h3 className="text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
                                        {edu.degree}
                                    </h3>
                                    {edu.university && (
                                        <p className="mt-1 text-[13px] font-medium text-slate-500 dark:text-slate-400">
                                            {edu.university}
                                        </p>
                                    )}
                                </div>
                            </motion.li>
                        ))}
                    </ol>
                </SectionCard>
            )}
        </div>
    );
}
