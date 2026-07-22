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
import SDGBadges from "@/components/news/SDGBadges";
import { stripHtml, decodeHtmlEntities } from "@/util/htmlSanitizer";

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
    const { list, listTotal, listLoading } = useSelector((s: RootState) => s.news);
    const [categories, setCategories] = useState<NewsCategoryItem[]>([]);
    const [activeCategoryId, setActiveCategoryId] = useState<string>(ALL_CATEGORY_ID);
    const [activeSdgs, setActiveSdgs] = useState<number[]>([]);
    const [page, setPage] = useState(0);
    const PAGE_SIZE = 12;

    const toggleSdg = (n: number) => {
        setActiveSdgs((prev) =>
            prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n].sort((a, b) => a - b)
        );
    };

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

    const categoryColor = (categoryId: number | string | undefined) => {
        if (categoryId == null) return "bg-[#1a2355]";
        const idx = categories.findIndex((c) => String(c.category_id) === String(categoryId));
        if (idx < 0) return "bg-[#1a2355]";
        return PALETTE[idx % PALETTE.length] ?? "bg-[#1a2355]";
    };

    const categoryLabel = (categoryId: number | string | undefined) => {
        if (categoryId == null) return "";
        const found = categories.find((c) => String(c.category_id) === String(categoryId));
        return found?.title ?? String(categoryId);
    };

    const filteredList = activeSdgs.length === 0
        ? list
        : list.filter((n) =>
              Array.isArray(n.sdg_numbers) && activeSdgs.every((s) => n.sdg_numbers!.includes(s))
          );

    const featured = filteredList[0];
    const rest = filteredList.slice(1);

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden pb-32">
            {/* STUNNING BACKGROUND ELEMENTS - MATCHING HOME PAGE */}

            <PageHero
                title={t.news.pageTitle}
                description={t.news.pageDescription}
                breadcrumbs={[
                    { label: t.news.breadcrumb }
                ]}
            />

            {/* ── Category Filter ── */}
            <div className="sticky top-[84px] lg:top-4 z-30 mx-4 md:mx-10 lg:mx-20 -mt-8">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-[#1a2355]/30 dark:border-white/10 p-2.5 rounded-[18px] shadow-2xl shadow-black/5 flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-hide max-w-[1600px] mx-auto">
                    <button
                        onClick={() => setActiveCategoryId(ALL_CATEGORY_ID)}
                        className={`flex-shrink-0 px-8 py-3.5 rounded-[22px] font-black text-[10px] uppercase tracking-[0.12em] transition-all duration-500 cursor-pointer ${activeCategoryId === ALL_CATEGORY_ID
                                ? "bg-[#1a2355] text-white shadow-xl"
                                : "text-[#1a2355] dark:text-white/60 hover:bg-[#1a2355]/5 dark:hover:bg-white/5"
                            }`}
                    >
                        {t.news.categoryAll}
                    </button>
                    {categories.map((cat) => {
                        const id = String(cat.category_id);
                        const active = activeCategoryId === id;
                        return (
                            <button
                                key={id}
                                onClick={() => setActiveCategoryId(id)}
                                className={`flex-shrink-0 px-8 py-3.5 rounded-[22px] font-black text-[10px] uppercase tracking-[0.12em] transition-all duration-500 cursor-pointer ${active
                                        ? "bg-[#1a2355] text-white shadow-xl"
                                        : "text-[#1a2355] dark:text-white/60 hover:bg-[#1a2355]/5 dark:hover:bg-white/5"
                                    }`}
                            >
                                {cat.title}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── SDG Filter ── */}
            <div className="mx-4 md:mx-10 lg:mx-20 mt-4">
                <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-[#1a2355]/15 dark:border-white/10 rounded-3xl shadow-md max-w-[1600px] mx-auto p-4 flex flex-wrap items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.13em] text-[#1a2355]/70 dark:text-white/60 px-2">
                        SDG
                    </span>
                    <button
                        onClick={() => setActiveSdgs([])}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.12em] transition-all ${activeSdgs.length === 0
                                ? "bg-[#1a2355] text-white shadow"
                                : "bg-gray-100 dark:bg-white/5 text-[#1a2355] dark:text-white/60 hover:bg-[#1a2355]/10"
                            }`}
                    >
                        {lang === "en" ? "All" : "Hamısı"}
                    </button>
                    <div className="flex flex-wrap items-center gap-2">
                        {Array.from({ length: 17 }, (_, i) => i + 1).map((n) => {
                            const active = activeSdgs.includes(n);
                            return (
                                <button
                                    key={n}
                                    onClick={() => toggleSdg(n)}
                                    title={`SDG ${n}`}
                                    className={`w-9 h-9 inline-flex items-center justify-center rounded-lg text-[12px] font-black transition-all border ${active
                                            ? "bg-emerald-500 text-white border-emerald-600 shadow"
                                            : "bg-white dark:bg-white/5 text-[#1a2355] dark:text-white/70 border-gray-200 dark:border-white/10 hover:bg-emerald-50"
                                        }`}
                                >
                                    {n}
                                </button>
                            );
                        })}
                    </div>
                    {activeSdgs.length > 0 && (
                        <span className="ml-auto text-[11px] font-semibold text-gray-500 dark:text-white/50">
                            {filteredList.length} {lang === "en" ? "results" : "nəticə"}
                        </span>
                    )}
                </div>
            </div>

            <PageContainer>
                {!listLoading && filteredList.length === 0 && activeSdgs.length > 0 && (
                    <div className="text-center py-24">
                        <p className="text-lg font-bold text-[#1a2355] dark:text-white">
                            {lang === "en"
                                ? "No news matches the selected SDG filter."
                                : "Seçilmiş SDG filtri üzrə xəbər tapılmadı."}
                        </p>
                        <button
                            onClick={() => setActiveSdgs([])}
                            className="mt-4 px-6 py-2.5 rounded-2xl bg-[#1a2355] text-white text-[11px] font-black uppercase tracking-[0.13em] hover:bg-[#ee7c7e] transition-colors"
                        >
                            {lang === "en" ? "Clear filter" : "Filtri təmizlə"}
                        </button>
                    </div>
                )}

                {/* Featured News */}
                {featured && !listLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-20"
                    >
                        <Link href={`/news/${newsSlug(featured.news_id, featured.title)}`}>
                            <div className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[22px] shadow-2xl shadow-blue-900/5 border-2 border-[#1a2355]/30 dark:border-white/10 overflow-hidden flex flex-col lg:flex-row hover:border-[#ee7c7e]/30 transition-all duration-700">
                                <div className="lg:w-3/5 w-full h-[320px] lg:h-auto lg:min-h-[500px] relative overflow-hidden">
                                    <Image
                                        src={`${featured.cover_image}`}
                                        alt={featured.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </div>
                                <div className="lg:w-2/5 w-full p-12 md:p-20 flex flex-col justify-center relative z-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className={`${categoryColor(featured.category_id)} text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg`}>
                                            {categoryLabel(featured.category_id)}
                                        </span>
                                        <span className="text-gray-400 dark:text-white/30 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                            <CalendarMonthIcon sx={{ fontSize: 16 }} />
                                            {formatDate(featured.created_at, lang)}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-[#1a2355] dark:text-white mb-6 leading-[1.1] tracking-tighter group-hover:text-[#ee7c7e] transition-colors duration-500">
                                        {decodeHtmlEntities(featured.title)}
                                    </h2>
                                    {featured.sdg_numbers && featured.sdg_numbers.length > 0 && (
                                        <SDGBadges numbers={featured.sdg_numbers} size={48} className="mb-6" />
                                    )}
                                    <p className="text-gray-500 dark:text-white/60 text-lg leading-relaxed line-clamp-3 mb-12 text-justify font-medium">
                                        {stripHtml(featured.html_content, 240)}
                                    </p>
                                    <div className="flex items-center gap-3 text-[#1a2355] dark:text-white font-black text-xs uppercase tracking-[0.12em] group-hover:text-[#ee7c7e] transition-all">
                                        {t.news.readMore}
                                        <div className="w-12 h-12 rounded-2xl bg-[#1a2355]/5 dark:bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-[#ee7c7e] group-hover:text-white group-hover:translate-x-2 border border-[#1a2355]/30">
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
                                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[18px] shadow-2xl shadow-blue-900/5 border-2 border-[#1a2355]/30 dark:border-white/10 overflow-hidden flex flex-col h-full hover:border-[#ee7c7e]/30 transition-all duration-700 hover:-translate-y-2">
                                    <div className="h-72 relative overflow-hidden">
                                        <Image
                                            src={`${item.cover_image}`}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                        <div className={`absolute top-6 left-6 ${categoryColor(item.category_id)} text-white text-[9px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest shadow-xl`}>
                                            {categoryLabel(item.category_id)}
                                        </div>
                                    </div>
                                    <div className="p-10 flex flex-col flex-1 relative z-10">
                                        <div className="flex items-center gap-2 text-gray-400 dark:text-white/20 text-[10px] font-black uppercase tracking-widest mb-6">
                                            <CalendarMonthIcon sx={{ fontSize: 14 }} />
                                            <span>{formatDate(item.created_at, lang)}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-[#1a2355] dark:text-white leading-[1.3] mb-4 group-hover:text-[#ee7c7e] transition-colors duration-500 tracking-tight">
                                            {decodeHtmlEntities(item.title)}
                                        </h3>
                                        {item.sdg_numbers && item.sdg_numbers.length > 0 && (
                                            <SDGBadges numbers={item.sdg_numbers} size={36} className="mb-4" />
                                        )}
                                        <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed line-clamp-3 mb-8 text-justify font-medium">
                                            {stripHtml(item.html_content, 180)}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[#1a2355] dark:text-white/60 group-hover:text-[#ee7c7e] transition-colors">
                                                {t.news.readMore}
                                            </span>
                                            <div className="w-10 h-10 rounded-xl bg-[#1a2355]/5 dark:bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-[#ee7c7e] group-hover:text-white group-hover:translate-x-2 border border-[#1a2355]/30">
                                                <ChevronRightIcon sx={{ fontSize: 20 }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Load More Button — only while more news remain to fetch */}
                {list.length < listTotal && (
                    <div className="mt-24 flex justify-center">
                        <motion.button
                            onClick={handleLoadMore}
                            disabled={listLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group px-12 py-5 bg-[#1a2355] text-white rounded-[22px] font-black uppercase text-xs tracking-[0.14em] shadow-2xl shadow-blue-900/40 hover:bg-[#ee7c7e] hover:shadow-red-900/40 transition-all duration-500 flex items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
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
