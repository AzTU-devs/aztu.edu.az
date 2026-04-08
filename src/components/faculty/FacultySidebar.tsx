"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLanguage } from "@/context/LanguageContext";

interface NavSubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  subItems?: NavSubItem[];
}

function buildNavItems(facultyId: string, lang: string): NavItem[] {
  const base = `/${lang}/faculties/${facultyId}`;
  
  // Folders are haqqimizda, kafedralar, ixtisaslar, beynelxalq-elaqeler
  // For EN we use about, departments, specializations, international-relations
  const aboutSlug = lang === "az" ? "haqqimizda" : "about";
  const kafedraSlug = lang === "az" ? "kafedralar" : "departments";
  const ixtisasSlug = lang === "az" ? "ixtisaslar" : "specializations";
  const internationalSlug = lang === "az" ? "beynelxalq-elaqeler" : "international-relations";

  // Sub-sub slugs for About section
  const deanSlug = lang === "az" ? "dekan" : "dean";
  const deputySlug = lang === "az" ? "dekan-muavinleri" : "deputy-deans";
  const councilSlug = lang === "az" ? "elmi-sura" : "scientific-council";
  const academicSlug = lang === "az" ? "akademik-heyat" : "academic-staff";
  const staffSlug = lang === "az" ? "emekdaslar" : "staff";
  const contactSlug = lang === "az" ? "elaqe" : "contact";

  return [
    {
      label: lang === "az" ? "Haqqımızda" : "About Us",
      href: `${base}/${aboutSlug}`,
      subItems: [
        { label: lang === "az" ? "Dekan" : "Dean", href: `${base}/${aboutSlug}/${deanSlug}` },
        { label: lang === "az" ? "Dekan müavinləri" : "Deputy Deans", href: `${base}/${aboutSlug}/${deputySlug}` },
        { label: lang === "az" ? "Fakültə elmi şurası" : "Faculty Scientific Council", href: `${base}/${aboutSlug}/${councilSlug}` },
        { label: lang === "az" ? "Akademik heyət" : "Academic Staff", href: `${base}/${aboutSlug}/${academicSlug}` },
        { label: lang === "az" ? "Əməkdaşlar" : "Staff", href: `${base}/${aboutSlug}/${staffSlug}` },
        { label: lang === "az" ? "Əlaqə" : "Contact", href: `${base}/${aboutSlug}/${contactSlug}` },
      ],
    },
    { label: lang === "az" ? "Kafedralar" : "Departments", href: `${base}/${kafedraSlug}` },
    { label: lang === "az" ? "İxtisaslar" : "Specializations", href: `${base}/${ixtisasSlug}` },
    { label: lang === "az" ? "Beynəlxalq əlaqələr" : "International Relations", href: `${base}/${internationalSlug}` },
  ];
}

interface Props {
  facultyId: string;
}

export default function FacultySidebar({ facultyId }: Props) {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const navItems = buildNavItems(facultyId, lang);

  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    // Always keep "Haqqımızda" (or "About Us") expanded
    const aboutLabel = lang === "az" ? "Haqqımızda" : "About Us";
    
    const active = navItems
      .filter(
        (item) =>
          item.subItems &&
          (pathname === item.href || pathname.startsWith(item.href + "/") || item.label === aboutLabel)
      )
      .map((item) => item.label);
    
    setExpanded(active);
  }, [pathname, lang]);

  const toggle = (label: string) => {
    // Prevent collapsing if it's the "Haqqımızda" section and we want it always open, 
    // or just let it toggle but it will be reset by useEffect if we want it strictly always open.
    // For now, let's allow toggling but the useEffect ensures it's open on load.
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const isParentActive = (item: NavItem) => {
    // Remove lang prefix for comparison if necessary, but pathname already includes it
    return pathname === item.href || pathname.startsWith(item.href + "/");
  };

  return (
    <nav className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-50 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a2355] dark:text-blue-300">
          {lang === "az" ? "Fakültə Menyu" : "Faculty Menu"}
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
