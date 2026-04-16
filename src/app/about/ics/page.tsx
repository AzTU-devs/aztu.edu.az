"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";
import Link from "next/link";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LaunchIcon from "@mui/icons-material/Launch";
import HomeIcon from "@mui/icons-material/Home";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import BiotechIcon from "@mui/icons-material/Biotech";
import MemoryIcon from "@mui/icons-material/Memory";
import TrafficIcon from "@mui/icons-material/Traffic";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

const RESEARCH_AREAS = [
    { icon: <SettingsSuggestIcon sx={{ fontSize: 28 }} />, title: "Automatic Control Theory", desc: "Stability analysis, optimal and adaptive control, and robust systems design." },
    { icon: <PrecisionManufacturingIcon sx={{ fontSize: 28 }} />, title: "Industrial Automation", desc: "PLC programming, SCADA systems, and smart manufacturing technologies." },
    { icon: <ElectricBoltIcon sx={{ fontSize: 28 }} />, title: "Power Systems Control", desc: "Smart grids, renewable energy integration, and power electronics." },
    { icon: <MemoryIcon sx={{ fontSize: 28 }} />, title: "Embedded Systems", desc: "Real-time operating systems, microcontroller design, and embedded AI." },
    { icon: <BiotechIcon sx={{ fontSize: 28 }} />, title: "Biomedical Engineering", desc: "Biosignal processing, medical device control, and telemedicine systems." },
    { icon: <TrafficIcon sx={{ fontSize: 28 }} />, title: "Intelligent Transport Systems", desc: "Traffic optimisation, autonomous vehicle control, and V2X communications." },
];

export default function ICSPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.ics;

    const partnerLabel = lang === "az" ? "Tərəfdaş universitet və əlaqəli institutlar" : "Partner Universities & Related Institutes";
    const partnerHref = lang === "az" ? "/haqqimizda/terefdas-universitet-ve-elaqeli-institutlar" : "/about/partner-universities-and-related-institutes";

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* STUNNING HERO SECTION */}
            <div className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col pt-44 lg:pt-48 overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[#0b1330]" />
                    <div className="absolute top-0 right-0 w-full lg:w-[85%] h-full bg-gradient-to-br from-[#1a2355] to-[#13365E] rounded-bl-[5rem] lg:rounded-bl-[20rem] transition-all duration-1000" />
                    <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
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
                        <Link href={partnerHref} className="hover:text-white transition-colors">
                            {partnerLabel}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{p.breadcrumb}</span>
                    </nav>

                    <div className="max-w-4xl">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
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

            <div className="px-4 md:px-10 lg:px-20 py-24 space-y-32 bg-white dark:bg-[#0b1330] relative overflow-hidden">
                <div className="relative z-10 max-w-[1600px] mx-auto">
                    {/* Overview */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }}
                            className="lg:col-span-8"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-1.5 h-10 bg-[#ee7c7e] rounded-full" />
                                <h2 className="text-3xl font-black text-[#1a2355] dark:text-white">{p.aboutTitle}</h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                                {p.paragraphs.map((para: string, i: number) => <p key={i}>{para}</p>)}
                            </div>
                            {p.websiteUrl && (
                                <div className="mt-12">
                                    <a href={p.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 bg-[#1a2355] text-white px-8 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-[#ee7c7e] transition-all shadow-xl group">
                                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <LaunchIcon sx={{ fontSize: 18 }} />
                                        </div>
                                        {p.websiteUrl.replace("https://", "")}
                                    </a>
                                </div>
                            )}
                        </motion.div>

                        {/* Director Card */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }} 
                            whileInView={{ opacity: 1, scale: 1 }} 
                            viewport={{ once: true }}
                            className="lg:col-span-4"
                        >
                            <h3 className="text-xl font-black text-[#1a2355] dark:text-white mb-6 flex items-center gap-3">
                                <div className="w-2 h-6 bg-[#ee7c7e] rounded-full" />
                                {lang === "az" ? "Rəhbərlik" : "Leadership"}
                            </h3>
                            <PersonCard
                                fullName="Academician Ali Abbasov"
                                academicDegree={lang === "az" ? "Elmlər doktoru, Akademik" : "Doctor of Sciences, Academician"}
                                title={lang === "az" ? "İdarəetmə Sistemləri İnstitutunun direktoru" : "Director, Institute of Control Systems"}
                                email="director@ics.ab.az"
                                size="lg"
                            />
                        </motion.div>
                    </div>

                    {/* Research areas */}
                    <section>
                        <div className="mb-12">
                            <h2 className="text-3xl font-black text-[#1a2355] dark:text-white mb-2">{lang === "az" ? "Tədqiqat Sahələri" : "Research Areas"}</h2>
                            <p className="text-gray-500 dark:text-white/40">Pioneering research in automation, intelligent control, and embedded systems.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {RESEARCH_AREAS.map((area, i) => (
                                <motion.div 
                                    key={area.title} 
                                    initial={{ opacity: 0, y: 20 }} 
                                    whileInView={{ opacity: 1, y: 0 }} 
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-gray-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/10 hover:border-[#ee7c7e]/30 transition-all duration-300"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] mb-6">
                                        {area.icon}
                                    </div>
                                    <h3 className="text-lg font-black text-[#1a2355] dark:text-white mb-3">{area.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-white/50 leading-relaxed">{area.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Related Links */}
                    <div className="pt-20 mt-32 border-t border-gray-100 dark:border-white/10">
                        <h2 className="text-xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                            <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                            {t.common.moreInSection}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {p.related.map((link: any) => (
                                <Link key={link.href} href={link.href} className="group flex items-center justify-between bg-white dark:bg-white/5 p-6 rounded-[1.5rem] border border-gray-100 dark:border-white/10 hover:border-[#1a2355] dark:hover:border-[#ee7c7e] transition-all duration-300 shadow-sm hover:shadow-xl">
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
