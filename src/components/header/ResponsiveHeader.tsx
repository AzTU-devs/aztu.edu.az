"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
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

const drawerVariants: Variants = {
    closed: { x: "-100%" },
    open: { 
        x: 0,
        transition: { 
            duration: 0.5, 
            ease: [0.23, 1, 0.32, 1],
            staggerChildren: 0.05,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
};

export default function ResponsiveHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [expandedHeaderId, setExpandedHeaderId] = useState<number | null>(null);
    const [menuHeaders, setMenuHeaders] = useState<MenuHeader[]>([]);
    const t = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { lang } = useLanguage();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
            <header 
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
                    scrolled 
                    ? "bg-white/90 dark:bg-[#0b1330]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-2 shadow-xl" 
                    : "bg-gradient-to-b from-black/40 to-transparent py-4"
                }`}
            >
                <nav className="flex items-center justify-between w-full px-6 md:px-10">
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                            scrolled 
                            ? "bg-black/5 dark:bg-white/5 text-[#1a2355] dark:text-white" 
                            : "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg"
                        }`}
                        aria-label="Open menu"
                    >
                        <MenuIcon sx={{ fontSize: 24 }} />
                    </button>

                    <div className="flex-shrink-0">
                        <Link href="/">
                            <Image
                                src={scrolled && theme === 'light' ? AzTULogoDark : AzTULogoLight}
                                alt="AzTU"
                                className="w-14 sm:w-16 h-auto transition-all duration-500 drop-shadow-xl"
                                priority
                            />
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle dark mode"
                            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                                scrolled 
                                ? "bg-black/5 dark:bg-white/5 text-[#1a2355] dark:text-white" 
                                : "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg"
                            }`}
                        >
                            {theme === "dark" ? (
                                <LightModeIcon sx={{ fontSize: 20 }} />
                            ) : (
                                <DarkModeIcon sx={{ fontSize: 20 }} />
                            )}
                        </button>
                        <button 
                            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                                scrolled 
                                ? "bg-black/5 dark:bg-white/5 text-[#1a2355] dark:text-white" 
                                : "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg"
                            }`}
                        >
                            <SearchIcon sx={{ fontSize: 24 }} />
                        </button>
                    </div>
                </nav>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-[#0b1330]/80 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        key="drawer"
                        variants={drawerVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed top-0 left-0 h-full w-[360px] max-w-[90vw] z-[70] bg-[#0b1330] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border-r border-white/5"
                    >
                        {/* DECORATIVE BACKGROUND */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee7c7e]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
                        </div>

                        {/* Drawer Header */}
                        <div className="relative z-10 flex items-center justify-between px-6 py-8 border-b border-white/5">
                            <Link href="/" onClick={() => setIsOpen(false)}>
                                <Image src={AzTULogoLight} alt="AzTU" width={64} priority />
                            </Link>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-white active:scale-95"
                            >
                                <CloseIcon sx={{ fontSize: 24 }} />
                            </button>
                        </div>

                        {/* Quick Access Portals */}
                        <div className="relative z-10 px-6 py-8 bg-gradient-to-b from-[#0b1330] via-[#0b1330] to-transparent">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-6 ml-1">University Portals</p>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { icon: <PersonIcon sx={{ fontSize: 24 }} />, label: t.common.lms, color: "hover:bg-blue-500/20 hover:border-blue-500/30", href: "https://lms.aztu.edu.az" },
                                    { icon: <SchoolIcon sx={{ fontSize: 24 }} />, label: t.common.alumni, color: "hover:bg-emerald-500/20 hover:border-emerald-500/30", href: "https://alumni.aztu.edu.az" },
                                    { icon: <ConnectedTvIcon sx={{ fontSize: 24 }} />, label: t.common.aztuTv, color: "hover:bg-[#ee7c7e]/20 hover:border-[#ee7c7e]/30", href: "https://www.youtube.com/channel/UCu_PoZ-9DKNYs3hxuK9pW1Q" },
                                ].map(({ icon, label, color, href }) => (
                                    <motion.a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variants={itemVariants}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex flex-col items-center justify-center gap-3 rounded-[1.5rem] p-4 text-white/60 bg-white/5 border border-white/5 transition-all duration-300 group ${color} hover:text-white`}
                                    >
                                        <div className="group-hover:scale-110 group-hover:text-inherit transition-transform duration-300">
                                            {icon}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest line-clamp-1">{label}</span>
                                    </motion.a>
                                ))}
                            </div>
                            
                            <div className="flex items-center justify-between mt-6 px-1">
                                <LanguageSwitcher variant="drawer" />
                                <button 
                                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                                    className="rounded-2xl w-12 h-12 flex items-center justify-center text-white/40 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white transition-all active:scale-90"
                                >
                                    <ShareIcon sx={{ fontSize: 20 }} />
                                </button>
                            </div>
                        </div>

                        {/* Nav Sections - Staggered */}
                        <nav className="relative z-10 flex-1 overflow-y-auto px-6 pb-12 custom-scrollbar">
                            <style jsx global>{`
                                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
                            `}</style>
                            
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-6 mt-4 ml-1">Main Navigation</p>
                            <div className="space-y-3">
                                {menuHeaders.map((header) => {
                                    const isExpanded = expandedHeaderId === header.id;
                                    
                                    if (header.direct_url) {
                                      return (
                                        <motion.div key={header.id} variants={itemVariants}>
                                            <Link
                                                href={header.direct_url}
                                                onClick={() => setIsOpen(false)}
                                                className="w-full flex items-center px-6 py-5 rounded-[1.5rem] text-[14px] font-black text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 uppercase tracking-[0.2em] shadow-xl group"
                                            >
                                                <span className="flex-1">{header.title}</span>
                                                <ChevronRightIcon sx={{ fontSize: 18 }} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                            </Link>
                                        </motion.div>
                                      );
                                    }

                                    return (
                                        <motion.div key={header.id} variants={itemVariants} className="space-y-2">
                                            <button
                                                onClick={() => toggleHeader(header.id)}
                                                className={`w-full flex items-center justify-between px-6 py-5 rounded-[1.5rem] text-left text-[14px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-xl border ${
                                                    isExpanded 
                                                    ? "bg-[#ee7c7e] text-white border-[#ee7c7e] shadow-[#ee7c7e]/20" 
                                                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border-white/5"
                                                }`}
                                            >
                                                {header.title}
                                                <motion.span
                                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                                    transition={{ duration: 0.4, ease: "circOut" }}
                                                >
                                                    <ExpandMoreIcon sx={{ fontSize: 24 }} />
                                                </motion.span>
                                            </button>

                                            <AnimatePresence initial={false}>
                                                {isExpanded && (
                                                    <motion.div
                                                        key="items"
                                                        initial={{ height: 0, opacity: 0, y: -10 }}
                                                        animate={{ height: "auto", opacity: 1, y: 0 }}
                                                        exit={{ height: 0, opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                                        className="overflow-hidden rounded-[1.5rem] bg-white/[0.03] border border-white/5 px-2 py-2 mb-4"
                                                    >
                                                        {header.items.map((item) => (
                                                            <div key={item.id} className="py-1">
                                                                {item.direct_url ? (
                                                                  <Link
                                                                    href={item.direct_url}
                                                                    onClick={() => setIsOpen(false)}
                                                                    className="block px-6 py-3 rounded-xl text-[13px] font-black text-blue-300 hover:text-[#ee7c7e] hover:bg-white/5 transition-all uppercase tracking-widest"
                                                                  >
                                                                    {item.title}
                                                                  </Link>
                                                                ) : (
                                                                  <span className="block px-6 pt-4 pb-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/20">
                                                                    {item.title}
                                                                  </span>
                                                                )}
                                                                
                                                                {item.sub_items?.map((sub) => (
                                                                  <Link
                                                                      key={sub.id}
                                                                      href={sub.direct_url}
                                                                      onClick={() => setIsOpen(false)}
                                                                      className="group flex items-center gap-4 px-8 py-3 rounded-xl text-[14px] font-bold text-white/50 hover:text-white hover:bg-white/5 transition-all duration-300"
                                                                    >
                                                                      <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] scale-0 group-hover:scale-100 transition-transform duration-300 shadow-[0_0_8px_#ee7c7e]" />
                                                                      <span>{sub.title}</span>
                                                                  </Link>
                                                                ))}
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </nav>

                        {/* Drawer Footer */}
                        <div className="relative z-10 p-10 text-center border-t border-white/5 bg-gradient-to-t from-black/20 to-transparent">
                            <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.6em]">Innovating Education</p>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}

function ChevronRightIcon({ className, sx }: { className?: string; sx?: any }) {
    return (
        <svg 
            className={className}
            style={sx}
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    );
}
