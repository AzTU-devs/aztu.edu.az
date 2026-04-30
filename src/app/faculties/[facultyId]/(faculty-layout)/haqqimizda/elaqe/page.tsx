"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import StaffPageHeader from "@/components/faculty/StaffPageHeader";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { getFacultyBySlug } from "@/services/facultyService/facultyService";
import type { FacultyDetail } from "@/types/faculty";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
    params: Promise<{ facultyId: string }>;
}

const FIELD_PALETTES = [
    {
        gradient: "from-blue-600 to-indigo-700",
        soft: "from-blue-500/10 to-indigo-500/5",
        glow: "shadow-blue-500/30",
    },
    {
        gradient: "from-emerald-500 to-teal-600",
        soft: "from-emerald-500/10 to-teal-500/5",
        glow: "shadow-emerald-500/30",
    },
    {
        gradient: "from-[#ee7c7e] to-[#f97316]",
        soft: "from-[#ee7c7e]/10 to-orange-500/5",
        glow: "shadow-[#ee7c7e]/30",
    },
    {
        gradient: "from-amber-500 to-orange-600",
        soft: "from-amber-500/10 to-orange-500/5",
        glow: "shadow-amber-500/30",
    },
];

export default function ElaqePage({ params }: Props) {
    const { facultyId: facultySlug } = use(params);
    const { lang: currentLang } = useLanguage();
    const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
    const [, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getFacultyBySlug(facultySlug, currentLang)
            .then((result) => {
                setFaculty(result);
                setLoading(false);
            })
            .catch(() => {
                setFaculty(null);
                setLoading(false);
            });
    }, [facultySlug, currentLang]);

    const director = faculty?.director;

    const contactFields = [
        {
            icon: LocationOnIcon,
            label: currentLang === "az" ? "Ünvan" : "Office Address",
            value: director?.room_number
                ? `${currentLang === "az" ? "Otaq" : "Room"} ${director.room_number}`
                : currentLang === "az"
                    ? "Bina 6, AzTU"
                    : "Building 6, AzTU",
            sub: currentLang === "az" ? "H.Cavid pr. 25, Bakı" : "25 H.Javid Ave, Baku",
        },
        {
            icon: PhoneIcon,
            label: currentLang === "az" ? "Telefon" : "Direct Phone",
            value: director?.phone ?? "+994 12 539 12 34",
            href: director?.phone ? `tel:${director.phone.replace(/\s+/g, "")}` : undefined,
        },
        {
            icon: EmailIcon,
            label: currentLang === "az" ? "E-poçt" : "Official Email",
            value: director?.email ?? "faculty@aztu.edu.az",
            href: director?.email ? `mailto:${director.email}` : undefined,
        },
        {
            icon: AccessTimeIcon,
            label: currentLang === "az" ? "Qəbul saatları" : "Office Hours",
            value: director?.working_hours?.[0]
                ? `${director.working_hours[0].day}: ${director.working_hours[0].time_range}`
                : currentLang === "az"
                    ? "Bazar ertəsi – Cümə"
                    : "Mon – Fri",
            sub: !director?.working_hours?.[0] ? "09:00 – 18:00" : undefined,
        },
    ];

    return (
        <div className="space-y-10">
            <StaffPageHeader
                icon={ContactSupportIcon}
                eyebrow={currentLang === "az" ? "Birbaşa əlaqə" : "Get in touch"}
                title={currentLang === "az" ? "Fakültə ilə əlaqə" : "Contact the Faculty"}
                description={
                    currentLang === "az"
                        ? "Fakültənin fəaliyyəti, qəbul qaydaları və digər suallarınızla bağlı dekanlıqla birbaşa əlaqə saxlaya bilərsiniz."
                        : "Reach out to the dean's office for any questions about faculty activities, admissions, or partnerships."
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactFields.map((field, idx) => {
                    const palette = FIELD_PALETTES[idx % FIELD_PALETTES.length];
                    const Icon = field.icon;
                    const Wrapper: React.ElementType = field.href ? "a" : "div";
                    const wrapperProps = field.href ? { href: field.href } : {};
                    return (
                        <motion.div
                            key={field.label}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.06, duration: 0.5 }}
                        >
                            <Wrapper
                                {...wrapperProps}
                                className={`group relative block overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900/70 backdrop-blur-xl border-2 border-[#1a2355]/10 dark:border-white/10 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-transparent hover:shadow-2xl ${palette.glow}`}
                            >
                                <div
                                    className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${palette.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${palette.soft} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                                />
                                <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#ee7c7e]/10 blur-3xl rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-125" />

                                <div className="relative z-10 flex items-start gap-5">
                                    <div
                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${palette.gradient} text-white flex items-center justify-center shrink-0 shadow-md ${palette.glow}`}
                                    >
                                        <Icon sx={{ fontSize: 24 }} />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ee7c7e] mb-2">
                                            {field.label}
                                        </p>
                                        <p className="text-base md:text-lg font-black text-[#1a2355] dark:text-white break-words group-hover:text-[#ee7c7e] transition-colors">
                                            {field.value}
                                        </p>
                                        {field.sub && (
                                            <p className="text-sm font-medium text-gray-500 dark:text-slate-400 mt-1">
                                                {field.sub}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Wrapper>
                        </motion.div>
                    );
                })}
            </div>

            {/* LOCATION CARD */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="relative overflow-hidden rounded-[2.5rem] bg-[#1a2355] text-white p-8 md:p-12"
            >
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ee7c7e]/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/15 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-5">
                        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#ee7c7e] mb-3">
                            {currentLang === "az" ? "Məkanımız" : "Our location"}
                        </p>
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight mb-4">
                            {currentLang === "az"
                                ? "Azərbaycan Texniki Universiteti"
                                : "Azerbaijan Technical University"}
                        </h2>
                        <p className="text-sm text-white/60 leading-relaxed">
                            {currentLang === "az"
                                ? "Fakültə binası AzTU-nun əsas kampusunda, H.Cavid prospekti 25 ünvanında yerləşir."
                                : "The faculty is located on the main AzTU campus at 25 H.Javid Avenue."}
                        </p>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="relative w-full h-64 lg:h-72 rounded-[2rem] overflow-hidden border-4 border-white/10 bg-gradient-to-br from-white/5 to-transparent flex flex-col items-center justify-center">
                            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center shadow-2xl mb-4 backdrop-blur-md">
                                <LocationOnIcon sx={{ fontSize: 40, color: "#ee7c7e" }} />
                            </div>
                            <p className="text-white font-black uppercase tracking-widest text-xs">
                                {currentLang === "az" ? "6-cı tədris korpusu" : "Building 6"}
                            </p>
                            <p className="text-white/40 text-[10px] font-bold mt-1">
                                H. Javid Ave 25 · AZ 1073 · Baku
                            </p>
                            <div className="mt-6 flex gap-3">
                                <span className="h-2 w-2 rounded-full bg-[#ee7c7e] animate-ping" />
                                <span
                                    className="h-2 w-2 rounded-full bg-[#ee7c7e] animate-ping"
                                    style={{ animationDelay: "0.2s" }}
                                />
                                <span
                                    className="h-2 w-2 rounded-full bg-[#ee7c7e] animate-ping"
                                    style={{ animationDelay: "0.4s" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
