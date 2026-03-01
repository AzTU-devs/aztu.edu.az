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

function buildNavItems(facultyId: string, cafedraId: string): NavItem[] {
  const base = `/faculties/${facultyId}/kafedralar/${cafedraId}`;
  return [
    { label: "Giriş", href: `${base}/giris` },
    {
      label: "Haqqımızda",
      href: `${base}/haqqimizda`,
      subItems: [
        { label: "Kafedra müdiri", href: `${base}/haqqimizda/kafedra-mudiri` },
        { label: "Əməkdaşlar", href: `${base}/haqqimizda/emekdaslar` },
        { label: "Xəbərlər", href: `${base}/haqqimizda/xeberler` },
        { label: "Əlaqə", href: `${base}/haqqimizda/elaqe` },
      ],
    },
    { label: "İxtisaslar", href: `${base}/ixtisaslar` },
    { label: "Elmi fəaliyyət", href: `${base}/elmi-fealiyyet` },
  ];
}

interface Props {
  facultyId: string;
  cafedraId: string;
}

export default function CafedraSidebar({ facultyId, cafedraId }: Props) {
  const pathname = usePathname();
  const navItems = buildNavItems(facultyId, cafedraId);

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
    <nav className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-slate-500">
          Kafedra
        </p>
      </div>
      <ul className="p-3 space-y-1">
        {navItems.map((item) =>
          item.subItems ? (
            <li key={item.label}>
              <div>
                <button
                  onClick={() => toggle(item.label)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isParentActive(item)
                      ? "bg-[#1a2355] text-white"
                      : "text-[#1a2355] dark:text-slate-200 hover:bg-[#1a2355]/5 dark:hover:bg-slate-700"
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
                    className={`transition-transform duration-200 ${
                      expanded.includes(item.label) ? "rotate-180" : ""
                    }`}
                  >
                    <ExpandMoreIcon sx={{ fontSize: 16 }} />
                  </span>
                </button>
                {expanded.includes(item.label) && (
                  <ul className="mt-1 ml-2 space-y-0.5 border-l-2 border-[#1a2355]/10 dark:border-slate-600 pl-3">
                    {item.subItems.map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                            pathname === sub.href
                              ? "bg-[#ee7c7e]/10 text-[#ee7c7e] font-semibold"
                              : "text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-[#1a2355] dark:hover:text-white"
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
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isParentActive(item)
                    ? "bg-[#1a2355] text-white"
                    : "text-[#1a2355] dark:text-slate-200 hover:bg-[#1a2355]/5 dark:hover:bg-slate-700"
                }`}
              >
                {item.label}
                <ChevronRightIcon
                  sx={{ fontSize: 16 }}
                  className={isParentActive(item) ? "opacity-70" : "opacity-30"}
                />
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
