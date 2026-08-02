"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLanguage } from "@/context/LanguageContext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupsIcon from "@mui/icons-material/Groups";

interface Props {
    departmentSlug: string;
}

/**
 * Sticky section switcher for a department.
 *
 * Uses the same sticky-tab pattern as the rest of the site (campus-life pages)
 * instead of a narrow left sidebar, so the content gets full width.
 */
export default function DepartmentTabs({ departmentSlug }: Props) {
    const pathname = usePathname();
    const { lang } = useLanguage();

    const base =
        lang === "az"
            ? `/az/idareetme/struktur-bolmeler/${departmentSlug}`
            : `/en/management/structural-units/${departmentSlug}`;

    const tabs = [
        {
            label: lang === "az" ? "Haqqımızda" : "About",
            href: `${base}/${lang === "az" ? "haqqimizda" : "about"}`,
            icon: InfoOutlinedIcon,
        },
        {
            label: lang === "az" ? "Rəhbərlik" : "Leadership",
            href: `${base}/${lang === "az" ? "rehberlik" : "leadership"}`,
            icon: PersonOutlineIcon,
        },
        {
            label: lang === "az" ? "Əməkdaşlar" : "Staff",
            href: `${base}/${lang === "az" ? "emekdaslar" : "staff"}`,
            icon: GroupsIcon,
        },
    ];

    return (
        <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1330]/95">
            <nav
                aria-label={lang === "az" ? "Şöbə naviqasiyası" : "Department navigation"}
                className="mx-auto w-full max-w-[1600px] px-4 md:px-10 lg:px-20"
            >
                <ul className="dropdown-scroll flex gap-1 overflow-x-auto py-3">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href;
                        const Icon = tab.icon;
                        return (
                            <li key={tab.href} className="shrink-0">
                                <Link
                                    href={tab.href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-black transition-all duration-200 ${
                                        isActive
                                            ? "bg-[#1a2355] text-white shadow-md shadow-[#1a2355]/25"
                                            : "text-slate-500 hover:bg-slate-100 hover:text-[#1a2355] dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                                    }`}
                                >
                                    <Icon
                                        sx={{ fontSize: 18 }}
                                        className={isActive ? "text-[#ee7c7e]" : ""}
                                    />
                                    {tab.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
