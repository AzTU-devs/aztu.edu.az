"use client";

import { motion } from "framer-motion";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import VerifiedIcon from "@mui/icons-material/Verified";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";
import { getImageUrl } from "@/services/departmentService/departmentService";
import type { DepartmentDetail } from "@/types/department";

type Props = {
    department: DepartmentDetail | null;
    loading: boolean;
    lang: "az" | "en";
    listPath: string;
};

export default function DepartmentHero({ department, loading, lang, listPath }: Props) {
    const t = {
        section: lang === "az" ? "Struktur bölmə" : "Structural unit",
        units: lang === "az" ? "Struktur Bölmələr" : "Structural Units",
        head: lang === "az" ? "Şöbə rəhbəri" : "Department head",
        staff: lang === "az" ? "əməkdaş" : "staff members",
        room: lang === "az" ? "Otaq" : "Room",
        noHead: lang === "az" ? "Məlumat əlavə ediləcək" : "To be announced",
    };

    const director = department?.director;
    const directorName = director
        ? [director.first_name, director.last_name, director.father_name].filter(Boolean).join(" ")
        : "";
    const directorPhoto = director ? getImageUrl(director.profile_image) : "";
    const staffCount = department?.workers?.length ?? 0;

    return (
        <header className="text-flow relative flex flex-col overflow-hidden bg-[#0a0c1a] pt-40 lg:pt-48">
            {/* Video background — same treatment as the offices & centres pages */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c1a] via-[#111827] to-[#0f172a]" />
                <AboutHeroVideoBg />
                {/* Scrim so the title stays legible over any frame of the video */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c1a]/85 via-[#0a0c1a]/40 to-transparent" />
                <div className="absolute -right-[10%] -top-[30%] h-[700px] w-[700px] rounded-full bg-blue-800/20 blur-[170px]" />
                <div className="absolute -bottom-[40%] left-[5%] h-[520px] w-[520px] rounded-full bg-[#ee7c7e]/10 blur-[150px]" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-14 md:px-10 lg:px-20">
                <Breadcrumbs
                    items={[
                        { label: t.units, href: listPath },
                        { label: loading ? "…" : department?.department_name ?? "" },
                    ]}
                />

                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
                    {/* Identity */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <div className="mb-5 flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-3.5 py-1.5 backdrop-blur-xl">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#ee7c7e] shadow-[0_0_10px_#ee7c7e]" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.32em] text-white/85">
                                        {t.section}
                                    </span>
                                </span>
                            </div>

                            {loading ? (
                                <div className="space-y-4">
                                    <div className="h-12 w-4/5 animate-pulse rounded-2xl bg-white/10" />
                                    <div className="h-12 w-2/5 animate-pulse rounded-2xl bg-white/[0.07]" />
                                </div>
                            ) : (
                                <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.55)] md:text-5xl xl:text-6xl">
                                    {department?.department_name}
                                </h1>
                            )}

                            <div className="mt-7 flex items-center gap-5">
                                <span className="h-px w-16 bg-gradient-to-r from-[#ee7c7e] to-transparent" />
                                {staffCount > 0 && (
                                    <span className="inline-flex items-baseline gap-2">
                                        <span className="text-2xl font-black tabular-nums tracking-tighter text-white">
                                            {staffCount}
                                        </span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.28em] text-white/50">
                                            {t.staff}
                                        </span>
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Department head — the hero's second subject, not a footnote */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
                        className="lg:col-span-5"
                    >
                        <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.07] p-6 shadow-2xl shadow-black/25 backdrop-blur-2xl md:p-7">
                            <p className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.32em] text-white/50">
                                <VerifiedIcon sx={{ fontSize: 15 }} className="text-[#ee7c7e]" />
                                {t.head}
                            </p>

                            <div className="flex items-center gap-5">
                                <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-xl md:h-32 md:w-32">
                                    {directorPhoto ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={directorPhoto}
                                            alt={directorName}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="flex h-full w-full items-center justify-center">
                                            <PersonIcon sx={{ fontSize: 56 }} className="text-white/25" />
                                        </span>
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    {loading ? (
                                        <div className="space-y-2.5">
                                            <div className="h-6 w-44 animate-pulse rounded-lg bg-white/10" />
                                            <div className="h-4 w-28 animate-pulse rounded-lg bg-white/[0.07]" />
                                        </div>
                                    ) : (
                                        <p className="text-xl font-black leading-[1.15] tracking-tight text-white md:text-2xl">
                                            {directorName || t.noHead}
                                        </p>
                                    )}
                                    {director?.scientific_title && (
                                        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
                                            {director.scientific_title}
                                        </p>
                                    )}
                                    {director?.scientific_degree && (
                                        <p className="mt-1.5 text-[13px] font-bold leading-snug text-[#ee7c7e]">
                                            {director.scientific_degree}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {(director?.email || director?.phone || director?.room_number) && (
                                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                                    {director?.email && (
                                        <a
                                            href={`mailto:${director.email}`}
                                            className="inline-flex min-w-0 items-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-3.5 py-2.5 text-xs font-bold text-white transition-colors hover:border-[#ee7c7e]/50 hover:bg-white/[0.12]"
                                        >
                                            <EmailIcon sx={{ fontSize: 15 }} className="shrink-0 text-[#ee7c7e]" />
                                            <span className="truncate">{director.email}</span>
                                        </a>
                                    )}
                                    {director?.phone && (
                                        <a
                                            href={`tel:${director.phone}`}
                                            className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-3.5 py-2.5 text-xs font-bold text-white transition-colors hover:border-[#ee7c7e]/50 hover:bg-white/[0.12]"
                                        >
                                            <PhoneIcon sx={{ fontSize: 15 }} className="shrink-0 text-[#ee7c7e]" />
                                            {director.phone}
                                        </a>
                                    )}
                                    {director?.room_number && (
                                        <span className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-3.5 py-2.5 text-xs font-bold text-white">
                                            <MeetingRoomIcon sx={{ fontSize: 15 }} className="shrink-0 text-[#ee7c7e]" />
                                            {t.room} {director.room_number}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}
