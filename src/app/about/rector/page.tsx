"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import VilayetVeliyev from "@/../public/vilayet_veliyev.jpeg";
import SectionBlock from "@/components/shared/SectionBlock";
import { useTranslation } from "@/hooks/useTranslation";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HomeIcon from "@mui/icons-material/Home";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const rectorData = {
    fullName: "Vilayet Veliyev",
    academicDegree: "Doctor of Technical Sciences, Professor",
    title: "Rector of Azerbaijan Technical University",
    email: "rector@aztu.edu.az",
    phone: "+994 12 539 08 57",
};

const stats = [
    { icon: SchoolIcon, label: "Doctorate", value: "Technical Sciences" },
    { icon: WorkspacePremiumIcon, label: "Title", value: "Professor" },
    { icon: FormatQuoteIcon, label: "Experience", value: "30+ Years" },
];

function GallerySlider({ items }: { items: { caption: string }[] }) {
    const [current, setCurrent] = useState(0);
    const total = items.length;

    const prev = () => setCurrent((c) => (c - 1 + total) % total);
    const next = () => setCurrent((c) => (c + 1) % total);

    const visibleItems = useMemo(() => {
        const result = [];
        for (let i = 0; i < 3; i++) {
            result.push({ ...items[(current + i) % total], originalIndex: (current + i) % total });
        }
        return result;
    }, [current, items, total]);

    return (
        <div className="relative group">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {visibleItems.map((item, idx) => (
                        <motion.div
                            key={`${item.originalIndex}-${idx}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden group/item">
                                <Image
                                    src={VilayetVeliyev}
                                    alt={item.caption}
                                    fill
                                    className="object-cover object-top transition-transform duration-500 group-hover/item:scale-110 grayscale-[0.3] group-hover/item:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-4">
                                <p className="text-sm text-gray-600 dark:text-slate-300 font-medium leading-relaxed">{item.caption}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="flex items-center justify-center gap-6 mt-10">
                <button
                    onClick={prev}
                    className="w-12 h-12 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-[#1a2355] dark:text-white hover:bg-[#1a2355] hover:text-white hover:border-[#1a2355] transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                    <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
                </button>
                <div className="flex items-center gap-2">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-2 rounded-full transition-all duration-500 ${i === current ? "bg-[#ee7c7e] w-8" : "bg-gray-300 dark:bg-slate-700 w-2 hover:bg-gray-400"}`}
                        />
                    ))}
                </div>
                <button
                    onClick={next}
                    className="w-12 h-12 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center text-[#1a2355] dark:text-white hover:bg-[#1a2355] hover:text-white hover:border-[#1a2355] transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                    <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
                </button>
            </div>
        </div>
    );
}

export default function RectorPage() {
    const t = useTranslation();
    const p = t.pages.about.rector;

    const leadershipLabel = t.lang === "az" ? "Rəhbərlik və İdarəetmə" : "Leadership and Management";
    const leadershipHref = t.lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme" : "/about/leadership-and-management";

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* STUNNING HERO SECTION */}
            <div className="relative min-h-screen lg:min-h-[95vh] flex flex-col pt-44 lg:pt-48">
                {/* Background Graphics */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {/* Full dark background for text contrast */}
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    {/* The styled shape */}
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
                    
                    {/* Overlay gradient to soften the transition on the left */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330] via-[#0b1330]/80 to-transparent hidden lg:block" />
                    
                    {/* Abstract circles */}
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-[#ee7c7e]/10 rounded-full blur-2xl" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-12">
                    {/* Breadcrumbs - Now consistently at the top */}
                    <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 lg:mb-16">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                            Home
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={t.lang === "az" ? "/haqqimizda" : "/about"} className="hover:text-white transition-colors">
                            {t.nav.sections.about}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={leadershipHref} className="hover:text-white transition-colors">
                            {leadershipLabel}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{p.breadcrumb}</span>
                    </nav>

                    <div className="flex-1 flex flex-col justify-center">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                            {/* LEFT: Text Content */}
                            <div className="lg:col-span-7 text-white order-2 lg:order-1">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                                        {p.eyebrow}
                                    </span>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                                        {rectorData.fullName}
                                    </h1>
                                    <p className="text-xl lg:text-2xl text-white/80 font-medium mb-10 max-w-2xl leading-relaxed italic">
                                        &quot;{p.message[0].substring(0, 150)}...&quot;
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                                        {stats.map((stat, i) => (
                                            <motion.div 
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 + (i * 0.1) }}
                                                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors"
                                            >
                                                <stat.icon className="text-[#ee7c7e] mb-3" sx={{ fontSize: 28 }} />
                                                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{stat.label}</p>
                                                <p className="text-sm font-bold">{stat.value}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        <a href={`mailto:${rectorData.email}`} className="flex items-center gap-3 px-6 py-3.5 bg-white text-[#1a2355] rounded-2xl font-black text-sm hover:bg-[#ee7c7e] hover:text-white transition-all duration-300 shadow-xl shadow-black/20 group">
                                            <EmailIcon sx={{ fontSize: 18 }} />
                                            {rectorData.email}
                                        </a>
                                        <a href={`tel:${rectorData.phone}`} className="flex items-center gap-3 px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-sm hover:bg-white/20 transition-all duration-300">
                                            <LocalPhoneIcon sx={{ fontSize: 18 }} />
                                            {rectorData.phone}
                                        </a>
                                    </div>
                                </motion.div>
                            </div>

                            {/* RIGHT: Photo */}
                            <div className="lg:col-span-5 order-1 lg:order-2">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ duration: 1, ease: "circOut" }}
                                    className="relative aspect-[4/5] lg:aspect-square xl:aspect-[4/5] max-w-md mx-auto"
                                >
                                    {/* Decorative elements around photo */}
                                    <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-[#ee7c7e] rounded-tl-3xl z-20" />
                                    <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-[#ee7c7e] rounded-br-3xl z-20" />
                                    
                                    <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] z-10">
                                        <Image
                                            src={VilayetVeliyev}
                                            alt={rectorData.fullName}
                                            fill
                                            priority
                                            className="object-cover object-top"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2355]/40 to-transparent" />
                                    </div>

                                    {/* Floating Badge */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute -right-8 bottom-1/4 z-30 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 hidden md:block"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#ee7c7e]/10 flex items-center justify-center">
                                                <WorkspacePremiumIcon sx={{ color: '#ee7c7e' }} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-[#1a2355] dark:text-blue-300 uppercase tracking-tighter">Official Post</p>
                                                <p className="text-xs font-bold text-gray-600 dark:text-slate-400">University Rector</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTIONS */}
            <div className="px-4 md:px-10 lg:px-20 py-24 space-y-32">
                
                {/* RECTOR'S MESSAGE */}
                <section>
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-3xl lg:text-5xl font-black text-[#1a2355] dark:text-white mb-6">
                            {p.messageTitle}
                        </h2>
                        <div className="h-1.5 w-24 bg-[#ee7c7e] mx-auto rounded-full" />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        <div className="lg:col-span-8 space-y-8">
                            {p.message.map((para, i) => (
                                <p key={i} className="text-lg lg:text-xl text-gray-600 dark:text-slate-300 leading-relaxed text-justify first-letter:text-5xl first-letter:font-black first-letter:text-[#1a2355] dark:first-letter:text-white first-letter:mr-3 first-letter:float-left">
                                    {para}
                                </p>
                            ))}
                        </div>
                        <div className="lg:col-span-4 bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-700 shadow-sm relative">
                            <FormatQuoteIcon className="absolute -top-6 -left-6 text-[#ee7c7e]/20" sx={{ fontSize: 100 }} />
                            <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-6 relative z-10">
                                {p.aboutRectorTitle}
                            </h3>
                            <div className="space-y-4 text-sm text-gray-600 dark:text-slate-400 relative z-10">
                                {p.aboutRector.map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* DEPARTMENTS UNDER RECTOR */}
                <section className="bg-[#1a2355] rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                            <div className="max-w-xl">
                                <h2 className="text-3xl lg:text-4xl font-black mb-4">{p.departmentsTitle}</h2>
                                <p className="text-white/60">The following administrative and academic divisions operate directly under the Rector&#39;s supervision.</p>
                            </div>
                            <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 border border-white/20">
                                <span className="text-2xl font-black text-[#ee7c7e]">{p.departments.length}</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-white/60">Total Units</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {p.departments.map((dept, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-[#ee7c7e]/20 flex items-center justify-center shrink-0 group-hover:bg-[#ee7c7e] transition-colors duration-300">
                                        <span className="text-[10px] font-black">{i + 1}</span>
                                    </div>
                                    <span className="text-sm font-medium text-white/80 group-hover:text-white">{dept}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* GALLERY SECTION */}
                <section>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-black text-[#1a2355] dark:text-white mb-2">{p.galleryTitle}</h2>
                            <p className="text-gray-500 dark:text-slate-400">Moments from the Rector&#39;s academic and administrative activities.</p>
                        </div>
                    </div>
                    <GallerySlider items={p.galleryItems} />
                </section>

                {/* RELATED LINKS */}
                <section className="pt-20 border-t border-gray-200 dark:border-slate-800">
                    <h2 className="text-xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                        <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                        {t.common.moreInSection}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {p.related.map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href}
                                className="group flex items-center justify-between bg-white dark:bg-slate-800/50 p-6 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 hover:border-[#1a2355] dark:hover:border-[#ee7c7e] transition-all duration-300 shadow-sm hover:shadow-xl"
                            >
                                <span className="text-[#1a2355] dark:text-white font-black text-sm group-hover:text-[#ee7c7e] transition-colors">{link.title}</span>
                                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-[#1a2355] group-hover:text-white transition-all duration-300">
                                    <ChevronRightIcon sx={{ fontSize: 20 }} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
