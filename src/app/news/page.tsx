"use client";

import Image from "next/image";
import Link from "next/link";
import News1 from "@/../public/news/news-1.png";
import News2 from "@/../public/news/news-2.png";
import News3 from "@/../public/news/news-3.png";
import News4 from "@/../public/news/news-4.png";
import News5 from "@/../public/news/news-5.png";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { allNews, categories, categoryColors } from "./newsData";

const newsImages = [News1, News2, News3, News4, News5];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" as const },
    }),
};

export default function NewsPage() {
    const [activeCategory, setActiveCategory] = useState("Hamısı");

    const filtered =
        activeCategory === "Hamısı"
            ? allNews
            : allNews.filter((n) => n.category === activeCategory);

    const featured = filtered[0];
    const rest = filtered.slice(1);

    return (
        <>
            <HeaderChanger />
            <main className="min-h-screen bg-gray-50">

                {/* ── Banner ── */}
                <div className="bg-gradient-to-br from-[#0b1330] via-[#1a2355] to-[#13365E] px-4 md:px-10 lg:px-20 pt-36 pb-20 relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/3 pointer-events-none" />

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
                        className="text-3xl md:text-5xl font-bold text-white mb-3"
                    >
                        Xəbərlər
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.18 }}
                        className="text-white/70 text-base max-w-xl"
                    >
                        AzTU-dakı ən son hadisələr, elmi nailiyyətlər və kampus yenilikləri ilə tanış olun.
                    </motion.p>
                </div>

                {/* ── Category Filter ── */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                    <div className="px-4 md:px-10 lg:px-20 flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
                        {categories.map((cat) => (
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

                    <AnimatePresence mode="wait">
                        {filtered.length === 0 && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-24 text-gray-400 font-semibold text-lg"
                            >
                                Bu kateqoriyada xəbər tapılmadı.
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {featured && (
                        <>
                            {/* ── Featured Card ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <Link href={`/news/${featured.id}`}>
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10 flex flex-col lg:flex-row cursor-pointer group">
                                        {/* Image */}
                                        <div className="lg:w-1/2 w-full h-72 lg:h-auto relative flex-shrink-0 overflow-hidden">
                                            <Image
                                                src={newsImages[(featured.imageIndex - 1) % 5]}
                                                alt={featured.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col justify-center px-8 py-8 gap-5 lg:w-1/2">
                                            {/* Badge */}
                                            <div className="flex items-center gap-3">
                                                <span className={`${categoryColors[featured.category] ?? "bg-[#1a2355]"} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1`}>
                                                    <LocalOfferIcon sx={{ fontSize: 13 }} />
                                                    {featured.category}
                                                </span>
                                                <span className="text-gray-400 text-sm flex items-center gap-1">
                                                    <CalendarMonthIcon sx={{ fontSize: 15 }} />
                                                    {featured.date} {featured.month}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h2 className="text-[#1a2355] font-bold text-2xl md:text-3xl leading-snug group-hover:underline decoration-[#1a2355]/30 underline-offset-4">
                                                {featured.title}
                                            </h2>

                                            {/* Description */}
                                            <p className="text-gray-500 text-base leading-relaxed">
                                                {featured.desc}
                                            </p>

                                            {/* Read more */}
                                            <div className="group/btn flex items-center gap-1 text-[#1a2355] font-bold text-sm w-fit mt-2">
                                                Ətraflı oxu
                                                <ChevronRightIcon
                                                    sx={{ fontSize: 18 }}
                                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>

                            {/* ── Section Divider ── */}
                            {rest.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="flex items-center gap-4 mb-8"
                                >
                                    <h2 className="text-xl font-bold text-[#1a2355] flex-shrink-0">
                                        Digər xəbərlər
                                    </h2>
                                    <div className="flex-1 h-px bg-gray-200" />
                                </motion.div>
                            )}
                        </>
                    )}

                    {/* ── News Grid ── */}
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
                                    <Link href={`/news/${item.id}`} className="flex flex-col h-full">
                                        {/* Image */}
                                        <div className="h-48 relative overflow-hidden">
                                            <Image
                                                src={newsImages[(item.imageIndex - 1) % 5]}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Category overlay */}
                                            <span className={`absolute top-3 left-3 ${categoryColors[item.category] ?? "bg-[#1a2355]"} text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1`}>
                                                <LocalOfferIcon sx={{ fontSize: 12 }} />
                                                {item.category}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col gap-3 flex-1">
                                            {/* Date */}
                                            <div className="flex items-center gap-1 text-gray-400 text-xs">
                                                <CalendarMonthIcon sx={{ fontSize: 14 }} />
                                                <span>{item.date} {item.month}</span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-[#1a2355] font-bold text-sm leading-snug flex-1 group-hover:underline decoration-[#1a2355]/30 underline-offset-2">
                                                {item.title}
                                            </h3>

                                            {/* Read more */}
                                            <div className="group/btn flex items-center gap-1 text-[#1a2355] font-semibold text-xs mt-auto w-fit">
                                                Ətraflı oxu
                                                <ChevronRightIcon
                                                    sx={{ fontSize: 14 }}
                                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* ── Load More ── */}
                    {filtered.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex justify-center mt-14"
                        >
                            <motion.button
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                className="group flex items-center gap-2 bg-[#1a2355] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#1a2355]/90 transition-colors duration-300 cursor-pointer"
                            >
                                Daha çox yüklə
                                <ChevronRightIcon className="rotate-90 transition-transform duration-300 group-hover:translate-y-1" />
                            </motion.button>
                        </motion.div>
                    )}

                </div>
            </main>
            <Footer />
        </>
    );
}
