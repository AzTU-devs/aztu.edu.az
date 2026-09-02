"use client";

import GroupsIcon from "@mui/icons-material/Groups";

import StaffCard from "@/components/faculty/StaffCard";
import { SectionCard } from "@/components/department/ui";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

type HeiStaffMember = {
    name: string;
    pos: string;
    degree: string;
    email: string;
    phone: string;
};

/** The locale files use "-" / "None" / "Yoxdur" for "no academic degree". */
const hasDegree = (degree: string) =>
    Boolean(degree) && !["-", "—", "None", "Yoxdur"].includes(degree.trim());

export default function HeiStaffPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.hei;
    const staff: HeiStaffMember[] = p.staff;

    return (
        <SectionCard
            icon={GroupsIcon}
            eyebrow={lang === "az" ? "İnzibati heyət" : "Administrative team"}
            title={p.staffTitle}
            action={
                <span className="rounded-lg border border-slate-200 px-2.5 py-1 text-[10px] font-black tabular-nums uppercase tracking-[0.2em] text-slate-400 dark:border-white/10 dark:text-slate-500">
                    {String(staff.length).padStart(2, "0")}
                </span>
            }
        >
            <p className="mb-6 text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
                {p.staffDescription}
            </p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {staff.map((member, index) => (
                    <StaffCard
                        key={member.email || member.name}
                        fullName={member.name}
                        role={member.pos}
                        degree={hasDegree(member.degree) ? member.degree : undefined}
                        email={member.email}
                        index={index}
                    />
                ))}
            </div>
        </SectionCard>
    );
}
