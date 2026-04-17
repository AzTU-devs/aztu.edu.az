"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import AboutPageBanner from "@/components/about/AboutPageBanner";
import SectionBlock from "@/components/shared/SectionBlock";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";

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
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute inset-0 ${dark ? 'opacity-[0.04]' : 'opacity-[0.12] dark:opacity-[0.04]'}`} 
                     style={{ backgroundImage: `radial-gradient(${dark ? 'white' : '#ee7c7e'} 0.5px, transparent 0.5px)`, backgroundSize: '32px 32px' }} />
                
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1a2355]/[0.03] dark:bg-[#1a2355]/[0.1] blur-[120px] rounded-full" />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] ${dark ? 'bg-blue-500/[0.05]' : 'bg-[#ee7c7e]/[0.03] dark:bg-[#ee7c7e]/[0.08]'} blur-[100px] rounded-full animate-pulse`} />
                
                {watermark && (
                    <div className="absolute left-10 bottom-10 select-none opacity-[0.02] dark:opacity-[0.05]">
                        <h1 className={`text-[180px] font-black tracking-tighter leading-none ${dark ? 'text-white' : 'text-[#1a2355] dark:text-white'} uppercase`}>{watermark}</h1>
                    </div>
                )}
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto">
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

export default function AcademicCalendar2025Page() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const data = t.pages.students?.academicCalendar2025;

    if (!data) return null;

    return (
        <main className="min-h-screen bg-white dark:bg-[#0b1330] transition-colors duration-500">
             <AboutPageBanner
                eyebrow={data.eyebrow}
                title={data.title}
                subtitle={data.subtitle}
                breadcrumbs={[
                    { label: lang === 'az' ? 'Tələbələr' : 'Students', href: '#' },
                    { label: data.breadcrumb }
                ]}
            />

            {data.sections.map((section: any, idx: number) => (
                <HomeStyleSection 
                    key={idx}
                    badge={idx === 0 ? (lang === 'az' ? 'I Semestr' : 'Semester I') : idx === 1 ? (lang === 'az' ? 'II Semestr' : 'Semester II') : (lang === 'az' ? 'Yay' : 'Summer')} 
                    title={section.title.split(' (')[0]} 
                    accentTitle={section.title.includes('(') ? `(${section.title.split(' (')[1]}` : ''}
                    dark={idx % 2 === 1}
                    watermark={idx === 0 ? "Fall" : idx === 1 ? "Spring" : "Summer"}
                >
                    <div className={`overflow-x-auto rounded-[3rem] border ${idx % 2 === 1 ? 'border-white/10 bg-white/5 backdrop-blur-xl' : 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5'} shadow-2xl`}>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className={`${idx % 2 === 1 ? 'bg-white/10 text-white' : 'bg-gray-100 dark:bg-white/10 text-[#1a2355] dark:text-white'} uppercase text-[11px] font-black tracking-[0.3em]`}>
                                    {section.headers.map((h: string, i: number) => (
                                        <th key={i} className={`px-8 py-8 border-b ${idx % 2 === 1 ? 'border-white/10' : 'border-gray-200 dark:border-white/10'}`}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {section.rows.map((row: string[], i: number) => (
                                    <tr key={i} className={`transition-all duration-300 border-b ${idx % 2 === 1 ? 'border-white/5 hover:bg-white/10' : 'border-gray-100 dark:border-white/5 hover:bg-gray-100/50 dark:hover:bg-white/5'} last:border-0 group`}>
                                        <td className="px-8 py-6 text-sm font-black text-[#ee7c7e] w-1/4">
                                            <div className="flex items-center gap-3">
                                                <CalendarMonthIcon sx={{ fontSize: 18 }} className="opacity-50" />
                                                {row[0]}
                                            </div>
                                        </td>
                                        <td className={`px-8 py-6 text-sm font-bold ${idx % 2 === 1 ? 'text-white' : 'text-[#1a2355] dark:text-white'} group-hover:text-[#ee7c7e] transition-colors`}>
                                            {row[1]}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </HomeStyleSection>
            ))}

            {/* Notes Section */}
            <HomeStyleSection 
                badge={lang === 'az' ? 'Qeydlər' : 'Notes'} 
                title={lang === 'az' ? 'Əlavə' : 'Additional'} 
                accentTitle={lang === 'az' ? 'Məlumat' : 'Information'}
                dark={false}
                watermark="Info"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.notes.map((note: string, i: number) => (
                        <div key={i} className="p-10 rounded-[3rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-xl group hover:border-[#ee7c7e]/30 transition-all duration-500">
                            <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] mb-8 group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-500">
                                {i === 0 ? <SchoolIcon sx={{ fontSize: 28 }} /> : <InfoIcon sx={{ fontSize: 28 }} />}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
                                {note}
                            </p>
                        </div>
                    ))}
                </div>
            </HomeStyleSection>
        </main>
    );
}
