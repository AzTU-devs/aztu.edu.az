"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { PARTNER_UNIVERSITIES } from "@/data/partnerUniversities";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from '@mui/icons-material/School';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import LaunchIcon from '@mui/icons-material/Launch';

export default function PartnerUniversitiesPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.internationalization.partnerUniversities;
    
    const [searchQuery, setSearchSearchQuery] = useState("");

    const filteredUniversities = PARTNER_UNIVERSITIES.filter(uni => 
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.countryAz.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* HERO SECTION */}
            <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48">
                {/* Background Graphics */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330] via-[#0b1330]/80 to-transparent hidden lg:block" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ee7c7e]/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-12">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 lg:mb-16">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                            Home
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
                                <p className="text-lg lg:text-xl text-white/80 font-medium mb-10 max-w-4xl leading-relaxed">
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
                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-12">
                        {/* Search Bar */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                <SearchIcon className="text-gray-400 group-focus-within:text-[#ee7c7e] transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder={lang === 'az' ? "Universitet və ya ölkə axtar..." : "Search by university or country..."}
                                value={searchQuery}
                                onChange={(e) => setSearchSearchQuery(e.target.value)}
                                className="w-full pl-16 pr-8 py-6 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-gray-100 dark:border-slate-800 focus:border-[#ee7c7e] dark:focus:border-[#ee7c7e] outline-none shadow-xl shadow-blue-900/5 transition-all text-gray-700 dark:text-gray-200 font-bold"
                            />
                        </div>

                        {/* Table Container */}
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-2xl shadow-blue-900/5 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#1a2355] text-white">
                                            <th className="px-6 py-6 text-xs font-black uppercase tracking-widest">{p.tableHeaders.no}</th>
                                            <th className="px-6 py-6 text-xs font-black uppercase tracking-widest">{p.tableHeaders.logo}</th>
                                            <th className="px-6 py-6 text-xs font-black uppercase tracking-widest">{p.tableHeaders.university}</th>
                                            <th className="px-6 py-6 text-xs font-black uppercase tracking-widest">{p.tableHeaders.country}</th>
                                            <th className="px-6 py-6 text-xs font-black uppercase tracking-widest">{p.tableHeaders.agreementType}</th>
                                            <th className="px-6 py-6 text-xs font-black uppercase tracking-widest">{p.tableHeaders.date}</th>
                                            <th className="px-6 py-6 text-xs font-black uppercase tracking-widest">{p.tableHeaders.website}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                        <AnimatePresence mode="popLayout">
                                            {filteredUniversities.map((uni, idx) => (
                                                <motion.tr
                                                    key={uni.id}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    layout
                                                    className="group hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                                                >
                                                    <td className="px-6 py-6 text-sm font-black text-gray-400 group-hover:text-[#ee7c7e] transition-colors">{uni.id}</td>
                                                    <td className="px-6 py-6">
                                                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400 group-hover:bg-[#ee7c7e]/10 group-hover:text-[#ee7c7e] transition-all">
                                                            <SchoolIcon sx={{ fontSize: 24 }} />
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-6">
                                                        <p className="text-sm font-black text-[#1a2355] dark:text-white leading-tight">
                                                            {uni.name}
                                                        </p>
                                                    </td>
                                                    <td className="px-6 py-6">
                                                        <div className="flex items-center gap-2">
                                                            <LanguageIcon sx={{ fontSize: 16 }} className="text-gray-400" />
                                                            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                                                                {lang === 'az' ? uni.countryAz : uni.country}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-6">
                                                        <span className="inline-block px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-[#1a2355] dark:text-blue-300 text-[10px] font-black uppercase tracking-tight">
                                                            {lang === 'az' ? uni.agreementTypeAz : uni.agreementType}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-6 text-xs font-bold text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        {uni.date || '-'}
                                                    </td>
                                                    <td className="px-6 py-6">
                                                        {uni.website && (
                                                            <a 
                                                                href={uni.website} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-[#1a2355] hover:text-white transition-all"
                                                            >
                                                                <LaunchIcon sx={{ fontSize: 18 }} />
                                                            </a>
                                                        )}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>
                            {filteredUniversities.length === 0 && (
                                <div className="py-20 text-center">
                                    <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                        <SearchIcon sx={{ fontSize: 40 }} />
                                    </div>
                                    <p className="text-gray-500 font-bold">No universities found matching your search.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="sticky top-28 space-y-8">
                            {/* CTA Card */}
                            <div className="p-10 rounded-[3rem] bg-white dark:bg-slate-900 border-2 border-[#1a2355]/10 dark:border-[#ee7c7e]/20 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-[#1a2355] text-white flex items-center justify-center mb-8 shadow-xl shadow-blue-900/20">
                                        <LanguageIcon />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-4">AzTU Global Network</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-10">
                                        Connecting minds across borders to build a sustainable future.
                                    </p>
                                    <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-[#ee7c7e] text-white px-8 py-4 rounded-2xl shadow-xl shadow-[#ee7c7e]/20 hover:scale-[1.02] active:scale-95 transition-all">
                                        Contact Us
                                        <ChevronRightIcon sx={{ fontSize: 16 }} />
                                    </Link>
                                </div>
                            </div>

                            {/* Related Section */}
                            <section className="pt-12 border-t border-gray-200 dark:border-slate-800">
                                <h2 className="text-xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                                    {t.common.moreInSection}
                                </h2>
                                <div className="space-y-4">
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
                    </div>
                </div>
            </div>
        </main>
    );
}
