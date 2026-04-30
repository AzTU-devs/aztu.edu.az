"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from '@mui/icons-material/Apartment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import GiteIcon from '@mui/icons-material/Gite';

export default function AccommodationPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.internationalization.accommodation;

    return (
        <main className="min-h-screen bg-white dark:bg-[#0a0c1a] selection:bg-[#ee7c7e]/30 transition-colors duration-500">
            {/* HERO SECTION */}
            <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
                {/* Background Refined Graphics */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#0a0c1a]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#111827] to-[#0f172a] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c1a] via-[#0a0c1a]/60 to-transparent hidden lg:block" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ee7c7e]/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-12">
                    <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 lg:mb-16">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{p.breadcrumb}</span>
                    </nav>

                    <div className="flex-1 flex flex-col justify-center">
                        <div className="max-w-5xl">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                                    {p.eyebrow}
                                </span>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                                    {p.title}
                                </h1>
                                <p className="text-lg lg:text-xl text-white/80 font-medium mb-10 max-w-4xl leading-relaxed whitespace-pre-wrap">
                                    {p.description}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8 space-y-12">
                        <div className="grid grid-cols-1 gap-8">
                            {p.content.map((text: string, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white dark:bg-slate-900 p-8 lg:p-10 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-900/5 flex gap-6 items-start"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                                        {idx === 0 ? <ApartmentIcon className="text-[#ee7c7e]" /> : 
                                         idx === 1 ? <GiteIcon className="text-[#ee7c7e]" /> : 
                                         <SupportAgentIcon className="text-[#ee7c7e]" />}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-lg font-medium leading-relaxed pt-1">
                                        {text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <section className="bg-[#1a2355] rounded-[3rem] p-10 lg:p-16 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee7c7e]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                            <div className="relative z-10 max-w-2xl">
                                <h2 className="text-3xl font-black mb-6 tracking-tight">{p.supportTitle}</h2>
                                <p className="text-white/80 text-lg font-medium leading-relaxed mb-10">
                                    {p.supportDescription}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold">
                                        Safe Housing
                                    </div>
                                    <div className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold">
                                        Accessible Locations
                                    </div>
                                    <div className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold">
                                        Affordable Rates
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-8">
                            {/* Related Links */}
                            <div className="space-y-4">
                                <h3 className="text-[#1a2355] dark:text-white font-black uppercase tracking-widest text-xs mb-6 px-4">Related Information</h3>
                                {p.related.map((link: any) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="group flex items-center justify-between bg-white dark:bg-slate-800/50 p-6 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 hover:border-[#ee7c7e] transition-all duration-300 shadow-sm hover:shadow-xl"
                                    >
                                        <span className="text-[#1a2355] dark:text-white font-black text-sm group-hover:text-[#ee7c7e] transition-colors">{link.title}</span>
                                        <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                                            <ChevronRightIcon sx={{ fontSize: 20 }} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
