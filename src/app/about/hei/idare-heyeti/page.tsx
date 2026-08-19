"use client";

import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import { SectionCard, NumberedList } from "@/components/department/ui";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

export default function HeiBoardPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const board = t.pages.about.hei.board;

    const counter = (n: number) => (
        <span className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-black tabular-nums uppercase tracking-[0.2em] text-slate-400 dark:border-white/10 dark:text-slate-500">
            {String(n).padStart(2, "0")}
        </span>
    );

    return (
        <div className="space-y-6">
            <SectionCard
                icon={AccountBalanceOutlinedIcon}
                eyebrow={lang === "az" ? "Vəzifələr" : "Duties"}
                title={board.intro.replace(/:$/, "")}
                action={counter(board.duties.length)}
            >
                <NumberedList items={board.duties.map((duty: string) => duty)} />
                <p className="mt-6 border-t border-slate-100 pt-5 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#ee7c7e] dark:border-white/10">
                    {board.note}
                </p>
            </SectionCard>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <SectionCard
                    icon={GavelOutlinedIcon}
                    eyebrow={lang === "az" ? "Səlahiyyətlər" : "Powers"}
                    title={board.rightsTitle.replace(/:$/, "")}
                    action={counter(board.rights.length)}
                    delay={0.04}
                >
                    <NumberedList items={board.rights.map((right: string) => right)} />
                </SectionCard>

                <SectionCard
                    icon={GroupsOutlinedIcon}
                    eyebrow={lang === "az" ? "Kim təmsil olunur" : "Who sits on it"}
                    title={board.compositionTitle.replace(/:$/, "")}
                    action={counter(board.composition.length)}
                    delay={0.06}
                >
                    <NumberedList items={board.composition.map((item: string) => item)} />
                </SectionCard>
            </div>

            <SectionCard
                icon={ChecklistOutlinedIcon}
                eyebrow={lang === "az" ? "Namizədlərə tələblər" : "Requirements for members"}
                title={board.requirementsTitle.replace(/:$/, "")}
                delay={0.08}
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {board.requirements.map((req: string) => (
                        <div
                            key={req}
                            className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 text-[14px] leading-relaxed text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                        >
                            {req}
                        </div>
                    ))}
                </div>
            </SectionCard>

            <SectionCard
                icon={PersonOutlineIcon}
                eyebrow={board.title}
                title={lang === "az" ? "İdarə Heyətinin sədri" : "Chairman of the Board"}
                delay={0.1}
            >
                <p className="text-flow text-[15px] font-semibold leading-relaxed text-slate-600 dark:text-slate-300 md:text-base">
                    {board.chairman}
                </p>
            </SectionCard>
        </div>
    );
}
