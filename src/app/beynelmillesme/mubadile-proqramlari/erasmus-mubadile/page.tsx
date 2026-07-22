"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import StarsIcon from "@mui/icons-material/Stars";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ScheduleIcon from "@mui/icons-material/Schedule";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EuroIcon from "@mui/icons-material/Euro";
import DescriptionIcon from "@mui/icons-material/Description";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const DURATION_ICONS = [GroupsIcon, WorkOutlineIcon, ScheduleIcon];

export default function ErasmusMobilityPage() {
    const t = useTranslation();
    const p = t.pages.internationalization.erasmusMobility;

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* HERO */}
            <div className="relative min-h-[60vh] flex flex-col pt-44 lg:pt-48">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[4rem] lg:rounded-bl-[16rem] transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330] via-[#0b1330]/80 to-transparent hidden lg:block" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ee7c7e]/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-12">
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

            {/* CONTENT */}
            <div className="max-w-[1600px] mx-auto px-4 md:px-10 lg:px-20 py-24 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <div className="lg:col-span-8 space-y-20">
                        {/* Objectives & Benefits */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-slate-900 rounded-[1.75rem] border border-gray-100 dark:border-slate-800 p-8 lg:p-10 shadow-xl shadow-blue-900/5"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-[#1a2355] text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20">
                                    <StarsIcon />
                                </div>
                                <h2 className="text-2xl font-black text-[#1a2355] dark:text-white mb-6 tracking-tight">
                                    {p.objectivesTitle}
                                </h2>
                                <ul className="space-y-4">
                                    {p.objectives.map((obj) => (
                                        <li key={obj} className="flex gap-3 text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                                            <CheckCircleIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e] mt-1 shrink-0" />
                                            <span>{obj}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.section>

                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-[#1a2355] text-white rounded-[1.75rem] p-8 lg:p-10 shadow-2xl shadow-blue-900/20 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#ee7c7e]/15 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e] text-white flex items-center justify-center mb-6 shadow-lg shadow-[#ee7c7e]/30">
                                        <FavoriteIcon />
                                    </div>
                                    <h2 className="text-2xl font-black mb-6 tracking-tight">{p.benefitsTitle}</h2>
                                    <ul className="space-y-4">
                                        {p.benefits.map((b) => (
                                            <li key={b} className="flex gap-3 text-white/85 font-medium leading-relaxed">
                                                <CheckCircleIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e] mt-1 shrink-0" />
                                                <span>{b}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.section>
                        </div>

                        {/* Duration */}
                        <section>
                            <h2 className="text-3xl lg:text-4xl font-black text-[#1a2355] dark:text-white mb-10 flex items-center gap-4 tracking-tight">
                                <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full" />
                                {p.durationTitle}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {p.durations.map((d, idx) => {
                                    const Icon = DURATION_ICONS[idx % DURATION_ICONS.length];
                                    return (
                                        <motion.div
                                            key={d.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-white dark:bg-slate-900 rounded-[1.5rem] p-8 border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-900/5 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 group"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e]/10 dark:bg-[#ee7c7e]/15 flex items-center justify-center text-[#ee7c7e] mb-6 group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-500">
                                                <Icon sx={{ fontSize: 22 }} />
                                            </div>
                                            <p className="text-3xl lg:text-4xl font-black text-[#1a2355] dark:text-white mb-2 leading-tight">
                                                {d.value}
                                            </p>
                                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em]">
                                                {d.label}
                                            </p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Eligibility */}
                        <section>
                            <h2 className="text-3xl lg:text-4xl font-black text-[#1a2355] dark:text-white mb-10 flex items-center gap-4 tracking-tight">
                                <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full" />
                                {p.eligibilityTitle}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: p.studentsTitle, items: p.studentsRequirements, icon: GroupsIcon },
                                    { title: p.staffTitle, items: p.staffRequirements, icon: WorkOutlineIcon },
                                ].map((block, idx) => {
                                    const Icon = block.icon;
                                    return (
                                        <motion.div
                                            key={block.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-white dark:bg-slate-900 rounded-[1.75rem] border border-gray-100 dark:border-slate-800 p-8 lg:p-10 shadow-xl shadow-blue-900/5"
                                        >
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-2xl bg-[#1a2355]/5 dark:bg-[#ee7c7e]/10 text-[#1a2355] dark:text-[#ee7c7e] flex items-center justify-center">
                                                    <Icon />
                                                </div>
                                                <h3 className="text-xl font-black text-[#1a2355] dark:text-white tracking-tight">
                                                    {block.title}
                                                </h3>
                                            </div>
                                            <ul className="space-y-4">
                                                {block.items.map((item) => (
                                                    <li key={item} className="flex gap-3 text-gray-600 dark:text-gray-300 text-sm font-medium leading-relaxed">
                                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#ee7c7e] shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Financial Support */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative rounded-[2rem] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1a2355] via-[#1a2355] to-[#13365E]" />
                            <div className="absolute top-0 left-0 w-64 h-64 bg-[#ee7c7e]/15 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />

                            <div className="relative z-10 p-10 lg:p-16 text-white">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-[#ee7c7e] text-white flex items-center justify-center shadow-lg shadow-[#ee7c7e]/30">
                                        <EuroIcon />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e]">
                                        {p.euFundedBadge}
                                    </span>
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-black mb-6 tracking-tight max-w-2xl">
                                    {p.financialTitle}
                                </h2>
                                <p className="text-white/80 text-base lg:text-lg font-medium leading-relaxed mb-10 max-w-3xl">
                                    {p.financialDescription}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {p.financialItems.map((item) => (
                                        <div key={item} className="p-5 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex gap-3 items-start">
                                            <CheckCircleIcon className="text-[#ee7c7e] shrink-0" sx={{ fontSize: 20 }} />
                                            <span className="text-sm font-bold text-white/90 leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.section>

                        {/* Documents */}
                        <section>
                            <h2 className="text-3xl lg:text-4xl font-black text-[#1a2355] dark:text-white mb-10 flex items-center gap-4 tracking-tight">
                                <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full" />
                                {p.documentsTitle}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {p.documentSections.map((doc) => (
                                    <div key={doc.title} className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-gray-100 dark:border-slate-800 p-8 shadow-xl shadow-blue-900/5">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-11 h-11 rounded-xl bg-[#ee7c7e]/10 text-[#ee7c7e] flex items-center justify-center">
                                                <DescriptionIcon />
                                            </div>
                                            <h3 className="text-lg font-black text-[#1a2355] dark:text-white tracking-tight">
                                                {doc.title}
                                            </h3>
                                        </div>
                                        <div className="space-y-3">
                                            {doc.links.map((link) => (
                                                <a
                                                    key={link.label}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-transparent hover:border-[#ee7c7e]/40 hover:bg-[#ee7c7e]/5 transition-all duration-300"
                                                >
                                                    <span className="text-sm font-bold text-[#1a2355] dark:text-white group-hover:text-[#ee7c7e] transition-colors">
                                                        {link.label}
                                                    </span>
                                                    <OpenInNewIcon sx={{ fontSize: 16 }} className="text-gray-400 group-hover:text-[#ee7c7e] transition-colors" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Contact */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-slate-900 rounded-[1.75rem] border-2 border-[#1a2355]/30 dark:border-[#ee7c7e]/20 p-8 lg:p-10 shadow-2xl shadow-blue-900/5"
                        >
                            <h2 className="text-2xl lg:text-3xl font-black text-[#1a2355] dark:text-white mb-8 tracking-tight">
                                {p.contactTitle}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-slate-800/50">
                                    <div className="w-10 h-10 rounded-xl bg-[#1a2355] text-white flex items-center justify-center shrink-0">
                                        <LocationOnIcon sx={{ fontSize: 18 }} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Address</p>
                                        <p className="text-sm font-bold text-[#1a2355] dark:text-white leading-snug">
                                            {p.contactAddress}
                                        </p>
                                    </div>
                                </div>
                                <a href={`mailto:${p.contactEmail}`} className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-slate-800/50 hover:bg-[#ee7c7e]/5 transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-[#1a2355] text-white flex items-center justify-center shrink-0 group-hover:bg-[#ee7c7e] transition-colors">
                                        <EmailIcon sx={{ fontSize: 18 }} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Email</p>
                                        <p className="text-sm font-bold text-[#1a2355] dark:text-white group-hover:text-[#ee7c7e] transition-colors break-all">
                                            {p.contactEmail}
                                        </p>
                                    </div>
                                </a>
                                <a href={`tel:${p.contactPhone.replace(/\s|\(|\)/g, "")}`} className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-slate-800/50 hover:bg-[#ee7c7e]/5 transition-colors group">
                                    <div className="w-10 h-10 rounded-xl bg-[#1a2355] text-white flex items-center justify-center shrink-0 group-hover:bg-[#ee7c7e] transition-colors">
                                        <PhoneIcon sx={{ fontSize: 18 }} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Phone</p>
                                        <p className="text-sm font-bold text-[#1a2355] dark:text-white group-hover:text-[#ee7c7e] transition-colors">
                                            {p.contactPhone}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </motion.section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-28 space-y-8">
                            <div className="p-10 rounded-[2rem] bg-white dark:bg-slate-900 border-2 border-[#1a2355]/30 dark:border-[#ee7c7e]/20 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-[#1a2355] text-white flex items-center justify-center mb-6 shadow-xl shadow-blue-900/20">
                                        <StarsIcon />
                                    </div>
                                    <h3 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-3">{p.sidebarTitle}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed text-sm">
                                        {p.sidebarDescription}
                                    </p>
                                </div>
                            </div>

                            <section className="pt-10 border-t border-gray-200 dark:border-slate-800">
                                <h2 className="text-xl font-black text-[#1a2355] dark:text-white mb-6 flex items-center gap-3">
                                    <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                                    {p.relatedTitle}
                                </h2>
                                <div className="space-y-4">
                                    {p.related.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="group flex items-center justify-between bg-white dark:bg-slate-800/50 p-5 rounded-[1.25rem] border border-gray-100 dark:border-slate-700 hover:border-[#1a2355] dark:hover:border-[#ee7c7e] transition-all duration-300 shadow-sm hover:shadow-xl"
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
