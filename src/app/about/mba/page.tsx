"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";

export default function MBAPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.mba;

    const academicsLabel = lang === "az" ? "Akademik" : "Academics";
    const academicsHref = lang === "az" ? "/akademik" : "/academic";
    const educationLabel = lang === "az" ? "Təhsil və Proqramlar" : "Education and Programs";
    const educationHref =
        lang === "az"
            ? "/az/akademik/tehsil-ve-proqramlar/mba"
            : "/en/akademik/education-and-programs/mba";

    return (
        <main className="min-h-screen bg-page selection:bg-[#ee7c7e]/30">
            {/* HERO */}
            <div className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <AboutHeroVideoBg />
                </div>

                <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-20">
                    <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 flex-wrap">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                            {lang === "az" ? "Ana səhifə" : "Home"}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={academicsHref} className="hover:text-white transition-colors">
                            {academicsLabel}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={educationHref} className="hover:text-white transition-colors">
                            {educationLabel}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{p.breadcrumb}</span>
                    </nav>

                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.14em] mb-6">
                                {p.eyebrow}
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                                {p.title}
                            </h1>
                            <p className="text-xl text-white/80 font-medium mb-10 max-w-2xl leading-relaxed italic">
                                &quot;{p.subtitle}&quot;
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="px-4 md:px-10 lg:px-20 py-24 bg-white dark:bg-[#101733] relative overflow-hidden">
                <div className="relative z-10 max-w-[1600px] mx-auto space-y-24">

                    {/* ABOUT */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                                <h2 className="text-3xl md:text-4xl font-black text-[#1a2355] dark:text-white">
                                    {p.aboutTitle}
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                                {p.paragraphs.map((para: string, i: number) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* STATS */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                            <h2 className="text-3xl md:text-4xl font-black text-[#1a2355] dark:text-white">
                                {p.programTitle}
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {p.stats.map((stat: { value: string; label: string }, i: number) => (
                                <div
                                    key={i}
                                    className="p-8 rounded-[22px] bg-[#1a2355] text-white text-center relative overflow-hidden group hover:bg-[#ee7c7e] transition-all duration-500 shadow-xl"
                                >
                                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                                    <div className="text-4xl font-black mb-2 relative z-10">{stat.value}</div>
                                    <div className="text-white/70 text-xs font-bold uppercase tracking-widest relative z-10">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* LANGUAGES + STRUCTURE */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                                <h2 className="text-2xl font-black text-[#1a2355] dark:text-white">{p.languagesTitle}</h2>
                            </div>
                            <div className="space-y-4">
                                {p.languages.map((lang: string, i: number) => (
                                    <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <div className="w-10 h-10 rounded-xl bg-[#1a2355] flex items-center justify-center text-white shrink-0">
                                            <LanguageIcon sx={{ fontSize: 20 }} />
                                        </div>
                                        <span className="font-bold text-[#1a2355] dark:text-white">{lang}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                                <h2 className="text-2xl font-black text-[#1a2355] dark:text-white">{p.structureTitle}</h2>
                            </div>
                            <div className="space-y-4">
                                {p.structureItems.map((item: string, i: number) => (
                                    <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                        <div className="w-8 h-8 rounded-xl bg-[#ee7c7e] flex items-center justify-center text-white shrink-0 mt-0.5">
                                            <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* DOCTORAL */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                            <h2 className="text-3xl md:text-4xl font-black text-[#1a2355] dark:text-white">
                                {p.doctoralTitle}
                            </h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{p.doctoralDescription}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {p.doctoralFormats.map((fmt: string, i: number) => (
                                <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#1a2355] flex items-center justify-center text-white shrink-0">
                                        <SchoolIcon sx={{ fontSize: 20 }} />
                                    </div>
                                    <span className="font-bold text-[#1a2355] dark:text-white">{fmt}</span>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[p.doctoralDuration.phd, p.doctoralDuration.ds].map((prog, i) => (
                                <div key={i} className="p-8 rounded-[22px] bg-[#1a2355] text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                    <h4 className="text-lg font-black uppercase tracking-tight mb-6 relative z-10">{prog.title}</h4>
                                    <div className="space-y-3 relative z-10">
                                        {prog.items.map((item: string, j: number) => (
                                            <div key={j} className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e]" />
                                                <span className="text-white/80 font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CONTACT */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                            <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.contactTitle}</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: <LocationOnIcon sx={{ fontSize: 22 }} />, text: p.contact.address },
                                { icon: <PhoneIcon sx={{ fontSize: 22 }} />, text: p.contact.phone },
                                { icon: <PhoneIcon sx={{ fontSize: 22 }} />, text: p.contact.hotline },
                                { icon: <EmailIcon sx={{ fontSize: 22 }} />, text: p.contact.email },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                    <div className="w-10 h-10 rounded-xl bg-[#ee7c7e] flex items-center justify-center text-white shrink-0">
                                        {item.icon}
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm font-medium leading-relaxed">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RELATED LINKS */}
                    <div className="pt-12 border-t border-gray-100 dark:border-white/10">
                        <h2 className="text-xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                            <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                            {t.common.moreInSection}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {p.related.map((link: { title: string; href: string }) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="group flex items-center justify-between bg-white dark:bg-white/5 p-6 rounded-[18px] border border-gray-100 dark:border-white/10 hover:border-[#1a2355] dark:hover:border-[#ee7c7e] transition-all duration-300 shadow-sm hover:shadow-xl"
                                >
                                    <span className="text-[#1a2355] dark:text-white font-black text-sm group-hover:text-[#ee7c7e] transition-colors">
                                        {link.title}
                                    </span>
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/10 flex items-center justify-center group-hover:bg-[#1a2355] group-hover:text-white transition-all duration-300">
                                        <ChevronRightIcon sx={{ fontSize: 20 }} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
