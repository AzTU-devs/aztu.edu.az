"use client";

import { useEffect, useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GridViewIcon from "@mui/icons-material/GridView";

import { useLanguage } from "@/context/LanguageContext";

export type OfficeSection = {
    /** Matches the `id` of the section element on the page. */
    id: string;
    label: string;
    description?: string;
    icon: React.ElementType;
};

/**
 * Section rail for an office page.
 *
 * Visually identical to `components/department/DepartmentSidebar`, but an office
 * is one page rather than a route per section, so these scroll instead of
 * navigating and the active item is driven by what is on screen.
 */
export default function OfficeSidebar({ sections }: { sections: OfficeSection[] }) {
    const { lang } = useLanguage();
    const [active, setActive] = useState<string>(sections[0]?.id ?? "");

    useEffect(() => {
        const targets = sections
            .map((s) => document.getElementById(s.id))
            .filter((el): el is HTMLElement => el !== null);
        if (targets.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // The entry nearest the top of the viewport wins, so passing a
                // heading always promotes exactly one item.
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-96px 0px -60% 0px", threshold: 0 }
        );

        targets.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [sections]);

    return (
        <nav
            aria-label={lang === "az" ? "Bölmə naviqasiyası" : "Section navigation"}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900"
        >
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 dark:border-white/10">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1a2355] text-white">
                    <GridViewIcon sx={{ fontSize: 18 }} />
                </span>
                <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#ee7c7e]">
                        {lang === "az" ? "Naviqasiya" : "Navigation"}
                    </p>
                    <p className="truncate text-sm font-black text-[#1a2355] dark:text-white">
                        {lang === "az" ? "Bölmələr" : "Sections"}
                    </p>
                </div>
            </div>

            <ul className="space-y-1.5 p-3">
                {sections.map((section) => {
                    const isActive = active === section.id;
                    const Icon = section.icon;
                    return (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                aria-current={isActive ? "true" : undefined}
                                className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors duration-200 ${
                                    isActive
                                        ? "bg-[#1a2355] text-white shadow-sm shadow-[#1a2355]/25"
                                        : "hover:bg-slate-50 dark:hover:bg-white/5"
                                }`}
                            >
                                <span
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                                        isActive
                                            ? "bg-white/10 text-[#ee7c7e]"
                                            : "bg-slate-100 text-[#1a2355] group-hover:bg-[#1a2355] group-hover:text-white dark:bg-white/10 dark:text-white"
                                    }`}
                                >
                                    <Icon sx={{ fontSize: 19 }} />
                                </span>

                                <span className="min-w-0 flex-1">
                                    <span
                                        className={`block text-sm font-black tracking-tight ${
                                            isActive ? "text-white" : "text-[#1a2355] dark:text-white"
                                        }`}
                                    >
                                        {section.label}
                                    </span>
                                    {section.description && (
                                        <span
                                            className={`mt-0.5 block truncate text-[11px] font-medium ${
                                                isActive ? "text-white/55" : "text-slate-400 dark:text-slate-500"
                                            }`}
                                        >
                                            {section.description}
                                        </span>
                                    )}
                                </span>

                                <ChevronRightIcon
                                    sx={{ fontSize: 16 }}
                                    className={`shrink-0 transition-transform duration-200 ${
                                        isActive
                                            ? "text-[#ee7c7e]"
                                            : "text-slate-300 group-hover:translate-x-0.5 group-hover:text-[#ee7c7e] dark:text-slate-600"
                                    }`}
                                />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
