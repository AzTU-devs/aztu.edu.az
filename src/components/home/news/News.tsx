"use client";

import Image from "next/image";
import Link from "next/link";
import { newsSlug } from "@/util/slugify";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsList } from "@/redux/features/newsSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

const categoryColors: Record<string, string> = {
    AzTU: "bg-[#1a2355]",
    Elm: "bg-emerald-500",
    Tələbə: "bg-violet-500",
    Əməkdaşlıq: "bg-amber-500",
    Qəbul: "bg-[#ee7c7e]",
};

function formatDate(iso: string, lang: string) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString(lang === "az" ? "az-AZ" : "en-US", {
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
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const t = useTranslation();
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
            className="relative px-4 md:px-10 lg:px-20 py-24 bg-white dark:bg-[#0b1330] overflow-hidden transition-colors duration-500"
        >
            {/* STUNNING BACKGROUND ELEMENTS */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Dotted Grid */}
                <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.04]" 
                     style={{ backgroundImage: 'radial-gradient(#ee7c7e 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
                
                {/* Glow Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1a2355]/[0.03] dark:bg-[#1a2355]/[0.1] blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ee7c7e]/[0.03] dark:bg-[#ee7c7e]/[0.08] blur-[100px] rounded-full animate-pulse" />
                
                {/* Watermark */}
                <div className="absolute left-10 bottom-10 select-none opacity-[0.02] dark:opacity-[0.05]">
                    <h1 className="text-[180px] font-black tracking-tighter leading-none text-[#1a2355] dark:text-white uppercase">Journal</h1>
                </div>
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 mb-6 shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse shadow-[0_0_8px_#ee7c7e]" />
                            <span className="text-[#1a2355] dark:text-white text-[11px] font-black uppercase tracking-[0.4em]">
                                {t.news.sectionLabel}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-[#1a2355] dark:text-white leading-tight tracking-tighter">
                            {t.news.sectionTitle} <span className="text-[#ee7c7e]">{t.news.sectionTitleAccent}</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <Link href="/news">
                            <button className="group flex items-center gap-4 bg-[#1a2355] dark:bg-white/5 backdrop-blur-xl py-4 px-8 rounded-2xl text-white dark:text-white font-black uppercase tracking-widest text-xs hover:bg-[#ee7c7e] dark:hover:bg-[#ee7c7e] transition-all duration-500 shadow-xl shadow-[#1a2355]/20 dark:shadow-none cursor-pointer">
                                {t.news.viewAll}
                                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <ChevronRightIcon sx={{ fontSize: 20 }} />
                                </div>
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* Loading skeleton */}
                <AnimatePresence>
                    {listLoading && list.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col lg:flex-row gap-8 animate-pulse"
                        >
                            <div className="lg:w-[55%] bg-gray-100 dark:bg-white/5 rounded-[3rem] h-[35rem]" />
                            <div className="lg:w-[45%] grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-gray-100 dark:bg-white/5 rounded-[2.5rem] h-64" />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Content Layout */}
                {!listLoading && featured && (
                    <div className="flex flex-col lg:flex-row gap-8 items-stretch">

                        {/* FEATURED PREMIUM CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                            className="lg:w-[55%]"
                        >
                            <Link href={`/news/${newsSlug(featured.news_id, featured.title)}`}>
                                <div className="group relative h-full bg-gray-50 dark:bg-white/5 rounded-[3rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-2xl transition-all duration-700 hover:shadow-[#ee7c7e]/10">
                                    {/* Image Section */}
                                    <div className="relative h-[22rem] md:h-[28rem] overflow-hidden">
                                        <Image
                                            src={`${featured.cover_image}`}
                                            alt={featured.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2355] via-[#1a2355]/20 to-transparent opacity-80" />
                                        
                                        {/* Labels */}
                                        <div className="absolute top-8 left-8 flex items-center gap-3">
                                            <span className={`px-4 py-1.5 ${categoryColors[featured.cateogry_id] ?? "bg-[#1a2355]"} text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg flex items-center gap-2`}>
                                                <LocalOfferIcon sx={{ fontSize: 12 }} />
                                                {featured.cateogry_id}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-8 left-8">
                                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-xl">
                                                <CalendarMonthIcon sx={{ fontSize: 14, color: '#ee7c7e' }} />
                                                {formatDate(featured.created_at, lang)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-10 md:p-12">
                                        <h2 className="text-2xl md:text-4xl font-black text-[#1a2355] dark:text-white leading-[1.15] mb-6 tracking-tighter group-hover:text-[#ee7c7e] transition-colors duration-300">
                                            {featured.title}
                                        </h2>
                                        <p className="text-gray-500 dark:text-white/50 text-lg leading-relaxed line-clamp-3 mb-8">
                                            {stripHtml(featured.html_content)}
                                        </p>
                                        <div className="flex items-center gap-3 text-[#1a2355] dark:text-[#ee7c7e] font-black uppercase tracking-[0.2em] text-xs">
                                            <span>{t.news.readMore}</span>
                                            <div className="w-10 h-10 rounded-full bg-[#1a2355]/5 dark:bg-[#ee7c7e]/10 flex items-center justify-center group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                                                <ChevronRightIcon sx={{ fontSize: 20 }} className="group-hover:translate-x-0.5 transition-transform" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* SECONDARY GRID */}
                        <div className="lg:w-[45%] grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {rest.map((item, idx) => (
                                <motion.div
                                    key={item.news_id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1], delay: 0.3 + idx * 0.1 }}
                                    className="h-full"
                                >
                                    <Link href={`/news/${newsSlug(item.news_id, item.title)}`}>
                                        <div className="group h-full flex flex-col bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#ee7c7e]/5 hover:border-[#ee7c7e]/20">
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={`${item.cover_image}`}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                                <span className={`absolute top-4 left-4 ${categoryColors[item.cateogry_id] ?? "bg-[#1a2355]"} text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg`}>
                                                    {item.cateogry_id}
                                                </span>
                                            </div>

                                            <div className="p-6 flex flex-col flex-1">
                                                <div className="flex items-center gap-2 text-[#ee7c7e] text-[10px] font-black uppercase tracking-widest mb-3">
                                                    <CalendarMonthIcon sx={{ fontSize: 12 }} />
                                                    <span>{formatDate(item.created_at, lang)}</span>
                                                </div>
                                                <h3 className="text-[#1a2355] dark:text-white font-black text-base leading-snug flex-1 group-hover:text-[#ee7c7e] transition-colors duration-300 line-clamp-3 tracking-tight">
                                                    {item.title}
                                                </h3>
                                                <div className="mt-6 flex items-center gap-2 text-[#1a2355] dark:text-white/40 text-[10px] font-black uppercase tracking-widest">
                                                    {t.news.readMore}
                                                    <ChevronRightIcon sx={{ fontSize: 14 }} className="group-hover:translate-x-1 transition-transform group-hover:text-[#ee7c7e]" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
