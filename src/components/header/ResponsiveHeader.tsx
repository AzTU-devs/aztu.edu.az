"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import ShareIcon from "@mui/icons-material/Share";
import AzTULogoLight from "@/../public/logo/aztu-logo-light.png";
import AzTULogoDark from "@/../public/logo/aztu-logo-dark.png";
import { NAV_SECTIONS } from "@/config/navigation";

export default function ResponsiveHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const toggleSection = (key: string) => {
        setExpandedSection((prev) => (prev === key ? null : key));
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
                        <Image
                            src={AzTULogoLight}
                            alt="AzTU"
                            className="w-14 sm:w-16 md:w-[70px] h-auto"
                            priority
                        />
                    </div>

                    {/* Search Button */}
                    <button className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/30 transition-all text-white">
                        <SearchIcon sx={{ fontSize: 26 }} />
                    </button>
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
                        className="fixed top-0 left-0 h-full w-[320px] max-w-[90vw] z-[70] bg-white shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Drawer header */}
                        <div className="flex items-center justify-between px-5 py-4 bg-[#0b1e3a]">
                            <Image src={AzTULogoDark} alt="AzTU" width={52} priority />
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
                                { icon: <PersonIcon sx={{ fontSize: 18 }} />, label: "LMS" },
                                { icon: <SchoolIcon sx={{ fontSize: 18 }} />, label: "Alumni" },
                                { icon: <ConnectedTvIcon sx={{ fontSize: 18 }} />, label: "AzTU TV" },
                            ].map(({ icon, label }) => (
                                <button
                                    key={label}
                                    className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white bg-white/10 hover:bg-white/25 transition-all"
                                >
                                    {icon}
                                    {label}
                                </button>
                            ))}
                            <button className="ml-auto rounded-lg w-8 h-8 flex items-center justify-center font-bold text-xs text-white bg-white/10 hover:bg-white/25 transition-all">
                                EN
                            </button>
                            <button className="rounded-lg w-8 h-8 flex items-center justify-center text-white bg-white/10 hover:bg-white/25 transition-all">
                                <ShareIcon sx={{ fontSize: 18 }} />
                            </button>
                        </div>

                        {/* Nav sections */}
                        <nav className="flex-1 overflow-y-auto">
                            {NAV_SECTIONS.map((section) => {
                                const isExpanded = expandedSection === section.key;
                                return (
                                    <div key={section.key} className="border-b border-gray-100">
                                        {/* Section header */}
                                        <button
                                            onClick={() => toggleSection(section.key)}
                                            className="w-full flex items-center justify-between px-5 py-4 text-left text-[13px] font-bold text-[#1a2355] hover:bg-[#f0f4ff] transition-colors"
                                        >
                                            {section.label}
                                            <motion.span
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="flex-shrink-0"
                                            >
                                                <ExpandMoreIcon sx={{ fontSize: 20, color: "#1a2355" }} />
                                            </motion.span>
                                        </button>

                                        {/* Section items */}
                                        <AnimatePresence initial={false}>
                                            {isExpanded && (
                                                <motion.ul
                                                    key="items"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.22, ease: "easeInOut" }}
                                                    className="overflow-hidden bg-[#f8faff]"
                                                >
                                                    {section.items.map((item) => (
                                                        <li key={item.slug}>
                                                            <Link
                                                                href={`${section.basePath}/${item.slug}`}
                                                                onClick={() => setIsOpen(false)}
                                                                className="block px-7 py-3 text-[13px] text-[#1a2355]/80 hover:text-[#1a2355] hover:bg-[#e8eeff] transition-colors border-b border-gray-100/70 last:border-b-0"
                                                            >
                                                                {item.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </motion.ul>
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
