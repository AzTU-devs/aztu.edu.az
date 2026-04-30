"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GridViewIcon from "@mui/icons-material/GridView";

interface Props {
    departmentSlug: string;
}

interface MenuItem {
    label: string;
    description: string;
    href: string;
    icon: React.ElementType;
    gradient: string;
    activeText: string;
    softBg: string;
}

export default function DepartmentSidebar({ departmentSlug }: Props) {
    const pathname = usePathname();
    const { lang } = useLanguage();

    const base =
        lang === "az"
            ? `/az/idareetme/struktur-bolmeler/${departmentSlug}`
            : `/en/management/structural-units/${departmentSlug}`;

    const menuItems: MenuItem[] = [
        {
            label: lang === "az" ? "Haqqımızda" : "About",
            description: lang === "az" ? "Şöbə, məqsədlər və funksiyalar" : "Overview, goals & functions",
            href: `${base}/${lang === "az" ? "haqqimizda" : "about"}`,
            icon: BusinessIcon,
            gradient: "from-blue-600 to-indigo-700",
            activeText: "text-blue-700",
            softBg: "bg-blue-500/10 border-blue-500/30",
        },
        {
            label: lang === "az" ? "Rəhbərlik" : "Leadership",
            description: lang === "az" ? "Şöbə müdiri haqqında" : "Department head profile",
            href: `${base}/${lang === "az" ? "rehberlik" : "leadership"}`,
            icon: PersonIcon,
            gradient: "from-[#ee7c7e] to-[#f97316]",
            activeText: "text-[#ee7c7e]",
            softBg: "bg-[#ee7c7e]/10 border-[#ee7c7e]/30",
        },
        {
            label: lang === "az" ? "Əməkdaşlar" : "Staff",
            description: lang === "az" ? "Heyət və əlaqə məlumatları" : "Team & contact information",
            href: `${base}/${lang === "az" ? "emekdaslar" : "staff"}`,
            icon: GroupIcon,
            gradient: "from-emerald-500 to-teal-600",
            activeText: "text-emerald-700",
            softBg: "bg-emerald-500/10 border-emerald-500/30",
        },
    ];

    return (
        <nav
            aria-label={lang === "az" ? "Şöbə naviqasiyası" : "Department navigation"}
            className="relative bg-white dark:bg-slate-900/70 backdrop-blur-xl rounded-[1.75rem] border-2 border-[#1a2355]/10 dark:border-white/10 shadow-xl shadow-[#1a2355]/5 overflow-hidden"
        >
            {/* Decorative blur */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#ee7c7e]/10 blur-3xl rounded-full pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 flex items-center gap-3 px-5 py-4 border-b-2 border-[#1a2355]/10 dark:border-white/10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a2355] to-[#3b82f6] text-white flex items-center justify-center shadow-md shadow-blue-500/30 shrink-0">
                    <GridViewIcon sx={{ fontSize: 18 }} />
                </div>
                <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e]">
                        {lang === "az" ? "Naviqasiya" : "Navigation"}
                    </p>
                    <p className="text-sm font-black text-[#1a2355] dark:text-white truncate">
                        {lang === "az" ? "Şöbə bölmələri" : "Department sections"}
                    </p>
                </div>
            </div>

            {/* Items */}
            <ul className="relative z-10 p-3 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`group relative flex items-start gap-3 px-3 py-3 rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                                    isActive
                                        ? "bg-[#1a2355] text-white border-[#1a2355] shadow-lg shadow-[#1a2355]/25"
                                        : "bg-transparent border-transparent hover:bg-[#1a2355]/5 dark:hover:bg-white/5 hover:border-[#1a2355]/10 dark:hover:border-white/10"
                                }`}
                            >
                                {/* Active gradient accent on left */}
                                {isActive && (
                                    <motion.span
                                        layoutId="dept-sidebar-active"
                                        className={`absolute top-2 bottom-2 left-0 w-1 rounded-r-full bg-gradient-to-b ${item.gradient}`}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}

                                {/* Icon tile */}
                                <span
                                    className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                        isActive
                                            ? `bg-gradient-to-br ${item.gradient} text-white shadow-md`
                                            : `${item.softBg} ${item.activeText} border group-hover:bg-gradient-to-br group-hover:${item.gradient} group-hover:text-white group-hover:border-transparent`
                                    }`}
                                >
                                    <Icon sx={{ fontSize: 18 }} />
                                </span>

                                {/* Label + description */}
                                <span className="flex-1 min-w-0 pt-0.5">
                                    <span
                                        className={`block text-sm font-black tracking-tight ${
                                            isActive
                                                ? "text-white"
                                                : "text-[#1a2355] dark:text-white"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                    <span
                                        className={`block text-[10px] mt-0.5 leading-snug ${
                                            isActive
                                                ? "text-white/60"
                                                : "text-gray-400 dark:text-slate-500"
                                        }`}
                                    >
                                        {item.description}
                                    </span>
                                </span>

                                {/* Trailing chevron */}
                                <ChevronRightIcon
                                    sx={{ fontSize: 16 }}
                                    className={`shrink-0 mt-2 transition-transform duration-300 ${
                                        isActive
                                            ? "text-[#ee7c7e]"
                                            : "text-gray-300 dark:text-slate-600 group-hover:text-[#ee7c7e] group-hover:translate-x-0.5"
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
