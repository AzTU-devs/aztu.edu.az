"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export const STAFF_PALETTES = [
    {
        gradient: "from-blue-600 to-indigo-700",
        soft: "from-blue-500/10 to-indigo-500/5",
        text: "text-blue-700",
        glow: "shadow-blue-500/30",
        accent: "bg-blue-500",
        chip: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20",
    },
    {
        gradient: "from-emerald-500 to-teal-600",
        soft: "from-emerald-500/10 to-teal-500/5",
        text: "text-emerald-700",
        glow: "shadow-emerald-500/30",
        accent: "bg-emerald-500",
        chip: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
    },
    {
        gradient: "from-[#ee7c7e] to-[#f97316]",
        soft: "from-[#ee7c7e]/10 to-orange-500/5",
        text: "text-[#ee7c7e]",
        glow: "shadow-[#ee7c7e]/30",
        accent: "bg-[#ee7c7e]",
        chip: "bg-[#ee7c7e]/10 text-[#ee7c7e] border-[#ee7c7e]/30 dark:bg-[#ee7c7e]/15 dark:text-[#fb7185] dark:border-[#ee7c7e]/30",
    },
    {
        gradient: "from-purple-500 to-violet-700",
        soft: "from-purple-500/10 to-violet-500/5",
        text: "text-purple-700",
        glow: "shadow-purple-500/30",
        accent: "bg-purple-500",
        chip: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20",
    },
    {
        gradient: "from-amber-500 to-orange-600",
        soft: "from-amber-500/10 to-orange-500/5",
        text: "text-amber-700",
        glow: "shadow-amber-500/30",
        accent: "bg-amber-500",
        chip: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",
    },
    {
        gradient: "from-cyan-500 to-sky-600",
        soft: "from-cyan-500/10 to-sky-500/5",
        text: "text-cyan-700",
        glow: "shadow-cyan-500/30",
        accent: "bg-cyan-500",
        chip: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/20",
    },
];

interface StaffCardProps {
    fullName: string;
    role?: string;
    degree?: string;
    photoUrl?: string | null;
    email?: string;
    phone?: string;
    index?: number;
    href?: string;
    badge?: string;
}

export default function StaffCard({
    fullName,
    role,
    degree,
    photoUrl,
    email,
    phone,
    index = 0,
    href,
    badge,
}: StaffCardProps) {
    const palette = STAFF_PALETTES[index % STAFF_PALETTES.length];

    const inner = (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.4) }}
            className={`group relative h-full bg-white dark:bg-slate-900/70 backdrop-blur-xl rounded-[1.75rem] border-2 border-[#1a2355]/10 dark:border-white/10 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:border-transparent hover:shadow-2xl ${palette.glow} ${href ? "cursor-pointer" : ""}`}
        >
            <div
                className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${palette.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
            />
            <div
                className={`absolute inset-0 bg-gradient-to-br ${palette.soft} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
            />
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-[#ee7c7e]/10 to-transparent blur-3xl rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-125" />

            <div className="relative z-10 p-5 flex flex-col items-center text-center gap-3">
                {/* Avatar with gradient ring */}
                <div className="relative">
                    <div
                        className={`absolute inset-0 rounded-full bg-gradient-to-br ${palette.gradient} blur-md opacity-40 group-hover:opacity-70 transition-opacity`}
                    />
                    <div
                        className={`relative w-24 h-24 rounded-full overflow-hidden border-[3px] border-white dark:border-slate-800 shadow-xl bg-gradient-to-br ${palette.gradient} flex items-center justify-center`}
                    >
                        {photoUrl ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img
                                src={photoUrl}
                                alt={fullName}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <PersonIcon sx={{ fontSize: 56, color: "white", opacity: 0.45 }} />
                        )}
                    </div>
                </div>

                {/* Optional badge / role label */}
                {badge && (
                    <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.25em] border ${palette.chip}`}
                    >
                        {badge}
                    </span>
                )}

                {/* Name */}
                <h3 className="text-sm md:text-base font-black text-[#1a2355] dark:text-white leading-tight tracking-tight group-hover:text-[#ee7c7e] transition-colors">
                    {fullName}
                </h3>

                {/* Degree */}
                {degree && (
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 dark:text-slate-400 leading-snug">
                        {degree}
                    </span>
                )}

                {/* Role */}
                {role && (
                    <p className="text-xs font-bold text-[#1a2355]/80 dark:text-slate-200 leading-snug px-2">
                        {role}
                    </p>
                )}

                {/* Contact */}
                {(email || phone) && (
                    <div className="w-full pt-3 mt-1 border-t border-[#1a2355]/10 dark:border-white/5 space-y-1.5">
                        {email && (
                            <a
                                href={`mailto:${email}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 text-[10px] text-gray-600 dark:text-slate-300 hover:text-[#ee7c7e] transition-colors justify-center"
                            >
                                <EmailIcon sx={{ fontSize: 12 }} className={palette.text} />
                                <span className="truncate">{email}</span>
                            </a>
                        )}
                        {phone && (
                            <a
                                href={`tel:${phone.replace(/\s+/g, "")}`}
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 text-[10px] text-gray-600 dark:text-slate-300 hover:text-[#ee7c7e] transition-colors justify-center"
                            >
                                <PhoneIcon sx={{ fontSize: 12 }} className={palette.text} />
                                <span>{phone}</span>
                            </a>
                        )}
                    </div>
                )}

                {href && (
                    <div className="w-full mt-2 flex items-center justify-between rounded-xl bg-[#1a2355]/5 dark:bg-white/5 px-3 py-2 group-hover:bg-gradient-to-r group-hover:from-[#1a2355] group-hover:to-[#3b82f6] transition-colors">
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#1a2355]/60 dark:text-white/60 group-hover:text-white transition-colors">
                            Profile
                        </span>
                        <ChevronRightIcon
                            sx={{ fontSize: 14 }}
                            className="text-[#1a2355]/50 dark:text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all"
                        />
                    </div>
                )}
            </div>
        </motion.div>
    );

    if (href) {
        return (
            <Link href={href} className="block h-full">
                {inner}
            </Link>
        );
    }
    return <div className="h-full">{inner}</div>;
}
