"use client";

import Image from "next/image";
import Link from "next/link";
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
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { getHeaderMenu, type MenuHeader } from "@/services/menu/menuService";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";

type HeaderProps = {
  onOpenQuickMenu: () => void;
  onOpenSearch: () => void;
};

export default function Header({ onOpenQuickMenu, onOpenSearch }: HeaderProps) {
  const [activeHeader, setActiveHeader] = useState<MenuHeader | null>(null);
  const [menuHeaders, setMenuHeaders] = useState<MenuHeader[]>([]);
  const t = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLanguage();

  useEffect(() => {
    getHeaderMenu(lang).then((data) => {
      if (data && data.length > 0) {
        setMenuHeaders(data);
      }
    });
  }, [lang]);

  const isOpen = Boolean(activeHeader);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isOpen
          ? "bg-white dark:bg-[#0b1330] border-b border-[#1a2355]/20 dark:border-[#ee7c7e]/25 shadow-lg"
          : "bg-gradient-to-b from-[#0b1e3a]/90 via-[#0b1e3a]/60 to-transparent"
      }`}
      onMouseLeave={() => setActiveHeader(null)}
    >
      <nav className="flex items-center justify-between w-full px-[80px] xl:px-[120px] py-[18px]">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
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
          </Link>
        </div>

        {/* Right side: utility row + nav row */}
        <div className="flex flex-col items-end gap-3">
          {/* Utility row */}
          <div className="flex items-center gap-3">
            {[
              { icon: <PersonIcon sx={{ fontSize: 20 }} />, label: t.common.lms, href: "https://lms.aztu.edu.az" },
              { icon: <SchoolIcon sx={{ fontSize: 20 }} />, label: t.common.alumni, href: "https://alumni.aztu.edu.az" },
              { icon: <ConnectedTvIcon sx={{ fontSize: 20 }} />, label: t.common.aztuTv, href: "https://www.youtube.com/channel/UCu_PoZ-9DKNYs3hxuK9pW1Q" },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isOpen
                    ? "bg-[#1a2355] dark:bg-[#1e3a5f] text-white hover:bg-[#1a2355]/80"
                    : "bg-white/10 text-white hover:bg-white/25"
                }`}
              >
                {icon}
                {label}
              </a>
            ))}

            <LanguageSwitcher variant={isOpen ? "header-open" : "header-closed"} />

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
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
              {menuHeaders.map((header) => {
                const isActive = activeHeader?.id === header.id;
                
                if (header.direct_url) {
                  return (
                    <li key={header.id} onMouseEnter={() => setActiveHeader(null)}>
                      <Link
                        href={header.direct_url}
                        className={`relative text-[13px] xl:text-[14px] font-bold px-3 py-2 rounded-lg transition-all duration-200 block ${
                          isOpen
                            ? "text-[#1a2355] dark:text-white/70 hover:text-[#ee7c7e] dark:hover:text-white"
                            : "text-white hover:bg-white/15"
                        }`}
                      >
                        {header.title}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li
                    key={header.id}
                    onMouseEnter={() => setActiveHeader(header)}
                    className={`relative text-[13px] xl:text-[14px] font-bold px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer select-none ${
                      isOpen
                        ? isActive
                          ? "text-[#ee7c7e] dark:text-white"
                          : "text-[#1a2355] dark:text-white/70 hover:text-[#ee7c7e] dark:hover:text-white"
                        : "text-white hover:bg-white/15"
                    }`}
                  >
                    {header.title}
                    {/* Active underline */}
                    {isActive && isOpen && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#ee7c7e] dark:bg-white rounded-full" />
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
              <span className="text-white font-bold text-sm">{t.common.quickMenu.button}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Dropdown panel */}
      <AnimatePresence>
        {activeHeader && (
          <Dropdown header={activeHeader} />
        )}
      </AnimatePresence>
    </header>
  );
}
