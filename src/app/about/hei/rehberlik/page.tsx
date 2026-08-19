"use client";

import { motion } from "framer-motion";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";

import { SectionCard, CARD } from "@/components/department/ui";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { sortEducations } from "@/util/educationOrder";

export default function HeiLeadershipPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.hei;
    const director = p.director;

    const educations = sortEducations(director.educationItems);

    return (
        <div className="space-y-6">
            {/* PROFILE */}
            <motion.section
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                className={`text-flow ${CARD} overflow-hidden`}
            >
                <div className="grid grid-cols-1 md:grid-cols-12">
                    {/* Portrait */}
                    <div className="relative md:col-span-4 lg:col-span-3">
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-[#1a2355] to-[#0f172a] md:h-full">
                            <span className="flex h-full w-full items-center justify-center">
                                <PersonIcon sx={{ fontSize: 110 }} className="text-white/15" />
                            </span>
                        </div>
                    </div>

                    {/* Identity */}
                    <div className="flex flex-col justify-center p-6 md:col-span-8 md:p-9 lg:col-span-9">
                        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e]">
                            {director.title}
                        </p>
                        <h1 className="text-2xl font-black leading-[1.1] tracking-tight text-[#1a2355] dark:text-white md:text-4xl">
                            {director.name}
                        </h1>
                        <p className="mt-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                            {director.degree}
                        </p>

                        <div className="mt-7 flex flex-wrap gap-2.5">
                            <a
                                href={`mailto:${director.email}`}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#1a2355] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#ee7c7e]"
                            >
                                <EmailIcon sx={{ fontSize: 15 }} />
                                <span className="max-w-[220px] truncate">{director.email}</span>
                            </a>
                            <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-[#1a2355] dark:border-white/10 dark:text-white">
                                <PhoneIcon sx={{ fontSize: 15 }} />
                                {director.phone}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-[#1a2355] dark:border-white/10 dark:text-white">
                                <LocationOnIcon sx={{ fontSize: 15 }} />
                                {director.office}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-[#1a2355] dark:border-white/10 dark:text-white">
                                <AccessTimeIcon sx={{ fontSize: 15 }} />
                                {director.hours}
                            </span>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* BIOGRAPHY */}
            <SectionCard
                icon={ArticleOutlinedIcon}
                eyebrow={lang === "az" ? "Peşəkar yol" : "Professional background"}
                title={lang === "az" ? "Bioqrafiya" : "Biography"}
                delay={0.04}
            >
                <div className="text-flow space-y-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                    {director.bio.split("\n\n").map((para: string, i: number) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
                <p className="mt-7 rounded-xl border border-[#ee7c7e]/25 bg-[#ee7c7e]/[0.07] p-5 text-[14px] font-semibold leading-relaxed text-[#1a2355] dark:text-white">
                    <EmojiEventsOutlinedIcon sx={{ fontSize: 17 }} className="mr-2 align-[-3px] text-[#ee7c7e]" />
                    {director.achievements}
                </p>
            </SectionCard>

            {/* EDUCATION TIMELINE — highest degree first */}
            <SectionCard
                icon={SchoolOutlinedIcon}
                eyebrow={lang === "az" ? "Akademik yol" : "Academic journey"}
                title={director.educationTitle}
                delay={0.06}
            >
                <ol className="relative">
                    <span className="absolute bottom-3 left-[7px] top-3 w-px bg-slate-200 dark:bg-white/10" />
                    {educations.map((edu, index: number) => (
                        <motion.li
                            key={`${edu.degree}-${index}`}
                            initial={{ opacity: 0, x: -6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
                            className="relative flex gap-5 pb-7 last:pb-0"
                        >
                            <span className="relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-[3px] border-white bg-[#1a2355] ring-1 ring-slate-200 dark:border-slate-900 dark:ring-white/15" />
                            <div className="min-w-0 flex-1">
                                <span className="mb-1.5 inline-block rounded-md bg-[#ee7c7e]/10 px-2 py-0.5 text-[10px] font-black tabular-nums uppercase tracking-[0.2em] text-[#ee7c7e]">
                                    {edu.period}
                                </span>
                                <h3 className="text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
                                    {edu.degree}
                                </h3>
                                <p className="mt-1 text-[13px] font-medium text-slate-500 dark:text-slate-400">
                                    {edu.inst}
                                </p>
                            </div>
                        </motion.li>
                    ))}
                </ol>
            </SectionCard>

            {/* RESEARCH INTERESTS */}
            <SectionCard
                icon={ScienceOutlinedIcon}
                eyebrow={lang === "az" ? "Tədqiqat" : "Research"}
                title={director.researchInterestsTitle}
                delay={0.08}
            >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {director.researchInterests.map((interest: string) => (
                        <div
                            key={interest}
                            className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3.5 text-[14px] font-semibold text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                        >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ee7c7e]" />
                            {interest}
                        </div>
                    ))}
                </div>
            </SectionCard>
        </div>
    );
}
