"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import SchoolIcon from "@mui/icons-material/School";
import EuroIcon from "@mui/icons-material/Euro";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function ErasmusPartnerUniversitiesPage() {
    const t = useTranslation();
    const p = t.pages.internationalization.erasmusPartnerUniversities;

    const [query, setQuery] = useState("");

    const totalUniversities = useMemo(
        () => p.countries.reduce((sum: number, c: { universities: string[] }) => sum + c.universities.length, 0),
        [p.countries]
    );

    const filteredCountries = useMemo(() => {
        if (!query.trim()) return p.countries;
        const q = query.toLowerCase();
        return p.countries
            .map((c: { name: string; universities: string[] }) => ({
                name: c.name,
                universities: c.universities.filter((u: string) =>
                    u.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
                ),
            }))
            .filter((c: { name: string; universities: string[] }) => c.universities.length > 0);
    }, [p.countries, query]);

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* HERO */}
            <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330] via-[#0b1330]/80 to-transparent hidden lg:block" />
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
                                <p className="text-lg lg:text-xl text-white/80 font-medium mb-10 max-w-4xl leading-relaxed">
                                    {p.description}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS STRIP */}
            <div className="relative max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20 -mt-16 lg:-mt-20 z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: PublicIcon, value: p.countries.length, label: p.statsLabels.countries },
                        { icon: SchoolIcon, value: totalUniversities, label: p.statsLabels.universities },
                        { icon: EuroIcon, value: "1–2", label: p.statsLabels.opportunities },
                    ].map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                className="group bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-gray-100 dark:border-slate-800 shadow-2xl shadow-blue-900/5 hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-500"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 dark:bg-[#ee7c7e]/15 flex items-center justify-center text-[#ee7c7e] group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-500 shrink-0">
                                        <Icon sx={{ fontSize: 26 }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-3xl lg:text-4xl font-black text-[#1a2355] dark:text-white leading-tight mb-1">
                                            {stat.value}
                                        </p>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20 py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-9 space-y-12">
                        {/* Search */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                <SearchIcon className="text-gray-400 group-focus-within:text-[#ee7c7e] transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder={p.searchPlaceholder}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full pl-16 pr-8 py-6 bg-white dark:bg-slate-900 rounded-[2rem] border-2 border-gray-100 dark:border-slate-800 focus:border-[#ee7c7e] dark:focus:border-[#ee7c7e] outline-none shadow-xl shadow-blue-900/5 transition-all text-gray-700 dark:text-gray-200 font-bold"
                            />
                        </div>

                        {/* Country Sections */}
                        {filteredCountries.length === 0 ? (
                            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 p-20 text-center">
                                <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                    <SearchIcon sx={{ fontSize: 40 }} />
                                </div>
                                <p className="text-gray-500 font-bold">{p.emptyState}</p>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {filteredCountries.map((country: { name: string; universities: string[] }, cIdx: number) => (
                                    <motion.section
                                        key={country.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: cIdx * 0.05, duration: 0.5 }}
                                        className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-900/5 overflow-hidden"
                                    >
                                        <div className="flex items-center gap-5 p-8 lg:p-10 border-b border-gray-100 dark:border-slate-800 bg-gradient-to-r from-[#1a2355]/5 dark:from-[#ee7c7e]/5 to-transparent">
                                            <div className="w-14 h-14 rounded-2xl bg-[#1a2355] text-white flex items-center justify-center shadow-lg shadow-blue-900/20 shrink-0">
                                                <LocationOnIcon />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h2 className="text-2xl lg:text-3xl font-black text-[#1a2355] dark:text-white tracking-tight">
                                                    {country.name}
                                                </h2>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mt-1">
                                                    {country.universities.length} {p.statsLabels.universities}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {country.universities.map((uni: string, uIdx: number) => (
                                                <motion.div
                                                    key={uni}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: uIdx * 0.02 }}
                                                    className="group flex items-center gap-3 p-4 rounded-2xl bg-gray-50/60 dark:bg-slate-800/40 hover:bg-[#ee7c7e]/5 dark:hover:bg-[#ee7c7e]/10 border border-transparent hover:border-[#ee7c7e]/30 transition-all duration-300"
                                                >
                                                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 flex items-center justify-center text-gray-400 group-hover:text-[#ee7c7e] transition-colors shrink-0">
                                                        <SchoolIcon sx={{ fontSize: 18 }} />
                                                    </div>
                                                    <span className="text-sm font-bold text-[#1a2355] dark:text-white leading-tight">
                                                        {uni}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.section>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-28 space-y-8">
                            <div className="p-10 rounded-[3rem] bg-[#1a2355] text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <div className="relative z-10">
                                    <EuroIcon className="text-[#ee7c7e] mb-6" sx={{ fontSize: 40 }} />
                                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">Erasmus+ KA171</h3>
                                    <p className="text-white/60 text-sm font-medium mb-6">
                                        {p.description}
                                    </p>
                                    <div className="w-12 h-1 bg-[#ee7c7e] rounded-full" />
                                </div>
                            </div>

                            <section className="pt-10 border-t border-gray-200 dark:border-slate-800">
                                <h2 className="text-xl font-black text-[#1a2355] dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                                    {p.relatedTitle}
                                </h2>
                                <div className="space-y-4">
                                    {p.related.map((link: { title: string; href: string }) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="group flex items-center justify-between bg-white dark:bg-slate-800/50 p-5 rounded-[1.5rem] border border-gray-100 dark:border-slate-700 hover:border-[#1a2355] dark:hover:border-[#ee7c7e] transition-all duration-300 shadow-sm hover:shadow-xl"
                                        >
                                            <span className="text-[#1a2355] dark:text-white font-black text-sm group-hover:text-[#ee7c7e] transition-colors">
                                                {link.title}
                                            </span>
                                            <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-[#1a2355] group-hover:text-white transition-all duration-300">
                                                <ChevronRightIcon sx={{ fontSize: 18 }} className="group-hover:translate-x-1 transition-transform" />
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
