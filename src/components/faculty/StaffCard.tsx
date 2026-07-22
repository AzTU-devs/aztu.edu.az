"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FACULTY_PALETTES } from "@/components/faculty/ui";

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
    const palette = FACULTY_PALETTES[index % FACULTY_PALETTES.length];

    const inner = (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
            className={`group flex h-full flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-[#101733] dark:hover:border-white/20 ${href ? "cursor-pointer" : ""}`}
        >
            {/* Avatar */}
            <div className={`relative h-20 w-20 overflow-hidden rounded-full bg-slate-100 ring-4 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 dark:bg-[#161f42] ${palette.ring}`}>
                {photoUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={photoUrl}
                        alt={fullName}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <span className="flex h-full w-full items-center justify-center">
                        <PersonIcon sx={{ fontSize: 40 }} className="text-slate-300 dark:text-slate-600" />
                    </span>
                )}
            </div>

            {badge && (
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${palette.chip}`}>
                    {badge}
                </span>
            )}

            <h3 className="text-sm font-bold leading-tight tracking-tight text-slate-900 transition-colors group-hover:text-[#ee7c7e] dark:text-white md:text-[15px]">
                {fullName}
            </h3>

            {degree && (
                <span className="text-[11px] font-medium leading-snug text-slate-400 dark:text-slate-500">
                    {degree}
                </span>
            )}

            {role && (
                <p className="text-xs font-medium leading-snug text-slate-600 dark:text-slate-300">
                    {role}
                </p>
            )}

            {(email || phone) && (
                <div className="mt-1 w-full space-y-1.5 border-t border-slate-100 pt-3 dark:border-white/5">
                    {email && (
                        <a
                            href={`mailto:${email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 transition-colors hover:text-[#ee7c7e] dark:text-slate-400"
                        >
                            <EmailIcon sx={{ fontSize: 13 }} className={palette.text} />
                            <span className="truncate">{email}</span>
                        </a>
                    )}
                    {phone && (
                        <a
                            href={`tel:${phone.replace(/\s+/g, "")}`}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 transition-colors hover:text-[#ee7c7e] dark:text-slate-400"
                        >
                            <PhoneIcon sx={{ fontSize: 13 }} className={palette.text} />
                            <span>{phone}</span>
                        </a>
                    )}
                </div>
            )}

            {href && (
                <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-[#1a2355] opacity-0 transition-opacity group-hover:opacity-100 dark:text-white">
                    Profil
                    <ArrowForwardIcon sx={{ fontSize: 13 }} />
                </span>
            )}
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
