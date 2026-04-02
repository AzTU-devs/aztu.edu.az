"use client";

import { useState } from "react";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import VilayetVeliyev from "@/../public/vilayet_veliyev.jpeg"
import AboutPageBanner from "@/components/about/AboutPageBanner";
import SectionBlock from "@/components/shared/SectionBlock";
import Link from "next/link";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "@/hooks/useTranslation";

const rector = {
    fullName: "Vilayet Veliyev",
    academicDegree: "Doctor of Technical Sciences, Professor",
    title: "Rector of Azerbaijan Technical University",
    email: "rector@aztu.edu.az",
    phone: "+994 12 539 08 57",
    photoUrl: null as string | null,
};

function GallerySlider({ items }: { items: { caption: string }[] }) {
    const [current, setCurrent] = useState(0);
    const visible = 3;
    const total = items.length;

    const prev = () => setCurrent((c) => (c - 1 + total) % total);
    const next = () => setCurrent((c) => (c + 1) % total);

    const getVisible = () => {
        const visible_items = [];
        for (let i = 0; i < visible; i++) {
            visible_items.push({ ...items[(current + i) % total], id: (current + i) % total });
        }
        return visible_items;
    };

    return (
        <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {getVisible().map((item) => (
                    <div
                        key={item.id}
                        className="rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm"
                    >
                        <div className="w-full h-48 bg-gradient-to-br from-[#1a2355]/10 to-[#ee7c7e]/10 dark:from-[#1a2355]/30 dark:to-[#ee7c7e]/20 flex items-center justify-center">
                            {/* <PersonIcon sx={{ fontSize: 64, color: "#1a2355", opacity: 0.25 }} /> */}
                            <img
                                            src={VilayetVeliyev.src}
                                            alt={rector.fullName}
                                            className="w-full h-full object-cover object-top"
                                        />
                        </div>
                        <div className="p-3">
                            <p className="text-xs text-gray-500 dark:text-slate-400 leading-snug">{item.caption}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
                <button
                    onClick={prev}
                    className="w-9 h-9 rounded-full border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 flex items-center justify-center hover:border-[#1a2355] hover:bg-[#1a2355] hover:text-white dark:hover:border-[#1a2355] dark:hover:bg-[#1a2355] text-[#1a2355] dark:text-white transition-all duration-200"
                    aria-label="Previous"
                >
                    <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                </button>
                <div className="flex items-center gap-1.5">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${i === current ? "bg-[#1a2355] dark:bg-white w-4" : "bg-gray-300 dark:bg-slate-600"}`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
                <button
                    onClick={next}
                    className="w-9 h-9 rounded-full border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 flex items-center justify-center hover:border-[#1a2355] hover:bg-[#1a2355] hover:text-white dark:hover:border-[#1a2355] dark:hover:bg-[#1a2355] text-[#1a2355] dark:text-white transition-all duration-200"
                    aria-label="Next"
                >
                    <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                </button>
            </div>
        </div>
    );
}

export default function RectorPage() {
    const t = useTranslation();
    const p = t.pages.about.rector;

    return (
        <>
            <HeaderChanger />
            <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
                <AboutPageBanner
                    eyebrow={p.eyebrow}
                    title={p.title}
                    subtitle={p.subtitle}
                    breadcrumbs={[{ label: t.nav.sections.about, href: "/about" }, { label: p.breadcrumb }]}
                />

                <div className="px-4 md:px-10 lg:px-20 py-14">

                    {/* Top section: Photo left + Bio right */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

                        {/* Left — Photo card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                                {/* Large non-rounded image */}
                                <div className="w-full h-72 bg-gradient-to-br from-[#1a2355]/10 to-[#ee7c7e]/10 dark:from-[#1a2355]/30 dark:to-[#ee7c7e]/20 flex items-center justify-center overflow-hidden">
                                    {/* {rector.photoUrl ? ( */}
                                        <img
                                            src={VilayetVeliyev.src}
                                            alt={rector.fullName}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    {/* ) : (
                                        <PersonIcon sx={{ fontSize: 100, color: "#1a2355", opacity: 0.2 }} />
                                    )} */}
                                </div>

                                {/* Info below image */}
                                <div className="p-5 text-center">
                                    <p className="font-bold text-[#1a2355] dark:text-white text-base leading-snug">
                                        {rector.fullName}
                                    </p>
                                    <p className="text-xs text-[#ee7c7e] font-medium mt-1">
                                        {rector.academicDegree}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                                        {rector.title}
                                    </p>
                                    <div className="mt-4 flex flex-col gap-2">
                                        <a
                                            href={`mailto:${rector.email}`}
                                            className="flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-slate-400 hover:text-[#1a2355] dark:hover:text-white transition-colors"
                                        >
                                            <EmailIcon sx={{ fontSize: 14 }} />
                                            {rector.email}
                                        </a>
                                        <a
                                            href={`tel:${rector.phone}`}
                                            className="flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-slate-400 hover:text-[#1a2355] dark:hover:text-white transition-colors"
                                        >
                                            <PhoneIcon sx={{ fontSize: 14 }} />
                                            {rector.phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right — Rector's message (unchanged) */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="lg:col-span-2"
                        >
                            <SectionBlock accent title={p.messageTitle}>
                                <div className="space-y-4 text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                    {p.message.map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                    <p className="font-semibold text-[#1a2355] dark:text-white">
                                        {rector.fullName}<br />
                                        <span className="font-normal text-gray-500 dark:text-gray-400 text-sm">Rector, Azerbaijan Technical University</span>
                                    </p>
                                </div>
                            </SectionBlock>
                        </motion.div>
                    </div>

                    {/* Bottom section: About + Departments */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

                        {/* About Rector */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <SectionBlock accent title={p.aboutRectorTitle}>
                                <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                    {p.aboutRector.map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>
                            </SectionBlock>
                        </motion.div>

                        {/* Departments */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <SectionBlock accent title={p.departmentsTitle}>
                                <ul className="space-y-2.5">
                                    {p.departments.map((dept, i) => (
                                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                                            <FiberManualRecordIcon sx={{ fontSize: 8, color: "#ee7c7e", marginTop: "6px", flexShrink: 0 }} />
                                            {dept}
                                        </li>
                                    ))}
                                </ul>
                            </SectionBlock>
                        </motion.div>
                    </div>

                    {/* Gallery Slider */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mb-12"
                    >
                        <SectionBlock accent title={p.galleryTitle}>
                            <GallerySlider items={p.galleryItems} />
                        </SectionBlock>
                    </motion.div>

                    {/* Related links */}
                    <div className="pt-8 border-t border-gray-200 dark:border-slate-700">
                        <h2 className="text-lg font-bold text-[#1a2355] dark:text-white mb-4">{t.common.moreInSection}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {p.related.map((link) => (
                                <Link key={link.href} href={link.href}
                                    className="flex items-center justify-between bg-white dark:bg-[#1e293b] border border-gray-100 dark:border-slate-700 rounded-xl px-5 py-3 hover:border-[#1a2355]/30 hover:shadow-md transition-all duration-200 group">
                                    <span className="text-[#1a2355] dark:text-white font-medium text-sm">{link.title}</span>
                                    <ChevronRightIcon sx={{ fontSize: 18, color: "#1a2355", opacity: 0.4 }} className="transition-transform duration-200 group-hover:translate-x-1" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
