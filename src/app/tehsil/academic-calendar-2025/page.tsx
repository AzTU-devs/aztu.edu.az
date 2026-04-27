"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";

import Timeline from "@/components/shared/Timeline";

export default function AcademicCalendar2025Page() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const data = t.pages.students?.academicCalendar2025;

    if (!data) return null;

    return (
        <main className="min-h-screen transition-colors duration-500 bg-[#050816]">
            <PageHero
                title={data.title}
                description={data.subtitle}
                breadcrumbs={[
                    { label: lang === 'az' ? 'Tələbələr' : 'Students' },
                    { label: data.breadcrumb }
                ]}
                eyebrow={data.eyebrow}
            />

            <PageContainer>
                {/* Timeline Sections */}
                <div className="space-y-24 mb-32 -mt-20 relative z-10">
                    {data.sections.map((section: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                            className="bg-slate-900/40 backdrop-blur-3xl rounded-[4rem] p-10 md:p-16 border-2 border-[#ee7c7e]/20 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee7c7e]/5 blur-[100px] rounded-full" />
                            
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-2 h-10 bg-[#ee7c7e] rounded-full shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
                                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
                                    {section.title}
                                </h2>
                            </div>

                            <Timeline 
                                items={section.rows.map((row: string[]) => ({
                                    period: row[0],
                                    title: row[1]
                                }))}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Notes Section */}
                <div className="pt-24 border-t border-white/10">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-12 flex items-center gap-4">
                        <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
                        {lang === 'az' ? 'Əlavə Məlumat' : 'Additional Information'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {data.notes.map((note: string, i: number) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-[3rem] bg-slate-900/60 backdrop-blur-xl border-2 border-white/5 shadow-2xl group hover:border-[#ee7c7e]/40 transition-all duration-500"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] mb-8 group-hover:bg-[#ee7c7e] group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-lg">
                                    {i === 0 ? <SchoolIcon sx={{ fontSize: 32 }} /> : <InfoIcon sx={{ fontSize: 32 }} />}
                                </div>
                                <p className="text-gray-300 text-xl leading-relaxed font-bold">
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
