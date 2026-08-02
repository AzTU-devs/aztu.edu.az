"use client";

import { use, useEffect, useState } from "react";

import SanitizedHtml from "@/components/shared/SanitizedHtml";
import Loading from "@/components/loading/Loading";
import { SectionCard, NumberedList } from "@/components/department/ui";
import { getDepartmentBySlug } from "@/services/departmentService/departmentService";
import type { SectionItem, DepartmentDetail } from "@/types/department";
import { useLanguage } from "@/context/LanguageContext";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

interface Props {
    params: Promise<{ department_code: string }>;
}

function renderItem(item: SectionItem | string): React.ReactNode {
    if (typeof item === "string") return item;
    if (item.html_content) return <SanitizedHtml html={item.html_content} className="prose-sm" />;
    return item.title || item.description;
}

export default function DepartmentAboutPage({ params }: Props) {
    const { department_code: departmentSlug } = use(params);
    const { lang: currentLang } = useLanguage();
    const [department, setDepartment] = useState<DepartmentDetail | null | undefined>(undefined);

    useEffect(() => {
        getDepartmentBySlug(departmentSlug, currentLang).then(setDepartment);
    }, [departmentSlug, currentLang]);

    if (department === undefined) return <Loading />;
    if (department === null) return null;

    const t = {
        aboutEyebrow: currentLang === "az" ? "Ümumi məlumat" : "Overview",
        about: currentLang === "az" ? "Şöbə haqqında" : "About the unit",
        objectivesEyebrow: currentLang === "az" ? "Nəyə çalışırıq" : "What we aim for",
        objectives: currentLang === "az" ? "Məqsədlər" : "Objectives",
        functionsEyebrow: currentLang === "az" ? "Nə edirik" : "What we do",
        functions: currentLang === "az" ? "Əsas funksiyalar" : "Core functions",
    };

    const objectives = department.objectives ?? [];
    const functions = department.core_functions ?? [];

    const counter = (n: number) => (
        <span className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-black tabular-nums uppercase tracking-[0.2em] text-slate-400 dark:border-white/10 dark:text-slate-500">
            {String(n).padStart(2, "0")}
        </span>
    );

    return (
        <div className="space-y-6">
            {department.about_html && (
                <SectionCard icon={InfoOutlinedIcon} eyebrow={t.aboutEyebrow} title={t.about}>
                    <SanitizedHtml
                        html={department.about_html}
                        className="text-flow prose prose-slate max-w-none text-[15px] leading-relaxed text-slate-600 dark:prose-invert dark:text-slate-300 md:text-base"
                    />
                </SectionCard>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {objectives.length > 0 && (
                    <SectionCard
                        icon={FlagOutlinedIcon}
                        eyebrow={t.objectivesEyebrow}
                        title={t.objectives}
                        action={counter(objectives.length)}
                    >
                        <NumberedList items={objectives.map((o: SectionItem) => renderItem(o))} />
                    </SectionCard>
                )}

                {functions.length > 0 && (
                    <SectionCard
                        icon={SettingsOutlinedIcon}
                        eyebrow={t.functionsEyebrow}
                        title={t.functions}
                        action={counter(functions.length)}
                        delay={0.06}
                    >
                        <NumberedList items={functions.map((f: SectionItem) => renderItem(f))} />
                    </SectionCard>
                )}
            </div>
        </div>
    );
}
