"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CampaignIcon from "@mui/icons-material/Campaign";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://api-aztu.karamshukurlu.site";

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
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [announcements, setAnnouncements] = useState<ApiAnnouncement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_BASE}/api/announcement/public/all?start=0&end=4`)
            .then((r) => r.json())
            .then((data) => {
                setAnnouncements(data.announcements ?? []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative px-4 md:px-10 lg:px-20 py-24 bg-[#0b1330] overflow-hidden"
        >
            {/* STUNNING BACKGROUND ELEMENTS */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Dotted Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.04]" 
                     style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
                
                {/* Glow Orbs */}
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#ee7c7e]/[0.08] blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/[0.05] blur-[100px] rounded-full" />
                
                {/* Typographic Watermark */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 select-none opacity-[0.02]">
                    <h1 className="text-[250px] font-black tracking-tighter leading-none text-white vertical-text uppercase" style={{ writingMode: 'vertical-rl' }}>Notice</h1>
                </div>
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 mb-6 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse shadow-[0_0_8px_#ee7c7e]" />
                            <span className="text-white text-[11px] font-black uppercase tracking-[0.4em]">
                                {t.announcements.sectionLabel}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter flex items-center gap-4">
                            <CampaignIcon sx={{ fontSize: { xs: 32, md: 48 }, color: '#ee7c7e' }} />
                            {t.announcements.sectionTitle}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <Link href="/announcements">
                            <button className="group flex items-center gap-4 bg-white/5 backdrop-blur-xl py-4 px-8 rounded-2xl text-white font-black uppercase tracking-widest text-xs border border-white/10 hover:bg-[#ee7c7e] hover:border-[#ee7c7e] transition-all duration-500 shadow-xl cursor-pointer">
                                {t.announcements.viewAll}
                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <ChevronRightIcon sx={{ fontSize: 20 }} />
                                </div>
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
                                <div key={i} className="bg-white/5 rounded-[2.5rem] h-48 border border-white/5" />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

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
                                    <Link href={`/announcements/${announcement.id}`}>
                                        <div className="group relative h-full flex flex-col bg-white/5 backdrop-blur-sm border border-white/5 rounded-[2.5rem] p-8 transition-all duration-500 hover:bg-white/[0.08] hover:border-[#ee7c7e]/30 hover:shadow-2xl hover:shadow-[#ee7c7e]/5 overflow-hidden">
                                            {/* Hover accent line */}
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-[#ee7c7e] group-hover:w-1/2 transition-all duration-500 rounded-full" />
                                            
                                            {/* Date Badge */}
                                            <div className="relative mb-8 flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-2xl bg-[#ee7c7e]/10 border border-[#ee7c7e]/20 flex flex-col items-center justify-center text-white transition-all duration-500 group-hover:bg-[#ee7c7e] group-hover:shadow-[0_0_20px_#ee7c7e44]">
                                                    <span className="text-xl font-black leading-none">{date}</span>
                                                    <span className="text-[10px] font-black uppercase tracking-tighter opacity-70 group-hover:opacity-100">{month}</span>
                                                </div>
                                                <div className="h-px flex-1 bg-white/10 group-hover:bg-[#ee7c7e]/20 transition-colors" />
                                                <CalendarMonthIcon sx={{ fontSize: 18, color: 'rgba(255,255,255,0.2)' }} className="group-hover:text-[#ee7c7e]/40 transition-colors" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <h3 className="text-white font-black text-lg leading-snug line-clamp-3 group-hover:text-white transition-colors duration-300 tracking-tight">
                                                    {announcement.title}
                                                </h3>
                                            </div>

                                            {/* Footer Interaction */}
                                            <div className="mt-8 flex items-center justify-between">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 group-hover:text-[#ee7c7e] transition-colors">Details</span>
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                                                    <ChevronRightIcon sx={{ fontSize: 20 }} className="group-hover:translate-x-0.5 transition-transform" />
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
