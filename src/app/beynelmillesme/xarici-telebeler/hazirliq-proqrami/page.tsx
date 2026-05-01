"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventIcon from "@mui/icons-material/Event";
import TranslateIcon from "@mui/icons-material/Translate";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VerifiedIcon from "@mui/icons-material/Verified";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const FACT_ICONS = [ScheduleIcon, EventIcon, TranslateIcon];

export default function FoundationProgramPage() {
    const t = useTranslation();
    const p = t.pages.internationalization.foundationProgram;

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* HERO SECTION */}
            <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48">
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

            {/* FACTS STRIP */}
            <div className="relative max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20 -mt-16 lg:-mt-20 z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {p.facts.map((fact, idx) => {
                        const Icon = FACT_ICONS[idx % FACT_ICONS.length];
                        return (
                            <motion.div
                                key={fact.label}
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
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-1">
                                            {fact.label}
                                        </p>
                                        <p className="text-xl lg:text-2xl font-black text-[#1a2355] dark:text-white leading-tight">
                                            {fact.value}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* CONTENT SECTION */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20 py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-20">
                        {/* Eligibility */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-900/5 overflow-hidden"
                        >
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#ee7c7e]/5 rounded-full blur-3xl" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-8">
                                <div className="w-14 h-14 rounded-2xl bg-[#1a2355] text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/20">
                                    <GroupsIcon />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl lg:text-3xl font-black text-[#1a2355] dark:text-white mb-5 tracking-tight">
                                        {p.eligibilityTitle}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 text-base lg:text-lg leading-relaxed font-medium">
                                        {p.eligibilityDescription}
                                    </p>
                                </div>
                            </div>
                        </motion.section>

                        {/* Stages */}
                        <section>
                            <div className="mb-12">
                                <h2 className="text-3xl lg:text-4xl font-black text-[#1a2355] dark:text-white mb-4 flex items-center gap-4 tracking-tight">
                                    <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full" />
                                    {p.stagesTitle}
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-2xl pl-7">
                                    {p.stagesIntro}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                {p.stages.map((stage, idx) => (
                                    <motion.div
                                        key={stage.number}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.15, duration: 0.6 }}
                                        className={`relative rounded-[2.5rem] p-8 lg:p-10 overflow-hidden group transition-all duration-500 hover:-translate-y-1 ${
                                            idx === 0
                                                ? "bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-900/5 hover:shadow-2xl"
                                                : "bg-[#1a2355] text-white shadow-2xl shadow-blue-900/20"
                                        }`}
                                    >
                                        <div
                                            className={`absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl ${
                                                idx === 0 ? "bg-[#ee7c7e]/8" : "bg-[#ee7c7e]/15"
                                            }`}
                                        />
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-4 mb-8">
                                                <div
                                                    className={`text-5xl lg:text-6xl font-black leading-none ${
                                                        idx === 0 ? "text-[#ee7c7e]" : "text-[#ee7c7e]"
                                                    }`}
                                                >
                                                    {stage.number}
                                                </div>
                                                <div
                                                    className={`flex-1 h-px ${
                                                        idx === 0 ? "bg-gray-200 dark:bg-slate-700" : "bg-white/15"
                                                    }`}
                                                />
                                                <MenuBookIcon
                                                    className={idx === 0 ? "text-[#1a2355] dark:text-white" : "text-white"}
                                                />
                                            </div>
                                            <h3
                                                className={`text-2xl lg:text-3xl font-black mb-4 tracking-tight ${
                                                    idx === 0 ? "text-[#1a2355] dark:text-white" : "text-white"
                                                }`}
                                            >
                                                {stage.title}
                                            </h3>
                                            <p
                                                className={`text-base font-medium leading-relaxed mb-8 ${
                                                    idx === 0
                                                        ? "text-gray-600 dark:text-gray-300"
                                                        : "text-white/80"
                                                }`}
                                            >
                                                {stage.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {stage.subjects.map((subject) => (
                                                    <span
                                                        key={subject}
                                                        className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                                                            idx === 0
                                                                ? "bg-[#ee7c7e]/10 text-[#1a2355] dark:text-white border-[#ee7c7e]/20"
                                                                : "bg-white/10 text-white border-white/20 backdrop-blur-md"
                                                        }`}
                                                    >
                                                        {subject}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Certificate */}
                        <motion.section
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative rounded-[3rem] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2355] via-[#1a2355] to-[#13365E]" />
                            <div className="absolute top-0 left-0 w-64 h-64 bg-[#ee7c7e]/15 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#ee7c7e]/10 rounded-full translate-y-1/3 translate-x-1/4 blur-3xl" />

                            <div className="relative z-10 p-10 lg:p-16 text-white">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e] text-white flex items-center justify-center shadow-lg shadow-[#ee7c7e]/30">
                                        <VerifiedIcon />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e]">
                                        Certificate
                                    </span>
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight max-w-2xl">
                                    {p.certificateTitle}
                                </h2>
                                <p className="text-white/80 text-base lg:text-lg font-medium leading-relaxed mb-10 max-w-3xl">
                                    {p.certificateDescription}
                                </p>

                                <div className="pt-8 border-t border-white/10">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-5">
                                        {p.nextLevelsLabel}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3">
                                        {p.nextLevels.map((level, idx) => (
                                            <div key={level} className="flex items-center gap-3">
                                                <div className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-sm font-bold">
                                                    {level}
                                                </div>
                                                {idx < p.nextLevels.length - 1 && (
                                                    <ArrowForwardIcon className="text-[#ee7c7e]" sx={{ fontSize: 18 }} />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="sticky top-28 space-y-8">
                            {/* CTA Card */}
                            <div className="p-10 rounded-[3rem] bg-white dark:bg-slate-900 border-2 border-[#1a2355]/30 dark:border-[#ee7c7e]/20 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-[#1a2355] text-white flex items-center justify-center mb-8 shadow-xl shadow-blue-900/20">
                                        <MenuBookIcon />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-4">AzTU Foundation</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-10">
                                        Building the academic foundation international students need to succeed.
                                    </p>
                                </div>
                            </div>

                            {/* Related */}
                            <section className="pt-12 border-t border-gray-200 dark:border-slate-800">
                                <h2 className="text-xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                                    {p.relatedTitle}
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
