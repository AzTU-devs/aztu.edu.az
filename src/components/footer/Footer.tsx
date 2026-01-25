"use client";

import Image from "next/image";
import AzTU from "@/../public/aztu.png";
import FirstLady from "@/../public/first_lady.png";
import SchoolIcon from '@mui/icons-material/School';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Prezidentaz from "@/../public/presidentaz.png";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import CurvedLogo from "@/../public/logo/curved-logo.svg";
import InstagramIcon from '@mui/icons-material/Instagram';
import CopyrightIcon from '@mui/icons-material/Copyright';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import VirtualQarabag from "@/../public/virtual_qarabaq.png";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import HaydarAliyevFoundation from "@/../public/heydar-aliyev-foundation.png";

export default function Footer() {
    return (
        <footer className="relative mt-52 lg:mt-[100px]">
            <div className="relative z-10">
                {/* Curved logo */}
                <div className="absolute top-[-35px] md:top-[-55px] left-1/2 -translate-x-1/2 z-20 w-64 md:w-[400px]">
                    <Image
                        src={CurvedLogo}
                        alt="AzTU"
                        className="w-full h-auto"
                        priority
                    />
                </div>

                {/* Background */}
                <div className="w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${AzTU.src})` }}>
                    <div className="w-full h-full bg-[#13365E]/80 text-white">
                        {/* Header with social icons */}
                        <div className="flex flex-col md:flex-row items-center justify-center lg:justify-between px-4 sm:px-8 md:px-[50px] pt-28 md:pt-[100px] mb-12 md:mb-[50px] gap-6 md:gap-0 text-center lg:text-left">
                            <h2 className="font-bold text-xl md:text-[25px]">Azerbaijan Technical University</h2>
                            <div className="flex gap-4 md:gap-3 flex-wrap justify-center">
                                {[FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon].map((Icon, idx) => (
                                    <div key={idx} className="flex items-center justify-center bg-white/10 w-12 h-12 md:w-[50px] md:h-[50px] rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/20">
                                        <Icon sx={{ fontSize: 30 }} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Columns */}
                        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between px-4 sm:px-8 md:px-[50px] gap-12 md:gap-[30px] text-center lg:text-left">
                            {/* Info columns */}
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 flex-wrap w-full lg:w-auto items-center lg:items-start justify-center lg:justify-start">
                                {[
                                    {
                                        title: "Haqqımızda",
                                        links: ["Universitetin tarixi", "Rektorun müraciəti", "Fəxri məzunlarımız", "Fəxri doktorlarımız", "Qəhrəmanlarımız", "Şuralar", "Kampus"]
                                    },
                                    {
                                        title: "Struktur",
                                        links: ["Rəhbərlik", "Fakültələr", "Kafedralar", "Ömür boyu öyrənmə məktəbi", "Yüksək Təhsil İnstitutu", "Şöbələr", "Kolleclər"]
                                    },
                                    {
                                        title: "Tədqiqat",
                                        links: ["İnstitutlar", "Elmi-innovasiya strategiyası", "Fəaliyyət istiqamətləri", "Tədqiqat və inkişaf şöbəsi", "İnnovasiyalar", "Kitabxana İnformasiya Mərkəzi", "Konfranslar", "Tələbə Elmi Cəmiyyəti"]
                                    }
                                ].map((col, idx) => (
                                    <div key={idx} className="flex-1 min-w-[150px]">
                                        <h2 className="font-bold text-lg md:text-[20px] mb-3">{col.title}</h2>
                                        <ul className="list-disc list-inside space-y-1">
                                            {col.links.map((link, i) => (
                                                <li key={i} className="cursor-pointer transition-all duration-300 hover:text-[#80c7ff] hover:translate-x-1 text-sm md:text-[14px]">{link}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* Contact */}
                            <div className="flex flex-col items-center justify-center min-w-[250px] mt-8 lg:mt-0 text-center lg:text-left">
                                <h2 className="font-200 text-lg md:text-[20px]">Əlaqə</h2>
                                <div className="bg-white/30 w-40 h-[2px] rounded-full my-4 mx-auto lg:mx-0" />
                                <div className="flex items-center gap-3 cursor-pointer mb-4 justify-center lg:justify-start">
                                    <HeadsetMicIcon sx={{ color: "#ffffff", opacity: 0.5, fontSize: 40 }} />
                                    <a href="tel:+994125391305" className="text-lg md:text-2xl text-white/50 hover:text-[#80c7ff] transition-colors duration-300">(+994 12) 539-13-05</a>
                                </div>
                                <div className="flex items-center gap-3 cursor-pointer mb-4 justify-center lg:justify-start">
                                    <LocalPhoneIcon sx={{ color: "#ffffff", opacity: 0.5, fontSize: 40 }} />
                                    <a href="tel:+994125383383" className="text-lg md:text-2xl text-white/50 hover:text-[#80c7ff] transition-colors duration-300">(+994 12) 538-33-83</a>
                                </div>
                                <div className="text-sm md:text-[14px] text-white/40 break-words mb-2 w-[300px] mx-auto lg:mx-0">
                                    Adres: H.Cavid prospekti 25, Bakı, Azərbaycan AZ 1073 Azərbaycan Texniki Universiteti.
                                </div>
                                <div className="text-sm md:text-[14px] text-white/40 mx-auto lg:mx-0">
                                    E-Mail: aztu@aztu.edu.az
                                </div>
                            </div>
                        </div>

                        {/* Logos & icons */}
                        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 sm:px-8 md:px-[50px] gap-6 md:gap-[20px] mt-10 text-center lg:text-left">
                            <div className="flex flex-wrap gap-4 justify-center">
                                {[Prezidentaz, HaydarAliyevFoundation, FirstLady, VirtualQarabag].map((img, idx) => (
                                    <div key={idx} className="flex items-center justify-center bg-white/40 rounded-2xl p-5 cursor-pointer">
                                        <Image src={img} alt="" className="w-32 md:w-[150px] h-auto" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-4 justify-center">
                                {[ImportContactsIcon, TrendingUpIcon, SchoolIcon].map((Icon, idx) => (
                                    <div key={idx} className="flex flex-col items-center justify-center bg-white/20 w-24 md:w-[100px] rounded-2xl p-5 cursor-pointer">
                                        <Icon sx={{ color: "#ffffff", opacity: 0.5, fontSize: 30 }} />
                                        <h2 className="text-white/40 text-sm md:text-[14px] text-center mt-1">Label</h2>
                                    </div>
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
