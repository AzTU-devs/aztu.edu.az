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
import GradingIcon from "@mui/icons-material/Grading";
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
  const [shareCopied, setShareCopied] = useState(false);
  const t = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { lang } = useLanguage();

  const handleShare = async () => {
    const url = window.location.href;
    const title = document.title;
    if (typeof navigator !== "undefined" && (navigator as Navigator & { share?: (data: ShareData) => Promise<void> }).share) {
      try {
        await (navigator as Navigator & { share: (data: ShareData) => Promise<void> }).share({ title, url });
        return;
      } catch {
        // user cancelled or share failed — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      // ignore
    }
  };

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
          ? "bg-white/95 dark:bg-[#101733]/95 backdrop-blur-xl border-b border-[#1a2355]/[0.09] dark:border-white/10"
          : "bg-gradient-to-b from-[#0a0c1a]/80 via-[#0a0c1a]/40 to-transparent"
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
            <Link
              href={`/${lang}/${lang === "az" ? "kts" : "qa"}`}
              className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                isOpen
                  ? "bg-[#1a2355]/[0.06] dark:bg-white/10 text-[#10163a] dark:text-white hover:bg-[#1a2355]/10"
                  : "text-white/85 hover:text-white hover:bg-white/12"
              }`}
            >
              <GradingIcon sx={{ fontSize: 20 }} />
              {t.common.kts}
            </Link>
            {[
              { icon: <PersonIcon sx={{ fontSize: 20 }} />, label: t.common.lms, href: "https://sso.aztu.edu.az" },
              { icon: <SchoolIcon sx={{ fontSize: 20 }} />, label: t.common.alumni, href: "https://alumni.aztu.edu.az" },
              { icon: <ConnectedTvIcon sx={{ fontSize: 20 }} />, label: t.common.libraryAztu, href: "https://library.aztu.edu.az/" },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-[13px] font-medium transition-all duration-300 cursor-pointer ${
                  isOpen
                    ? "bg-[#1a2355]/[0.06] dark:bg-white/10 text-[#10163a] dark:text-white hover:bg-[#1a2355]/10"
                    : "text-white/85 hover:text-white hover:bg-white/12"
                }`}
              >
                {icon}
                {label}
              </a>
            ))}

            <LanguageSwitcher variant={isOpen ? "header-open" : "header-closed"} />

            <div className="relative">
              <button
                onClick={handleShare}
                aria-label="Share this page"
                title="Share this page"
                className={`rounded-md w-9 h-9 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isOpen
                    ? "bg-[#1a2355]/[0.06] dark:bg-white/10 hover:bg-[#1a2355]/12"
                    : "bg-white/10 hover:bg-white/20"
                }`}
              >
                <ShareIcon sx={{ fontSize: 19 }} className={isOpen ? "text-[#10163a] dark:text-white" : "text-white"} />
              </button>
              {shareCopied && (
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1a2355] dark:bg-[#ee7c7e] text-white text-xs font-semibold px-2.5 py-1 shadow-lg z-50">
                  Link copied
                </span>
              )}
            </div>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className={`rounded-md w-9 h-9 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isOpen
                  ? "bg-[#1a2355]/[0.06] dark:bg-white/10 hover:bg-[#1a2355]/12"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {theme === "dark" ? (
                <LightModeIcon sx={{ fontSize: 19 }} className={isOpen ? "text-[#10163a] dark:text-white" : "text-white"} />
              ) : (
                <DarkModeIcon sx={{ fontSize: 19 }} className={isOpen ? "text-[#10163a] dark:text-white" : "text-white"} />
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
                        onClick={() => setActiveHeader(null)}
                        className={`relative text-[13px] xl:text-[14px] font-medium px-3 py-2 rounded-md transition-all duration-200 block ${
                          isOpen
                            ? "text-[#1a2355] dark:text-white/70 hover:text-[#ee7c7e] dark:hover:text-white"
                            : "text-white/90 hover:text-white hover:bg-white/10"
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
                    className={`relative text-[13px] xl:text-[14px] font-medium px-3 py-2 rounded-md transition-all duration-200 cursor-pointer select-none ${
                      isOpen
                        ? isActive
                          ? "text-[#ee7c7e] dark:text-white"
                          : "text-[#1a2355] dark:text-white/70 hover:text-[#ee7c7e] dark:hover:text-white"
                        : "text-white/90 hover:text-white hover:bg-white/10"
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
              className={`w-9 h-9 flex items-center justify-center rounded-md ml-2 transition-all duration-300 cursor-pointer ${
                isOpen
                  ? "bg-[#1a2355]/[0.06] dark:bg-white/10"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              <SearchIcon sx={{ fontSize: 20 }} className={isOpen ? "text-[#10163a] dark:text-white" : "text-white"} />
            </button>

            <button
              onClick={onOpenQuickMenu}
              className="flex items-center gap-2 px-4 h-10 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer ml-1"
            >
              <ListIcon sx={{ color: "white", fontSize: 24 }} />
              <span className="text-white font-medium text-[13px]">{t.common.quickMenu.button}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Dropdown panel */}
      <AnimatePresence>
        {activeHeader && (
          <Dropdown header={activeHeader} onClose={() => setActiveHeader(null)} />
        )}
      </AnimatePresence>
    </header>
  );
}
