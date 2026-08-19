"use client";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";

import { SectionCard } from "@/components/department/ui";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

export default function HeiDoctoralPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.hei;

    const durations = [p.doctoralDuration.phd, p.doctoralDuration.ds];

    return (
        <div className="space-y-6">
            <SectionCard
                icon={SchoolOutlinedIcon}
                eyebrow={lang === "az" ? "Ali təhsilin ən yüksək səviyyəsi" : "The highest level of study"}
                title={p.doctoralTitle}
            >
                <p className="text-flow text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                    {p.doctoralDescription}
                </p>
            </SectionCard>

            <SectionCard
                icon={ScheduleOutlinedIcon}
                eyebrow={lang === "az" ? "Nə qədər çəkir" : "How long it takes"}
                title={p.doctoralDuration.title.replace(/:$/, "")}
                delay={0.04}
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {durations.map((track: { title: string; items: string[] }) => (
                        <div
                            key={track.title}
                            className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 dark:border-white/10 dark:bg-white/5"
                        >
                            <h3 className="mb-4 flex items-center gap-2.5 text-[15px] font-black text-[#1a2355] dark:text-white">
                                <span className="h-4 w-1.5 rounded-full bg-[#ee7c7e]" />
                                {track.title.replace(/:$/, "")}
                            </h3>
                            <ul className="space-y-2.5">
                                {track.items.map((item: string) => {
                                    const [label, value] = item.split(":");
                                    return (
                                        <li
                                            key={item}
                                            className="flex items-center justify-between gap-3 border-b border-slate-200/70 pb-2.5 last:border-0 last:pb-0 dark:border-white/10"
                                        >
                                            <span className="text-[13px] font-semibold text-slate-500 dark:text-slate-400">
                                                {label}
                                            </span>
                                            <span className="text-sm font-black tabular-nums text-[#1a2355] dark:text-white">
                                                {value?.trim() ?? ""}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
                <p className="mt-6 border-t border-slate-100 pt-5 text-[13px] leading-relaxed text-slate-400 dark:border-white/10 dark:text-slate-500">
                    {p.doctoralDuration.footer}
                </p>
            </SectionCard>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <SectionCard
                    icon={ListAltOutlinedIcon}
                    eyebrow={lang === "az" ? "Təhsil formaları" : "Study formats"}
                    title={p.doctoralFormatsTitle.replace(/:$/, "")}
                    delay={0.06}
                >
                    <ul className="space-y-3">
                        {p.doctoralFormats.map((format: string) => (
                            <li
                                key={format}
                                className="flex items-start gap-3 text-[15px] font-medium leading-relaxed text-slate-600 dark:text-slate-300"
                            >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ee7c7e]" />
                                {format}
                            </li>
                        ))}
                    </ul>
                </SectionCard>

                <SectionCard
                    icon={AssignmentIndOutlinedIcon}
                    eyebrow={lang === "az" ? "Necə müraciət olunur" : "How to apply"}
                    title={lang === "az" ? "Qəbul" : "Admission"}
                    delay={0.08}
                >
                    <p className="text-flow text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                        {p.doctoralAdmission}
                    </p>
                </SectionCard>
            </div>
        </div>
    );
}
