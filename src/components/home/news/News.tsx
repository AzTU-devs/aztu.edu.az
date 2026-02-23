"use client";

import Image from "next/image";
import Link from "next/link";
import News1 from "@/../public/news/news-1.png";
import News2 from "@/../public/news/news-2.png";
import News3 from "@/../public/news/news-3.png";
import News4 from "@/../public/news/news-4.png";
import News5 from "@/../public/news/news-5.png";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { allNews, categoryColors } from "@/app/news/newsData";

const newsImages = [News1, News2, News3, News4, News5];

export default function News() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    const featured = allNews[0];
    const rest = allNews.slice(1, 5);

    return (
        <section
            ref={sectionRef}
            className="px-4 md:px-10 lg:px-20 py-16 bg-gray-50 relative overflow-hidden"
        >
            {/* Background decorations */}
            <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#1a2355]/4 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] rounded-full bg-[#ee7c7e]/6 pointer-events-none" />

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-5 relative"
            >
                <div>
                    <p className="text-[#ee7c7e] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                        Son Xəbərlər
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1a2355] leading-tight">
                        Xəbərlər &amp;{" "}
                        <span className="text-[#ee7c7e]">Hadisələr</span>
                    </h2>
                </div>
                <Link href="/news">
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="group flex items-center gap-2 bg-[#1a2355] py-2.5 px-5 rounded-xl text-white font-bold cursor-pointer hover:bg-[#0b1330] transition-colors duration-300"
                    >
                        Bütün Xəbərlər
                        <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1.5" />
                    </motion.button>
                </Link>
            </motion.div>

            {/* Main Layout */}
            <div className="flex flex-col lg:flex-row gap-6 relative">

                {/* ── Featured Card ── */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                    className="lg:w-[52%]"
                >
                    <Link href={`/news/${featured.id}`}>
                        <div className="group bg-white rounded-3xl shadow-lg overflow-hidden h-full cursor-pointer hover:shadow-2xl transition-shadow duration-500">
                            {/* Image */}
                            <div className="relative h-72 md:h-[22rem] overflow-hidden">
                                <Image
                                    src={newsImages[(featured.imageIndex - 1) % 5]}
                                    alt={featured.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                />
                                {/* Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                                {/* Category badge */}
                                <span
                                    className={`absolute top-4 left-4 ${categoryColors[featured.category] ?? "bg-[#1a2355]"} text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow`}
                                >
                                    <LocalOfferIcon sx={{ fontSize: 12 }} />
                                    {featured.category}
                                </span>

                                {/* Date + read time */}
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 flex-wrap">
                                    <span className="flex items-center gap-1 text-white text-xs font-medium bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                        <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                        {featured.date} {featured.month} {featured.year}
                                    </span>
                                    <span className="flex items-center gap-1 text-white text-xs font-medium bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                        <AccessTimeIcon sx={{ fontSize: 13 }} />
                                        {featured.readTime}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8">
                                <h2 className="text-[#1a2355] font-bold text-xl md:text-2xl leading-snug mb-3 group-hover:text-[#ee7c7e] transition-colors duration-300">
                                    {featured.title}
                                </h2>
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5">
                                    {featured.desc}
                                </p>
                                <div className="flex items-center gap-1 text-[#1a2355] font-semibold text-sm w-fit">
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

                {/* ── Small Cards 2×2 Grid ── */}
                <div className="lg:w-[48%] grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {rest.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 35 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.55,
                                ease: "easeOut",
                                delay: 0.18 + idx * 0.1,
                            }}
                        >
                            <Link href={`/news/${item.id}`}>
                                <motion.div
                                    whileHover={{ y: -5, transition: { duration: 0.25 } }}
                                    className="group bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="relative h-44 overflow-hidden flex-shrink-0">
                                        <Image
                                            src={newsImages[(item.imageIndex - 1) % 5]}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Subtle overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        {/* Category */}
                                        <span
                                            className={`absolute top-3 left-3 ${categoryColors[item.category] ?? "bg-[#1a2355]"} text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow`}
                                        >
                                            <LocalOfferIcon sx={{ fontSize: 11 }} />
                                            {item.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-4 flex flex-col gap-2 flex-1">
                                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                                            <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                            <span>
                                                {item.date} {item.month}
                                            </span>
                                        </div>
                                        <h3 className="text-[#1a2355] font-bold text-sm leading-snug flex-1 group-hover:text-[#ee7c7e] transition-colors duration-300 line-clamp-3">
                                            {item.title}
                                        </h3>
                                        <div className="flex items-center gap-0.5 text-[#1a2355] font-semibold text-xs mt-1 w-fit">
                                            Ətraflı oxu
                                            <ChevronRightIcon
                                                sx={{ fontSize: 14 }}
                                                className="transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
