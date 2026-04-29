"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import ShareIcon from "@mui/icons-material/Share";
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

export default function SubHeader({ onOpenQuickMenu, onOpenSearch }: HeaderProps) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

    const toggleHeader = (id: number) =>
        setExpandedHeaderId((prev) => (prev === id ? null : id));

    return (
        <>
            <motion.header
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{
                    y: { type: "spring", stiffness: 280, damping: 28 },
                    opacity: { duration: 0.2 },
                }}
                className="fixed top-0 left-0 w-full bg-white/[0.97] dark:bg-[#0f172a]/[0.97] backdrop-blur-xl shadow-[0_2px_24px_rgba(26,35,85,0.10)] dark:shadow-[0_2px_24px_rgba(0,0,0,0.4)] z-50"
            >
                <nav className="relative flex flex-row items-center justify-between w-full px-4 sm:px-8 lg:px-[100px] py-[11px] lg:py-[14px]">
                    {/* LEFT: Animated Burger Button */}
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        aria-label="Open navigation menu"
                        className="flex flex-col items-center justify-center gap-[5px] w-11 h-11 rounded-xl bg-[#f5f7ff] dark:bg-[#1e293b] border border-[#1a2355]/20 dark:border-[#ee7c7e]/20 hover:bg-[#eef2ff] dark:hover:bg-[#263548] hover:border-[#5A9BD3]/40 transition-all duration-200 cursor-pointer"
                    >
                        <motion.span
                            className="block h-[2px] w-5 bg-[#1a2355] dark:bg-white rounded-full origin-center"
                            animate={isDrawerOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        />
                        <motion.span
                            className="block h-[2px] w-5 bg-[#1a2355] dark:bg-white rounded-full"
                            animate={isDrawerOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        />
                        <motion.span
                            className="block h-[2px] w-5 bg-[#1a2355] dark:bg-white rounded-full origin-center"
                            animate={isDrawerOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                        />
                    </button>

                    {/* CENTER: Logo */}
                    <div className="absolute left-1/2 -translate-x-1/2">
                        <Image
                            src={theme === "dark" ? AzTULogoLight : AzTULogoDark}
                            alt="AzTU"
                            width={52}
                            height={52}
                            className="h-[42px] w-auto object-contain"
                            priority
                        />
                    </div>

                    {/* RIGHT: Theme toggle + Search + Quick Menu */}
                    <div className="flex items-center gap-2">
                        <motion.button
                            onClick={toggleTheme}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            transition={{ duration: 0.15 }}
                            aria-label="Toggle dark mode"
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f5f7ff] dark:bg-[#1e293b] border border-[#1a2355]/20 dark:border-[#ee7c7e]/20 hover:bg-[#5A9BD3] hover:border-[#5A9BD3] text-[#5A9BD3] dark:text-white hover:text-white transition-all duration-200"
                        >
                            {theme === "dark" ? (
                                <LightModeIcon sx={{ fontSize: 18, color: "inherit" }} />
                            ) : (
                                <DarkModeIcon sx={{ fontSize: 18, color: "inherit" }} />
                            )}
                        </motion.button>

                        <motion.button
                            onClick={onOpenSearch}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            transition={{ duration: 0.15 }}
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f5f7ff] dark:bg-[#1e293b] border border-[#1a2355]/20 dark:border-[#ee7c7e]/20 hover:bg-[#5A9BD3] hover:border-[#5A9BD3] text-[#5A9BD3] dark:text-white hover:text-white transition-all duration-200"
                            aria-label="Search"
                        >
                            <SearchIcon sx={{ fontSize: 18, color: "inherit" }} />
                        </motion.button>

                        <motion.button
                            onClick={onOpenQuickMenu}
                            whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(26,35,85,0.25)" }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="flex items-center gap-1.5 px-4 h-10 rounded-full bg-gradient-to-br from-[#1a2355] to-[#3b6ea8] text-white font-semibold text-[13px] whitespace-nowrap cursor-pointer transition-shadow duration-200"
                        >
                            <ListIcon sx={{ fontSize: 17, color: "inherit" }} />
                            {t.common.quickMenu.button}
                        </motion.button>
                    </div>
                </nav>

                {/* Thin gradient accent line */}
                <div className="h-[2px] bg-gradient-to-r from-transparent via-[#5A9BD3] to-transparent" />
            </motion.header>

            {/* Overlay */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <motion.div
                        key="subheader-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[60] bg-black/50"
                        onClick={() => setIsDrawerOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Burger Menu Drawer */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <motion.aside
                        key="subheader-drawer"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 35 }}
                        className="fixed top-0 left-0 h-full w-[320px] max-w-[90vw] z-[70] bg-white dark:bg-[#0f172a] shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Drawer header */}
                        <div className="flex items-center justify-between px-5 py-4 bg-[#0b1e3a]">
                            <Image src={AzTULogoLight} alt="AzTU" width={52} height={52} priority />
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/25 transition-all text-white cursor-pointer"
                                aria-label="Close menu"
                            >
                                <CloseIcon sx={{ fontSize: 22 }} />
                            </button>
                        </div>

                        {/* Utility buttons */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#1a2355]">
                            {[
                                { icon: <PersonIcon sx={{ fontSize: 18 }} />, label: t.common.lms, href: "https://lms.aztu.edu.az" },
                                { icon: <SchoolIcon sx={{ fontSize: 18 }} />, label: t.common.alumni, href: "https://alumni.aztu.edu.az" },
                                { icon: <ConnectedTvIcon sx={{ fontSize: 18 }} />, label: t.common.libraryAztu, href: "https://www.youtube.com/channel/UCu_PoZ-9DKNYs3hxuK9pW1Q" },
                            ].map(({ icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white bg-white/10 hover:bg-white/25 transition-all cursor-pointer"
                                >
                                    {icon}
                                    {label}
                                </a>
                            ))}
                            <LanguageSwitcher variant="drawer" />
                            <button 
                                onClick={() => navigator.clipboard.writeText(window.location.href)}
                                className="rounded-lg w-8 h-8 flex items-center justify-center text-white bg-white/10 hover:bg-white/25 transition-all cursor-pointer"
                            >
                                <ShareIcon sx={{ fontSize: 18 }} />
                            </button>
                        </div>

                        {/* Nav sections */}
                        <nav className="flex-1 overflow-y-auto">
                            {menuHeaders.map((header) => {
                                const isExpanded = expandedHeaderId === header.id;

                                if (header.direct_url) {
                                    return (
                                        <div key={header.id} className="border-b border-[#1a2355]/20 dark:border-[#ee7c7e]/20">
                                            <Link
                                                href={header.direct_url}
                                                onClick={() => setIsDrawerOpen(false)}
                                                className="w-full block px-5 py-4 text-[13.5px] font-black text-[#1a2355] dark:text-white hover:bg-[#f0f4ff] dark:hover:bg-[#1e293b] transition-colors uppercase tracking-widest"
                                            >
                                                {header.title}
                                            </Link>
                                        </div>
                                    );
                                }

                                return (
                                    <div key={header.id} className="border-b border-[#1a2355]/20 dark:border-[#ee7c7e]/20">
                                        <button
                                            onClick={() => toggleHeader(header.id)}
                                            className="w-full flex items-center justify-between px-5 py-4 text-left text-[13.5px] font-black text-[#1a2355] dark:text-white hover:bg-[#f0f4ff] dark:hover:bg-[#1e293b] transition-colors uppercase tracking-widest cursor-pointer"
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

                                        <AnimatePresence initial={false}>
                                            {isExpanded && (
                                                <motion.div
                                                    key="items"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.22, ease: "easeInOut" }}
                                                    className="overflow-hidden bg-[#f8faff] dark:bg-[#162032]"
                                                >
                                                    {header.items.map((item) => (
                                                        <div key={item.id} className="border-b border-[#1a2355]/20 dark:border-[#ee7c7e]/20">
                                                            {/* Level 2 title */}
                                                            {item.direct_url ? (
                                                                <Link
                                                                    href={item.direct_url}
                                                                    onClick={() => setIsDrawerOpen(false)}
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
                                                                    onClick={() => setIsDrawerOpen(false)}
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
