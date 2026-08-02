"use client";

import { motion } from "framer-motion";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedIcon from "@mui/icons-material/Verified";

import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { FactTile } from "@/components/department/ui";
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
        staff: lang === "az" ? "Əməkdaş" : "Staff",
        room: lang === "az" ? "Otaq" : "Room",
        phone: lang === "az" ? "Telefon" : "Phone",
        email: lang === "az" ? "E-poçt" : "Email",
        noHead: lang === "az" ? "Məlumat əlavə ediləcək" : "To be announced",
    };

    const director = department?.director;
    const directorName = director
        ? [director.first_name, director.last_name, director.father_name].filter(Boolean).join(" ")
        : "";
    const directorPhoto = director ? getImageUrl(director.profile_image) : "";
    const staffCount = department?.workers?.length ?? 0;

    const facts = [
        staffCount > 0 && { icon: GroupsIcon, label: t.staff, value: String(staffCount) },
        director?.room_number && { icon: MeetingRoomIcon, label: t.room, value: director.room_number },
        director?.phone && {
            icon: PhoneIcon,
            label: t.phone,
            value: director.phone,
            href: `tel:${director.phone}`,
        },
        director?.email && {
            icon: EmailIcon,
            label: t.email,
            value: director.email,
            href: `mailto:${director.email}`,
        },
    ].filter(Boolean) as { icon: React.ElementType; label: string; value: string; href?: string }[];

    return (
        <header className="text-flow relative overflow-hidden bg-[#0a0c1a] pt-32 md:pt-36">
            {/* Depth layers — same visual language as the site's other page heroes */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c1a] via-[#111827] to-[#0f172a]" />
                <div
                    className="absolute inset-0 opacity-[0.14]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.14) 1px, transparent 0)",
                        backgroundSize: "44px 44px",
                    }}
                />
                <div className="absolute -right-[10%] -top-[30%] h-[700px] w-[700px] rounded-full bg-blue-800/25 blur-[170px]" />
                <div className="absolute -bottom-[40%] left-[5%] h-[520px] w-[520px] rounded-full bg-[#ee7c7e]/12 blur-[150px]" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 md:px-10 lg:px-20">
                <Breadcrumbs
                    items={[
                        { label: t.units, href: listPath },
                        { label: loading ? "…" : department?.department_name ?? "" },
                    ]}
                />

                <div className="grid grid-cols-1 gap-10 pb-10 lg:grid-cols-12 lg:gap-14">
                    {/* Identity */}
                    <div className="lg:col-span-7 xl:col-span-8">
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
                                {!loading && department?.department_code && (
                                    <span className="rounded-xl border border-[#ee7c7e]/35 bg-[#ee7c7e]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-[#ee7c7e]">
                                        {department.department_code}
                                    </span>
                                )}
                            </div>

                            {loading ? (
                                <div className="space-y-4">
                                    <div className="h-12 w-4/5 animate-pulse rounded-2xl bg-white/10" />
                                    <div className="h-12 w-2/5 animate-pulse rounded-2xl bg-white/[0.07]" />
                                </div>
                            ) : (
                                <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tighter text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:text-6xl xl:text-[68px]">
                                    {department?.department_name}
                                </h1>
                            )}

                            <div className="mt-8 h-px w-full max-w-md bg-gradient-to-r from-[#ee7c7e] via-white/20 to-transparent" />
                        </motion.div>
                    </div>

                    {/* Department head — real content above the fold */}
                    <motion.div
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
                        className="lg:col-span-5 xl:col-span-4"
                    >
                        <div className="rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-2xl">
                            <p className="mb-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-white/45">
                                <VerifiedIcon sx={{ fontSize: 13 }} className="text-[#ee7c7e]" />
                                {t.head}
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border border-white/15 bg-white/10">
                                    {directorPhoto ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={directorPhoto}
                                            alt={directorName}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="flex h-full w-full items-center justify-center">
                                            <PersonIcon sx={{ fontSize: 34 }} className="text-white/25" />
                                        </span>
                                    )}
                                </div>

                                <div className="min-w-0">
                                    {loading ? (
                                        <div className="h-5 w-40 animate-pulse rounded-lg bg-white/10" />
                                    ) : (
                                        <p className="text-[17px] font-black leading-tight tracking-tight text-white">
                                            {directorName || t.noHead}
                                        </p>
                                    )}
                                    {director?.scientific_title && (
                                        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">
                                            {director.scientific_title}
                                        </p>
                                    )}
                                    {director?.scientific_degree && (
                                        <p className="mt-1 truncate text-[11px] font-bold text-[#ee7c7e]">
                                            {director.scientific_degree}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Fact rail */}
                {facts.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.24 }}
                        className="grid grid-cols-2 gap-3 border-t border-white/10 py-6 md:grid-cols-4"
                    >
                        {facts.map((f) => (
                            <FactTile key={f.label} {...f} />
                        ))}
                    </motion.div>
                )}
            </div>
        </header>
    );
}
