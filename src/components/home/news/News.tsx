"use client";

import Image from "next/image";
import Link from "next/link";
import { newsSlug } from "@/util/slugify";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsList } from "@/redux/features/newsSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { API_BASE_URL } from "@/util/apiClient";
import { useLanguage } from "@/context/LanguageContext";

const categoryColors: Record<string, string> = {
    AzTU: "bg-[#1a2355]",
    Elm: "bg-emerald-500",
    Tələbə: "bg-violet-500",
    Əməkdaşlıq: "bg-amber-500",
    Qəbul: "bg-[#ee7c7e]",
};

function formatDate(iso: string) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("az-AZ", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function stripHtml(html: string) {
    return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export default function News() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
    const dispatch = useDispatch<AppDispatch>();
    const { list, listLoading } = useSelector((s: RootState) => s.news);
    const { lang } = useLanguage();

    useEffect(() => {
        dispatch(fetchNewsList({ start: 0, end: 5, lang }));
    }, [dispatch, lang]);

    const featured = list[0] ?? null;
    const rest = list.slice(1, 5);

    return (
        <section
            ref={sectionRef}
            className="px-4 md:px-10 lg:px-20 py-16 bg-gray-50 dark:bg-[#0f172a] relative overflow-hidden"
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
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1a2355] dark:text-white leading-tight">
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

            {/* Loading skeleton */}
            {listLoading && list.length === 0 && (
                <div className="flex flex-col lg:flex-row gap-6 animate-pulse">
                    <div className="lg:w-[52%] bg-gray-200 dark:bg-slate-800 rounded-3xl h-[28rem]" />
                    <div className="lg:w-[48%] grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-gray-200 dark:bg-slate-800 rounded-2xl h-48" />
                        ))}
                    </div>
                </div>
            )}

            {/* Main Layout */}
            {!listLoading && featured && (
                <div className="flex flex-col lg:flex-row gap-6 relative">

                    {/* Featured Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
                        className="lg:w-[52%]"
                    >
                        <Link href={`/news/${newsSlug(featured.news_id, featured.title)}`}>
                            <div className="group bg-white dark:bg-[#1e293b] rounded-3xl shadow-lg overflow-hidden h-full cursor-pointer hover:shadow-2xl transition-shadow duration-500">
                                <div className="relative h-72 md:h-[22rem] overflow-hidden">
                                    <Image
                                        src={`${featured.cover_image}`}
                                        alt={featured.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                                    <span className={`absolute top-4 left-4 ${categoryColors[featured.cateogry_id] ?? "bg-[#1a2355]"} text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow`}>
                                        <LocalOfferIcon sx={{ fontSize: 12 }} />
                                        {featured.cateogry_id}
                                    </span>

                                    <div className="absolute bottom-4 left-4 flex items-center gap-2 flex-wrap">
                                        <span className="flex items-center gap-1 text-white text-xs font-medium bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                            <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                            {formatDate(featured.created_at)}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8">
                                    <h2 className="text-[#1a2355] dark:text-white font-bold text-xl md:text-2xl leading-snug mb-3 group-hover:text-[#ee7c7e] transition-colors duration-300">
                                        {featured.title}
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-5">
                                        {stripHtml(featured.html_content)}
                                    </p>
                                    <div className="flex items-center gap-1 text-[#1a2355] dark:text-[#5A9BD3] font-semibold text-sm w-fit">
                                        Ətraflı oxu
                                        <ChevronRightIcon sx={{ fontSize: 18 }} className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Small Cards 2×2 Grid */}
                    <div className="lg:w-[48%] grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {rest.map((item, idx) => (
                            <motion.div
                                key={item.news_id}
                                initial={{ opacity: 0, y: 35 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 + idx * 0.1 }}
                            >
                                <Link href={`/news/${newsSlug(item.news_id, item.title)}`}>
                                    <motion.div
                                        whileHover={{ y: -5, transition: { duration: 0.25 } }}
                                        className="group bg-white dark:bg-[#1e293b] rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                                    >
                                        <div className="relative h-44 overflow-hidden flex-shrink-0">
                                            <Image
                                                src={`${item.cover_image}`}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            <span className={`absolute top-3 left-3 ${categoryColors[item.cateogry_id] ?? "bg-[#1a2355]"} text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow`}>
                                                <LocalOfferIcon sx={{ fontSize: 11 }} />
                                                {item.cateogry_id}
                                            </span>
                                        </div>

                                        <div className="p-4 flex flex-col gap-2 flex-1">
                                            <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-xs">
                                                <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                                <span>{formatDate(item.created_at)}</span>
                                            </div>
                                            <h3 className="text-[#1a2355] dark:text-white font-bold text-sm leading-snug flex-1 group-hover:text-[#ee7c7e] transition-colors duration-300 line-clamp-3">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center gap-0.5 text-[#1a2355] dark:text-[#5A9BD3] font-semibold text-xs mt-1 w-fit">
                                                Ətraflı oxu
                                                <ChevronRightIcon sx={{ fontSize: 14 }} className="transition-transform duration-300 group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
