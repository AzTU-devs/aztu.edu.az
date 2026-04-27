"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { getQuickMenu, type QuickMenuData } from "@/services/menu/menuService";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

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

const containerVariants: Variants = {
    closed: { x: "100%" },
    open: { 
        x: 0,
        transition: { 
            duration: 0.6, 
            ease: [0.23, 1, 0.32, 1],
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
};

export default function QuickMenu({ isOpen, onClose }: Props) {
    const [menuData, setMenuData] = useState<QuickMenuData | null>(null);
    const [activeSection, setActiveSection] = useState<string>("");
    const { lang } = useLanguage();
    const t = useTranslation();
    const qm = t.common.quickMenu;

    const TRANSLATED_RIGHT_SECTIONS = [
        {
            key: "platform",
            title: qm.sections.platform.title,
            items: [
                { label: qm.sections.platform.items.lms, url: "https://lms.aztu.edu.az" },
                { label: qm.sections.platform.items.internalGrants, url: "/research/internal-grants" },
                { label: qm.sections.platform.items.planReport, url: "#" },
            ],
        },
        {
            key: "alumni",
            title: qm.sections.alumni.title,
            items: [
                { label: qm.sections.alumni.items.portal, url: "https://alumni.aztu.edu.az" },
                { label: qm.sections.alumni.items.honoraryDoctors, url: "/community/honorary-doctors" },
                { label: qm.sections.alumni.items.honoraryGraduates, url: "/community/honorary-graduates" },
                { label: qm.sections.alumni.items.heroes, url: "/community/our-heroes" },
            ],
        },
        {
            key: "why-aztu",
            title: qm.sections.whyAztu.title,
            items: [
                { label: qm.sections.whyAztu.items.infrastructure, url: "/niye-aztu/infrastructure" },
                { label: qm.sections.whyAztu.items.startups, url: "/niye-aztu/startups" },
                { label: qm.sections.whyAztu.items.dualDegree, url: "/niye-aztu/dual-degree" },
                { label: qm.sections.whyAztu.items.scholarships, url: "/niye-aztu/scholarships" },
            ],
        },
    ];

    const TRANSLATED_LEFT_ITEMS = [
        { label: qm.leftItems.ranking, url: "/haqqimizda/rankings" },
        { label: qm.leftItems.accreditation, url: "/haqqimizda/accreditation" },
        { label: qm.leftItems.policies, url: "/haqqimizda/policies" },
        { label: qm.leftItems.reports, url: "/haqqimizda/reports" },
        { label: qm.leftItems.faq, url: "/faq" },
    ];

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

    const rightSections = menuData?.right_sections?.length ? menuData.right_sections : TRANSLATED_RIGHT_SECTIONS;
    const leftItems = menuData?.left_items?.length ? menuData.left_items : TRANSLATED_LEFT_ITEMS;
    const contact = menuData?.contact;
    const socialLinks = menuData?.social_links?.length ? menuData.social_links : [
        { platform: "facebook", url: "https://www.facebook.com/aztu1950.official/" },
        { platform: "instagram", url: "https://www.instagram.com/aztueduaz" },
        { platform: "linkedin", url: "https://www.linkedin.com/school/azerbaijantechnicaluniversity" },
        { platform: "youtube", url: "https://www.youtube.com/channel/UCu_PoZ-9DKNYs3hxuK9pW1Q" },
    ];

    const currentActive = activeSection || (rightSections[0]?.key ?? "");
    const activeData = rightSections.find((s) => s.key === currentActive) ?? rightSections[0];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1000] flex justify-end overflow-hidden">
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[#0b1330]/80 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    {/* MAIN CONTAINER */}
                    <motion.div
                        variants={containerVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="relative flex h-full w-full md:w-[85%] lg:w-[70%] xl:w-[60%] bg-[#0b1330] shadow-[-20px_0_80px_rgba(0,0,0,0.5)] border-l border-white/5 overflow-hidden flex-col lg:flex-row"
                    >
                        {/* DECORATIVE BACKGROUND */}
                        <div className="absolute inset-0 pointer-events-none opacity-40">
                            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
                            <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#ee7c7e]/[0.05] blur-[120px] rounded-full" />
                            <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-500/[0.05] blur-[100px] rounded-full" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-black text-white/[0.01] select-none uppercase tracking-tighter">AzTU</div>
                        </div>

                        {/* CLOSE BUTTON */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="absolute left-6 top-6 lg:left-[-30px] lg:top-1/2 lg:-translate-y-1/2 z-[100] w-12 h-12 lg:w-14 lg:h-14 bg-[#ee7c7e] text-white flex items-center justify-center rounded-2xl shadow-2xl shadow-[#ee7c7e]/40 cursor-pointer border border-white/20"
                        >
                            <CloseIcon sx={{ fontSize: 28 }} />
                        </motion.button>

                        {/* LEFT PANEL (Institutional Info) */}
                        <div className="relative z-10 w-full lg:w-[35%] border-r border-white/5 flex flex-col p-8 md:p-12 overflow-y-auto no-scrollbar">
                            <div className="mb-12">
                                <span className="text-[#ee7c7e] text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">{qm.navigation}</span>
                                <h2 className="text-white font-black text-4xl tracking-tighter leading-none mb-2" dangerouslySetInnerHTML={{ __html: qm.title }} />
                                <div className="w-12 h-1 bg-[#ee7c7e] rounded-full mt-6" />
                            </div>

                            <nav className="flex-1 space-y-3">
                                {leftItems.map((item, i) => (
                                    <motion.div key={i} variants={itemVariants}>
                                        <Link
                                            href={item.url}
                                            onClick={onClose}
                                            className="group flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 shadow-lg"
                                        >
                                            <span className="text-white/70 font-bold text-sm uppercase tracking-widest group-hover:text-white transition-colors">{item.label}</span>
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                                                <ArrowOutwardIcon sx={{ fontSize: 16 }} />
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="mt-12 pt-8 border-t border-white/5 space-y-6">
                                <div className="space-y-4">
                                    <a href={`mailto:${contact?.email ?? "aztu@aztu.edu.az"}`} className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#ee7c7e] group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                                            <EmailIcon sx={{ fontSize: 18 }} />
                                        </div>
                                        <span className="text-sm font-bold text-white/40 group-hover:text-white transition-colors tracking-tight">{contact?.email ?? "aztu@aztu.edu.az"}</span>
                                    </a>
                                    {(contact?.phones ?? ["(+994 12) 539-13-05"]).map((phone, i) => (
                                        <a key={i} href={`tel:${phone.replace(/\s|\(|\)|-/g, "")}`} className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#ee7c7e] group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                                                <LocalPhoneIcon sx={{ fontSize: 18 }} />
                                            </div>
                                            <span className="text-sm font-bold text-white/40 group-hover:text-white transition-colors tracking-tight">{phone}</span>
                                        </a>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    {socialLinks.map(({ platform, url }) => {
                                        const Icon = SOCIAL_ICONS[platform.toLowerCase()] ?? FacebookIcon;
                                        return (
                                            <motion.a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -3, scale: 1.1 }}
                                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-[#ee7c7e] hover:border-[#ee7c7e] transition-all duration-300 shadow-xl"
                                            >
                                                <Icon sx={{ fontSize: 20 }} />
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT PANEL (Categorized Items) */}
                        <div className="relative z-10 flex-1 flex flex-col p-8 md:p-12 bg-black/20 overflow-y-auto no-scrollbar">
                            {/* Section Tabs */}
                            <div className="flex gap-2 p-1.5 rounded-[2rem] bg-white/5 border border-white/5 mb-12 self-start max-w-full overflow-x-auto no-scrollbar">
                                {rightSections.map((section) => {
                                    const isActive = currentActive === section.key;
                                    return (
                                        <button
                                            key={section.key}
                                            onClick={() => setActiveSection(section.key)}
                                            className={`px-8 py-3 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap cursor-pointer ${
                                                isActive 
                                                ? "bg-[#ee7c7e] text-white shadow-xl shadow-[#ee7c7e]/20" 
                                                : "text-white/40 hover:text-white hover:bg-white/5"
                                            }`}
                                        >
                                            {section.title}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Active Content Grid */}
                            <div className="flex-1">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentActive}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                    >
                                        {activeData?.items.map((item, idx) => (
                                            <motion.div
                                                key={item.label}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.05, duration: 0.4 }}
                                            >
                                                <Link
                                                    href={item.url}
                                                    onClick={onClose}
                                                    className="group relative flex flex-col p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all duration-500 hover:shadow-2xl overflow-hidden min-h-[160px] justify-between"
                                                >
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-[#ee7c7e]/10 transition-colors" />
                                                    
                                                    <div className="relative z-10 flex items-center justify-between">
                                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#ee7c7e] group-hover:scale-110 transition-transform">
                                                            <ArrowOutwardIcon sx={{ fontSize: 24 }} />
                                                        </div>
                                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-[#ee7c7e] transition-colors">{qm.portal}</span>
                                                    </div>

                                                    <h3 className="relative z-10 text-xl font-black text-white group-hover:text-[#ee7c7e] transition-colors leading-tight tracking-tight mt-6">
                                                        {item.label}
                                                    </h3>
                                                    
                                                    <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#ee7c7e] group-hover:w-full transition-all duration-700 ease-out origin-left" />
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Bottom Brand Slogan */}
                            <div className="mt-12 text-center opacity-10">
                                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white">{qm.slogan}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
