"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";

export default function BilateralCooperationExchangePage() {
    const t = useTranslation();
    const p = t.pages.internationalization.bilateralCooperationExchange;

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

            {/* CONTENT */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20 py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-8 space-y-20">
                        {/* Steps */}
                        <section>
                            <h2 className="text-3xl lg:text-4xl font-black text-[#1a2355] dark:text-white mb-10 flex items-center gap-4 tracking-tight">
                                <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full" />
                                {p.stepsTitle}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {p.steps.map((step: { number: string; title: string; description: string }, idx: number) => (
                                    <motion.div
                                        key={step.number}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                                        className={`relative rounded-[2.5rem] p-8 lg:p-10 overflow-hidden group transition-all duration-500 hover:-translate-y-1 ${
                                            idx % 2 === 0
                                                ? "bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-900/5"
                                                : "bg-[#1a2355] text-white shadow-2xl shadow-blue-900/20"
                                        }`}
                                    >
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#ee7c7e]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                                        <div className="relative z-10">
                                            <div className="text-5xl font-black text-[#ee7c7e] mb-4 leading-none">
                                                {step.number}
                                            </div>
                                            <h3 className={`text-xl font-black mb-3 tracking-tight ${idx % 2 === 0 ? "text-[#1a2355] dark:text-white" : "text-white"}`}>
                                                {step.title}
                                            </h3>
                                            <p className={`text-sm font-medium leading-relaxed ${idx % 2 === 0 ? "text-gray-600 dark:text-gray-300" : "text-white/80"}`}>
                                                {step.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Partners */}
                        <section>
                            <h2 className="text-3xl lg:text-4xl font-black text-[#1a2355] dark:text-white mb-10 flex items-center gap-4 tracking-tight">
                                <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full" />
                                {p.partnersTitle}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {p.partners.map((partner: string, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:border-[#ee7c7e]/40 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/10 text-[#ee7c7e] flex items-center justify-center shrink-0 group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                                            <SchoolIcon sx={{ fontSize: 20 }} />
                                        </div>
                                        <span className="text-sm font-bold text-[#1a2355] dark:text-white leading-tight">
                                            {partner}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-8">
                            <div className="p-10 rounded-[3rem] bg-[#1a2355] text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <div className="relative z-10">
                                    <SwapHorizIcon className="text-[#ee7c7e] mb-6" sx={{ fontSize: 40 }} />
                                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter">{p.sidebarTitle}</h3>
                                    <p className="text-white/60 text-sm font-medium mb-8">
                                        {p.sidebarDescription}
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
