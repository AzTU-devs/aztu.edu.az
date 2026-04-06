"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface NavSubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  subItems?: NavSubItem[];
}

function buildNavItems(facultyId: string): NavItem[] {
  const base = `/faculties/${facultyId}`;
  return [
    {
      label: "Haqqımızda",
      href: `${base}/haqqimizda`,
      subItems: [
        { label: "Dekan", href: `${base}/haqqimizda/dekan` },
        { label: "Dekan müavinləri", href: `${base}/haqqimizda/dekan-muavinleri` },
        { label: "Fakültə elmi şurası", href: `${base}/haqqimizda/elmi-sura` },
        { label: "Akademik heyət", href: `${base}/haqqimizda/akademik-heyat` },
        { label: "Əməkdaşlar", href: `${base}/haqqimizda/emekdaslar` },
        { label: "Əlaqə", href: `${base}/haqqimizda/elaqe` },
      ],
    },
    { label: "Kafedralar", href: `${base}/kafedralar` },
    { label: "İxtisaslar", href: `${base}/ixtisaslar` },
    { label: "Beynəlxalq əlaqələr", href: `${base}/beynelxalq-elaqeler` },
  ];
}

interface Props {
  facultyId: string;
}

export default function FacultySidebar({ facultyId }: Props) {
  const pathname = usePathname();
  const navItems = buildNavItems(facultyId);

  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    const active = navItems
      .filter(
        (item) =>
          item.subItems &&
          (pathname === item.href || pathname.startsWith(item.href + "/"))
      )
      .map((item) => item.label);
    setExpanded(active);
  }, [pathname]);

  const toggle = (label: string) => {
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const isParentActive = (item: NavItem) =>
    pathname === item.href || pathname.startsWith(item.href + "/");

  return (
    <nav className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-50 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a2355] dark:text-blue-300">
          Fakültə Menyu
        </p>
      </div>
      <ul className="p-4 space-y-2">
        {navItems.map((item) =>
          item.subItems ? (
            <li key={item.label}>
              <div>
                <button
                  onClick={() => toggle(item.label)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                    isParentActive(item)
                      ? "bg-[#1a2355] text-white shadow-lg shadow-blue-900/20"
                      : "text-[#1a2355] dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <Link
                    href={item.href}
                    className="flex-1 text-left"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.label}
                  </Link>
                  <span
                    className={`transition-transform duration-300 ${
                      expanded.includes(item.label) ? "rotate-180" : ""
                    }`}
                  >
                    <ExpandMoreIcon sx={{ fontSize: 18 }} />
                  </span>
                </button>
                {expanded.includes(item.label) && (
                  <ul className="mt-2 ml-4 space-y-1 border-l-2 border-[#1a2355]/5 dark:border-slate-700 pl-4">
                    {item.subItems.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className={`block px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                            pathname === sub.href
                              ? "bg-[#ee7c7e]/10 text-[#ee7c7e]"
                              : "text-gray-500 dark:text-slate-400 hover:text-[#1a2355] dark:hover:text-white"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ) : (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                  isParentActive(item)
                    ? "bg-[#1a2355] text-white shadow-lg shadow-blue-900/20"
                    : "text-[#1a2355] dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700"
                }`}
              >
                {item.label}
                <ChevronRightIcon
                  sx={{ fontSize: 18 }}
                  className={`transition-transform duration-300 ${isParentActive(item) ? "translate-x-1" : "opacity-20"}`}
                />
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
