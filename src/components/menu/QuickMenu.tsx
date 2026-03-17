"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { getQuickMenu, type QuickMenuData } from "@/services/menu/menuService";
import { useLanguage } from "@/context/LanguageContext";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const SOCIAL_ICONS: Record<string, React.ElementType> = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    linkedin: LinkedInIcon,
    youtube: YouTubeIcon,
};

const STATIC_RIGHT_SECTIONS = [
    {
        key: "platform",
        title: "Platform",
        items: [
            { label: "LMS", url: "#" },
            { label: "Internal Grant Competition", url: "#" },
            { label: "Plan Report Information System", url: "#" },
        ],
    },
    {
        key: "alumni",
        title: "Alumni",
        items: [
            { label: "Career", url: "#" },
            { label: "Honorary Doctors", url: "/haqqimizda/honorary-doctors" },
            { label: "Honorary Graduates", url: "/haqqimizda/honorary-graduates" },
            { label: "Our Heroes", url: "/haqqimizda/heroes" },
        ],
    },
    {
        key: "why-aztu",
        title: "Why AzTU?",
        items: [
            { label: "Infrastructure", url: "/niye-aztu/infrastructure" },
            { label: "Startups", url: "/niye-aztu/startups" },
            { label: "Dual Degree Diplomas", url: "/niye-aztu/dual-degree" },
            { label: "Scholarships", url: "/niye-aztu/scholarships" },
        ],
    },
];

const STATIC_LEFT_ITEMS = [
    { label: "Ranking", url: "/haqqimizda/rankings" },
    { label: "Accreditation", url: "/haqqimizda/accreditation" },
    { label: "Policies", url: "/haqqimizda/policies" },
    { label: "Reports", url: "/haqqimizda/reports" },
    { label: "FAQ", url: "/haqqimizda/faq" },
];

export default function QuickMenu({ isOpen, onClose }: Props) {
    const [menuData, setMenuData] = useState<QuickMenuData | null>(null);
    const [activeSection, setActiveSection] = useState<string>("");
    const { lang } = useLanguage();

    useEffect(() => {
        if (isOpen) {
            getQuickMenu(lang).then((data) => {
                if (data) {
                    setMenuData(data);
                    if (data.right_sections?.length) {
                        setActiveSection(data.right_sections[0].key);
                    }
                }
            });
        }
    }, [isOpen, lang]);

    const rightSections = menuData?.right_sections?.length ? menuData.right_sections : STATIC_RIGHT_SECTIONS;
    const leftItems = menuData?.left_items?.length ? menuData.left_items : STATIC_LEFT_ITEMS;
    const contact = menuData?.contact;
    const socialLinks = menuData?.social_links?.length
        ? menuData.social_links
        : [
              { platform: "facebook", url: "https://www.facebook.com/aztu.edu.az" },
              { platform: "instagram", url: "https://www.instagram.com/aztu_edu_az" },
              { platform: "linkedin", url: "https://www.linkedin.com/school/azerbaijantechnicaluniversity" },
              { platform: "youtube", url: "https://www.youtube.com/@aztu_official" },
          ];

    const currentActive = activeSection || (rightSections[0]?.key ?? "");
    const activeData = rightSections.find((s) => s.key === currentActive) ?? rightSections[0];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[999] flex justify-end"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40" onClick={onClose} />

                    {/* MAIN CONTAINER */}
                    <motion.div
                        className="relative flex h-screen w-full sm:w-full md:w-[80%] lg:w-[60%] flex-col lg:flex-row"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        {/* Close Button */}
                        <div
                            className="absolute left-[-15px] top-[15px] sm:left-[-20px] sm:top-[20px] z-50 bg-white dark:bg-[#1e293b] p-[10px] rounded-full cursor-pointer"
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </div>

                        {/* LEFT PANEL */}
                        <motion.div
                            className="bg-[#1a2355] w-full lg:w-[30%] h-auto lg:h-screen p-[20px] sm:p-[30px]"
                            initial={{ x: -40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <h2 className="text-white font-bold text-[22px] sm:text-[25px] text-center mb-6">
                                <span className="mr-2">AzTU</span> Quick Menu
                            </h2>

                            <div>
                                {leftItems.map((item, i) => (
                                    <Link
                                        key={i}
                                        href={item.url}
                                        onClick={onClose}
                                        className="block px-4 py-2 bg-white dark:bg-[#1e293b] dark:text-white rounded-[20px] my-3 font-bold cursor-pointer transition-all hover:bg-[#5A9BD3] hover:text-white text-center"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 text-white font-bold space-y-3 text-center lg:text-left">
                                <a href={`mailto:${contact?.email ?? "aztu@aztu.edu.az"}`} className="block hover:text-[#80c7ff] transition-colors">
                                    {contact?.email ?? "aztu@aztu.edu.az"}
                                </a>
                                {(contact?.phones ?? ["(+994 12) 539-13-05", "(+994 12) 538-33-83"]).map((phone, i) => (
                                    <a key={i} href={`tel:${phone.replace(/\s|\(|\)|-/g, "")}`} className="block hover:text-[#80c7ff] transition-colors">
                                        {phone}
                                    </a>
                                ))}
                            </div>

                            <div className="flex justify-center lg:justify-start gap-3 mt-6">
                                {socialLinks.map(({ platform, url }) => {
                                    const Icon = SOCIAL_ICONS[platform.toLowerCase()] ?? FacebookIcon;
                                    return (
                                        <a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={platform}
                                            className="bg-white/30 w-[45px] h-[45px] flex items-center justify-center rounded-lg cursor-pointer hover:bg-white/50 transition-colors"
                                        >
                                            <Icon sx={{ color: "white", fontSize: 26 }} />
                                        </a>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* RIGHT PANEL */}
                        <motion.div
                            className="bg-[#5A9BD3]/95 w-full lg:w-[70%] h-screen overflow-y-auto px-4 sm:px-6 py-8 sm:py-12"
                            initial={{ x: 80, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Section tabs */}
                            <div className="flex justify-between gap-2 flex-wrap mb-6">
                                {rightSections.map((section) => {
                                    const isActive = currentActive === section.key;
                                    return (
                                        <button
                                            key={section.key}
                                            onClick={() => setActiveSection(section.key)}
                                            style={{ width: "calc(100% / 3 - 10px)" }}
                                            className={`px-5 py-2 rounded-full font-bold text-sm transition-all cursor-pointer ${
                                                isActive ? "bg-white text-[#1a2355]" : "bg-white/20 text-white hover:bg-white/40"
                                            }`}
                                        >
                                            {section.title}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Active section items */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentActive}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex flex-col gap-3"
                                >
                                    {activeData?.items.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.url}
                                            onClick={onClose}
                                            className="px-6 py-4 rounded-2xl bg-white/20 text-white font-semibold hover:bg-white hover:text-[#1a2355] transition-colors cursor-pointer block"
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
