"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion, AnimatePresence } from "framer-motion";
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
  const academicPrefix = lang === "az" ? "akademik" : "academic";
  const facultyPrefix = lang === "az" ? "fakulteler" : "faculties";
  const base = `/${lang}/${academicPrefix}/${facultyPrefix}/${facultyId}`;
  
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
    <nav className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 border-b-2 border-gray-50 bg-gray-50/30">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#1a2355]/60 flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] animate-pulse" />
          {lang === "az" ? "Fakültə Portalı" : "Faculty Portal"}
        </p>
      </div>
      <ul className="p-6 space-y-3">
        {navItems.map((item) =>
          item.subItems ? (
            <li key={item.label}>
              <div className="space-y-2">
                <button
                  onClick={() => toggle(item.label)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[13px] font-black transition-all ${
                    isParentActive(item)
                      ? "bg-[#1a2355] text-white shadow-xl shadow-blue-900/20"
                      : "text-[#1a2355] hover:bg-gray-50 hover:text-[#ee7c7e]"
                  }`}
                >
                  <Link
                    href={item.href}
                    className="flex-1 text-left uppercase tracking-wider"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.label}
                  </Link>
                  <span
                    className={`transition-transform duration-500 ${
                      expanded.includes(item.label) ? "rotate-180" : ""
                    }`}
                  >
                    <ExpandMoreIcon sx={{ fontSize: 20 }} />
                  </span>
                </button>
                <AnimatePresence>
                  {expanded.includes(item.label) && (
                    <motion.ul 
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      className="ml-4 space-y-1.5 border-l-2 border-gray-100 pl-4 overflow-hidden"
                    >
                      {item.subItems.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className={`block px-5 py-3 rounded-xl text-xs font-bold transition-all relative group ${
                              pathname === sub.href
                                ? "bg-[#ee7c7e]/10 text-[#ee7c7e]"
                                : "text-gray-500 hover:text-[#1a2355] hover:bg-gray-50"
                            }`}
                          >
                            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#ee7c7e] transition-all duration-300 group-hover:h-1/2 ${pathname === sub.href ? 'h-1/2' : ''}`} />
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </li>
          ) : (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`flex items-center justify-between px-6 py-4 rounded-2xl text-[13px] font-black transition-all group ${
                  isParentActive(item)
                    ? "bg-[#1a2355] text-white shadow-xl shadow-blue-900/20"
                    : "text-[#1a2355] hover:bg-gray-50 hover:text-[#ee7c7e]"
                }`}
              >
                <span className="uppercase tracking-wider">{item.label}</span>
                <ChevronRightIcon
                  sx={{ fontSize: 20 }}
                  className={`transition-all duration-500 ${isParentActive(item) ? "translate-x-1" : "opacity-20 group-hover:opacity-100 group-hover:translate-x-1"}`}
                />
              </Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}
