"use client";

import Image from "next/image";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { AnimatePresence } from "framer-motion";
import ListIcon from "@mui/icons-material/List";
import ShareIcon from "@mui/icons-material/Share";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import AzTULogoDark from "@/../public/logo/aztu-logo-dark.png";
import AzTULogoLight from "@/../public/logo/aztu-logo-light.png";
import { NAV_SECTIONS, NavSection } from "@/config/navigation";

type HeaderProps = {
  onOpenQuickMenu: () => void;
};

export default function Header({ onOpenQuickMenu }: HeaderProps) {
  const [activeSection, setActiveSection] = useState<NavSection | null>(null);

  const isOpen = Boolean(activeSection);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isOpen
          ? "bg-white border-b border-gray-200"
          : "bg-gradient-to-b from-[#0b1e3a]/90 via-[#0b1e3a]/60 to-transparent"
      }`}
      onMouseLeave={() => setActiveSection(null)}
    >
      <nav className="flex items-center justify-between w-full px-[80px] xl:px-[120px] py-[18px]">
        {/* Logo */}
        <div className="flex-shrink-0">
          {isOpen ? (
            <Image src={AzTULogoDark} alt="AzTU" width={65} priority />
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
                    ? "bg-[#1a2355] text-white hover:bg-[#1a2355]/80"
                    : "bg-white/10 text-white hover:bg-white/25"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}

            <button
              className={`rounded-lg w-10 h-10 flex items-center justify-center font-bold text-sm transition-all duration-300 cursor-pointer ${
                isOpen
                  ? "bg-[#1a2355] text-white"
                  : "bg-white/10 text-white hover:bg-white/25"
              }`}
            >
              EN
            </button>

            <button
              className={`rounded-lg w-10 h-10 flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isOpen ? "bg-[#1a2355]" : "bg-white/10 hover:bg-white/25"
              }`}
            >
              <ShareIcon sx={{ color: "white", fontSize: 22 }} />
            </button>
          </div>

          {/* Nav row */}
          <div className="flex items-center gap-1">
            <ul className="flex items-center">
              {NAV_SECTIONS.map((section) => {
                const isActive = activeSection?.key === section.key;
                return (
                  <li
                    key={section.key}
                    onMouseEnter={() => setActiveSection(section)}
                    className={`relative text-[13px] xl:text-[14px] font-bold px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer select-none ${
                      isOpen
                        ? isActive
                          ? "text-[#1a2355]"
                          : "text-[#1a2355]/70 hover:text-[#1a2355]"
                        : "text-white hover:bg-white/15"
                    }`}
                  >
                    {section.label}
                    {/* Active underline */}
                    {isActive && isOpen && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#1a2355] rounded-full" />
                    )}
                  </li>
                );
              })}
            </ul>

            <button
              className={`w-10 h-10 flex items-center justify-center rounded-lg ml-2 transition-all duration-300 cursor-pointer ${
                isOpen ? "bg-[#1a2355]" : "bg-white/10 hover:bg-white/25"
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
