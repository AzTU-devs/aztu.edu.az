"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import SectionBlock from "@/components/shared/SectionBlock";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";

export default function RectorsOfficePage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.rectorsOffice;

    const leadershipLabel = lang === "az" ? "Rəhbərlik və İdarəetmə" : "Leadership and Management";
    const leadershipHref = lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme" : "/about/leadership-and-management";

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden">
            {/* STUNNING BACKGROUND ELEMENTS - MATCHING HOME PAGE */}
            <div className="bg-mesh" />
            <div className="bg-grid-premium" />

            {/* STUNNING HERO SECTION - MATCHING RECTOR PAGE STYLE */}
            <div className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col pt-44 lg:pt-48 z-10">
                {/* Background Graphics */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330] via-[#0b1330]/80 to-transparent hidden lg:block" />
                    
                    {/* Animated Glows */}
                    <div className="absolute top-1/4 right-1/4 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-0 w-[30rem] h-[30rem] bg-[#ee7c7e]/10 rounded-full blur-[80px]" />
                </div>

                <div className="relative z-10 flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-12">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 lg:mb-16">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                            Home
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={lang === "az" ? "/haqqimizda" : "/about"} className="hover:text-white transition-colors">
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
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-4xl"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                                {p.eyebrow}
                            </span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 text-white leading-[1.1] tracking-tight">
                                {p.title}
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/80 font-medium mb-10 leading-relaxed max-w-2xl">
                                {p.subtitle}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* STAFF SECTION - WITH DARK BLUE BORDERS AND FILLED LOOK */}
            <div className="relative px-4 md:px-10 lg:px-20 py-24 z-10">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {p.staff.map((member: { name: string; title: string; email: string; phone: string }, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 flex flex-col items-center text-center gap-6 shadow-[0_4px_20px_-4px_rgba(26,35,85,0.1)] hover:shadow-[0_40px_80px_-15px_rgba(26,35,85,0.2)] border-2 border-[#1a2355]/10 dark:border-[#1a2355]/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                            >
                                {/* Colorful gradient top bar on hover */}
                                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#ee7c7e] via-[#1a2355] to-[#ee7c7e] opacity-20 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Avatar with decorative ring */}
                                <div className="relative p-2 rounded-full border-2 border-dashed border-[#ee7c7e]/40 group-hover:border-[#ee7c7e] transition-all duration-500 group-hover:rotate-12">
                                    <div className="w-32 h-32 rounded-full bg-[#1a2355]/5 dark:bg-[#1a2355]/20 overflow-hidden shadow-inner flex items-center justify-center text-[#1a2355]/20 group-hover:bg-[#ee7c7e]/10 group-hover:text-[#ee7c7e] transition-all duration-500 border border-[#1a2355]/5">
                                        <PersonIcon sx={{ fontSize: 64 }} />
                                    </div>
                                </div>

                                <div className="flex-1 space-y-3">
                                    <h3 className="font-black text-[#1a2355] dark:text-white text-xl leading-tight group-hover:text-[#ee7c7e] transition-colors duration-300">
                                        {member.name}
                                    </h3>
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#1a2355]/5 dark:bg-white/5 border border-[#1a2355]/10 dark:border-white/10 text-[#1a2355] dark:text-white/70 text-[10px] font-black uppercase tracking-widest group-hover:bg-[#ee7c7e] group-hover:text-white group-hover:border-[#ee7c7e] transition-all duration-300">
                                        {member.title}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 w-full pt-6 border-t border-[#1a2355]/5 dark:border-white/5">
                                    <a
                                        href={`mailto:${member.email}`}
                                        className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-[#1a2355]/5 dark:bg-white/5 border border-[#1a2355]/5 dark:border-white/5 text-[#1a2355] dark:text-white hover:bg-[#1a2355] hover:text-white transition-all duration-300 font-bold text-sm shadow-sm"
                                    >
                                        <EmailIcon sx={{ fontSize: 18 }} />
                                        {member.email}
                                    </a>
                                    <a
                                        href={`tel:${member.phone}`}
                                        className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-[#ee7c7e]/5 dark:bg-[#ee7c7e]/5 border border-[#ee7c7e]/10 dark:border-[#ee7c7e]/10 text-[#1a2355] dark:text-white hover:bg-[#ee7c7e] hover:text-white transition-all duration-300 font-bold text-sm shadow-sm"
                                    >
                                        <LocalPhoneIcon sx={{ fontSize: 18 }} />
                                        {member.phone}
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RELATED LINKS - MATCHING HOME PAGE COMPONENT STYLE */}
            <div className="relative px-4 md:px-10 lg:px-20 pb-24 z-10">
                <section className="pt-20 border-t border-[#1a2355]/10 dark:border-white/10 max-w-[1400px] mx-auto">
                    <h2 className="text-2xl font-black text-[#1a2355] dark:text-white mb-10 flex items-center gap-4">
                        <div className="w-2.5 h-10 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
                        {t.common.moreInSection}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { title: lang === "az" ? "Rektor" : "Rector", href: lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme/rektor" : "/about/leadership-and-management/rector" },
                            { title: lang === "az" ? "Prorektor" : "Vice-Rector", href: lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme/prorektor" : "/about/leadership-and-management/vice-rector" },
                            { title: lang === "az" ? "Elmi Şura" : "Scientific Board", href: lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme/elmi-sura" : "/about/leadership-and-management/scientific-board" },
                        ].map((link) => (
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
            </div>
        </main>
    );
}
