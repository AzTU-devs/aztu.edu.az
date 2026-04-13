"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

interface Props {
  instituteSlug: string;
}

export default function ResearchInstituteSidebar({ instituteSlug }: Props) {
  const pathname = usePathname();
  const { lang } = useLanguage();

  const base = lang === "az"
    ? `/az/tedqiqat/tedqiqat-fealiyyeti/tedqiqat-institutlari/${instituteSlug}`
    : `/en/research/research-activity/research-institutes/${instituteSlug}`;

  const menuItems = [
    {
      label: lang === "az" ? "Haqqında" : "About",
      href: base,
      icon: <BusinessIcon sx={{ fontSize: 18 }} />,
    },
    {
      label: lang === "az" ? "Direktor" : "Director",
      href: `${base}/${lang === "az" ? "direktor" : "director"}`,
      icon: <PersonIcon sx={{ fontSize: 18 }} />,
    },
    {
      label: lang === "az" ? "Heyət" : "Staff",
      href: `${base}/${lang === "az" ? "heyet" : "staff"}`,
      icon: <GroupIcon sx={{ fontSize: 18 }} />,
    },
    {
      label: lang === "az" ? "Əlaqə" : "Contact",
      href: `${base}/${lang === "az" ? "elaqe" : "contact"}`,
      icon: <ContactPhoneIcon sx={{ fontSize: 18 }} />,
    },
  ];

  return (
    <nav className="flex flex-col gap-2">
      {menuItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
              isActive
                ? "bg-[#1a2355] text-white shadow-lg shadow-blue-900/20 translate-x-1"
                : "bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-[#1a2355]/5 dark:hover:bg-slate-700/50 hover:text-[#1a2355] dark:hover:text-white border border-transparent hover:border-gray-100 dark:hover:border-slate-700"
            }`}
          >
            <span className={`${isActive ? "text-[#ee7c7e]" : "text-gray-400 dark:text-slate-500"}`}>
              {item.icon}
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
