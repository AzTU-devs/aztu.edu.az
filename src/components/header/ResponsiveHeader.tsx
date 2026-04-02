"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import ShareIcon from "@mui/icons-material/Share";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AzTULogoLight from "@/../public/logo/aztu-logo-light.png";
import AzTULogoDark from "@/../public/logo/aztu-logo-dark.png";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { getHeaderMenu, type MenuHeader } from "@/services/menu/menuService";
import LanguageSwitcher from "@/components/shared/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";

export default function ResponsiveHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedHeaderId, setExpandedHeaderId] = useState<number | null>(null);
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

    const toggleHeader = (id: number) => {
        setExpandedHeaderId((prev) => (prev === id ? null : id));
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[#0b1e3a]/90 via-[#0b1e3a]/60 to-transparent">
                <nav className="flex items-center justify-between w-full px-4 sm:px-6 md:px-10 py-3 sm:py-4">
                    {/* Burger Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/30 transition-all text-white"
                        aria-label="Open menu"
                    >
                        <MenuIcon sx={{ fontSize: 26 }} />
                    </button>

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src={AzTULogoLight}
                                alt="AzTU"
                                className="w-14 sm:w-16 md:w-[70px] h-auto"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Right buttons: theme toggle + search */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle dark mode"
                            className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/30 transition-all text-white"
                        >
                            {theme === "dark" ? (
                                <LightModeIcon sx={{ fontSize: 22 }} />
                            ) : (
                                <DarkModeIcon sx={{ fontSize: 22 }} />
                            )}
                        </button>
                        <button className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/30 transition-all text-white">
                            <SearchIcon sx={{ fontSize: 26 }} />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[60] bg-black/50"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        key="drawer"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed top-0 left-0 h-full w-[320px] max-w-[90vw] z-[70] bg-white dark:bg-[#0f172a] shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Drawer header */}
                        <div className="flex items-center justify-between px-5 py-4 bg-[#0b1e3a]">
                            <Image src={theme === "dark" ? AzTULogoLight : AzTULogoDark} alt="AzTU" width={52} priority />
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/25 transition-all text-white"
                                aria-label="Close menu"
                            >
                                <CloseIcon sx={{ fontSize: 22 }} />
                            </button>
                        </div>

                        {/* Utility buttons */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#1a2355]">
                            {[
                                { icon: <PersonIcon sx={{ fontSize: 18 }} />, label: t.common.lms },
                                { icon: <SchoolIcon sx={{ fontSize: 18 }} />, label: t.common.alumni },
                                { icon: <ConnectedTvIcon sx={{ fontSize: 18 }} />, label: t.common.aztuTv },
                            ].map(({ icon, label }) => (
                                <button
                                    key={label}
                                    className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white bg-white/10 hover:bg-white/25 transition-all"
                                >
                                    {icon}
                                    {label}
                                </button>
                            ))}
                            <LanguageSwitcher variant="drawer" />
                            <button className="rounded-lg w-8 h-8 flex items-center justify-center text-white bg-white/10 hover:bg-white/25 transition-all">
                                <ShareIcon sx={{ fontSize: 18 }} />
                            </button>
                        </div>

                        {/* Nav sections */}
                        <nav className="flex-1 overflow-y-auto">
                            {menuHeaders.map((header) => {
                                const isExpanded = expandedHeaderId === header.id;
                                
                                if (header.direct_url) {
                                  return (
                                    <div key={header.id} className="border-b border-gray-100 dark:border-gray-700">
                                      <Link
                                        href={header.direct_url}
                                        onClick={() => setIsOpen(false)}
                                        className="w-full block px-5 py-4 text-[13.5px] font-black text-[#1a2355] dark:text-white hover:bg-[#f0f4ff] dark:hover:bg-[#1e293b] transition-colors uppercase tracking-widest"
                                      >
                                        {header.title}
                                      </Link>
                                    </div>
                                  );
                                }

                                return (
                                    <div key={header.id} className="border-b border-gray-100 dark:border-gray-700">
                                        {/* Section header */}
                                        <button
                                            onClick={() => toggleHeader(header.id)}
                                            className="w-full flex items-center justify-between px-5 py-4 text-left text-[13.5px] font-black text-[#1a2355] dark:text-white hover:bg-[#f0f4ff] dark:hover:bg-[#1e293b] transition-colors uppercase tracking-widest"
                                        >
                                            {header.title}
                                            <motion.span
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex-shrink-0"
                                            >
                                                <ExpandMoreIcon sx={{ fontSize: 20, color: "inherit" }} />
                                            </motion.span>
                                        </button>

                                        {/* Section items */}
                                        <AnimatePresence initial={false}>
                                            {isExpanded && (
                                                <motion.div
                                                    key="items"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.22, ease: "easeInOut" }}
                                                    className="overflow-hidden bg-gray-50 dark:bg-[#162032]"
                                                >
                                                    {header.items.map((item) => (
                                                        <div key={item.id} className="border-b border-gray-100/50 dark:border-gray-700/30">
                                                            {/* Level 2 title */}
                                                            {item.direct_url ? (
                                                              <Link
                                                                href={item.direct_url}
                                                                onClick={() => setIsOpen(false)}
                                                                className="block px-7 py-3 text-[13px] font-bold text-[#1a2355] dark:text-white hover:text-[#ee7c7e] transition-colors"
                                                              >
                                                                {item.title}
                                                              </Link>
                                                            ) : (
                                                              <span className="block px-7 pt-4 pb-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a2355]/40 dark:text-white/40">
                                                                {item.title}
                                                              </span>
                                                            )}
                                                            
                                                            {/* Level 3 items */}
                                                            {item.sub_items?.map((sub) => (
                                                              <Link
                                                                  key={sub.id}
                                                                  href={sub.direct_url}
                                                                  onClick={() => setIsOpen(false)}
                                                                  className="block px-10 py-2.5 text-[13px] font-medium text-[#1a2355]/70 dark:text-white/60 hover:text-[#1a2355] dark:hover:text-white hover:bg-[#1a2355]/5 dark:hover:bg-white/5 transition-all"
                                                                >
                                                                  {sub.title}
                                                              </Link>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
