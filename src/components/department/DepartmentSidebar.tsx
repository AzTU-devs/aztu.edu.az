"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { motion } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
}

function buildNavItems(departmentCode: string, lang: string): NavItem[] {
  const base = `/departments/${departmentCode}`;
  if (lang === "az") {
    return [
      { label: "Haqqımızda", href: `${base}/haqqimizda` },
      { label: "Rəhbərlik", href: `${base}/rehberlik` },
      { label: "Əməkdaşlar", href: `${base}/emekdaslar` },
    ];
  }
  return [
    { label: "About", href: `${base}/haqqimizda` },
    { label: "Director", href: `${base}/rehberlik` },
    { label: "Workers", href: `${base}/emekdaslar` },
  ];
}

interface Props {
  departmentCode: string;
  lang: string;
}

export default function DepartmentSidebar({ departmentCode, lang }: Props) {
  const pathname = usePathname();
  const navItems = buildNavItems(departmentCode, lang);

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-slate-700/50 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-50 dark:border-slate-700/50 bg-gray-50/50 dark:bg-slate-800/50">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a2355]/40 dark:text-slate-500">
          {lang === "az" ? "Naviqasiya" : "Navigation"}
        </p>
      </div>
      <ul className="p-3 space-y-1.5">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-black transition-all duration-300 ${
                  active
                    ? "bg-[#1a2355] text-white shadow-lg shadow-[#1a2355]/20 scale-[1.02]"
                    : "text-[#1a2355] dark:text-slate-300 hover:bg-[#1a2355]/5 dark:hover:bg-slate-700/50 hover:translate-x-1"
                }`}
              >
                <span className="relative flex items-center gap-2">
                  {active && (
                    <motion.span 
                      layoutId="sidebar-active-dot"
                      className="w-1.5 h-1.5 bg-[#ee7c7e] rounded-full"
                    />
                  )}
                  {item.label}
                </span>
                <ChevronRightIcon
                  sx={{ fontSize: 18 }}
                  className={`transition-all duration-300 ${
                    active ? "text-[#ee7c7e] opacity-100" : "opacity-20 group-hover:opacity-100 group-hover:text-[#1a2355] dark:group-hover:text-white"
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
