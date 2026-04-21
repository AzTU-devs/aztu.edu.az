"use client";

import { use, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { motion, useScroll, AnimatePresence } from "framer-motion";
import CampaignIcon from "@mui/icons-material/Campaign";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { API_BASE_URL } from "@/util/apiClient";
import SanitizedHtml from "@/components/shared/SanitizedHtml";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://api-aztu.karamshukurlu.site";

const MONTHS_AZ = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
    "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr",
];

function parseDate(iso: string) {
    const d = new Date(iso);
    return {
        date: String(d.getUTCDate()).padStart(2, "0"),
        month: MONTHS_AZ[d.getUTCMonth()],
        year: String(d.getUTCFullYear()),
    };
}

interface AnnouncementDetail {
    announcement_id: number;
    title: string;
    html_content: string;
    image: string | null;
    display_order: number;
    is_active: boolean;
}

interface AnnouncementListItem {
    id: number;
    title: string;
    html_content: string;
    is_active: boolean;
    created_at: string;
    display_order: number;
}

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function AnnouncementDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [announcement, setAnnouncement] = useState<AnnouncementDetail | null>(null);
    const [createdAt, setCreatedAt] = useState<string>("");
    const [related, setRelated] = useState<AnnouncementListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    const { scrollYProgress } = useScroll({ target: containerRef });

    useEffect(() => {
        // Fetch the specific announcement detail
        fetch(`${API_BASE}/api/announcement/${id}?lang=az`)
            .then((r) => r.json())
            .then((data) => {
                if (data.status_code === 200) {
                    setAnnouncement(data.announcement);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));

        // Fetch related announcements list (for date + related section)
        fetch(`${API_BASE}/api/announcement/public/all?start=0&end=10&lang=az`)
            .then((r) => r.json())
            .then((data) => {
                const all: AnnouncementListItem[] = data.announcements ?? [];
                const current = all.find((a) => a.id === parseInt(id));
                if (current?.created_at) setCreatedAt(current.created_at);
                setRelated(all.filter((a) => a.id !== parseInt(id)).slice(0, 3));
            })
            .catch(() => {});
    }, [id]);

    const handleCopy = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        }
    };

    const { date, month, year } = createdAt ? parseDate(createdAt) : { date: "", month: "", year: "" };

    return (
        <>
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1a2355] via-blue-400 to-[#ee7c7e] z-[60] origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            <main ref={containerRef} className="min-h-screen bg-gray-50">

                {loading && (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="w-10 h-10 rounded-full border-4 border-[#1a2355] border-t-transparent animate-spin" />
                    </div>
                )}

                {!loading && !announcement && (
                    <div className="flex items-center justify-center min-h-screen">
                        <p className="text-gray-400 font-semibold text-lg">Elan tapılmadı.</p>
                    </div>
                )}

                {!loading && announcement && (
                    <>
                        {/* Hero Banner */}
                        <section className="relative bg-gradient-to-br from-[#060d1f] via-[#1a2355] to-[#0f2a4a] overflow-hidden">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#ee7c7e]/10 blur-3xl pointer-events-none" />
                            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
                                <CampaignIcon sx={{ fontSize: 340 }} />
                            </div>

                            <div className="relative z-10 px-4 md:px-10 lg:px-20 pt-36 pb-16">
                                <motion.nav
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.45 }}
                                    className="flex items-center gap-1.5 text-white/40 text-xs mb-8 flex-wrap"
                                >
                                    <Link href="/" className="hover:text-white/80 transition-colors">Ana səhifə</Link>
                                    <ChevronRightIcon sx={{ fontSize: 14 }} />
                                    <Link href="/announcements" className="hover:text-white/80 transition-colors">Elanlar</Link>
                                    <ChevronRightIcon sx={{ fontSize: 14 }} />
                                    <span className="text-white/60 truncate max-w-xs">{announcement.title}</span>
                                </motion.nav>

                                {createdAt && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.45, delay: 0.08 }}
                                        className="flex flex-wrap items-center gap-3 mb-5"
                                    >
                                        <span className="text-white/40 text-xs flex items-center gap-1">
                                            <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                            {date} {month} {year}
                                        </span>
                                    </motion.div>
                                )}

                                <motion.h1
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.15 }}
                                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl"
                                >
                                    {announcement.title}
                                </motion.h1>
                            </div>
                        </section>

                        {/* Cover image */}
                        {announcement.image && (
                            <div className="px-4 md:px-10 lg:px-20 -mt-1 bg-gradient-to-b from-[#0f2a4a] to-transparent pb-10">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.25 }}
                                    className="relative w-full h-64 md:h-[380px] rounded-2xl overflow-hidden shadow-2xl"
                                >
                                    <Image
                                        src={`${API_BASE_URL}/${announcement.image}`}
                                        alt={announcement.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                            </div>
                        )}

                        {/* Content */}
                        <section className="px-4 md:px-10 lg:px-20 py-14">
                            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

                                {/* Main Column */}
                                <div className="flex-1 min-w-0">
                                    {announcement.html_content ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: "-60px" }}
                                            transition={{ duration: 0.55 }}
                                            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                        >
                                            <SanitizedHtml html={announcement.html_content} />
                                        </motion.div>
                                    ) : (
                                        <p className="text-gray-400 italic">Məzmun mövcud deyil.</p>
                                    )}

                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="h-px bg-gradient-to-r from-[#1a2355]/30 via-gray-300 to-transparent mt-12 mb-8 origin-left"
                                    />
                                </div>

                                {/* Sidebar */}
                                <motion.aside
                                    initial={{ opacity: 0, x: 24 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.55, delay: 0.35 }}
                                    className="lg:w-64 xl:w-72 flex-shrink-0 space-y-5"
                                >
                                    {/* Info card */}
                                    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
                                        <h3 className="font-bold text-[#1a2355] text-sm uppercase tracking-widest">
                                            Elan haqqında
                                        </h3>
                                        {createdAt && (
                                            <div className="space-y-3 text-sm text-gray-500">
                                                <div className="flex items-start gap-2">
                                                    <CalendarMonthIcon sx={{ fontSize: 16, color: "#1a2355", mt: "2px" }} />
                                                    <span>{date} {month} {year}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Share card */}
                                    <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
                                        <h3 className="font-bold text-[#1a2355] text-sm uppercase tracking-widest">Paylaş</h3>
                                        <motion.button
                                            onClick={handleCopy}
                                            whileTap={{ scale: 0.96 }}
                                            className="w-full flex items-center justify-center gap-2 bg-[#1a2355] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a2355]/85 transition-colors cursor-pointer"
                                        >
                                            <AnimatePresence mode="wait">
                                                {copied ? (
                                                    <motion.span
                                                        key="check"
                                                        initial={{ scale: 0.5, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0.5, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="flex items-center gap-1.5"
                                                    >
                                                        <CheckIcon sx={{ fontSize: 16 }} />
                                                        Kopyalandı!
                                                    </motion.span>
                                                ) : (
                                                    <motion.span
                                                        key="copy"
                                                        initial={{ scale: 0.5, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0.5, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="flex items-center gap-1.5"
                                                    >
                                                        <ContentCopyIcon sx={{ fontSize: 16 }} />
                                                        Linki kopyala
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>
                                    </div>

                                    {/* Back button */}
                                    <Link href="/announcements">
                                        <motion.div
                                            whileHover={{ x: -4 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex items-center gap-2 text-[#1a2355] font-semibold text-sm bg-white rounded-xl px-4 py-3 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                        >
                                            <ArrowBackIcon sx={{ fontSize: 18 }} />
                                            Elanlara qayıt
                                        </motion.div>
                                    </Link>
                                </motion.aside>
                            </div>
                        </section>

                        {/* Related Announcements */}
                        {related.length > 0 && (
                            <section className="bg-white py-16 px-4 md:px-10 lg:px-20">
                                <div className="max-w-7xl mx-auto">
                                    <motion.div
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className="flex items-center gap-4 mb-10"
                                    >
                                        <h2 className="text-xl font-bold text-[#1a2355] flex-shrink-0">Əlaqəli elanlar</h2>
                                        <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
                                    </motion.div>

                                    <motion.div
                                        variants={staggerContainer}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, amount: 0.15 }}
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                    >
                                        {related.map((item) => {
                                            const rd = parseDate(item.created_at);
                                            return (
                                                <motion.div
                                                    key={item.id}
                                                    variants={fadeUp}
                                                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                                    className="group bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                                >
                                                    <Link href={`/announcements/${item.id}`}>
                                                        <div className="h-1 bg-[#1a2355]" />
                                                        <div className="p-5 space-y-3">
                                                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                                                                <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                                                <span>{rd.date} {rd.month} {rd.year}</span>
                                                            </div>
                                                            <h3 className="text-[#1a2355] font-bold text-sm leading-snug group-hover:underline decoration-[#1a2355]/30 underline-offset-2 line-clamp-3">
                                                                {item.title}
                                                            </h3>
                                                            <div className="flex items-center gap-1 text-[#1a2355] font-semibold text-xs pt-1">
                                                                Ətraflı oxu
                                                                <ChevronRightIcon sx={{ fontSize: 14 }} className="transition-transform duration-300 group-hover:translate-x-1" />
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </motion.div>
                                            );
                                        })}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="flex justify-center mt-10"
                                    >
                                        <Link href="/announcements">
                                            <motion.div
                                                whileHover={{ scale: 1.04 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="flex items-center gap-2 border-2 border-[#1a2355] text-[#1a2355] font-bold px-8 py-3 rounded-xl hover:bg-[#1a2355] hover:text-white transition-colors duration-300 cursor-pointer"
                                            >
                                                Bütün elanlar
                                                <ChevronRightIcon sx={{ fontSize: 18 }} />
                                            </motion.div>
                                        </Link>
                                    </motion.div>
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>

            </>
    );
}
