"use client";

import Image from "next/image";
import Link from "next/link";

import { newsSlug } from "@/util/slugify";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsList } from "@/redux/features/newsSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { API_BASE_URL } from "@/util/apiClient";
import { getNewsCategories, type NewsCategoryItem } from "@/services/newsService/newsService";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

const PALETTE = [
    "bg-[#1a2355]",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-amber-500",
    "bg-[#ee7c7e]",
    "bg-cyan-500",
    "bg-rose-500",
    "bg-indigo-500",
];

function formatDate(iso: string) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("az-AZ", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

// Strip HTML tags to get plain text description
function stripHtml(html: string) {
    return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" as const },
    }),
};

const ALL_CATEGORY_ID = "__all__";

export default function NewsPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const dispatch = useDispatch<AppDispatch>();
    const { list, listLoading, listError } = useSelector((s: RootState) => s.news);
    const [categories, setCategories] = useState<NewsCategoryItem[]>([]);
    const [activeCategoryId, setActiveCategoryId] = useState<string>(ALL_CATEGORY_ID);
    const [page, setPage] = useState(0);
    const PAGE_SIZE = 10;

    useEffect(() => {
        getNewsCategories(lang).then((cats) => setCategories(cats));
    }, [lang]);

    useEffect(() => {
        dispatch(
            fetchNewsList({
                categoryId: activeCategoryId === ALL_CATEGORY_ID ? undefined : activeCategoryId,
                start: 0,
                end: PAGE_SIZE,
                lang,
            })
        );
        setPage(0);
    }, [activeCategoryId, dispatch, lang]);

    console.log(list);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        dispatch(
            fetchNewsList({
                categoryId: activeCategoryId === ALL_CATEGORY_ID ? undefined : activeCategoryId,
                start: nextPage * PAGE_SIZE,
                end: (nextPage + 1) * PAGE_SIZE,
                lang,
            })
        );
        setPage(nextPage);
    };

    const categoryColor = (categoryId: string) => {
        const idx = categories.findIndex((c) => c.category_id === categoryId);
        return PALETTE[idx % PALETTE.length] ?? "bg-[#1a2355]";
    };

    const categoryLabel = (categoryId: string) => {
        return categories.find((c) => c.category_id === categoryId)?.title ?? categoryId;
    };

    const featured = list[0];
    const rest = list.slice(1);

    return (
        <>
            <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">

                {/* Banner */}
                <div className="bg-gradient-to-br from-[#0b1330] via-[#1a2355] to-[#13365E] px-4 md:px-10 lg:px-20 pt-36 pb-20 relative overflow-hidden">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/3 pointer-events-none" />

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-2"
                    >
                        {t.news.breadcrumb}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-3"
                    >
                        {t.news.pageTitle}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.18 }}
                        className="text-white/70 text-base max-w-xl"
                    >
                        {t.news.pageDescription}
                    </motion.p>
                </div>

                {/* Category Filter */}
                <div className="bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-slate-700 sticky top-0 z-20 shadow-sm">
                    <div className="px-4 md:px-10 lg:px-20 flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
                        <motion.button
                            key="__all__"
                            onClick={() => setActiveCategoryId(ALL_CATEGORY_ID)}
                            whileTap={{ scale: 0.95 }}
                            className={`flex-shrink-0 px-5 py-2 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${activeCategoryId === ALL_CATEGORY_ID
                                    ? "bg-[#1a2355] text-white shadow"
                                    : "bg-gray-100 dark:bg-slate-700 text-[#1a2355] dark:text-white hover:bg-[#1a2355]/10"
                                }`}
                        >
                            {t.news.categoryAll}
                        </motion.button>
                        {categories.map((cat) => (
                            <motion.button
                                key={cat.category_id}
                                onClick={() => setActiveCategoryId(cat.category_id)}
                                whileTap={{ scale: 0.95 }}
                                className={`flex-shrink-0 px-5 py-2 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${activeCategoryId === cat.category_id
                                        ? "bg-[#1a2355] text-white shadow"
                                        : "bg-gray-100 dark:bg-slate-700 text-[#1a2355] dark:text-white hover:bg-[#1a2355]/10"
                                    }`}
                            >
                                {cat.title}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="px-4 md:px-10 lg:px-20 py-10">

                    {/* Loading */}
                    {listLoading && list.length === 0 && (
                        <div className="flex justify-center items-center py-32">
                            <div className="w-10 h-10 rounded-full border-4 border-[#1a2355] border-t-transparent animate-spin" />
                        </div>
                    )}

                    {/* Error */}
                    {listError && !listLoading && (
                        <div className="text-center py-24 text-gray-400 font-semibold text-lg">
                            {t.news.errorMessage}
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {!listLoading && !listError && list.length === 0 && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center py-24 text-gray-400 font-semibold text-lg"
                            >
                                {t.news.noNews}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {featured && (
                        <>
                            {/* Featured Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <Link href={`/news/${newsSlug(featured.news_id, featured.title)}`}>
                                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg overflow-hidden mb-10 flex flex-col lg:flex-row cursor-pointer group">
                                        <div className="lg:w-1/2 w-full h-72 lg:h-auto relative flex-shrink-0 overflow-hidden">
                                            <Image
                                                src={`${featured.cover_image}`}
                                                alt={featured.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center px-8 py-8 gap-5 lg:w-1/2">
                                            <div className="flex items-center gap-3">
                                                <span className={`${categoryColor(featured.cateogry_id)} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1`}>
                                                    <LocalOfferIcon sx={{ fontSize: 13 }} />
                                                    {categoryLabel(featured.cateogry_id)}
                                                </span>
                                                <span className="text-gray-400 dark:text-gray-500 text-sm flex items-center gap-1">
                                                    <CalendarMonthIcon sx={{ fontSize: 15 }} />
                                                    {formatDate(featured.created_at)}
                                                </span>
                                            </div>
                                            <h2 className="text-[#1a2355] dark:text-white font-bold text-2xl md:text-3xl leading-snug group-hover:underline decoration-[#1a2355]/30 underline-offset-4">
                                                {featured.title}
                                            </h2>
                                            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed line-clamp-3">
                                                {stripHtml(featured.html_content)}
                                            </p>
                                            <div className="flex items-center gap-1 text-[#1a2355] dark:text-[#5A9BD3] font-bold text-sm w-fit mt-2">
                                                {t.news.readMore}
                                                <ChevronRightIcon sx={{ fontSize: 18 }} className="transition-transform duration-300 group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>

                            {rest.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="flex items-center gap-4 mb-8"
                                >
                                    <h2 className="text-xl font-bold text-[#1a2355] dark:text-white flex-shrink-0">
                                        {t.news.otherNews}
                                    </h2>
                                    <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700" />
                                </motion.div>
                            )}
                        </>
                    )}

                    {/* News Grid */}
                    {rest.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {rest.map((item, i) => (
                                <motion.div
                                    key={item.news_id}
                                    custom={i}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                    className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md overflow-hidden flex flex-col cursor-pointer group hover:shadow-xl transition-shadow duration-300"
                                >
                                    <Link href={`/news/${newsSlug(item.news_id, item.title)}`} className="flex flex-col h-full">
                                        <div className="h-48 relative overflow-hidden">
                                            <Image
                                                src={`${item.cover_image}`}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <span className={`absolute top-3 left-3 ${categoryColor(item.cateogry_id)} text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1`}>
                                                <LocalOfferIcon sx={{ fontSize: 12 }} />
                                                {categoryLabel(item.cateogry_id)}
                                            </span>
                                        </div>
                                        <div className="p-5 flex flex-col gap-3 flex-1">
                                            <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500 text-xs">
                                                <CalendarMonthIcon sx={{ fontSize: 14 }} />
                                                <span>{formatDate(item.created_at)}</span>
                                            </div>
                                            <h3 className="text-[#1a2355] dark:text-white font-bold text-sm leading-snug flex-1 group-hover:underline decoration-[#1a2355]/30 underline-offset-2 line-clamp-3">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400 dark:text-gray-500 text-xs leading-relaxed line-clamp-2">
                                                {stripHtml(item.html_content)}
                                            </p>
                                            <div className="flex items-center gap-0.5 text-[#1a2355] dark:text-[#5A9BD3] font-semibold text-xs mt-1 w-fit">
                                                {t.news.readMore}
                                                <ChevronRightIcon sx={{ fontSize: 14 }} className="transition-transform duration-300 group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Load More */}
                    {list.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex justify-center mt-14"
                        >
                            <motion.button
                                onClick={handleLoadMore}
                                disabled={listLoading}
                                whileHover={{ scale: listLoading ? 1 : 1.04 }}
                                whileTap={{ scale: listLoading ? 1 : 0.97 }}
                                className="group flex items-center gap-2 bg-[#1a2355] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#1a2355]/90 transition-colors duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {listLoading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                        {t.news.loadMore}
                                    </span>
                                ) : (
                                    <>
                                        {t.news.loadMore}
                                        <ChevronRightIcon className="rotate-90 transition-transform duration-300 group-hover:translate-y-1" />
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </main>
            </>
    );
}
