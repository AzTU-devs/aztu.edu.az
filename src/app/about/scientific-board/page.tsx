"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import AboutPageBanner from "@/components/about/AboutPageBanner";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";

function HomeStyleSection({ 
    badge, 
    title, 
    accentTitle, 
    children, 
    dark = false,
    watermark = ""
}: { 
    badge: string; 
    title: string; 
    accentTitle?: string; 
    children: React.ReactNode; 
    dark?: boolean;
    watermark?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className={`relative px-4 md:px-10 lg:px-20 py-24 ${dark ? 'bg-[#0b1330]' : 'bg-white dark:bg-[#0b1330]'} overflow-hidden transition-colors duration-500`}
        >
            {/* STUNNING BACKGROUND ELEMENTS */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Dotted Grid */}
                <div className={`absolute inset-0 ${dark ? 'opacity-[0.04]' : 'opacity-[0.12] dark:opacity-[0.04]'}`} 
                     style={{ backgroundImage: `radial-gradient(${dark ? 'white' : '#ee7c7e'} 0.5px, transparent 0.5px)`, backgroundSize: '32px 32px' }} />
                
                {/* Glow Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1a2355]/[0.03] dark:bg-[#1a2355]/[0.1] blur-[120px] rounded-full" />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] ${dark ? 'bg-blue-500/[0.05]' : 'bg-[#ee7c7e]/[0.03] dark:bg-[#ee7c7e]/[0.08]'} blur-[100px] rounded-full animate-pulse`} />
                
                {/* Watermark */}
                {watermark && (
                    <div className="absolute left-10 bottom-10 select-none opacity-[0.02] dark:opacity-[0.05]">
                        <h1 className={`text-[180px] font-black tracking-tighter leading-none ${dark ? 'text-white' : 'text-[#1a2355] dark:text-white'} uppercase`}>{watermark}</h1>
                    </div>
                )}
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto">
                {/* Section Header */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-2xl ${dark ? 'bg-white/5 border-white/10' : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/10'} border mb-6 shadow-sm`}>
                            <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse shadow-[0_0_8px_#ee7c7e]" />
                            <span className={`${dark ? 'text-white' : 'text-[#1a2355] dark:text-white'} text-[11px] font-black uppercase tracking-[0.4em]`}>
                                {badge}
                            </span>
                        </div>
                        <h2 className={`text-4xl md:text-6xl font-black ${dark ? 'text-white' : 'text-[#1a2355] dark:text-white'} leading-tight tracking-tighter`}>
                            {title} {accentTitle && <span className="text-[#ee7c7e]">{accentTitle}</span>}
                        </h2>
                    </motion.div>
                </div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
}

export default function ScientificBoardPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const data = t.pages.about.scientificBoard;

    if (!data || !data.scientificCouncil || !data.digitalCouncil) return null;

    const leadershipLabel = lang === "az" ? "Rəhbərlik və İdarəetmə" : "Leadership and Management";
    const leadershipHref = lang === "az" ? "/az/haqqimizda/rehbetlik-ve-idareetme/rector" : "/en/about/leadership-and-management/rector";

    return (
        <main className="min-h-screen transition-colors duration-500">
             <AboutPageBanner
                eyebrow={data.eyebrow}
                title={data.title}
                subtitle={data.subtitle}
                breadcrumbs={[
                    { label: leadershipLabel, href: leadershipHref },
                    { label: data.breadcrumb }
                ]}
            />

            {/* ABOUT SECTION - Light Home Style */}
            <HomeStyleSection 
                badge={data.aboutTitle} 
                title={lang === 'az' ? 'Şura' : 'The'} 
                accentTitle={lang === 'az' ? 'Haqqında' : 'Board'}
                watermark="Board"
            >
                <div className="p-8 md:p-12 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-2xl">
                    <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed italic">
                        &quot;{data.aboutText}&quot;
                    </p>
                </div>
            </HomeStyleSection>

            {/* COUNCILS — SIDE BY SIDE */}
            <HomeStyleSection
                badge={lang === 'az' ? 'Tərkib' : 'Composition'}
                title={lang === 'az' ? 'Şuralar' : 'Councils'}
                watermark="Council"
            >
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Scientific Council - dark */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1.5 h-6 bg-[#ee7c7e] rounded-full" />
                            <h3 className="text-lg md:text-xl font-black text-[#1a2355] dark:text-white tracking-tight">{data.scientificCouncil.title}</h3>
                        </div>
                        <div className="overflow-x-auto rounded-2xl border border-[#1a2355]/15 dark:border-white/10 shadow-xl bg-[#0b1330] backdrop-blur-xl">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/10 text-white uppercase text-[10px] font-black tracking-[0.2em]">
                                        {data.scientificCouncil.headers.map((h, i) => (
                                            <th key={i} className="px-4 py-3 border-b border-white/10">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.scientificCouncil.members.map((row, i) => (
                                        <tr key={i} className="hover:bg-white/10 transition-all duration-300 border-b border-white/5 last:border-0 group">
                                            <td className="px-4 py-2.5 text-xs font-black text-[#ee7c7e] w-12">
                                                <div className="w-7 h-7 rounded-lg bg-[#ee7c7e]/10 flex items-center justify-center group-hover:bg-[#ee7c7e] group-hover:text-white transition-all text-[11px]">
                                                    {row[0]}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2.5 text-xs font-bold text-white group-hover:text-[#ee7c7e] transition-colors">{row[1]}</td>
                                            <td className="px-4 py-2.5 text-xs text-white/60 font-medium">{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Digital Council - light */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1.5 h-6 bg-[#ee7c7e] rounded-full" />
                            <h3 className="text-lg md:text-xl font-black text-[#1a2355] dark:text-white tracking-tight">{data.digitalCouncil.title}</h3>
                        </div>
                        <div className="overflow-x-auto rounded-2xl border border-gray-100 dark:border-white/5 shadow-xl bg-white dark:bg-white/5 transition-all duration-500 hover:shadow-[#1a2355]/10">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-white/10 text-[#1a2355] dark:text-white uppercase text-[10px] font-black tracking-widest">
                                        {data.digitalCouncil.headers.map((h, i) => (
                                            <th key={i} className="px-4 py-3 border-b border-gray-100 dark:border-white/10">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.digitalCouncil.members.map((row, i) => (
                                        <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors border-b border-gray-50 dark:border-white/5 last:border-0 group">
                                            <td className="px-4 py-2.5 text-xs font-black text-[#ee7c7e] w-12">
                                                <div className="w-7 h-7 rounded-lg bg-[#ee7c7e]/10 flex items-center justify-center group-hover:bg-[#ee7c7e] group-hover:text-white transition-all text-[11px]">
                                                    {row[0]}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2.5 text-xs font-bold text-[#1a2355] dark:text-white group-hover:text-[#ee7c7e] transition-colors">{row[1]}</td>
                                            <td className="px-4 py-2.5 text-xs text-gray-500 dark:text-white/40 font-medium">{row[2]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Secretariat + stats below, compact row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                    <div className="lg:col-span-2 p-6 rounded-2xl bg-[#1a2355] text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 mb-4">
                                <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse" />
                                <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">{data.digitalCouncil.secretariat.title}</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {data.digitalCouncil.secretariat.members.map((member, i) => (
                                    <div key={i} className="group border-l-2 border-[#ee7c7e] pl-4 py-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">{lang === 'az' ? 'Mütəxəssis' : 'Expert'}</p>
                                        <p className="text-base font-bold group-hover:text-[#ee7c7e] transition-colors">{member[1]}</p>
                                        <p className="text-xs text-white/60 font-medium mt-0.5">{member[2]}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center gap-4 group hover:border-[#ee7c7e]/30 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] group-hover:bg-[#ee7c7e] group-hover:text-white transition-all">
                            <GroupsIcon sx={{ fontSize: 24 }} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Members</p>
                            <p className="text-xl font-black text-[#1a2355] dark:text-white">{data.scientificCouncil.members.length + data.digitalCouncil.members.length}</p>
                        </div>
                    </div>
                </div>
            </HomeStyleSection>

            {/* MORE IN THIS SECTION - Home Style Links */}
            <section className="px-4 md:px-10 lg:px-20 py-24 bg-gray-50 dark:bg-[#0b1330]/50 border-t border-gray-100 dark:border-white/5">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex items-center gap-6 mb-16">
                        <div className="w-2 h-12 bg-[#ee7c7e] rounded-full" />
                        <h2 className="text-3xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter">
                            {t.common.moreInSection}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.related.map((link, i) => (
                            <Link key={i} href={link.href} className="group">
                                <div className="relative flex items-center justify-between p-8 bg-white dark:bg-white/5 rounded-[1.75rem] border border-gray-100 dark:border-white/5 transition-all duration-500 hover:bg-[#1a2355] hover:border-[#1a2355] group-hover:shadow-[0_30px_60px_-15px_rgba(26,35,85,0.3)]">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-[#1a2355] dark:text-white group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-500">
                                            {i === 0 ? <SchoolIcon sx={{ fontSize: 24 }} /> : i === 1 ? <GroupsIcon sx={{ fontSize: 24 }} /> : <SettingsIcon sx={{ fontSize: 24 }} />}
                                        </div>
                                        <span className="text-sm font-black text-[#1a2355] dark:text-white group-hover:text-white uppercase tracking-widest transition-colors">
                                            {link.title}
                                        </span>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:translate-x-1">
                                        <ChevronRightIcon className="text-[#1a2355] group-hover:text-[#1a2355] transition-colors" sx={{ fontSize: 20 }} />
                                    </div>
                                    
                                    {/* Accent Line */}
                                    <div className="absolute bottom-0 left-12 right-12 h-[2px] bg-[#ee7c7e] opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
