"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import VerifiedIcon from "@mui/icons-material/Verified";
import PollIcon from "@mui/icons-material/Poll";
import GroupsIcon from "@mui/icons-material/Groups";
import GradingIcon from "@mui/icons-material/Grading";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function KtsSidebar() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  const basePath = `/${lang}/${lang === "az" ? "kts" : "qa"}`;

  const navItems = [
    {
      href: basePath,
      icon: <InfoOutlinedIcon sx={{ fontSize: 18 }} />,
      labelAz: "Haqqında",
      labelEn: "About",
      slug: null,
    },
    {
      href: `${basePath}/senedler`,
      icon: <FolderOpenIcon sx={{ fontSize: 18 }} />,
      labelAz: "Sənədlər",
      labelEn: "Documents",
      slug: "senedler",
    },
    {
      href: `${basePath}/akkreditasiya`,
      icon: <VerifiedIcon sx={{ fontSize: 18 }} />,
      labelAz: "Akkreditasiya",
      labelEn: "Accreditation",
      slug: "akkreditasiya",
    },
    {
      href: `${basePath}/sorgular`,
      icon: <PollIcon sx={{ fontSize: 18 }} />,
      labelAz: "Sorğular",
      labelEn: "Surveys",
      slug: "sorgular",
    },
    {
      href: `${basePath}/komite`,
      icon: <GroupsIcon sx={{ fontSize: 18 }} />,
      labelAz: "Komitə",
      labelEn: "Committee",
      slug: "komite",
    },
  ];

  function isActive(item: { href: string; slug: string | null }) {
    if (item.slug === null) {
      return (
        pathname === `/${lang}/kts` ||
        pathname === `/${lang}/qa` ||
        pathname.endsWith("/kts") ||
        pathname.endsWith("/qa")
      );
    }
    return pathname.includes(`/${item.slug}`);
  }

  return (
    <div className="sticky top-28 space-y-4">
      <div className="bg-white dark:bg-[#0d1b3e] rounded-[2rem] border-2 border-[#1a2355]/10 dark:border-[#ee7c7e]/10 overflow-hidden shadow-xl">
        <div className="px-6 py-5 border-b border-[#1a2355]/10 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#ee7c7e] rounded-xl flex items-center justify-center shrink-0">
              <GradingIcon sx={{ color: "white", fontSize: 18 }} />
            </div>
            <span className="text-[#1a2355] dark:text-white font-black text-xs uppercase tracking-widest leading-tight">
              {lang === "az" ? "Keyfiyyət Təminatı" : "Quality Assurance"}
            </span>
          </div>
        </div>
        <nav className="p-3">
          {navItems.map((item) => {
            const active = isActive(item);
            const label = lang === "az" ? item.labelAz : item.labelEn;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 mb-1 last:mb-0 ${
                  active
                    ? "bg-[#1a2355] dark:bg-[#ee7c7e]/20 text-white"
                    : "text-[#1a2355]/70 dark:text-white/60 hover:bg-[#1a2355]/5 dark:hover:bg-white/5"
                }`}
              >
                <span className={`shrink-0 ${active ? "text-[#ee7c7e]" : "opacity-60"}`}>
                  {item.icon}
                </span>
                <span className="font-bold text-sm">{label}</span>
                {active && (
                  <span className="ml-auto w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="bg-gradient-to-br from-[#1a2355] to-[#0b1330] rounded-[2rem] p-6 text-white shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse" />
          <h4 className="font-black text-xs uppercase tracking-widest text-[#ee7c7e]">
            {lang === "az" ? "Əlaqə" : "Contact"}
          </h4>
        </div>
        <div className="space-y-3 text-sm text-white/70">
          <div className="flex items-start gap-2">
            <LocationOnIcon sx={{ fontSize: 16, marginTop: "2px" }} className="text-[#ee7c7e]/70 shrink-0" />
            <span>H.Cavid pr. 25, Bakı, AZ 1073</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon sx={{ fontSize: 16 }} className="text-[#ee7c7e]/70 shrink-0" />
            <span>(+994 12) 538-33-83</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon sx={{ fontSize: 16 }} className="text-[#ee7c7e]/70 shrink-0" />
            <span>(+994 12) 539-13-05</span>
          </div>
          <div className="flex items-center gap-2">
            <EmailIcon sx={{ fontSize: 16 }} className="text-[#ee7c7e]/70 shrink-0" />
            <a href="mailto:aztu@aztu.edu.az" className="text-[#ee7c7e] hover:underline transition-colors">
              aztu@aztu.edu.az
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
