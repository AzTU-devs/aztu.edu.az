"use client";

import Link from "next/link";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CampaignIcon from "@mui/icons-material/Campaign";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.48, delay: i * 0.07, ease: "easeOut" as const },
    }),
};

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<ApiAnnouncement[]>([]);

    useEffect(() => {
        fetch(`${API_BASE}/api/announcement/public/all?start=0&end=100`)
            .then((r) => r.json())
            .then((data) => setAnnouncements(data.announcements ?? []))
            .catch(() => {});
    }, []);

    const featured = announcements[0];
    const rest = announcements.slice(1);

    return (
        <>
            <HeaderChanger />

            <main className="min-h-screen bg-gray-50">

                {/* ── Banner ── */}
                <div className="bg-gradient-to-br from-[#0b1330] via-[#1a2355] to-[#13365E] px-4 md:px-10 lg:px-20 pt-36 pb-20 relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/3 pointer-events-none" />

                    {/* Breadcrumb */}
                    <motion.nav
                        initial={{ opacity: 0, x: -14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-1.5 text-white/40 text-xs mb-6 flex-wrap"
                    >
                        <Link href="/" className="hover:text-white/70 transition-colors">
                            Ana səhifə
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 13 }} />
                        <span className="text-white/60">Elanlar</span>
                    </motion.nav>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-2"
                    >
                        Azərbaycan Texniki Universiteti
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-3 flex items-center gap-4"
                    >
                        <CampaignIcon sx={{ fontSize: 44, opacity: 0.85 }} />
                        Elanlar
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.18 }}
                        className="text-white/70 text-base max-w-xl"
                    >
                        AzTU-nun akademik, tədris, qəbul və inzibati elanları ilə tanış olun.
                    </motion.p>
                </div>

                <div className="px-4 md:px-10 lg:px-20 py-10">

                    {/* ── Empty state ── */}
                    {announcements.length === 0 && (
                        <div className="text-center py-24 text-gray-400 font-semibold text-lg">
                            Elan tapılmadı.
                        </div>
                    )}

                    {featured && (
                        <>
                            {/* ── Featured / Pinned Card ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="mb-10"
                            >
                                <Link href={`/announcements/${featured.id}`}>
                                    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-500">
                                        {/* Top accent bar */}
                                        <div className="h-1.5 w-full bg-[#1a2355]" />

                                        <div className="flex flex-col lg:flex-row gap-0">
                                            {/* Left: Date column */}
                                            {(() => {
                                                const { date, month, year } = parseDate(featured.created_at);
                                                return (
                                                    <div className="lg:w-40 flex-shrink-0 bg-[#1a2355] flex flex-col items-center justify-center p-6 gap-1">
                                                        <CalendarMonthIcon sx={{ color: "white", opacity: 0.6, fontSize: 22 }} />
                                                        <p className="text-white font-bold text-3xl leading-none">{date}</p>
                                                        <p className="text-white/70 text-sm font-medium">{month}</p>
                                                        <p className="text-white/50 text-xs">{year}</p>
                                                    </div>
                                                );
                                            })()}

                                            {/* Right: Content */}
                                            <div className="flex flex-col justify-center px-7 py-7 gap-4 flex-1">
                                                {/* Title */}
                                                <h2 className="text-[#1a2355] font-bold text-xl md:text-2xl leading-snug group-hover:underline decoration-[#1a2355]/30 underline-offset-4">
                                                    {featured.title}
                                                </h2>

                                                {featured.html_content && (
                                                    <div
                                                        className="text-gray-500 text-sm leading-relaxed line-clamp-2"
                                                        dangerouslySetInnerHTML={{ __html: featured.html_content }}
                                                    />
                                                )}

                                                {/* Footer row */}
                                                <div className="flex flex-wrap items-center justify-between gap-3 mt-1">
                                                    <div className="flex items-center gap-1 text-[#1a2355] font-bold text-sm ml-auto">
                                                        Ətraflı oxu
                                                        <ChevronRightIcon
                                                            sx={{ fontSize: 18 }}
                                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* ── Section divider ── */}
                            {rest.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="flex items-center gap-4 mb-8"
                                >
                                    <h2 className="text-xl font-bold text-[#1a2355] flex-shrink-0">
                                        Digər elanlar
                                    </h2>
                                    <div className="flex-1 h-px bg-gray-200" />
                                </motion.div>
                            )}
                        </>
                    )}

                    {/* ── Cards Grid ── */}
                    {rest.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {rest.map((item, i) => {
                                const { date, month, year } = parseDate(item.created_at);
                                return (
                                    <motion.div
                                        key={item.id}
                                        custom={i}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                        className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col cursor-pointer group hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <Link href={`/announcements/${item.id}`} className="flex flex-col h-full">
                                            {/* Accent bar */}
                                            <div className="h-1 w-full bg-[#1a2355]" />

                                            <div className="p-5 flex flex-col gap-3 flex-1">
                                                {/* Date */}
                                                <div className="flex items-center gap-1 text-gray-400 text-xs">
                                                    <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                                    <span>{date} {month} {year}</span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-[#1a2355] font-bold text-sm leading-snug flex-1 group-hover:underline decoration-[#1a2355]/30 underline-offset-2 line-clamp-3">
                                                    {item.title}
                                                </h3>

                                                {/* Read more */}
                                                <div className="flex items-center justify-end mt-auto pt-1">
                                                    <div className="flex items-center gap-0.5 text-[#1a2355] font-semibold text-xs">
                                                        Ətraflı
                                                        <ChevronRightIcon
                                                            sx={{ fontSize: 14 }}
                                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                                        />
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
            </main>

            <Footer />
        </>
    );
}
