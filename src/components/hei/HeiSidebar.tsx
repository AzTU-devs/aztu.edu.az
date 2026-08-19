"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLanguage } from "@/context/LanguageContext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GridViewIcon from "@mui/icons-material/GridView";

import { heiSectionPath, type HeiSectionSlug } from "./heiNav";

/**
 * Section anchors for the Higher Education Institute, rendered as a sidebar.
 *
 * Same chrome and interaction as `components/department/DepartmentSidebar` —
 * navy for the active state, coral for emphasis, stacked on small screens and
 * sticky beside the content from `lg` up.
 */
export default function HeiSidebar() {
    const pathname = usePathname();
    const { lang } = useLanguage();

    const items: {
        slug: HeiSectionSlug;
        label: string;
        description: string;
        icon: React.ElementType;
    }[] = [
        {
            slug: "haqqimizda",
            label: lang === "az" ? "Haqqımızda" : "About",
            description: lang === "az" ? "Missiya və istiqamətlər" : "Mission & directions",
            icon: InfoOutlinedIcon,
        },
        {
            slug: "doktorantura",
            label: lang === "az" ? "Doktorantura" : "Doctoral Studies",
            description: lang === "az" ? "Müddət, forma və qəbul" : "Duration, formats & admission",
            icon: SchoolOutlinedIcon,
        },
        {
            slug: "rehberlik",
            label: lang === "az" ? "Rəhbərlik" : "Leadership",
            description: lang === "az" ? "Direktor haqqında" : "Director profile",
            icon: PersonOutlineIcon,
        },
        {
            slug: "emekdaslar",
            label: lang === "az" ? "Əməkdaşlar" : "Staff",
            description: lang === "az" ? "Heyət və əlaqə" : "Team & contact details",
            icon: GroupsIcon,
        },
        {
            slug: "idare-heyeti",
            label: lang === "az" ? "İdarə Heyəti" : "Management Board",
            description: lang === "az" ? "Səlahiyyət və tərkib" : "Powers & composition",
            icon: AccountBalanceOutlinedIcon,
        },
        {
            slug: "elaqe",
            label: lang === "az" ? "Əlaqə" : "Contact",
            description: lang === "az" ? "Ünvan və iş saatları" : "Address & office hours",
            icon: CallOutlinedIcon,
        },
    ];

    return (
        <nav
            aria-label={lang === "az" ? "İnstitut naviqasiyası" : "Institute navigation"}
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
                        {lang === "az" ? "İnstitut bölmələri" : "Institute sections"}
                    </p>
                </div>
            </div>

            <ul className="space-y-1.5 p-3">
                {items.map((item) => {
                    const href = heiSectionPath(lang, item.slug);
                    const isActive = pathname === href;
                    const Icon = item.icon;
                    return (
                        <li key={item.slug}>
                            <Link
                                href={href}
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
