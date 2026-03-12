"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CampaignIcon from "@mui/icons-material/Campaign";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://api-aztu.karamshukurlu.site";

const MONTHS_AZ = [
    "Yanvar","Fevral","Mart","Aprel","May","İyun",
    "İyul","Avqust","Sentyabr","Oktyabr","Noyabr","Dekabr",
];

function parseDate(iso: string) {
    const d = new Date(iso);
    return {
        date: String(d.getUTCDate()).padStart(2, "0"),
        month: MONTHS_AZ[d.getUTCMonth()],
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
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const [announcements, setAnnouncements] = useState<ApiAnnouncement[]>([]);

    useEffect(() => {
        fetch(`${API_BASE}/api/announcement/public/all?start=0&end=4`)
            .then((r) => r.json())
            .then((data) => setAnnouncements(data.announcements ?? []))
            .catch(() => {});
    }, []);

    return (
        <section
            ref={sectionRef}
            className="px-4 md:px-10 lg:px-20 py-16 bg-[#1a2355] relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/4 pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.02] pointer-events-none" />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4"
            >
                <div>
                    <p className="text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                        AzTU Elanları
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight flex items-center gap-3">
                        <CampaignIcon sx={{ fontSize: 36, opacity: 0.85 }} />
                        Elanlar
                    </h2>
                </div>
                <Link href="/announcements">
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="group flex items-center gap-2 bg-white py-2.5 px-5 rounded-xl text-[#1a2355] font-bold cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                    >
                        Bütün Elanlar
                        <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </motion.button>
                </Link>
            </motion.div>

            {/* Announcement Cards */}
            <div className="flex flex-wrap gap-5">
                {announcements.map((announcement, idx) => {
                    const { date, month } = parseDate(announcement.created_at);
                    return (
                        <motion.div
                            key={announcement.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.55,
                                ease: "easeOut",
                                delay: 0.15 + idx * 0.1,
                            }}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="flex-1 min-w-[260px] max-w-full md:max-w-none"
                        >
                            <Link href={`/announcements/${announcement.id}`}>
                                <div className="group flex items-start gap-4 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-5 h-full cursor-pointer hover:bg-white/20 transition-colors duration-300">
                                    {/* Date badge */}
                                    <div className="bg-white/15 border border-white/20 rounded-xl w-[76px] md:w-[84px] min-h-[70px] text-center font-bold text-white flex-shrink-0 flex flex-col items-center justify-center gap-0.5 p-2">
                                        <CalendarMonthIcon sx={{ fontSize: 16, opacity: 0.7 }} />
                                        <p className="text-xs leading-tight">{date}</p>
                                        <p className="text-[10px] opacity-70 leading-tight">{month}</p>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col gap-2 flex-1 min-w-0">
                                        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-white/80 transition-colors duration-200">
                                            {announcement.title}
                                        </h3>
                                    </div>

                                    <ChevronRightIcon
                                        sx={{ fontSize: 18 }}
                                        className="text-white/30 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white/60 mt-0.5"
                                    />
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
