"use client";

import Image from "next/image";
import Link from "next/link";
import { newsSlug } from "@/util/slugify";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsList } from "@/redux/features/newsSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { getNewsCategories, type NewsCategoryItem } from "@/services/newsService/newsService";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";

const PALETTE = [
    "bg-blue-600",
    "bg-emerald-600",
    "bg-purple-600",
    "bg-orange-600",
    "bg-[#ee7c7e]",
    "bg-cyan-600",
    "bg-indigo-600",
];

function formatDate(iso: string, lang: string) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString(lang === 'az' ? 'az-AZ' : 'en-US', {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

function stripHtml(html: string) {
    return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

const cardVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] },
    }),
};

const ALL_CATEGORY_ID = "__all__";

export default function NewsPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const dispatch = useDispatch<AppDispatch>();
    const { list, listLoading } = useSelector((s: RootState) => s.news);
    const [categories, setCategories] = useState<NewsCategoryItem[]>([]);
    const [activeCategoryId, setActiveCategoryId] = useState<string>(ALL_CATEGORY_ID);
    const [page, setPage] = useState(0);
    const PAGE_SIZE = 12;

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
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden pb-32">
            {/* STUNNING BACKGROUND ELEMENTS - MATCHING HOME PAGE */}
            <div className="bg-mesh" />
            <div className="bg-grid-premium" />

            <PageHero
                title={t.news.pageTitle}
                description={t.news.pageDescription}
                breadcrumbs={[
                    { label: t.news.breadcrumb }
                ]}
            />

            {/* ── Category Filter ── */}
            <div className="sticky top-[84px] lg:top-4 z-30 mx-4 md:mx-10 lg:mx-20 -mt-8">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-[#1a2355]/10 dark:border-white/10 p-2.5 rounded-[2.5rem] shadow-2xl shadow-black/5 flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-hide max-w-[1600px] mx-auto">
                    <button
                        onClick={() => setActiveCategoryId(ALL_CATEGORY_ID)}
                        className={`flex-shrink-0 px-8 py-3.5 rounded-[1.8rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 cursor-pointer ${activeCategoryId === ALL_CATEGORY_ID
                                ? "bg-[#1a2355] text-white shadow-xl"
                                : "text-[#1a2355] dark:text-white/60 hover:bg-[#1a2355]/5 dark:hover:bg-white/5"
                            }`}
                    >
                        {t.news.categoryAll}
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.category_id}
                            onClick={() => setActiveCategoryId(cat.category_id)}
                            className={`flex-shrink-0 px-8 py-3.5 rounded-[1.8rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 cursor-pointer ${activeCategoryId === cat.category_id
                                    ? "bg-[#1a2355] text-white shadow-xl"
                                    : "text-[#1a2355] dark:text-white/60 hover:bg-[#1a2355]/5 dark:hover:bg-white/5"
                                }`}
                        >
                            {cat.title}
                        </button>
                    ))}
                </div>
            </div>

            <PageContainer>
                {/* Featured News */}
                {featured && !listLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-20"
                    >
                        <Link href={`/news/${newsSlug(featured.news_id, featured.title)}`}>
                            <div className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[4rem] shadow-2xl shadow-blue-900/5 border-2 border-[#1a2355]/10 dark:border-white/10 overflow-hidden flex flex-col lg:flex-row hover:border-[#ee7c7e]/30 transition-all duration-700">
                                <div className="lg:w-3/5 w-full h-[500px] relative overflow-hidden">
                                    <Image
                                        src={`${featured.cover_image}`}
                                        alt={featured.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </div>
                                <div className="lg:w-2/5 w-full p-12 md:p-20 flex flex-col justify-center relative z-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className={`${categoryColor(featured.cateogry_id)} text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg`}>
                                            {categoryLabel(featured.cateogry_id)}
                                        </span>
                                        <span className="text-gray-400 dark:text-white/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                            <CalendarMonthIcon sx={{ fontSize: 16 }} />
                                            {formatDate(featured.created_at, lang)}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-[#1a2355] dark:text-white mb-8 leading-[1.1] tracking-tighter group-hover:text-[#ee7c7e] transition-colors duration-500">
                                        {featured.title}
                                    </h2>
                                    <p className="text-gray-500 dark:text-white/60 text-lg leading-relaxed line-clamp-3 mb-12 text-justify font-medium">
                                        {stripHtml(featured.html_content)}
                                    </p>
                                    <div className="flex items-center gap-3 text-[#1a2355] dark:text-white font-black text-xs uppercase tracking-[0.2em] group-hover:text-[#ee7c7e] transition-all">
                                        {t.news.readMore}
                                        <div className="w-12 h-12 rounded-2xl bg-[#1a2355]/5 dark:bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-[#ee7c7e] group-hover:text-white group-hover:translate-x-2 border border-[#1a2355]/5">
                                            <ChevronRightIcon sx={{ fontSize: 24 }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* Rest of News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {rest.map((item, i) => (
                        <motion.div
                            key={item.news_id}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Link href={`/news/${newsSlug(item.news_id, item.title)}`} className="group block h-full">
                                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[3rem] shadow-2xl shadow-blue-900/5 border-2 border-[#1a2355]/10 dark:border-white/10 overflow-hidden flex flex-col h-full hover:border-[#ee7c7e]/30 transition-all duration-700 hover:-translate-y-2">
                                    <div className="h-72 relative overflow-hidden">
                                        <Image
                                            src={`${item.cover_image}`}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className={`absolute top-6 left-6 ${categoryColor(item.cateogry_id)} text-white text-[9px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest shadow-xl`}>
                                            {categoryLabel(item.cateogry_id)}
                                        </div>
                                    </div>
                                    <div className="p-10 flex flex-col flex-1 relative z-10">
                                        <div className="flex items-center gap-2 text-gray-400 dark:text-white/20 text-[10px] font-black uppercase tracking-widest mb-6">
                                            <CalendarMonthIcon sx={{ fontSize: 14 }} />
                                            <span>{formatDate(item.created_at, lang)}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-[#1a2355] dark:text-white leading-[1.3] mb-6 group-hover:text-[#ee7c7e] transition-colors duration-500 tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed line-clamp-3 mb-8 text-justify font-medium">
                                            {stripHtml(item.html_content)}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a2355] dark:text-white/60 group-hover:text-[#ee7c7e] transition-colors">
                                                {t.news.readMore}
                                            </span>
                                            <div className="w-10 h-10 rounded-xl bg-[#1a2355]/5 dark:bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-[#ee7c7e] group-hover:text-white group-hover:translate-x-2 border border-[#1a2355]/5">
                                                <ChevronRightIcon sx={{ fontSize: 20 }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Load More Button */}
                {list.length > 0 && (
                    <div className="mt-24 flex justify-center">
                        <motion.button
                            onClick={handleLoadMore}
                            disabled={listLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group px-12 py-5 bg-[#1a2355] text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] shadow-2xl shadow-blue-900/40 hover:bg-[#ee7c7e] hover:shadow-red-900/40 transition-all duration-500 flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {listLoading ? (
                                <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            ) : (
                                <>
                                    {t.news.loadMore}
                                    <ChevronRightIcon className="rotate-90 group-hover:translate-y-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </div>
                )}
            </PageContainer>
        </main>
    );
}
