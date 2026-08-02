"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLanguage } from "@/context/LanguageContext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GridViewIcon from "@mui/icons-material/GridView";

interface Props {
    departmentSlug: string;
}

/**
 * Section anchors for a department, rendered as a sidebar.
 *
 * Single accent system — navy for the active state, coral for emphasis only.
 * Stacks above the content on small screens; sticky beside it from `lg` up.
 */
export default function DepartmentSidebar({ departmentSlug }: Props) {
    const pathname = usePathname();
    const { lang } = useLanguage();

    const base =
        lang === "az"
            ? `/az/idareetme/struktur-bolmeler/${departmentSlug}`
            : `/en/management/structural-units/${departmentSlug}`;

    const items = [
        {
            label: lang === "az" ? "Haqqımızda" : "About",
            description: lang === "az" ? "Məqsədlər və funksiyalar" : "Objectives & functions",
            href: `${base}/${lang === "az" ? "haqqimizda" : "about"}`,
            icon: InfoOutlinedIcon,
        },
        {
            label: lang === "az" ? "Rəhbərlik" : "Leadership",
            description: lang === "az" ? "Şöbə müdiri haqqında" : "Department head profile",
            href: `${base}/${lang === "az" ? "rehberlik" : "leadership"}`,
            icon: PersonOutlineIcon,
        },
        {
            label: lang === "az" ? "Əməkdaşlar" : "Staff",
            description: lang === "az" ? "Heyət və əlaqə" : "Team & contact details",
            href: `${base}/${lang === "az" ? "emekdaslar" : "staff"}`,
            icon: GroupsIcon,
        },
    ];

    return (
        <nav
            aria-label={lang === "az" ? "Şöbə naviqasiyası" : "Department navigation"}
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
                        {lang === "az" ? "Şöbə bölmələri" : "Department sections"}
                    </p>
                </div>
            </div>

            <ul className="space-y-1.5 p-3">
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                aria-current={isActive ? "page" : undefined}
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
                                        {item.label}
                                    </span>
                                    <span
                                        className={`mt-0.5 block truncate text-[11px] font-medium ${
                                            isActive ? "text-white/55" : "text-slate-400 dark:text-slate-500"
                                        }`}
                                    >
                                        {item.description}
                                    </span>
                                </span>

                                <ChevronRightIcon
                                    sx={{ fontSize: 16 }}
                                    className={`shrink-0 transition-transform duration-200 ${
                                        isActive
                                            ? "text-[#ee7c7e]"
                                            : "text-slate-300 group-hover:translate-x-0.5 group-hover:text-[#ee7c7e] dark:text-slate-600"
                                    }`}
                                />
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
