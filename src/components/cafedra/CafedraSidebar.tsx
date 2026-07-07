"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getMajorsCafedraUrl } from "@/util/majorsLink";

interface NavSubItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  subItems?: NavSubItem[];
  external?: boolean;
}

function buildNavItems(facultyId: string, cafedraId: string, lang: string): NavItem[] {
  const academicPrefix = lang === "az" ? "akademik" : "academic";
  const facultyPrefix = lang === "az" ? "fakulteler" : "faculties";
  const kafedraSlug = lang === "az" ? "kafedralar" : "departments";
  const base = `/${lang}/${academicPrefix}/${facultyPrefix}/${facultyId}/${kafedraSlug}/${cafedraId}`;

  const introLabel = lang === "az" ? "Giriş" : "Introduction";
  const aboutLabel = lang === "az" ? "Haqqımızda" : "About Us";
  const headLabel = lang === "az" ? "Kafedra müdiri" : "Head of Department";
  const staffLabel = lang === "az" ? "Əməkdaşlar" : "Staff";
  const newsLabel = lang === "az" ? "Xəbərlər" : "News";
  const contactLabel = lang === "az" ? "Əlaqə" : "Contact";
  const specsLabel = lang === "az" ? "İxtisaslar" : "Specializations";
  const researchLabel = lang === "az" ? "Elmi fəaliyyət" : "Scientific Activity";

  // İxtisaslar opens the cafedra's specializations on the external majors portal.
  const majorsUrl = getMajorsCafedraUrl(cafedraId, facultyId, lang);

  return [
    { label: introLabel, href: `${base}/${lang === "az" ? "giris" : "introduction"}`, icon: ArticleOutlinedIcon },
    {
      label: aboutLabel,
      href: `${base}/${lang === "az" ? "haqqimizda" : "about"}`,
      icon: InfoOutlinedIcon,
      subItems: [
        { label: headLabel, href: `${base}/${lang === "az" ? "haqqimizda/kafedra-mudiri" : "about/head-of-department"}` },
        { label: staffLabel, href: `${base}/${lang === "az" ? "haqqimizda/emekdaslar" : "about/staff"}` },
        { label: newsLabel, href: `${base}/${lang === "az" ? "haqqimizda/xeberler" : "about/news"}` },
        { label: contactLabel, href: `${base}/${lang === "az" ? "haqqimizda/elaqe" : "about/contact"}` },
      ],
    },
    {
      label: specsLabel,
      href: majorsUrl ?? `${base}/${lang === "az" ? "ixtisaslar" : "specializations"}`,
      icon: SchoolOutlinedIcon,
      external: !!majorsUrl,
    },
    { label: researchLabel, href: `${base}/${lang === "az" ? "elmi-fealiyyet" : "scientific-activity"}`, icon: ScienceOutlinedIcon },
  ];
}

interface Props {
  facultyId: string;
  cafedraId: string;
}

export default function CafedraSidebar({ facultyId, cafedraId }: Props) {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const navItems = buildNavItems(facultyId, cafedraId, lang);

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
  }, [pathname, lang]);

  const toggle = (label: string) => {
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const isParentActive = (item: NavItem) =>
    !item.external && (pathname === item.href || pathname.startsWith(item.href + "/"));

  return (
    <nav className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200/80 dark:border-white/10 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100 dark:border-white/10 bg-gradient-to-r from-[#1a2355] to-[#2a3670]">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white">
          <ArticleOutlinedIcon sx={{ fontSize: 20 }} />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-white">
            {lang === "az" ? "Kafedra Portalı" : "Department Portal"}
          </p>
          <p className="text-[11px] text-white/60 font-medium">
            {lang === "az" ? "Naviqasiya" : "Navigation"}
          </p>
        </div>
      </div>

      <ul className="p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;

          // ── External link (İxtisaslar → majors portal) ──
          if (item.external) {
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-slate-700 dark:text-white/80 hover:bg-[#ee7c7e]/10 hover:text-[#ee7c7e] transition-colors"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 text-slate-500 dark:text-white/60 group-hover:bg-[#ee7c7e] group-hover:text-white transition-colors">
                    <Icon sx={{ fontSize: 18 }} />
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <NorthEastIcon sx={{ fontSize: 13 }} className="text-gray-400 group-hover:text-[#ee7c7e] transition-colors" />
                </a>
              </li>
            );
          }

          // ── Collapsible section (Haqqımızda) ──
          if (item.subItems) {
            const open = expanded.includes(item.label);
            const parentActive = isParentActive(item);
            return (
              <li key={item.label}>
                <div
                  className={`flex items-center rounded-2xl transition-colors ${
                    parentActive ? "bg-[#1a2355] text-white" : "text-slate-700 dark:text-white/80 hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  <Link href={item.href} className="flex flex-1 items-center gap-3 px-4 py-3 text-sm font-semibold">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                        parentActive ? "bg-white/15 text-white" : "bg-gray-100 dark:bg-white/5 text-slate-500 dark:text-white/60"
                      }`}
                    >
                      <Icon sx={{ fontSize: 18 }} />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                  <button
                    onClick={() => toggle(item.label)}
                    aria-label="Toggle"
                    className={`px-3 py-3 transition-transform duration-300 ${open ? "rotate-180" : ""} ${
                      parentActive ? "text-white/80" : "text-gray-400"
                    }`}
                  >
                    <ExpandMoreIcon sx={{ fontSize: 20 }} />
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="ml-6 mt-1 space-y-0.5 border-l border-gray-200 dark:border-white/10 pl-3 overflow-hidden"
                    >
                      {item.subItems.map((sub) => {
                        const active = pathname === sub.href;
                        return (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className={`block px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
                                active
                                  ? "bg-[#ee7c7e]/10 text-[#ee7c7e] font-semibold"
                                  : "text-slate-500 dark:text-white/50 hover:text-[#1a2355] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            );
          }

          // ── Simple link ──
          const active = isParentActive(item);
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                  active ? "bg-[#1a2355] text-white" : "text-slate-700 dark:text-white/80 hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                    active ? "bg-white/15 text-white" : "bg-gray-100 dark:bg-white/5 text-slate-500 dark:text-white/60 group-hover:text-[#1a2355] dark:group-hover:text-white"
                  }`}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </span>
                <span className="flex-1">{item.label}</span>
                <ChevronRightIcon
                  sx={{ fontSize: 18 }}
                  className={`transition-all ${active ? "translate-x-0.5 text-white" : "text-gray-300 group-hover:translate-x-0.5 group-hover:text-[#1a2355] dark:group-hover:text-white"}`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
