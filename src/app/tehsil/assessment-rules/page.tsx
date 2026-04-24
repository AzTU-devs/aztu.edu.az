"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GavelIcon from "@mui/icons-material/Gavel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";

export default function AssessmentRulesPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const data = t.pages.students?.assessmentRules;

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
                videoSrc="/heroBgVideos/academic-hero-vide.mp4"
            />

            <PageContainer>
                {/* DOWNLOAD PDF CTA */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 p-8 md:p-12 rounded-[3rem] bg-white dark:bg-slate-800/50 backdrop-blur-md border border-gray-100 dark:border-white/10 shadow-2xl shadow-blue-900/5 flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e]">
                            <PictureAsPdfIcon sx={{ fontSize: 32 }} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight">
                                {lang === 'az' ? 'Rəsmi Sənədi Yüklə' : 'Download Official Document'}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                {lang === 'az' ? 'Tam qaydalar PDF formatında' : 'Full rules in PDF format'}
                            </p>
                        </div>
                    </div>
                    <a 
                        href={data.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 px-10 py-5 bg-[#1a2355] text-white rounded-[2rem] font-black uppercase text-[12px] tracking-[0.2em] hover:bg-[#ee7c7e] transition-all duration-500 shadow-2xl shadow-[#1a2355]/20 hover:shadow-[#ee7c7e]/40"
                    >
                        {lang === 'az' ? 'PDF-i Yüklə' : 'Download PDF'}
                        <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-white/20">
                            <ChevronRightIcon sx={{ fontSize: 18 }} />
                        </div>
                    </a>
                </motion.section>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20">
                    {data.sections.map((section: any, idx: number) => (
                        <motion.section 
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="flex flex-col h-full bg-white dark:bg-slate-800/40 backdrop-blur-md rounded-[3rem] border border-gray-100 dark:border-white/10 p-8 md:p-10 shadow-2xl shadow-blue-900/5 hover:border-[#ee7c7e]/30 transition-all duration-500"
                        >
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-8 bg-[#ee7c7e] rounded-full" />
                                <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter">
                                    {section.title}
                                </h2>
                            </div>

                            <div className="flex-1 space-y-8">
                                {section.content && (
                                    <p className="text-lg font-bold text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {section.content}
                                    </p>
                                )}

                                {section.list && (
                                    <div className="grid grid-cols-1 gap-3">
                                        {section.list.map((item: string, i: number) => (
                                            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                                                <div className="w-6 h-6 rounded-lg bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] shrink-0">
                                                    <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />
                                                </div>
                                                <span className="text-sm font-bold text-[#1a2355] dark:text-gray-200">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.table && (
                                    <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-white/10 bg-[#1a2355]/5 dark:bg-black/20">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-[#1a2355] text-white uppercase text-[9px] font-black tracking-[0.1em]">
                                                    {section.table.headers.map((h: string, i: number) => (
                                                        <th key={i} className="px-4 py-3 border-b border-white/10">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                                {section.table.rows.map((row: string[], i: number) => (
                                                    <tr key={i} className="group hover:bg-[#ee7c7e]/5 transition-colors">
                                                        {row.map((cell: string, j: number) => (
                                                            <td key={j} className={`px-4 py-2.5 text-[11px] font-bold ${j === 1 ? 'text-[#ee7c7e] font-black' : 'text-gray-600 dark:text-gray-300'} group-hover:text-[#1a2355] dark:group-hover:text-white transition-colors`}>
                                                                {cell}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {section.items && (
                                    <div className="grid grid-cols-1 gap-4">
                                        {section.items.map((item: any, i: number) => (
                                            <div key={i} className="group p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-[#ee7c7e]/30 transition-all duration-500">
                                                <div className="flex items-center gap-4 mb-3">
                                                    <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-500">
                                                        <ListAltIcon sx={{ fontSize: 20 }} />
                                                    </div>
                                                    <h4 className="text-base font-black text-[#1a2355] dark:text-white uppercase tracking-tight">{item.title}</h4>
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-white/40 leading-relaxed font-medium">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section.subContent && (
                                    <div className="p-6 rounded-2xl bg-[#1a2355] text-white flex items-center gap-5 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#ee7c7e] shrink-0 relative z-10">
                                            <HelpOutlineIcon sx={{ fontSize: 24 }} />
                                        </div>
                                        <p className="text-sm font-black italic relative z-10 leading-relaxed">
                                            &quot;{section.subContent}&quot;
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.section>
                    ))}
                </div>

                {/* Footer Features Style */}
                <section className="pt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-10 rounded-[3rem] bg-[#1a2355] text-white shadow-2xl relative overflow-hidden group"
                    >
                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                         <AssessmentIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8 relative z-10" />
                         <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 relative z-10">{lang === 'az' ? 'Şəffaflıq' : 'Transparency'}</h4>
                         <p className="text-white/60 font-medium leading-relaxed relative z-10">{lang === 'az' ? 'Bütün imtahanlar videoçəkiliş və mərkəzləşdirilmiş sistem vasitəsilə nəzarətdə saxlanılır.' : 'All exams are monitored via video recording and a centralized system.'}</p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="p-10 rounded-[3rem] bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden group"
                    >
                         <GavelIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8 relative z-10" />
                         <h4 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-4 relative z-10">{lang === 'az' ? 'Ədalətlilik' : 'Fairness'}</h4>
                         <p className="text-gray-500 dark:text-white/40 font-medium leading-relaxed relative z-10">{lang === 'az' ? 'Qiymətləndirmə meyarları əvvəlcədən təyin edilir və bütün tələbələr üçün eynidir.' : 'Assessment criteria are predefined and uniform for all students.'}</p>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-10 rounded-[3rem] bg-white dark:bg-slate-800/40 border border-gray-100 dark:border-white/10 shadow-2xl relative overflow-hidden group"
                    >
                         <HelpOutlineIcon sx={{ fontSize: 48 }} className="text-[#ee7c7e] mb-8 relative z-10" />
                         <h4 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-4 relative z-10">{lang === 'az' ? 'Dəstək' : 'Support'}</h4>
                         <p className="text-gray-500 dark:text-white/40 font-medium leading-relaxed relative z-10">{lang === 'az' ? 'Apellyasiya və müraciət prosesləri tələbələrin hüquqlarını qorumaq üçün sadələşdirilmişdir.' : 'Appeals and application processes are simplified to protect student rights.'}</p>
                    </motion.div>
                </section>
            </PageContainer>
        </main>
    );
}
