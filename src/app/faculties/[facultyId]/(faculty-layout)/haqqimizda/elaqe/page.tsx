"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import StaffPageHeader from "@/components/faculty/StaffPageHeader";
import { FACULTY_PALETTES } from "@/components/faculty/ui";
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
                : currentLang === "az" ? "Bina 6, AzTU" : "Building 6, AzTU",
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
                : currentLang === "az" ? "Bazar ertəsi – Cümə" : "Mon – Fri",
            sub: !director?.working_hours?.[0] ? "09:00 – 18:00" : undefined,
        },
    ];

    return (
        <div className="space-y-8">
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

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {contactFields.map((field, idx) => {
                    const palette = FACULTY_PALETTES[idx % FACULTY_PALETTES.length];
                    const Icon = field.icon;
                    const Wrapper: React.ElementType = field.href ? "a" : "div";
                    const wrapperProps = field.href ? { href: field.href } : {};
                    return (
                        <motion.div
                            key={field.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.45 }}
                        >
                            <Wrapper
                                {...wrapperProps}
                                className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-slate-900 dark:hover:border-white/20"
                            >
                                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${palette.tint}`}>
                                    <Icon sx={{ fontSize: 24 }} />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#ee7c7e]">
                                        {field.label}
                                    </p>
                                    <p className="break-words text-base font-bold text-slate-900 transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                                        {field.value}
                                    </p>
                                    {field.sub && (
                                        <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{field.sub}</p>
                                    )}
                                </div>
                            </Wrapper>
                        </motion.div>
                    );
                })}
            </div>

            {/* Location */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="grid grid-cols-1 items-center gap-8 rounded-2xl bg-[#1a2355] p-8 text-white md:p-10 lg:grid-cols-12"
            >
                <div className="lg:col-span-5">
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#ee7c7e]">
                        {currentLang === "az" ? "Məkanımız" : "Our location"}
                    </p>
                    <h2 className="mb-4 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                        {currentLang === "az" ? "Azərbaycan Texniki Universiteti" : "Azerbaijan Technical University"}
                    </h2>
                    <p className="leading-relaxed text-white/60">
                        {currentLang === "az"
                            ? "Fakültə binası AzTU-nun əsas kampusunda, H.Cavid prospekti 25 ünvanında yerləşir."
                            : "The faculty is located on the main AzTU campus at 25 H.Javid Avenue."}
                    </p>
                </div>
                <div className="lg:col-span-7">
                    <div className="flex h-56 w-full flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 lg:h-64">
                        <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                            <LocationOnIcon sx={{ fontSize: 34, color: "#ee7c7e" }} />
                        </span>
                        <p className="text-sm font-bold uppercase tracking-wide">
                            {currentLang === "az" ? "6-cı tədris korpusu" : "Building 6"}
                        </p>
                        <p className="mt-1 text-[11px] font-medium text-white/40">H. Javid Ave 25 · AZ 1073 · Baku</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
