"use client";

import { motion } from "framer-motion";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import VerifiedIcon from "@mui/icons-material/Verified";

export type HeroLeader = {
    first_name?: string | null;
    last_name?: string | null;
    scientific_title?: string | null;
    scientific_degree?: string | null;
    email?: string | null;
    phone?: string | null;
    room?: string | null;
    profile_image?: string | null;
};

type Props = {
    /** Who this person is to the page — "Şöbə rəhbəri", "Dekan", "Kafedra müdiri". */
    eyebrow: string;
    leader?: HeroLeader | null;
    /** Resolves `profile_image` to a URL — each service has its own base. */
    resolveImage: (path?: string | null) => string | undefined | null;
    lang: "az" | "en";
    loading?: boolean;
    className?: string;
};

/**
 * The glass "who leads this unit" panel that sits in a dark page hero.
 *
 * Shared by the structural-unit, faculty and cafedra heroes so the head of a
 * unit is presented identically everywhere — portrait, name, title, degree and
 * direct contact actions, all above the fold.
 */
export default function HeroLeaderCard({
    eyebrow,
    leader,
    resolveImage,
    lang,
    loading = false,
    className = "",
}: Props) {
    const t = {
        room: lang === "az" ? "Otaq" : "Room",
        empty: lang === "az" ? "Məlumat əlavə ediləcək" : "To be announced",
    };

    const name = leader
        ? [leader.first_name, leader.last_name].filter(Boolean).join(" ")
        : "";
    const photo = leader ? resolveImage(leader.profile_image) : undefined;
    const hasContact = Boolean(leader?.email || leader?.phone || leader?.room);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
            className={className}
        >
            <div className="text-flow rounded-[1.5rem] border border-white/12 bg-white/[0.07] p-6 shadow-2xl shadow-black/25 backdrop-blur-2xl md:p-7">
                <p className="mb-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.32em] text-white/50">
                    <VerifiedIcon sx={{ fontSize: 15 }} className="text-[#ee7c7e]" />
                    {eyebrow}
                </p>

                <div className="flex items-center gap-5">
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-xl md:h-32 md:w-32">
                        {photo ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={photo} alt={name} className="h-full w-full object-cover" />
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
                                {name || t.empty}
                            </p>
                        )}
                        {leader?.scientific_title && (
                            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
                                {leader.scientific_title}
                            </p>
                        )}
                        {leader?.scientific_degree && (
                            <p className="mt-1.5 text-[13px] font-bold leading-snug text-[#ee7c7e]">
                                {leader.scientific_degree}
                            </p>
                        )}
                    </div>
                </div>

                {hasContact && (
                    <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
                        {leader?.email && (
                            <a
                                href={`mailto:${leader.email}`}
                                className="inline-flex min-w-0 items-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-3.5 py-2.5 text-xs font-bold text-white transition-colors hover:border-[#ee7c7e]/50 hover:bg-white/[0.12]"
                            >
                                <EmailIcon sx={{ fontSize: 15 }} className="shrink-0 text-[#ee7c7e]" />
                                <span className="truncate">{leader.email}</span>
                            </a>
                        )}
                        {leader?.phone && (
                            <a
                                href={`tel:${leader.phone}`}
                                className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-3.5 py-2.5 text-xs font-bold text-white transition-colors hover:border-[#ee7c7e]/50 hover:bg-white/[0.12]"
                            >
                                <PhoneIcon sx={{ fontSize: 15 }} className="shrink-0 text-[#ee7c7e]" />
                                {leader.phone}
                            </a>
                        )}
                        {leader?.room && (
                            <span className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.06] px-3.5 py-2.5 text-xs font-bold text-white">
                                <MeetingRoomIcon sx={{ fontSize: 15 }} className="shrink-0 text-[#ee7c7e]" />
                                {leader.room}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
