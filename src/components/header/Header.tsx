"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import { AnimatePresence } from "framer-motion";
import ListIcon from "@mui/icons-material/List";
import ShareIcon from "@mui/icons-material/Share";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AzTULogoDark from "@/../public/logo/aztu-logo-dark.png";
import AzTULogoLight from "@/../public/logo/aztu-logo-light.png";
import { NAV_SECTIONS, NavSection } from "@/config/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { getHeaderMenu } from "@/services/menu/menuService";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";

type HeaderProps = {
  onOpenQuickMenu: () => void;
  onOpenSearch: () => void;
};

export default function Header({ onOpenQuickMenu, onOpenSearch }: HeaderProps) {
  const [activeSection, setActiveSection] = useState<NavSection | null>(null);
  const [navSections, setNavSections] = useState<NavSection[]>(NAV_SECTIONS);
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLanguage();

  useEffect(() => {
    getHeaderMenu(lang).then((data) => {
      if (!data?.sections?.length) return;
      const mapped: NavSection[] = data.sections.map((apiSec) => {
        const fallback = NAV_SECTIONS.find((s) => s.key === apiSec.key);
        return {
          key: apiSec.key,
          label: apiSec.label,
          basePath: apiSec.base_path,
          image: apiSec.image_url ?? fallback?.image ?? NAV_SECTIONS[0].image,
          items: apiSec.items.map((item) => ({
            title: item.title,
            slug: item.slug ?? undefined,
            subItems: item.sub_items
              ?.filter((s) => s.slug)
              .map((s) => ({ title: s.title, slug: s.slug! })),
          })),
        };
      });
      setNavSections(mapped);
    });
  }, [lang]);

  const isOpen = Boolean(activeSection);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isOpen
          ? "bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-700"
          : "bg-gradient-to-b from-[#0b1e3a]/90 via-[#0b1e3a]/60 to-transparent"
      }`}
      onMouseLeave={() => setActiveSection(null)}
    >
      <nav className="flex items-center justify-between w-full px-[80px] xl:px-[120px] py-[18px]">
        {/* Logo */}
        <div className="flex-shrink-0">
          {isOpen ? (
            <Image
              src={theme === "dark" ? AzTULogoLight : AzTULogoDark}
              alt="AzTU"
              width={65}
              priority
            />
          ) : (
            <Image src={AzTULogoLight} alt="AzTU" width={65} priority />
          )}
        </div>

        {/* Right side: utility row + nav row */}
        <div className="flex flex-col items-end gap-3">
          {/* Utility row */}
          <div className="flex items-center gap-3">
            {[
              { icon: <PersonIcon sx={{ fontSize: 20 }} />, label: "LMS" },
              { icon: <SchoolIcon sx={{ fontSize: 20 }} />, label: "Alumni" },
              { icon: <ConnectedTvIcon sx={{ fontSize: 20 }} />, label: "AzTU TV" },
            ].map(({ icon, label }) => (
              <button
                key={label}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isOpen
                    ? "bg-[#1a2355] dark:bg-[#1e3a5f] text-white hover:bg-[#1a2355]/80"
                    : "bg-white/10 text-white hover:bg-white/25"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}

            <LanguageSwitcher variant={isOpen ? "header-open" : "header-closed"} />

            <button
              className={`rounded-lg w-10 h-10 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isOpen
                  ? "bg-[#1a2355] dark:bg-[#1e3a5f]"
                  : "bg-white/10 hover:bg-white/25"
              }`}
            >
              <ShareIcon sx={{ color: "white", fontSize: 22 }} />
            </button>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className={`rounded-lg w-10 h-10 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isOpen
                  ? "bg-[#1a2355] dark:bg-[#1e3a5f] hover:bg-[#1a2355]/80"
                  : "bg-white/10 hover:bg-white/25"
              }`}
            >
              {theme === "dark" ? (
                <LightModeIcon sx={{ color: "white", fontSize: 20 }} />
              ) : (
                <DarkModeIcon sx={{ color: "white", fontSize: 20 }} />
              )}
            </button>
          </div>

          {/* Nav row */}
          <div className="flex items-center gap-1">
            <ul className="flex items-center">
              {navSections.map((section) => {
                const isActive = activeSection?.key === section.key;
                return (
                  <li
                    key={section.key}
                    onMouseEnter={() => setActiveSection(section)}
                    className={`relative text-[13px] xl:text-[14px] font-bold px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer select-none ${
                      isOpen
                        ? isActive
                          ? "text-[#1a2355] dark:text-white"
                          : "text-[#1a2355]/70 dark:text-white/70 hover:text-[#1a2355] dark:hover:text-white"
                        : "text-white hover:bg-white/15"
                    }`}
                  >
                    {section.label}
                    {/* Active underline */}
                    {isActive && isOpen && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#1a2355] dark:bg-white rounded-full" />
                    )}
                  </li>
                );
              })}
            </ul>

            <button
              onClick={onOpenSearch}
              className={`w-10 h-10 flex items-center justify-center rounded-lg ml-2 transition-all duration-300 cursor-pointer ${
                isOpen
                  ? "bg-[#1a2355] dark:bg-[#1e3a5f]"
                  : "bg-white/10 hover:bg-white/25"
              }`}
            >
              <SearchIcon sx={{ color: "white", fontSize: 24 }} />
            </button>

            <button
              onClick={onOpenQuickMenu}
              className="flex items-center gap-2 px-4 h-10 rounded-lg bg-white/10 hover:bg-white/25 transition-all duration-300 cursor-pointer ml-1"
            >
              <ListIcon sx={{ color: "white", fontSize: 24 }} />
              <span className="text-white font-bold text-sm">Quick Menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Dropdown panel */}
      <AnimatePresence>
        {activeSection && (
          <Dropdown section={activeSection} />
        )}
      </AnimatePresence>
    </header>
  );
}
