"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LaunchIcon from "@mui/icons-material/Launch";
import HomeIcon from "@mui/icons-material/Home";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import StarIcon from "@mui/icons-material/Star";
import ScienceIcon from "@mui/icons-material/Science";
import PublicIcon from "@mui/icons-material/Public";
import DevicesIcon from "@mui/icons-material/Devices";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

const PILLAR_ICONS = [
    <StarIcon key="star" sx={{ fontSize: 28 }} />,
    <ScienceIcon key="sci" sx={{ fontSize: 28 }} />,
    <PublicIcon key="pub" sx={{ fontSize: 28 }} />,
    <DevicesIcon key="dev" sx={{ fontSize: 28 }} />,
    <NaturePeopleIcon key="nat" sx={{ fontSize: 28 }} />,
];

export default function StrategicPlanPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.strategicPlan;

    const parentLabel = lang === "az" ? "Vizyon və Missiya" : "Vision & Mission";
    const parentHref = lang === "az" ? "/haqqimizda/vizyon-ve-missiya" : "/about/vision-mission";

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* STUNNING HERO SECTION */}
            <div className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
                    <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-20">
                    <nav className="flex items-center gap-2 text-white/60 text-xs mb-12">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                            Home
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={lang === "az" ? "/haqqimizda" : "/about"} className="hover:text-white transition-colors">
                            {t.nav.sections.about}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={parentHref} className="hover:text-white transition-colors">
                            {parentLabel}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{p.breadcrumb}</span>
                    </nav>

                    <div className="max-w-4xl">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                                {p.eyebrow}
                            </span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">
                                {p.title}
                            </h1>
                            <p className="text-xl text-white/80 font-medium mb-10 max-w-2xl leading-relaxed italic">
                                &quot;{p.subtitle}&quot;
                            </p>

                            <div className="flex gap-4">
                                <a 
                                    href={p.pdfUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-white text-[#1a2355] px-6 py-3 rounded-xl font-bold hover:bg-[#ee7c7e] hover:text-white transition-all shadow-xl group"
                                >
                                    <PictureAsPdfIcon />
                                    {lang === "az" ? "Tam sənədi yüklə" : "Download Full Document"}
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="px-4 md:px-10 lg:px-20 py-24 space-y-32 bg-white dark:bg-[#0b1330] relative overflow-hidden">
                <div className="relative z-10 max-w-[1600px] mx-auto">
                    
                    {/* Vision & Mission Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }}
                            className="bg-gray-50 dark:bg-white/5 p-10 rounded-[3rem] border border-gray-100 dark:border-white/10"
                        >
                            <h2 className="text-2xl font-black text-[#1a2355] dark:text-white mb-6 flex items-center gap-3">
                                <div className="w-1.5 h-8 bg-[#ee7c7e] rounded-full" />
                                {lang === "az" ? "Vizyon" : "Vision"}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{p.vision}</p>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-gray-50 dark:bg-white/5 p-10 rounded-[3rem] border border-gray-100 dark:border-white/10"
                        >
                            <h2 className="text-2xl font-black text-[#1a2355] dark:text-white mb-6 flex items-center gap-3">
                                <div className="w-1.5 h-8 bg-[#ee7c7e] rounded-full" />
                                {lang === "az" ? "Missiya" : "Mission"}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{p.mission}</p>
                        </motion.div>
                    </div>

                    {/* Strategic Pillars */}
                    <div className="mb-32">
                        <div className="mb-12">
                            <h2 className="text-3xl md:text-4xl font-black text-[#1a2355] dark:text-white mb-4">
                                {lang === "az" ? "Strateji Sütunlar" : "Strategic Pillars"}
                            </h2>
                            <div className="w-20 h-1.5 bg-[#ee7c7e] rounded-full" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {p.pillars.map((pillar: any, i: number) => (
                                <motion.div
                                    key={pillar.num}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <div className="bg-white dark:bg-white/5 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-sm h-full flex gap-6">
                                        <div className="text-5xl font-black text-[#1a2355]/10 dark:text-white/10 select-none">
                                            {pillar.num}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[#ee7c7e] mb-4">{PILLAR_ICONS[i]}</div>
                                            <h3 className="text-[#1a2355] dark:text-white font-black text-xl mb-3">{pillar.title}</h3>
                                            <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">{pillar.description}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {pillar.targets.map((target: string) => (
                                                    <span key={target} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                        {target}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Values & KPIs */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }} 
                            whileInView={{ opacity: 1, x: 0 }} 
                            viewport={{ once: true }}
                            className="lg:col-span-5"
                        >
                            <h2 className="text-2xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                                <div className="w-1.5 h-8 bg-[#ee7c7e] rounded-full" />
                                {p.valuesTitle}
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                {p.values.map((val: string, i: number) => (
                                    <div key={i} className="flex items-center gap-4 bg-gray-50 dark:bg-white/5 p-5 rounded-2xl border border-gray-100 dark:border-white/10 transition-all hover:border-[#ee7c7e]/30 group">
                                        <div className="w-2 h-2 rounded-full bg-[#ee7c7e]" />
                                        <span className="font-black text-[#1a2355] dark:text-white uppercase tracking-widest text-xs group-hover:text-[#ee7c7e] transition-colors">{val}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 30 }} 
                            whileInView={{ opacity: 1, x: 0 }} 
                            viewport={{ once: true }}
                            className="lg:col-span-7"
                        >
                            <h2 className="text-2xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                                <div className="w-1.5 h-8 bg-[#ee7c7e] rounded-full" />
                                {p.targetsTitle}
                            </h2>
                            <div className="space-y-4">
                                {p.targets.map((target: string, i: number) => (
                                    <div key={i} className="flex gap-4 items-start p-6 bg-[#1a2355]/5 dark:bg-white/5 rounded-3xl border-l-4 border-[#ee7c7e]">
                                        <div className="text-[#ee7c7e] font-black text-lg">{(i + 1).toString().padStart(2, '0')}</div>
                                        <p className="text-[#1a2355] dark:text-white/80 font-medium">{target}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Related Links */}
                    <div className="pt-20 mt-32 border-t border-gray-100 dark:border-white/10">
                        <h2 className="text-xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                            <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                            {t.common.moreInSection}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {p.related.map((link: any) => (
                                <Link key={link.href} href={link.href}
                                    className="group flex items-center justify-between bg-white dark:bg-white/5 p-6 rounded-[1.5rem] border border-gray-100 dark:border-white/10 hover:border-[#1a2355] dark:hover:border-[#ee7c7e] transition-all duration-300 shadow-sm hover:shadow-xl">
                                    <span className="text-[#1a2355] dark:text-white font-black text-sm group-hover:text-[#ee7c7e] transition-colors">{link.title}</span>
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
