"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import FirstLady from "@/../public/first_lady.png";
import SchoolIcon from '@mui/icons-material/School';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Prezidentaz from "@/../public/presidentaz.png";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import CurvedLogoSvg from "./CurvedLogoSvg";
import InstagramIcon from '@mui/icons-material/Instagram';
import CopyrightIcon from '@mui/icons-material/Copyright';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VirtualQarabag from "@/../public/virtual_qarabaq.png";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import HaydarAliyevFoundation from "@/../public/heydar-aliyev-foundation.png";
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://api-aztu.karamshukurlu.site";

const SOCIAL_ICONS: Record<string, React.ElementType> = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    linkedin: LinkedInIcon,
    youtube: YouTubeIcon,
    twitter: YouTubeIcon,
};

interface FooterColumn {
    title: string;
    links: { label: string; url: string }[];
}

interface FooterData {
    university_name?: string;
    columns?: FooterColumn[];
    contact?: {
        email?: string;
        phones?: string[];
        address?: string;
    };
    social_links?: { platform: string; url: string }[];
}

const STATIC_SOCIAL = [
    { platform: "facebook", url: "https://www.facebook.com/aztu1950.official/" },
    { platform: "instagram", url: "https://www.instagram.com/aztueduaz" },
    { platform: "linkedin", url: "https://www.linkedin.com/school/azerbaijantechnicaluniversity" },
    { platform: "youtube", url: "https://www.youtube.com/channel/UCu_PoZ-9DKNYs3hxuK9pW1Q" },
];

export default function Footer() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const [footerData, setFooterData] = useState<FooterData | null>(null);

    useEffect(() => {
        fetch(`${API_BASE}/api/menu/footer?lang=${lang}`)
            .then((r) => r.json())
            .then((data) => {
                if (data.status_code === 200 && data.data) {
                    setFooterData(data.data);
                }
            })
            .catch(() => {});
    }, [lang]);

    const columns = footerData?.columns?.length ? footerData.columns : t.footer.columns;
    const contact = footerData?.contact;
    const socialLinks = footerData?.social_links?.length ? footerData.social_links : STATIC_SOCIAL;
    const universityName = footerData?.university_name ?? "Azerbaijan Technical University";

    return (
        <footer className="relative mt-24 lg:mt-32">
            {/* Top Curved Logo Accent */}
            <div className="absolute top-[-40px] md:top-[-60px] left-1/2 -translate-x-1/2 z-30 w-[280px] md:w-[450px]">
                <CurvedLogoSvg className="w-full h-auto drop-shadow-2xl" />
            </div>

            <div className="relative z-10 bg-[#0b1330] overflow-hidden border-t border-white/5 pt-24 md:pt-32">
                
                {/* STUNNING BACKGROUND ELEMENTS */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.05]" 
                         style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
                    <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#ee7c7e]/[0.03] blur-[120px] rounded-full" />
                    <div className="absolute right-10 bottom-24 select-none opacity-[0.02]">
                        <h1 className="text-[250px] font-black tracking-tighter leading-none text-white uppercase">AZTU</h1>
                    </div>
                </div>

                <div className="relative z-20 max-w-[1600px] mx-auto px-[40px] md:px-[80px] xl:px-[120px]">
                    
                    {/* TOP SECTION: Branding & Social */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-20 pb-12 border-b border-white/5">
                        <div className="text-center lg:text-left">
                            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase mb-2 drop-shadow-lg">
                                {universityName}
                            </h2>
                            <p className="text-[#ee7c7e] text-[11px] font-black uppercase tracking-[0.5em] opacity-90">
                                Innovation & Technology Hub
                            </p>
                        </div>

                        <div className="flex gap-4 items-center">
                            {socialLinks.map(({ platform, url }) => {
                                const Icon = SOCIAL_ICONS[platform.toLowerCase()] ?? FacebookIcon;
                                return (
                                    <motion.a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl text-white/80 hover:text-white hover:bg-[#ee7c7e] hover:border-[#ee7c7e] transition-all duration-300 shadow-xl"
                                    >
                                        <Icon sx={{ fontSize: 24 }} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* MIDDLE SECTION: Navigation Columns & Contact */}
                    <div className="flex flex-col xl:flex-row justify-between gap-12 mb-20">
                        {/* Info Columns Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 flex-1">
                            {columns.map((col, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <h3 className="text-white text-[13px] font-black uppercase tracking-[0.2em] mb-8 relative inline-block">
                                        {col.title}
                                        <div className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[#ee7c7e] rounded-full" />
                                    </h3>
                                    <ul className="flex flex-col gap-3">
                                        {col.links.map((link, i) => (
                                            <li key={i}>
                                                <Link
                                                    href={link.url}
                                                    className="group flex items-center text-[14.5px] font-bold text-white/60 hover:text-white transition-all duration-300"
                                                >
                                                    <span className="w-1 h-1 rounded-full bg-[#ee7c7e] scale-0 group-hover:scale-100 transition-transform duration-300 mr-3 shadow-[0_0_8px_#ee7c7e]" />
                                                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Contact Column - Anchored to the right */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group self-start w-full xl:w-[450px] shrink-0">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-[#ee7c7e]/20 transition-colors duration-500" />
                            
                            <h3 className="text-white text-[13px] font-black uppercase tracking-[0.2em] mb-8 relative z-10">
                                {t.footer.contactTitle}
                            </h3>

                            <div className="space-y-8 relative z-10">
                                {(contact?.phones ?? ["(+994 12) 539-13-05", "(+994 12) 538-33-83"]).map((phone, i) => (
                                    <a
                                        key={i}
                                        href={`tel:${phone.replace(/\s|\(|\)|-/g, "")}`}
                                        className="flex items-center gap-5 group/phone"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#ee7c7e] group-hover/phone:bg-[#ee7c7e] group-hover/phone:text-white transition-all duration-300 shadow-inner">
                                            {i === 0 ? <HeadsetMicIcon sx={{ fontSize: 24 }} /> : <LocalPhoneIcon sx={{ fontSize: 24 }} />}
                                        </div>
                                        <span className="text-xl font-black text-white/80 group-hover/phone:text-white transition-colors tracking-tight">
                                            {phone}
                                        </span>
                                    </a>
                                ))}

                                <div className="pt-6 border-t border-white/10 flex flex-col gap-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 shrink-0">
                                            <EmailIcon sx={{ fontSize: 20 }} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">E-Mail</span>
                                            <a href={`mailto:${contact?.email ?? "aztu@aztu.edu.az"}`} className="text-sm font-bold text-white/80 hover:text-[#ee7c7e] transition-colors break-all">
                                                {contact?.email ?? "aztu@aztu.edu.az"}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 shrink-0">
                                            <LocationOnIcon sx={{ fontSize: 20 }} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase text-white/40 tracking-widest mb-1">Address</span>
                                            <span className="text-sm font-bold text-white/80 leading-relaxed">
                                                {contact?.address ?? t.footer.defaultAddress}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM SECTION: Partners & Quick Access */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-center py-16 border-t border-white/10">
                        
                        {/* Partner Logos */}
                        <div className="xl:col-span-8 flex flex-wrap gap-6 justify-center xl:justify-start">
                            {[
                                { src: Prezidentaz, href: "https://president.az", label: "Prezident.az" },
                                { src: HaydarAliyevFoundation, href: "https://heydar-aliyev-foundation.org", label: "Heydar Aliyev Foundation" },
                                { src: FirstLady, href: "https://mehriban-aliyeva.az", label: "First Lady" },
                                { src: VirtualQarabag, href: "https://virtualkarabakh.az", label: "Virtual Qarabağ" },
                            ].map(({ src, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 w-44 h-24 hover:bg-white/20 hover:border-white/30 transition-all duration-500 overflow-hidden shadow-2xl"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#ee7c7e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Image src={src} alt={label} className="relative z-10 w-full h-auto grayscale-[0.4] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-95 group-hover:scale-105" />
                                </a>
                            ))}
                        </div>

                        {/* Quick Access Icons */}
                        <div className="xl:col-span-4 flex flex-wrap gap-4 justify-center xl:justify-end">
                            {[
                                { Icon: ImportContactsIcon, label: t.footer.quickLinks[0].label, href: "/research/library" },
                                { Icon: TrendingUpIcon, label: t.footer.quickLinks[1].label, href: "/haqqimizda/rankings" },
                                { Icon: SchoolIcon, label: t.footer.quickLinks[2].label, href: "/tehsil/admission" },
                            ].map(({ Icon, label, href }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="group flex flex-col items-center justify-center bg-white/10 w-28 h-28 rounded-[2rem] border border-white/10 hover:bg-[#ee7c7e] hover:border-[#ee7c7e] transition-all duration-500 shadow-xl"
                                >
                                    <Icon sx={{ fontSize: 32 }} className="text-white/60 group-hover:text-white transition-colors" />
                                    <span className="text-white/40 group-hover:text-white text-[10px] font-black uppercase tracking-widest text-center mt-3 px-2 line-clamp-1">
                                        {label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* COPYRIGHT BAR */}
                <div className="bg-black/40 py-10 relative z-20">
                    <div className="max-w-[1600px] mx-auto px-[40px] md:px-[80px] xl:px-[120px] flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
                                <CopyrightIcon sx={{ color: "#ee7c7e", fontSize: 18 }} />
                            </div>
                            <p className="text-white/40 text-[11px] font-bold tracking-[0.2em] uppercase">
                                {t.footer.copyright(new Date().getFullYear())}
                            </p>
                        </div>
                        <div className="flex items-center gap-10">
                            <Link href="/privacy" className="text-[10px] font-black text-white/20 hover:text-[#ee7c7e] uppercase tracking-widest transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="text-[10px] font-black text-white/20 hover:text-[#ee7c7e] uppercase tracking-widest transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
