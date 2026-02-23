"use client";

import Link from "next/link";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CampaignIcon from "@mui/icons-material/Campaign";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LabelIcon from "@mui/icons-material/Label";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import {
    allAnnouncements,
    announcementCategories,
    announcementCategoryColors,
} from "./announcementsData";

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.48, delay: i * 0.07, ease: "easeOut" as const },
    }),
};

export default function AnnouncementsPage() {
    const [activeCategory, setActiveCategory] = useState("Hamısı");

    const filtered =
        activeCategory === "Hamısı"
            ? allAnnouncements
            : allAnnouncements.filter((a) => a.category === activeCategory);

    // Pin urgent items first, then the rest
    const sorted = [
        ...filtered.filter((a) => a.urgent),
        ...filtered.filter((a) => !a.urgent),
    ];

    const featured = sorted[0];
    const rest = sorted.slice(1);

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

                {/* ── Category Filter ── */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                    <div className="px-4 md:px-10 lg:px-20 flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
                        {announcementCategories.map((cat) => (
                            <motion.button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                whileTap={{ scale: 0.95 }}
                                className={`flex-shrink-0 px-5 py-2 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
                                    activeCategory === cat
                                        ? "bg-[#1a2355] text-white shadow"
                                        : "bg-gray-100 text-[#1a2355] hover:bg-[#1a2355]/10"
                                }`}
                            >
                                {cat}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="px-4 md:px-10 lg:px-20 py-10">

                    {/* ── Empty state ── */}
                    <AnimatePresence mode="wait">
                        {filtered.length === 0 && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-24 text-gray-400 font-semibold text-lg"
                            >
                                Bu kateqoriyada elan tapılmadı.
                            </motion.div>
                        )}
                    </AnimatePresence>

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
                                        <div
                                            className={`h-1.5 w-full ${announcementCategoryColors[featured.category] ?? "bg-[#1a2355]"}`}
                                        />

                                        <div className="flex flex-col lg:flex-row gap-0">
                                            {/* Left: Date column */}
                                            <div className="lg:w-40 flex-shrink-0 bg-[#1a2355] flex flex-col items-center justify-center p-6 gap-1">
                                                <CalendarMonthIcon sx={{ color: "white", opacity: 0.6, fontSize: 22 }} />
                                                <p className="text-white font-bold text-3xl leading-none">
                                                    {featured.date}
                                                </p>
                                                <p className="text-white/70 text-sm font-medium">
                                                    {featured.month}
                                                </p>
                                                <p className="text-white/50 text-xs">{featured.year}</p>
                                            </div>

                                            {/* Right: Content */}
                                            <div className="flex flex-col justify-center px-7 py-7 gap-4 flex-1">
                                                {/* Badges */}
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span
                                                        className={`${announcementCategoryColors[featured.category] ?? "bg-[#1a2355]"} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5`}
                                                    >
                                                        <LabelIcon sx={{ fontSize: 12 }} />
                                                        {featured.category}
                                                    </span>
                                                    {featured.urgent && (
                                                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                                                            <ErrorOutlineIcon sx={{ fontSize: 12 }} />
                                                            Təcili
                                                        </span>
                                                    )}
                                                    <span className="text-gray-400 text-xs flex items-center gap-1">
                                                        <PersonIcon sx={{ fontSize: 13 }} />
                                                        {featured.department}
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h2 className="text-[#1a2355] font-bold text-xl md:text-2xl leading-snug group-hover:underline decoration-[#1a2355]/30 underline-offset-4">
                                                    {featured.title}
                                                </h2>

                                                {/* Desc */}
                                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                                                    {featured.desc}
                                                </p>

                                                {/* Footer row */}
                                                <div className="flex flex-wrap items-center justify-between gap-3 mt-1">
                                                    {featured.deadline && (
                                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-red-500 bg-red-50 px-3 py-1 rounded-lg">
                                                            <AccessTimeIcon sx={{ fontSize: 14 }} />
                                                            Son tarix: {featured.deadline}
                                                        </div>
                                                    )}
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
                            {rest.map((item, i) => (
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
                                        {/* Category accent bar */}
                                        <div
                                            className={`h-1 w-full ${announcementCategoryColors[item.category] ?? "bg-[#1a2355]"}`}
                                        />

                                        <div className="p-5 flex flex-col gap-3 flex-1">
                                            {/* Badges */}
                                            <div className="flex flex-wrap gap-2">
                                                <span
                                                    className={`${announcementCategoryColors[item.category] ?? "bg-[#1a2355]"} text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1`}
                                                >
                                                    <LabelIcon sx={{ fontSize: 10 }} />
                                                    {item.category}
                                                </span>
                                                {item.urgent && (
                                                    <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                                                        <ErrorOutlineIcon sx={{ fontSize: 10 }} />
                                                        Təcili
                                                    </span>
                                                )}
                                            </div>

                                            {/* Date */}
                                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                                                <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                                <span>
                                                    {item.date} {item.month} {item.year}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-[#1a2355] font-bold text-sm leading-snug flex-1 group-hover:underline decoration-[#1a2355]/30 underline-offset-2 line-clamp-3">
                                                {item.title}
                                            </h3>

                                            {/* Deadline */}
                                            {item.deadline && (
                                                <div className="flex items-center gap-1 text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-lg w-fit">
                                                    <AccessTimeIcon sx={{ fontSize: 12 }} />
                                                    {item.deadline}
                                                </div>
                                            )}

                                            {/* Department + read more */}
                                            <div className="flex items-center justify-between mt-auto pt-1">
                                                <span className="text-gray-400 text-[10px] truncate max-w-[60%]">
                                                    {item.department}
                                                </span>
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
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
