"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import VilayetVeliyev from "@/../public/vilayet_veliyev.jpg";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";

import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";

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

function ContinuousGallery({ items }: { items: { image: string }[] }) {
    // Duplicate items to ensure smooth looping
    const doubledItems = [...items, ...items, ...items];

    return (
        <div className="relative w-full overflow-hidden py-10">
            {/* Gradient Mask for Edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f0f4f8] dark:from-[#0b1330] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f0f4f8] dark:from-[#0b1330] to-transparent z-10 pointer-events-none" />
            
            <motion.div 
                className="flex gap-8 w-max"
                animate={{ 
                    x: ["0%", "-33.33%"] 
                }}
                transition={{ 
                    duration: 40, 
                    repeat: Infinity, 
                    ease: "linear" 
                }}
            >
                {doubledItems.map((item, idx) => (
                    <div 
                        key={idx}
                        className="relative w-80 md:w-96 aspect-[4/3] rounded-[2rem] overflow-hidden border-2 border-[#1a2355]/10 dark:border-white/10 shadow-lg group hover:scale-[1.02] transition-transform duration-500"
                    >
                        <Image
                            src={item.image}
                            alt="Rector Activity"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2355]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function RectorPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.rector;

    const leadershipLabel = lang === "az" ? "Rəhbərlik və İdarəetmə" : "Leadership and Management";
    const leadershipHref = lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme" : "/about/leadership-and-management";

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden">
            {/* STUNNING BACKGROUND ELEMENTS */}
            <div className="bg-mesh" />
            <div className="bg-grid-premium" />

            <PageHero
                title={rectorData.fullName}
                eyebrow={p.eyebrow}
                breadcrumbs={[
                    { label: t.nav.sections.about, href: lang === "az" ? "/haqqimizda" : "/about" },
                    { label: leadershipLabel, href: leadershipHref },
                    { label: p.breadcrumb },
                ]}
            >
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                        <p className="text-lg lg:text-xl text-white/80 font-medium mb-10 max-w-2xl leading-relaxed italic">
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
                                    <p className="text-sm font-bold text-white">{stat.value}</p>
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
                    </div>
                    
                    <div className="lg:col-span-5 hidden lg:block">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square max-w-md mx-auto"
                        >
                            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-[#ee7c7e] rounded-tl-3xl z-20" />
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-[#ee7c7e] rounded-br-3xl z-20" />
                            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl z-10 border border-white/10">
                                <Image
                                    src={VilayetVeliyev}
                                    alt={rectorData.fullName}
                                    fill
                                    priority
                                    className="object-cover object-top"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </PageHero>

            <PageContainer className="space-y-32">
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
                                <p key={i} className="text-base lg:text-lg text-gray-600 dark:text-slate-300 leading-relaxed text-justify">
                                    {para}
                                </p>
                            ))}
                        </div>
                        <div className="lg:col-span-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-10 rounded-[3rem] border-2 border-[#1a2355]/10 dark:border-white/10 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                            <FormatQuoteIcon className="absolute -top-6 -left-6 text-[#ee7c7e]/20" sx={{ fontSize: 100 }} />
                            <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-6 relative z-10">
                                {p.aboutRectorTitle}
                            </h3>
                            <div className="space-y-4 text-sm text-gray-600 dark:text-slate-400 relative z-10 font-medium">
                                {p.aboutRector.map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* DEPARTMENTS UNDER RECTOR */}
                <section className="bg-[#1a2355] rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl border-4 border-white/5">
                    <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
                    
                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 border border-white/20 mb-6">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] animate-pulse" />
                                    <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Management</span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-black mb-6 tracking-tighter">{p.departmentsTitle}</h2>
                                <p className="text-white/60 text-lg">The following administrative and academic divisions operate directly under the Rector&#39;s supervision.</p>
                            </div>
                            <div className="flex items-center gap-4 px-8 py-5 rounded-[2rem] bg-white/10 border border-white/20 backdrop-blur-xl">
                                <span className="text-4xl font-black text-[#ee7c7e]">{p.departments.length}</span>
                                <div className="h-10 w-px bg-white/20 mx-2" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Total Units</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {p.departments.map((dept, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.03 }}
                                    className="group flex items-center gap-5 p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-[#ee7c7e] hover:border-[#ee7c7e] transition-all duration-500 hover:-translate-y-1"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#ee7c7e] transition-all duration-500">
                                        <span className="text-xs font-black">{i + 1}</span>
                                    </div>
                                    <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{dept}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* GALLERY SECTION */}
                <section>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                        <div className="flex items-center gap-6">
                            <div className="w-2.5 h-12 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-black text-[#1a2355] dark:text-white tracking-tighter uppercase">{p.galleryTitle}</h2>
                                <p className="text-gray-500 dark:text-slate-400 font-medium">Moments from the Rector&#39;s academic and administrative activities.</p>
                            </div>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-[#1a2355]/10 via-[#1a2355]/5 to-transparent dark:from-white/10 dark:via-white/5 ml-10" />
                    </div>
                    <ContinuousGallery items={p.galleryItems} />
                </section>

                {/* RELATED LINKS */}
                <section className="pt-20 border-t border-[#1a2355]/10 dark:border-white/10">
                    <h2 className="text-2xl font-black text-[#1a2355] dark:text-white mb-10 flex items-center gap-4">
                        <div className="w-2.5 h-10 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
                        {t.common.moreInSection}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {p.related.map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href}
                                className="group relative flex items-center justify-between bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2rem] border-2 border-[#1a2355]/10 dark:border-[#1a2355]/30 hover:border-[#ee7c7e]/40 dark:hover:border-[#ee7c7e]/50 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ee7c7e]/5 via-transparent to-[#1a2355]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative text-[#1a2355] dark:text-white font-black text-base group-hover:text-[#ee7c7e] transition-colors">{link.title}</span>
                                <div className="relative w-12 h-12 rounded-2xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#1a2355] group-hover:text-white transition-all duration-300 border border-[#1a2355]/5 dark:border-white/5">
                                    <ChevronRightIcon sx={{ fontSize: 24 }} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </PageContainer>
        </main>
    );
}
