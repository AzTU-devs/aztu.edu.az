"use client";

import { use, useRef, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import News1 from "@/../public/news/news-1.png";
import News2 from "@/../public/news/news-2.png";
import News3 from "@/../public/news/news-3.png";
import News4 from "@/../public/news/news-4.png";
import News5 from "@/../public/news/news-5.png";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
} from "framer-motion";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { allNews, categoryColors } from "../newsData";

const newsImages = [News1, News2, News3, News4, News5];

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: "easeOut" as const },
    },
};

export default function NewsDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const article = allNews.find((n) => n.id === parseInt(id));

    if (!article) notFound();

    const related = allNews
        .filter((n) => n.id !== article.id)
        .sort((a, b) =>
            a.category === article.category
                ? -1
                : b.category === article.category
                ? 1
                : 0
        )
        .slice(0, 3);

    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    const { scrollYProgress } = useScroll({ target: containerRef });
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroImageY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
    const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

    const handleCopy = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        }
    };

    const catColor = categoryColors[article.category] ?? "bg-[#1a2355]";

    return (
        <>
            <HeaderChanger />

            {/* ── Reading Progress Bar ── */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1a2355] via-blue-400 to-[#ee7c7e] z-[60] origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            <main ref={containerRef} className="min-h-screen bg-gray-50">

                {/* ══════════════════════════════════════
                    HERO BANNER
                ══════════════════════════════════════ */}
                <section
                    ref={heroRef}
                    className="relative bg-gradient-to-br from-[#060d1f] via-[#1a2355] to-[#0f2a4a] overflow-hidden"
                >
                    {/* Background decorative blobs */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#ee7c7e]/10 blur-3xl pointer-events-none" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03] pointer-events-none" />

                    <motion.div style={{ opacity: heroOpacity }}>
                        <div className="relative z-10 px-4 md:px-10 lg:px-20 pt-36 pb-0">

                            {/* Breadcrumb */}
                            <motion.nav
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.45 }}
                                className="flex items-center gap-1.5 text-white/40 text-xs mb-8 flex-wrap"
                            >
                                <Link href="/" className="hover:text-white/80 transition-colors">
                                    Ana səhifə
                                </Link>
                                <ChevronRightIcon sx={{ fontSize: 14 }} />
                                <Link href="/news" className="hover:text-white/80 transition-colors">
                                    Xəbərlər
                                </Link>
                                <ChevronRightIcon sx={{ fontSize: 14 }} />
                                <span className="text-white/60 truncate max-w-xs">{article.title}</span>
                            </motion.nav>

                            {/* Category + meta row */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.08 }}
                                className="flex flex-wrap items-center gap-3 mb-5"
                            >
                                <span
                                    className={`${catColor} text-white text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center gap-1.5`}
                                >
                                    <LocalOfferIcon sx={{ fontSize: 12 }} />
                                    {article.category}
                                </span>
                                <span className="text-white/40 text-xs flex items-center gap-1">
                                    <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                    {article.date} {article.month} {article.year}
                                </span>
                                <span className="text-white/40 text-xs flex items-center gap-1">
                                    <AccessTimeIcon sx={{ fontSize: 13 }} />
                                    {article.readTime} oxuma
                                </span>
                                <span className="text-white/40 text-xs flex items-center gap-1">
                                    <PersonIcon sx={{ fontSize: 13 }} />
                                    {article.author}
                                </span>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl mb-12"
                            >
                                {article.title}
                            </motion.h1>

                            {/* Hero image with parallax */}
                            <motion.div
                                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.7, delay: 0.22, ease: "easeOut" as const }}
                                className="relative w-full h-64 md:h-[420px] lg:h-[520px] rounded-t-3xl overflow-hidden"
                            >
                                <motion.div
                                    style={{ y: heroImageY }}
                                    className="absolute inset-0 scale-110"
                                >
                                    <Image
                                        src={newsImages[(article.imageIndex - 1) % 5]}
                                        alt={article.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </motion.div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* ══════════════════════════════════════
                    ARTICLE CONTENT
                ══════════════════════════════════════ */}
                <section className="px-4 md:px-10 lg:px-20 py-14">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

                        {/* ── Main Column ── */}
                        <div className="flex-1 min-w-0">

                            {/* Lead paragraph */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.55 }}
                                className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium border-l-4 border-[#1a2355] pl-6 mb-10 bg-blue-50/60 py-4 pr-4 rounded-r-xl"
                            >
                                {article.desc}
                            </motion.p>

                            {/* Body paragraphs */}
                            <div className="space-y-6">
                                {article.body.map((paragraph, i) => (
                                    <motion.p
                                        key={i}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.5, delay: i * 0.06 }}
                                        className="text-gray-600 text-base md:text-lg leading-relaxed"
                                    >
                                        {paragraph}
                                    </motion.p>
                                ))}
                            </div>

                            {/* Divider */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="h-px bg-gradient-to-r from-[#1a2355]/30 via-gray-300 to-transparent mt-12 mb-8 origin-left"
                            />

                            {/* Tags */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45 }}
                                className="flex flex-wrap gap-2"
                            >
                                <span className="text-gray-500 text-sm font-semibold mr-1 self-center">
                                    Etiketlər:
                                </span>
                                {article.tags.map((tag, i) => (
                                    <motion.span
                                        key={tag}
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3, delay: i * 0.05 }}
                                        whileHover={{ scale: 1.07 }}
                                        className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg hover:bg-[#1a2355] hover:text-white transition-colors duration-200 cursor-pointer"
                                    >
                                        #{tag}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>

                        {/* ── Sidebar ── */}
                        <motion.aside
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.55, delay: 0.35 }}
                            className="lg:w-64 xl:w-72 flex-shrink-0 space-y-5"
                        >
                            {/* Info card */}
                            <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
                                <h3 className="font-bold text-[#1a2355] text-sm uppercase tracking-widest">
                                    Məqalə haqqında
                                </h3>
                                <div className="space-y-3 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <CalendarMonthIcon sx={{ fontSize: 16, color: "#1a2355" }} />
                                        <span>
                                            {article.date} {article.month} {article.year}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <PersonIcon sx={{ fontSize: 16, color: "#1a2355" }} />
                                        <span>{article.author}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <AccessTimeIcon sx={{ fontSize: 16, color: "#1a2355" }} />
                                        <span>{article.readTime} oxuma</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <LocalOfferIcon sx={{ fontSize: 16, color: "#1a2355" }} />
                                        <span
                                            className={`${catColor} text-white text-xs font-bold px-2 py-0.5 rounded-md`}
                                        >
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Share card */}
                            <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
                                <h3 className="font-bold text-[#1a2355] text-sm uppercase tracking-widest">
                                    Paylaş
                                </h3>
                                <motion.button
                                    onClick={handleCopy}
                                    whileTap={{ scale: 0.96 }}
                                    className="w-full flex items-center justify-center gap-2 bg-[#1a2355] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a2355]/85 transition-colors"
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
                            <Link href="/news">
                                <motion.div
                                    whileHover={{ x: -4 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-2 text-[#1a2355] font-semibold text-sm bg-white rounded-xl px-4 py-3 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                                >
                                    <ArrowBackIcon sx={{ fontSize: 18 }} />
                                    Xəbərlərə qayıt
                                </motion.div>
                            </Link>
                        </motion.aside>
                    </div>
                </section>

                {/* ══════════════════════════════════════
                    RELATED NEWS
                ══════════════════════════════════════ */}
                {related.length > 0 && (
                    <section className="bg-white py-16 px-4 md:px-10 lg:px-20">
                        <div className="max-w-7xl mx-auto">
                            {/* Section heading */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-4 mb-10"
                            >
                                <h2 className="text-xl font-bold text-[#1a2355] flex-shrink-0">
                                    Əlaqəli xəbərlər
                                </h2>
                                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
                            </motion.div>

                            {/* Cards */}
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            >
                                {related.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        variants={fadeUp}
                                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                        className="group bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                                    >
                                        <Link href={`/news/${item.id}`}>
                                            {/* Image */}
                                            <div className="h-48 relative overflow-hidden">
                                                <Image
                                                    src={newsImages[(item.imageIndex - 1) % 5]}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <span
                                                    className={`absolute top-3 left-3 ${categoryColors[item.category] ?? "bg-[#1a2355]"} text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1`}
                                                >
                                                    <LocalOfferIcon sx={{ fontSize: 12 }} />
                                                    {item.category}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div className="p-5 space-y-2">
                                                <div className="flex items-center gap-1 text-gray-400 text-xs">
                                                    <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                                    <span>
                                                        {item.date} {item.month} {item.year}
                                                    </span>
                                                </div>
                                                <h3 className="text-[#1a2355] font-bold text-sm leading-snug group-hover:underline decoration-[#1a2355]/30 underline-offset-2 line-clamp-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                                                    {item.desc}
                                                </p>
                                                <div className="flex items-center gap-1 text-[#1a2355] font-semibold text-xs pt-1">
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
                            </motion.div>

                            {/* View all */}
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
                                        className="flex items-center gap-2 border-2 border-[#1a2355] text-[#1a2355] font-bold px-8 py-3 rounded-xl hover:bg-[#1a2355] hover:text-white transition-colors duration-300 cursor-pointer"
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
