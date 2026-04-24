"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";

export default function AcademicCalendar2025Page() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const data = t.pages.students?.academicCalendar2025;

    if (!data) return null;

    return (
        <main className="min-h-screen transition-colors duration-500">
            <PageHero
                title={data.title}
                description={data.subtitle}
                breadcrumbs={[
                    { label: lang === 'az' ? 'Tələbələr' : 'Students' },
                    { label: data.breadcrumb }
                ]}
                eyebrow={data.eyebrow}
                // videoSrc="/heroBgVideos/academic-hero-vide.mp4"
            />

            <PageContainer>
                {/* Compact Side-by-Side Semesters */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20">
                    {data.sections.slice(0, 2).map((section: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="flex flex-col h-full"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1.5 h-8 bg-[#ee7c7e] rounded-full" />
                                <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter">
                                    {section.title}
                                </h2>
                            </div>

                            <div className="flex-1 overflow-hidden rounded-[2.5rem] border border-gray-100 dark:border-white/10 bg-white/50 dark:bg-slate-800/40 backdrop-blur-md shadow-2xl shadow-blue-900/5">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#1a2355] text-white uppercase text-[10px] font-black tracking-[0.2em]">
                                            {section.headers.map((h: string, i: number) => (
                                                <th key={i} className="px-6 py-4 border-b border-white/10">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                        {section.rows.map((row: string[], i: number) => (
                                            <tr key={i} className="group hover:bg-[#ee7c7e]/5 transition-colors">
                                                <td className="px-6 py-3.5 text-xs font-black text-[#ee7c7e] w-1/3">
                                                    <div className="flex items-center gap-2">
                                                        <CalendarMonthIcon sx={{ fontSize: 14 }} className="opacity-40" />
                                                        {row[0]}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3.5 text-xs font-bold text-[#1a2355] dark:text-gray-300 group-hover:text-[#1a2355] dark:group-hover:text-white transition-colors">
                                                    {row[1]}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Summer Session (if exists) */}
                {data.sections.slice(2).map((section: any, idx: number) => (
                    <motion.div
                        key={idx + 2}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-20 max-w-4xl"
                    >
                         <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-8 bg-[#ee7c7e] rounded-full" />
                            <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter">
                                {section.title}
                            </h2>
                        </div>
                        <div className="overflow-hidden rounded-[2.5rem] border border-gray-100 dark:border-white/10 bg-white/50 dark:bg-slate-800/40 backdrop-blur-md shadow-2xl shadow-blue-900/5">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#1a2355] text-white uppercase text-[10px] font-black tracking-[0.2em]">
                                        {section.headers.map((h: string, i: number) => (
                                            <th key={i} className="px-6 py-4 border-b border-white/10">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                    {section.rows.map((row: string[], i: number) => (
                                        <tr key={i} className="group hover:bg-[#ee7c7e]/5 transition-colors">
                                            <td className="px-6 py-3.5 text-xs font-black text-[#ee7c7e] w-1/4">
                                                <div className="flex items-center gap-2">
                                                    <CalendarMonthIcon sx={{ fontSize: 14 }} className="opacity-40" />
                                                    {row[0]}
                                                </div>
                                            </td>
                                            <td className="px-6 py-3.5 text-xs font-bold text-[#1a2355] dark:text-gray-300 group-hover:text-[#1a2355] dark:group-hover:text-white transition-colors">
                                                {row[1]}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                ))}

                {/* Notes Section */}
                <div className="pt-20 border-t border-gray-100 dark:border-white/10">
                    <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-10 flex items-center gap-4">
                        <span className="w-2 h-10 bg-[#ee7c7e] rounded-full" />
                        {lang === 'az' ? 'Əlavə Məlumat' : 'Additional Information'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {data.notes.map((note: string, i: number) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-[3rem] bg-white dark:bg-slate-800/50 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-xl group hover:border-[#ee7c7e]/30 transition-all duration-500"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] mb-8 group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-500">
                                    {i === 0 ? <SchoolIcon sx={{ fontSize: 28 }} /> : <InfoIcon sx={{ fontSize: 28 }} />}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed font-medium">
                                    {note}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </PageContainer>
        </main>
    );
}
