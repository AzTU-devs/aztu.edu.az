"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import ScienceIcon from "@mui/icons-material/Science";
import BusinessIcon from "@mui/icons-material/Business";
import InfoIcon from "@mui/icons-material/Info";
import SchoolIcon from "@mui/icons-material/School";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useLanguage } from "@/context/LanguageContext";
import {
    getLaboratoryById,
    getCafedras,
    type ResearchLaboratory,
} from "@/services/cafedraService/cafedraService";
import { getImageUrl } from "@/services/researchInstituteService/researchInstituteService";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import NewsGallery from "@/components/news/NewsGallery";

export default function LaboratoryDetailPage() {
    const { id } = useParams();
    const { lang: currentLang } = useLanguage();

    const [lab, setLab] = useState<ResearchLaboratory | null>(null);
    const [cafedraName, setCafedraName] = useState<string>("");
    const [loading, setLoading] = useState(true);

    const labId = Array.isArray(id) ? id[0] : id;

    useEffect(() => {
        if (!labId) return;
        let active = true;
        setLoading(true);
        getLaboratoryById(labId, currentLang)
            .then(async (res) => {
                if (!active) return;
                setLab(res);
                if (res) {
                    const cafedras = await getCafedras({ lang: currentLang, start: 0, end: 500 });
                    if (active && Array.isArray(cafedras)) {
                        const match = cafedras.find((c) => c.cafedra_code === res.cafedra_code);
                        setCafedraName(match?.title ?? match?.cafedra_name ?? "");
                    }
                }
            })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [labId, currentLang]);

    const t = {
        home: currentLang === "az" ? "Ana səhifə" : "Home",
        research: currentLang === "az" ? "Tədqiqat" : "Research",
        activity: currentLang === "az" ? "Tədqiqat fəaliyyəti" : "Research activity",
        labs: currentLang === "az" ? "Tədqiqat laboratoriyaları" : "Research laboratories",
        department: currentLang === "az" ? "Kafedra" : "Department",
        description: currentLang === "az" ? "Təsvir" : "Description",
        objectives: currentLang === "az" ? "Məqsədlər" : "Objectives",
        gallery: currentLang === "az" ? "Qalereya" : "Gallery",
        contact: currentLang === "az" ? "Əlaqə" : "Contact",
        room: currentLang === "az" ? "Otaq nömrəsi" : "Room number",
        person: currentLang === "az" ? "Məsul şəxs" : "Authorized person",
        email: currentLang === "az" ? "Email" : "Email",
        phone: currentLang === "az" ? "Mobil nömrə" : "Mobile number",
        noInfo: currentLang === "az" ? "Məlumat yoxdur" : "No information available",
        notFound: currentLang === "az" ? "Laboratoriya tapılmadı" : "Laboratory not found",
        allLabs: currentLang === "az" ? "Bütün laboratoriyalar" : "All laboratories",
    };

    const labsHref = currentLang === "az"
        ? "/tedqiqat/tedqiqat-fealiyyeti/tedqiqat-laboratoriyalari"
        : "/research/research-activity/research-laboratories";

    if (loading) {
        return (
            <main className="min-h-screen bg-page dark:bg-slate-900 flex items-center justify-center">
                <div className="h-12 w-12 rounded-full border-4 border-[#1a2355]/20 border-t-[#1a2355] animate-spin" />
            </main>
        );
    }

    if (!lab) {
        return (
            <main className="min-h-screen bg-page dark:bg-slate-900 flex flex-col items-center justify-center gap-6 px-4">
                <ScienceIcon sx={{ fontSize: 64, color: "#1a2355", opacity: 0.15 }} />
                <p className="text-gray-500 dark:text-slate-400 font-black uppercase tracking-widest text-sm">{t.notFound}</p>
                <Link href={labsHref} className="text-[#1a2355] dark:text-blue-400 font-bold underline">{t.allLabs}</Link>
            </main>
        );
    }

    const galleryImages = [
        ...(lab.image_url ? [lab.image_url] : []),
        ...lab.gallery_images.map((g) => g.image_url),
    ]
        .map((p) => getImageUrl(p))
        .filter((u): u is string => !!u);
    // Deduplicate in case the main image also appears in the gallery.
    const uniqueGallery = Array.from(new Set(galleryImages));

    const breadcrumbs = [
        { label: t.home, href: "/" },
        { label: t.research, href: currentLang === "az" ? "/tedqiqat" : "/research" },
        { label: t.activity, href: currentLang === "az" ? "/tedqiqat/tedqiqat-fealiyyeti" : "/research/research-activity" },
        { label: t.labs, href: labsHref },
        { label: lab.title ?? "" }
    ];

    const contactRows = [
        { icon: <MeetingRoomIcon sx={{ fontSize: 18 }} />, label: t.room, value: lab.room_number },
        { icon: <PersonIcon sx={{ fontSize: 18 }} />, label: t.person, value: lab.authorized_person },
        { icon: <EmailIcon sx={{ fontSize: 18 }} />, label: t.email, value: lab.email, href: lab.email ? `mailto:${lab.email}` : undefined },
        { icon: <PhoneIcon sx={{ fontSize: 18 }} />, label: t.phone, value: lab.phone_number, href: lab.phone_number ? `tel:${lab.phone_number}` : undefined },
    ].filter((r) => r.value);

    return (
        <main className="min-h-screen bg-page dark:bg-slate-900 transition-colors pb-20">
            {/* Header Banner */}
            <div className="relative overflow-hidden bg-[#0b1330] pt-40 pb-20 px-4 md:px-10 lg:px-12 w-full min-h-[400px] flex flex-col justify-end">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-30"
                    >
                        <source src="/heroBgVideos/research.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1330] via-[#0b1330]/80 to-transparent" />
                </div>

                <div className="relative z-20 w-full">
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-1.5 text-white/50 text-sm mb-6 flex-wrap font-black uppercase tracking-[0.3em]"
                    >
                        {breadcrumbs.map((crumb, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                {crumb.href ? (
                                    <Link href={crumb.href} className="hover:text-white transition-colors flex items-center gap-1">
                                        {i === 0 && <HomeIcon sx={{ fontSize: 16 }} />}
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="text-[#ee7c7e]">{crumb.label}</span>
                                )}
                                {i < breadcrumbs.length - 1 && <ChevronRightIcon sx={{ fontSize: 13 }} />}
                            </div>
                        ))}
                    </motion.nav>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl md:text-4xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tighter max-w-4xl"
                    >
                        {lab.title}
                    </motion.h1>
                </div>
            </div>

            {/* Content Section */}
            <section className="px-4 md:px-10 lg:px-12 py-12 -mt-10 relative z-30 w-full">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description Card */}
                        {lab.html_content ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 dark:border-slate-700"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <InfoIcon />
                                    </div>
                                    <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight">
                                        {t.description}
                                    </h2>
                                </div>
                                <SanitizedHtml html={lab.html_content} className="text-gray-600 dark:text-slate-300 text-lg leading-relaxed" />
                            </motion.div>
                        ) : null}

                        {/* Objectives Card */}
                        {lab.objectives.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 dark:border-slate-700"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                        <SchoolIcon />
                                    </div>
                                    <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight">
                                        {t.objectives}
                                    </h2>
                                </div>
                                <ul className="space-y-3">
                                    {lab.objectives.map((obj) => (
                                        <li key={obj.id} className="flex items-start gap-3 text-gray-600 dark:text-slate-300 text-lg leading-relaxed font-medium">
                                            <ChevronRightIcon sx={{ fontSize: 22 }} className="text-[#ee7c7e] mt-0.5 flex-shrink-0" />
                                            <span>{obj.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ) : null}

                        {/* Gallery */}
                        {uniqueGallery.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-gray-100 dark:border-slate-700"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                        <ScienceIcon />
                                    </div>
                                    <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight">
                                        {t.gallery}
                                    </h2>
                                </div>
                                <NewsGallery images={uniqueGallery} title={lab.title ?? ""} />
                            </motion.div>
                        ) : null}
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="space-y-8">
                        {/* Department Info */}
                        {cafedraName ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-[#1a2355] rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-900/20"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                        <BusinessIcon />
                                    </div>
                                    <h3 className="text-sm font-black uppercase tracking-widest text-white/60">
                                        {t.department}
                                    </h3>
                                </div>
                                <p className="text-xl font-black leading-tight">
                                    {cafedraName}
                                </p>
                            </motion.div>
                        ) : null}

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-slate-700"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                                    <ContactSupportIcon />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">
                                    {t.contact}
                                </h3>
                            </div>
                            {contactRows.length > 0 ? (
                                <ul className="space-y-4">
                                    {contactRows.map((row, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <span className="text-[#1a2355] dark:text-blue-400 mt-0.5">{row.icon}</span>
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{row.label}</p>
                                                {row.href ? (
                                                    <a href={row.href} className="text-[#1a2355] dark:text-white font-bold break-all hover:text-[#ee7c7e] transition-colors">{row.value}</a>
                                                ) : (
                                                    <p className="text-[#1a2355] dark:text-white font-bold break-all">{row.value}</p>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-[#1a2355] dark:text-white font-bold">{t.noInfo}</p>
                            )}
                        </motion.div>

                        {/* Quick Action */}
                        <Link
                            href={labsHref}
                            className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 group hover:bg-gray-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                        >
                            <span className="font-black uppercase tracking-widest text-xs text-[#1a2355] dark:text-blue-400">
                                {t.allLabs}
                            </span>
                            <ChevronRightIcon className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
