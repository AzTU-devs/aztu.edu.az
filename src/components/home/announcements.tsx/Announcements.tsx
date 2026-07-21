"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CampaignIcon from "@mui/icons-material/Campaign";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { announcementSlug } from "@/util/slugify";
import apiClient from "@/util/apiClient";
import { useLanguage } from "@/context/LanguageContext";

function parseDate(iso: string, months: readonly string[]) {
    const d = new Date(iso);
    return {
        date: String(d.getUTCDate()).padStart(2, "0"),
        month: months[d.getUTCMonth()],
        year: String(d.getUTCFullYear()),
    };
}

interface ApiAnnouncement {
    id: number;
    title: string;
    html_content: string;
    is_active: boolean;
    created_at: string;
    display_order: number;
}

export default function Announcements() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [announcements, setAnnouncements] = useState<ApiAnnouncement[]>([]);
    const [loading, setLoading] = useState(true);
    const [errored, setErrored] = useState(false);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setErrored(false);
        apiClient
            .get(`/api/announcement/public/all?start=0&end=4`, {
                headers: { "Accept-Language": lang },
            })
            .then((res) => {
                if (cancelled) return;
                const list = res?.data?.announcements;
                setAnnouncements(Array.isArray(list) ? list : []);
            })
            .catch(() => {
                if (cancelled) return;
                setErrored(true);
                setAnnouncements([]);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => { cancelled = true; };
    }, [lang]);

    return (
        <section
            ref={sectionRef}
            className="relative bg-white section-padding"
        >
            <div className="shell !px-0">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="flex items-center gap-3 mb-5">
                            <span className="w-6 h-px bg-[#ee7c7e]" />
                            <span className="eyebrow">{t.announcements.sectionLabel}</span>
                        </div>
                        <h2 className="section-title flex items-center gap-4">
                            <CampaignIcon sx={{ fontSize: { xs: 28, md: 36 }, color: '#ee7c7e' }} />
                            {t.announcements.sectionTitle}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <Link href="/announcement">
                            <button className="group inline-flex items-center gap-3 rounded-full border border-[#1a2355]/12 bg-white py-3 pl-6 pr-3 text-[13px] font-semibold text-[#10163a] transition-all duration-300 hover:border-[#1a2355] hover:bg-[#1a2355] hover:text-white cursor-pointer">
                                {t.announcements.viewAll}
                                <span className="w-8 h-8 rounded-full bg-[#1a2355]/5 flex items-center justify-center transition-all duration-300 group-hover:bg-white/15">
                                    <ChevronRightIcon sx={{ fontSize: 18 }} />
                                </span>
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* Loading Skeleton */}
                <AnimatePresence>
                    {loading && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-pulse"
                        >
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-[#1a2355]/[0.04] rounded-[12px] h-48 border border-[#1a2355]/[0.06]" />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {!loading && errored && (
                    <div className="rounded-[14px] border border-[#ee7c7e]/30 bg-[#ee7c7e]/5 text-[#545e80] text-sm px-6 py-4 mb-6">
                        {t.announcements.sectionLabel} — connection error. Please retry.
                    </div>
                )}

                {/* Announcement Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {announcements.map((announcement, idx) => {
                            const { date, month } = parseDate(announcement.created_at, t.announcements.months);
                            return (
                                <motion.div
                                    key={announcement.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        duration: 0.6,
                                        ease: [0.23, 1, 0.32, 1],
                                        delay: 0.2 + idx * 0.08,
                                    }}
                                    className="h-full"
                                >
                                    <Link href={`/announcement/${announcementSlug(announcement.id, announcement.title)}`}>
                                        <div className="surface-card group relative h-full flex flex-col p-7 overflow-hidden hover:-translate-y-1">
                                            {/* Date Badge */}
                                            <div className="mb-7 flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-[14px] bg-[#1a2355]/[0.04] border border-[#1a2355]/[0.07] flex flex-col items-center justify-center text-[#10163a] transition-colors duration-500 group-hover:bg-[#ee7c7e] group-hover:border-[#ee7c7e] group-hover:text-white">
                                                    <span className="text-lg font-semibold leading-none tabular-nums">{date}</span>
                                                    <span className="text-[10px] font-medium uppercase tracking-wide opacity-60 group-hover:opacity-100">{month}</span>
                                                </div>
                                                <div className="h-px flex-1 bg-[#1a2355]/[0.09]" />
                                                <CalendarMonthIcon sx={{ fontSize: 16 }} className="text-[#8a93ad]" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <h3 className="text-[#10163a] font-semibold text-[17px] leading-snug line-clamp-3 tracking-[-0.01em] transition-colors duration-300 group-hover:text-[#ee7c7e]">
                                                    {announcement.title}
                                                </h3>
                                            </div>

                                            {/* Footer Interaction */}
                                            <div className="mt-7 flex items-center justify-between">
                                                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8a93ad] transition-colors group-hover:text-[#ee7c7e]">Details</span>
                                                <div className="w-9 h-9 rounded-full bg-[#1a2355]/[0.04] flex items-center justify-center text-[#1a2355] transition-all duration-300 group-hover:bg-[#ee7c7e] group-hover:text-white">
                                                    <ChevronRightIcon sx={{ fontSize: 18 }} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
