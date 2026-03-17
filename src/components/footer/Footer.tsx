"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AzTU from "@/../public/aztu.png";
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
    partner_logos?: { label: string; image_url: string; url: string }[];
    quick_icons?: { label: string; icon: string; url: string }[];
}

const STATIC_COLUMNS: FooterColumn[] = [
    {
        title: "Haqqımızda",
        links: [
            { label: "Universitetin tarixi", url: "/haqqimizda/history" },
            { label: "Rektorun müraciəti", url: "/haqqimizda/rector-message" },
            { label: "Fəxri məzunlarımız", url: "/haqqimizda/honorary-graduates" },
            { label: "Fəxri doktorlarımız", url: "/haqqimizda/honorary-doctors" },
            { label: "Qəhrəmanlarımız", url: "/haqqimizda/heroes" },
            { label: "Şuralar", url: "/haqqimizda/councils" },
            { label: "Kampus", url: "/haqqimizda/campus" },
        ],
    },
    {
        title: "Struktur",
        links: [
            { label: "Rəhbərlik", url: "/struktur/leadership" },
            { label: "Fakültələr", url: "/faculties" },
            { label: "Kafedralar", url: "/cafedras" },
            { label: "Ömür boyu öyrənmə məktəbi", url: "/struktur/lifelong-learning" },
            { label: "Yüksək Təhsil İnstitutu", url: "/struktur/higher-education" },
            { label: "Şöbələr", url: "/struktur/departments" },
            { label: "Kolleclər", url: "/struktur/colleges" },
        ],
    },
    {
        title: "Tədqiqat",
        links: [
            { label: "İnstitutlar", url: "/tedqiqat/institutes" },
            { label: "Elmi-innovasiya strategiyası", url: "/tedqiqat/strategy" },
            { label: "Fəaliyyət istiqamətləri", url: "/tedqiqat/directions" },
            { label: "Tədqiqat və inkişaf şöbəsi", url: "/tedqiqat/r-and-d" },
            { label: "İnnovasiyalar", url: "/tedqiqat/innovations" },
            { label: "Kitabxana İnformasiya Mərkəzi", url: "/tedqiqat/library" },
            { label: "Konfranslar", url: "/tedqiqat/conferences" },
            { label: "Tələbə Elmi Cəmiyyəti", url: "/tedqiqat/student-science" },
        ],
    },
];

const STATIC_SOCIAL = [
    { platform: "facebook", url: "https://www.facebook.com/aztu.edu.az" },
    { platform: "instagram", url: "https://www.instagram.com/aztu_edu_az" },
    { platform: "linkedin", url: "https://www.linkedin.com/school/azerbaijantechnicaluniversity" },
    { platform: "youtube", url: "https://www.youtube.com/@aztu_official" },
];

export default function Footer() {
    const [footerData, setFooterData] = useState<FooterData | null>(null);

    useEffect(() => {
        fetch(`${API_BASE}/api/menu/footer?lang=az`)
            .then((r) => r.json())
            .then((data) => {
                if (data.status_code === 200 && data.data) {
                    setFooterData(data.data);
                }
            })
            .catch(() => {});
    }, []);

    const columns = footerData?.columns?.length ? footerData.columns : STATIC_COLUMNS;
    const contact = footerData?.contact;
    const socialLinks = footerData?.social_links?.length ? footerData.social_links : STATIC_SOCIAL;
    const universityName = footerData?.university_name ?? "Azerbaijan Technical University";

    return (
        <footer className="relative mt-[60px] lg:mt-[100px]">
            <div className="relative z-10">
                {/* Curved logo */}
                <div className="absolute top-[-35px] md:top-[-55px] left-1/2 -translate-x-1/2 z-20 w-64 md:w-[400px]">
                    <CurvedLogoSvg className="w-full h-auto" />
                </div>

                {/* Background */}
                <div className="w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${AzTU.src})` }}>
                    <div className="w-full h-full bg-[#13365E]/80 text-white">
                        {/* Header with social icons */}
                        <div className="flex flex-col md:flex-row items-center justify-center lg:justify-between px-4 sm:px-8 md:px-[50px] pt-28 md:pt-[100px] mb-12 md:mb-[50px] gap-6 md:gap-0 text-center lg:text-left">
                            <h2 className="font-bold text-xl md:text-[25px]">{universityName}</h2>
                            <div className="flex gap-4 md:gap-3 flex-wrap justify-center">
                                {socialLinks.map(({ platform, url }) => {
                                    const Icon = SOCIAL_ICONS[platform.toLowerCase()] ?? FacebookIcon;
                                    return (
                                        <a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={platform}
                                            className="flex items-center justify-center bg-white/10 w-12 h-12 md:w-[50px] md:h-[50px] rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/30 hover:scale-110"
                                        >
                                            <Icon sx={{ fontSize: 30 }} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Columns */}
                        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between px-4 sm:px-8 md:px-[50px] gap-12 md:gap-[30px] text-center lg:text-left">
                            {/* Info columns */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 flex-wrap w-full lg:w-auto items-center lg:items-start justify-center lg:justify-start">
                                {columns.map((col, idx) => (
                                    <div key={idx} className="flex-1 min-w-[150px]">
                                        <h2 className="font-bold text-lg md:text-[20px] mb-3">{col.title}</h2>
                                        <ul className="space-y-1">
                                            {col.links.map((link, i) => (
                                                <li key={i}>
                                                    <Link
                                                        href={link.url}
                                                        className="text-sm md:text-[14px] text-white/80 hover:text-[#80c7ff] hover:translate-x-1 inline-block transition-all duration-300"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Contact */}
                            <div className="flex flex-col items-center justify-center min-w-[250px] mt-8 lg:mt-0 text-center lg:text-left">
                                <h2 className="font-200 text-lg md:text-[20px]">Əlaqə</h2>
                                <div className="bg-white/30 w-40 h-[2px] rounded-full my-4 mx-auto lg:mx-0" />

                                {(contact?.phones ?? ["(+994 12) 539-13-05", "(+994 12) 538-33-83"]).map((phone, i) => (
                                    <div key={i} className="flex items-center gap-3 cursor-pointer mb-4 justify-center lg:justify-start">
                                        {i === 0 ? (
                                            <HeadsetMicIcon sx={{ color: "#ffffff", opacity: 0.5, fontSize: 40 }} />
                                        ) : (
                                            <LocalPhoneIcon sx={{ color: "#ffffff", opacity: 0.5, fontSize: 40 }} />
                                        )}
                                        <a
                                            href={`tel:${phone.replace(/\s|\(|\)|-/g, "")}`}
                                            className="text-lg md:text-2xl text-white/50 hover:text-[#80c7ff] transition-colors duration-300"
                                        >
                                            {phone}
                                        </a>
                                    </div>
                                ))}

                                <div className="text-sm md:text-[14px] text-white/40 break-words mb-2 w-[300px] mx-auto lg:mx-0">
                                    {contact?.address ?? "Adres: H.Cavid prospekti 25, Bakı, Azərbaycan AZ 1073 Azərbaycan Texniki Universiteti."}
                                </div>
                                <div className="text-sm md:text-[14px] text-white/40 mx-auto lg:mx-0">
                                    <a href={`mailto:${contact?.email ?? "aztu@aztu.edu.az"}`} className="hover:text-[#80c7ff] transition-colors duration-300">
                                        E-Mail: {contact?.email ?? "aztu@aztu.edu.az"}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Partner logos & quick icons */}
                        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-8 md:px-[50px] gap-6 md:gap-[20px] mt-10 text-center lg:text-left">
                            <div className="flex flex-wrap gap-4 justify-center">
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
                                        title={label}
                                        className="flex items-center justify-center bg-white/40 rounded-2xl p-5 cursor-pointer hover:bg-white/60 transition-colors duration-300"
                                    >
                                        <Image src={src} alt={label} className="w-32 md:w-[150px] h-auto" />
                                    </a>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center">
                                {[
                                    { Icon: ImportContactsIcon, label: "e-Kitabxana", href: "/tedqiqat/library" },
                                    { Icon: TrendingUpIcon, label: "Reytinqlər", href: "/haqqimizda/rankings" },
                                    { Icon: SchoolIcon, label: "Qəbul", href: "/tehsil/admission" },
                                ].map(({ Icon, label, href }) => (
                                    <Link
                                        key={label}
                                        href={href}
                                        className="flex flex-col items-center justify-center bg-white/20 w-24 md:w-[100px] rounded-2xl p-5 cursor-pointer hover:bg-white/30 transition-colors duration-300"
                                    >
                                        <Icon sx={{ color: "#ffffff", opacity: 0.5, fontSize: 30 }} />
                                        <h2 className="text-white/40 text-sm md:text-[14px] text-center mt-1">{label}</h2>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="flex items-center justify-center lg:justify-start bg-[#13365E]/90 p-4 md:p-[30px] mt-10 md:mt-[40px]">
                            <CopyrightIcon sx={{ color: "#ffffff", opacity: 0.4, fontSize: 20, marginRight: 2 }} />
                            <p className="text-white/40 text-sm md:text-[14px]">{new Date().getFullYear()} Azerbaijan Technical University. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
