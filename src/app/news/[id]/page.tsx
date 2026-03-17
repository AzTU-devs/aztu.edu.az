"use client";

import { use, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import CollectionsIcon from "@mui/icons-material/Collections";
import { fetchNewsById, clearNewsDetail, fetchNewsList } from "@/redux/features/newsSlice";
import type { AppDispatch, RootState } from "@/redux/store";
import { API_BASE_URL } from "@/util/apiClient";
import { parseNewsSlug, newsSlug } from "@/util/slugify";

function formatDate(iso: string) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("az-AZ", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

export default function NewsDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: slug } = use(params);
    const id = parseNewsSlug(slug);
    const dispatch = useDispatch<AppDispatch>();
    const { detail, detailLoading, detailError, list } = useSelector(
        (s: RootState) => s.news
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const { scrollYProgress } = useScroll({ target: containerRef });
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroImageY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
    const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

    useEffect(() => {
        dispatch(fetchNewsById({ id: id, lang: "az" }));
        if (list.length === 0) {
            dispatch(fetchNewsList({ start: 0, end: 10, lang: "az" }));
        }
        return () => { dispatch(clearNewsDetail()); };
    }, [id, dispatch]);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        document.body.style.overflow = lightboxOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [lightboxOpen]);

    const handleCopy = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        }
    };

    const related = list.filter((n) => n.news_id !== id).slice(0, 3);

    // All images: cover first, then gallery
    const allImages = detail
        ? [detail.cover_image, ...detail.gallery_images.map((g) => g.image)]
        : [];

    return (
        <>
            <HeaderChanger />

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1a2355] via-blue-400 to-[#ee7c7e] z-[60] origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-4"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <button
                            onClick={() => setLightboxOpen(false)}
                            className="absolute top-5 right-5 text-white/60 hover:text-white text-3xl font-light leading-none cursor-pointer"
                        >
                            ×
                        </button>
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="relative w-full max-w-5xl aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={`${allImages[lightboxIndex]}`}
                                alt={`Şəkil ${lightboxIndex + 1}`}
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                        {/* Lightbox nav */}
                        <div className="flex items-center gap-6 mt-5 text-white/60 text-sm">
                            <button
                                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length); }}
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                <ChevronLeftIcon sx={{ fontSize: 32 }} />
                            </button>
                            <span>{lightboxIndex + 1} / {allImages.length}</span>
                            <button
                                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i + 1) % allImages.length); }}
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                <ChevronRightIcon sx={{ fontSize: 32 }} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <main ref={containerRef} className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">

                {/* ── Hero Banner ── */}
                <section
                    ref={heroRef}
                    className="relative bg-gradient-to-br from-[#060d1f] via-[#1a2355] to-[#0f2a4a] overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#ee7c7e]/10 blur-3xl pointer-events-none" />

                    <motion.div style={{ opacity: heroOpacity }}>
                        <div className="relative z-10 px-4 md:px-10 lg:px-20 pt-36 pb-0">

                            {/* Breadcrumb */}
                            <motion.nav
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.45 }}
                                className="flex items-center gap-1.5 text-white/40 text-xs mb-8 flex-wrap"
                            >
                                <Link href="/" className="hover:text-white/80 transition-colors">Ana səhifə</Link>
                                <ChevronRightIcon sx={{ fontSize: 14 }} />
                                <Link href="/news" className="hover:text-white/80 transition-colors">Xəbərlər</Link>
                                <ChevronRightIcon sx={{ fontSize: 14 }} />
                                <span className="text-white/60 truncate max-w-xs">{detail?.az_title ?? "..."}</span>
                            </motion.nav>

                            {/* Meta */}
                            {detail && (
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, delay: 0.08 }}
                                    className="flex flex-wrap items-center gap-3 mb-5"
                                >
                                    <span className="bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                        {detail.category_id}
                                    </span>
                                    <span className="text-white/40 text-xs flex items-center gap-1">
                                        <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                        {list.find((n) => n.news_id === id)?.created_at
                                            ? formatDate(list.find((n) => n.news_id === id)!.created_at)
                                            : ""}
                                    </span>
                                    {allImages.length > 1 && (
                                        <span className="text-white/40 text-xs flex items-center gap-1">
                                            <CollectionsIcon sx={{ fontSize: 13 }} />
                                            {allImages.length} şəkil
                                        </span>
                                    )}
                                </motion.div>
                            )}

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl mb-12"
                            >
                                {detailLoading
                                    ? <span className="opacity-40">Yüklənir...</span>
                                    : (detail?.az_title ?? "")}
                            </motion.h1>

                            {/* Hero cover image */}
                            {detail && (
                                <motion.div
                                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" }}
                                    className="relative w-full h-64 md:h-[420px] lg:h-[520px] rounded-t-3xl overflow-hidden cursor-pointer"
                                    onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }}
                                >
                                    <motion.div style={{ y: heroImageY }} className="absolute inset-0 scale-110">
                                        <Image
                                            src={`${detail.cover_image}`}
                                            alt={detail.az_title}
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                                    {allImages.length > 1 && (
                                        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                            <CollectionsIcon sx={{ fontSize: 14 }} />
                                            {allImages.length} şəkil
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </section>

                {/* ── Loading / Error ── */}
                {detailLoading && (
                    <div className="flex justify-center items-center py-32">
                        <div className="w-10 h-10 rounded-full border-4 border-[#1a2355] border-t-transparent animate-spin" />
                    </div>
                )}
                {detailError && !detailLoading && (
                    <div className="text-center py-24 text-gray-400 font-semibold text-lg">
                        Xəbər tapılmadı.
                    </div>
                )}

                {/* ── Article Content ── */}
                {detail && !detailLoading && (
                    <section className="px-4 md:px-10 lg:px-20 py-14">
                        <div className="flex flex-col lg:flex-row gap-10">
                            {/* ── Main article ── */}
                            <div className="flex-1 min-w-0">
                                <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.55 }}
                                className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium border-l-4 border-[#1a2355] pl-6 mb-10 bg-blue-50/60 py-4 pr-4 rounded-r-xl"
                            >
                                {detail.az_title}
                            </motion.p>
                                <div
                                    className="prose prose-slate dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg"
                                    dangerouslySetInnerHTML={{ __html: detail.az_html_content }}
                                />

                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="h-px bg-gradient-to-r from-[#1a2355]/30 via-gray-300 to-transparent mt-12 mb-8 origin-left"
                                />

                                {/* Back link */}
                                <Link href="/news">
                                    <motion.div
                                        whileHover={{ x: -3 }}
                                        transition={{ duration: 0.2 }}
                                        className="inline-flex items-center gap-2 text-[#1a2355] dark:text-white font-semibold text-sm bg-white dark:bg-[#1e293b] rounded-xl px-4 py-2.5 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                    >
                                        <ArrowBackIcon sx={{ fontSize: 18 }} />
                                        Xəbərlərə qayıt
                                    </motion.div>
                                </Link>
                            </div>

                            {/* ── Sticky Sidebar ── */}
                            <motion.aside
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.55, delay: 0.3 }}
                                className="lg:w-72 xl:w-80 flex-shrink-0"
                            >
                                <div className="sticky top-24 space-y-4">

                                    {/* Article info card */}
                                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md overflow-hidden">
                                        <div className="bg-gradient-to-r from-[#1a2355] to-[#13365E] px-5 py-4">
                                            <h3 className="text-white font-bold text-sm uppercase tracking-widest">
                                                Xəbər haqqında
                                            </h3>
                                        </div>
                                        <div className="p-5 space-y-4 text-sm">
                                            <div className="flex gap-3">
                                                <span className="text-gray-400 dark:text-gray-500 min-w-[72px]">Tarix</span>
                                                <span className="text-[#1a2355] dark:text-white font-semibold">
                                                    {list.find((n) => n.news_id === id)?.created_at
                                                        ? formatDate(list.find((n) => n.news_id === id)!.created_at)
                                                        : "—"}
                                                </span>
                                            </div>
                                            <div className="h-px bg-gray-100 dark:bg-slate-700" />
                                            <div className="flex gap-3">
                                                <span className="text-gray-400 dark:text-gray-500 min-w-[72px]">Kateqoriya</span>
                                                <span className="bg-[#1a2355] text-white text-xs font-bold px-2.5 py-1 rounded-full self-start">
                                                    {detail.category_id}
                                                </span>
                                            </div>
                                            {allImages.length > 1 && (
                                                <>
                                                    <div className="h-px bg-gray-100 dark:bg-slate-700" />
                                                    <div className="flex gap-3">
                                                        <span className="text-gray-400 dark:text-gray-500 min-w-[72px]">Qalereya</span>
                                                        <span className="text-[#1a2355] dark:text-white font-semibold flex items-center gap-1.5">
                                                            <CollectionsIcon sx={{ fontSize: 15 }} />
                                                            {allImages.length} şəkil
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Share card */}
                                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md p-5 space-y-3">
                                        <h3 className="text-[#1a2355] dark:text-white font-bold text-sm uppercase tracking-widest">
                                            Paylaş
                                        </h3>
                                        <motion.button
                                            onClick={handleCopy}
                                            whileTap={{ scale: 0.96 }}
                                            className="w-full flex items-center justify-center gap-2 bg-[#1a2355] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a2355]/85 transition-colors cursor-pointer"
                                        >
                                            <AnimatePresence mode="wait">
                                                {copied ? (
                                                    <motion.span key="c2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                                                        <CheckIcon sx={{ fontSize: 16 }} /> Kopyalandı!
                                                    </motion.span>
                                                ) : (
                                                    <motion.span key="c1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                                                        <ContentCopyIcon sx={{ fontSize: 16 }} /> Linki kopyala
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.aside>

                        </div>
                    </section>
                )}

                {/* ── Gallery Slider ── */}
                {detail && !detailLoading && allImages.length > 1 && (
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#0f172a] py-16"
                    >
                        <div className="px-4 md:px-10 lg:px-20 mb-8 flex items-center gap-4">
                            <CollectionsIcon sx={{ fontSize: 22, color: "#ee7c7e" }} />
                            <h2 className="text-xl font-bold text-white">Qalereya</h2>
                            <span className="text-white/30 text-sm">{allImages.length} şəkil</span>
                            <div className="flex-1 h-px bg-white/10" />
                        </div>

                        {/* Main slider */}
                        <div className="relative px-4 md:px-10 lg:px-20 group">
                            {/* Custom nav buttons */}
                            <button className="gallery-prev absolute left-6 md:left-12 lg:left-22 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100">
                                <ChevronLeftIcon />
                            </button>
                            <button className="gallery-next absolute right-6 md:right-12 lg:right-22 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100">
                                <ChevronRightIcon />
                            </button>

                            <Swiper
                                modules={[Navigation, Thumbs, FreeMode]}
                                navigation={{ prevEl: ".gallery-prev", nextEl: ".gallery-next" }}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                spaceBetween={16}
                                className="rounded-2xl overflow-hidden h-[55vh] md:h-[70vh]"
                            >
                                {allImages.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <div
                                            className="relative w-full h-full cursor-zoom-in"
                                            onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                                        >
                                            <Image
                                                src={`${img}`}
                                                alt={`${detail.az_title} — şəkil ${i + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Thumbnail strip */}
                        <div className="px-4 md:px-10 lg:px-20 mt-4">
                            <Swiper
                                modules={[FreeMode, Thumbs]}
                                onSwiper={setThumbsSwiper}
                                spaceBetween={8}
                                slidesPerView="auto"
                                freeMode
                                watchSlidesProgress
                                className="gallery-thumbs"
                            >
                                {allImages.map((img, i) => (
                                    <SwiperSlide key={i} style={{ width: "80px" }}>
                                        <div className="relative w-20 h-14 rounded-lg overflow-hidden cursor-pointer transition-all duration-200">
                                            <Image
                                                src={`${img}`}
                                                alt={`thumb ${i + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </motion.section>
                )}

                {/* ── Related News ── */}
                {related.length > 0 && !detailLoading && (
                    <section className="bg-white dark:bg-[#1e293b] py-16 px-4 md:px-10 lg:px-20">
                        <div className="max-w-7xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-4 mb-10"
                            >
                                <h2 className="text-xl font-bold text-[#1a2355] dark:text-white flex-shrink-0">
                                    Digər xəbərlər
                                </h2>
                                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-slate-600" />
                            </motion.div>

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {related.map((item) => (
                                    <motion.div
                                        key={item.news_id}
                                        variants={fadeUp}
                                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                        className="group bg-gray-50 dark:bg-[#0f172a] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                    >
                                        <Link href={`/news/${newsSlug(item.news_id, item.title)}`}>
                                            <div className="h-48 relative overflow-hidden">
                                                <Image
                                                    src={`${item.cover_image}`}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <span className="absolute top-3 left-3 bg-[#1a2355] text-white text-xs font-bold px-2 py-1 rounded-lg">
                                                    {item.cateogry_id}
                                                </span>
                                            </div>
                                            <div className="p-5 space-y-2">
                                                <div className="flex items-center gap-1 text-gray-400 text-xs">
                                                    <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                                    <span>{formatDate(item.created_at)}</span>
                                                </div>
                                                <h3 className="text-[#1a2355] dark:text-white font-bold text-sm leading-snug line-clamp-2 group-hover:underline decoration-[#1a2355]/30 underline-offset-2">
                                                    {item.title}
                                                </h3>
                                                <div className="flex items-center gap-1 text-[#1a2355] dark:text-[#5A9BD3] font-semibold text-xs pt-1">
                                                    Ətraflı oxu
                                                    <ChevronRightIcon sx={{ fontSize: 14 }} className="transition-transform duration-300 group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex justify-center mt-10"
                            >
                                <Link href="/news">
                                    <motion.div
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="flex items-center gap-2 border-2 border-[#1a2355] text-[#1a2355] dark:border-white dark:text-white font-bold px-8 py-3 rounded-xl hover:bg-[#1a2355] hover:text-white transition-colors duration-300 cursor-pointer"
                                    >
                                        Bütün xəbərlər
                                        <ChevronRightIcon sx={{ fontSize: 18 }} />
                                    </motion.div>
                                </Link>
                            </motion.div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />
        </>
    );
}
