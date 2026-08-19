"use client";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import TranslateIcon from "@mui/icons-material/Translate";

import { SectionCard, NumberedList } from "@/components/department/ui";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

export default function HeiAboutPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.hei;

    const counter = (n: number) => (
        <span className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-black tabular-nums uppercase tracking-[0.2em] text-slate-400 dark:border-white/10 dark:text-slate-500">
            {String(n).padStart(2, "0")}
        </span>
    );

    return (
        <div className="space-y-6">
            <SectionCard
                icon={InfoOutlinedIcon}
                eyebrow={lang === "az" ? "Ümumi məlumat" : "Overview"}
                title={p.aboutTitle}
            >
                <div className="text-flow space-y-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                    {p.paragraphs.map((para: string, i: number) => (
                        <p key={i}>{para}</p>
                    ))}
                </div>
            </SectionCard>

            <SectionCard
                icon={FlagOutlinedIcon}
                eyebrow={lang === "az" ? "Nəyə çalışırıq" : "What we aim for"}
                title={p.missionTitle}
                action={counter(p.strategicDirections.length)}
                delay={0.04}
            >
                <p className="text-flow mb-7 border-l-2 border-[#ee7c7e] pl-5 text-[15px] italic leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                    {p.missionText}
                </p>
                <NumberedList items={p.strategicDirections.map((item: string) => item)} />
            </SectionCard>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <SectionCard
                    icon={SchoolOutlinedIcon}
                    eyebrow={lang === "az" ? "Magistratura" : "Master's level"}
                    title={p.academicOpportunities.title}
                    delay={0.06}
                >
                    <p className="text-flow text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                        {p.academicOpportunities.description}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        {p.academicOpportunities.stats.map((stat: string) => {
                            const [value, ...rest] = stat.split(" ");
                            return (
                                <div
                                    key={stat}
                                    className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4 dark:border-white/10 dark:bg-white/5"
                                >
                                    <p className="text-2xl font-black tabular-nums tracking-tighter text-[#1a2355] dark:text-white">
                                        {value}
                                    </p>
                                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                                        {rest.join(" ")}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-7 border-t border-slate-100 pt-6 dark:border-white/10">
                        <p className="mb-4 flex items-start gap-2 text-[13px] font-semibold leading-relaxed text-slate-500 dark:text-slate-400">
                            <TranslateIcon sx={{ fontSize: 16 }} className="mt-0.5 shrink-0 text-[#ee7c7e]" />
                            {p.academicOpportunities.languagesTitle}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {p.academicOpportunities.languages.map((language: string) => (
                                <span
                                    key={language}
                                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-[#1a2355] dark:border-white/10 dark:text-white"
                                >
                                    {language}
                                </span>
                            ))}
                        </div>
                        <p className="mt-5 text-[13px] leading-relaxed text-slate-400 dark:text-slate-500">
                            {p.academicOpportunities.footer}
                        </p>
                    </div>
                </SectionCard>

                <SectionCard
                    icon={ScienceOutlinedIcon}
                    eyebrow={lang === "az" ? "Elm və innovasiya" : "Research & innovation"}
                    title={p.researchTitle}
                    action={counter(p.researchItems.length)}
                    delay={0.08}
                >
                    <p className="text-flow mb-6 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                        {p.researchDescription}
                    </p>
                    <NumberedList items={p.researchItems.map((item: string) => item)} />
                    <p className="mt-6 border-t border-slate-100 pt-5 text-[13px] leading-relaxed text-slate-400 dark:border-white/10 dark:text-slate-500">
                        {p.researchFooter}
                    </p>
                </SectionCard>
            </div>
        </div>
    );
}
