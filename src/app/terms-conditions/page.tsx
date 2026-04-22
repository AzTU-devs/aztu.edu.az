"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import { useLanguage } from "@/context/LanguageContext";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CopyrightIcon from "@mui/icons-material/Copyright";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

type Section = {
    title: string;
    content: string;
    icon: React.ReactNode;
};

type Dict = {
    eyebrow: string;
    title: string;
    description: string;
    breadcrumb: string;
    lastUpdated: string;
    sections: Section[];
};

const COPY: Record<"az" | "en", Dict> = {
    az: {
        eyebrow: "Hüquqi məlumatlar",
        title: "Şərtlər və Qaydalar",
        description: "Bu sənəd Azərbaycan Texniki Universitetinin (AzTU) rəsmi veb-saytından istifadə qaydalarını tənzimləyir.",
        breadcrumb: "Şərtlər və Qaydalar",
        lastUpdated: "Son yenilənmə: 22 Aprel, 2026",
        sections: [
            {
                title: "Ümumi müddəalar",
                icon: <AssignmentIcon />,
                content: "Veb-sayta daxil olmaqla siz bu şərtlərə tam əməl edəcəyinizi təsdiqləyirsiniz. Əgər şərtlərlə razı deyilsinizsə, saytdan istifadəni dayandırmağınız xahiş olunur."
            },
            {
                title: "Əqli mülkiyyət",
                icon: <CopyrightIcon />,
                content: "Saytda yerləşdirilən bütün materiallar (mətnlər, fotolar, loqolar) AzTU-nun mülkiyyətidir və müəlliflik hüququ ilə qorunur. İcazəsiz kopyalanması qadağandır."
            },
            {
                title: "İstifadəçi öhdəlikləri",
                icon: <BusinessCenterIcon />,
                content: "İstifadəçilər saytdan yalnız qanuni məqsədlər üçün istifadə etməli, saytın fəaliyyətinə mane olacaq hər hansı zərərli proqram təminatı və ya hərəkətlərdən çəkinməlidirlər."
            },
            {
                title: "Məsuliyyətin məhdudlaşdırılması",
                icon: <ErrorOutlineIcon />,
                content: "Universitet saytdakı məlumatların dəqiqliyinə çalışsa da, texniki səhvlərə və ya xarici keçidlərdəki məlumatlara görə məsuliyyət daşımır."
            }
        ]
    },
    en: {
        eyebrow: "Legal Information",
        title: "Terms & Conditions",
        description: "This document governs the rules for using the official website of Azerbaijan Technical University (AzTU).",
        breadcrumb: "Terms & Conditions",
        lastUpdated: "Last updated: April 22, 2026",
        sections: [
            {
                title: "General Provisions",
                icon: <AssignmentIcon />,
                content: "By accessing the website, you confirm that you will fully comply with these terms. If you do not agree with the terms, please stop using the site."
            },
            {
                title: "Intellectual Property",
                icon: <CopyrightIcon />,
                content: "All materials on the site (texts, photos, logos) are the property of AzTU and are protected by copyright. Unauthorized copying is prohibited."
            },
            {
                title: "User Obligations",
                icon: <BusinessCenterIcon />,
                content: "Users must use the site only for lawful purposes and refrain from any malicious software or actions that would interfere with the site's operation."
            },
            {
                title: "Limitation of Liability",
                icon: <ErrorOutlineIcon />,
                content: "While the University strives for accuracy of information on the site, it is not responsible for technical errors or information on external links."
            }
        ]
    },
};

export default function TermsConditionsPage() {
    const { lang } = useLanguage();
    const t = COPY[lang];

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden">
            <div className="bg-mesh" />
            <div className="bg-grid-premium" />

            <PageHero
                title={t.title}
                description={t.description}
                breadcrumbs={[{ label: t.breadcrumb }]}
                eyebrow={t.eyebrow}
            />

            <PageContainer>
                <div className="max-w-4xl mx-auto relative z-10 py-12 md:py-20">
                    <div className="mb-12 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#ee7c7e]/10 text-[#ee7c7e] text-xs font-black uppercase tracking-widest border border-[#ee7c7e]/20">
                            {t.lastUpdated}
                        </span>
                    </div>

                    <div className="space-y-12">
                        {t.sections.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative p-8 md:p-10 rounded-[2.5rem] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-2 border-[#1a2355]/5 dark:border-white/5 shadow-2xl shadow-blue-900/5 group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-[#ee7c7e]/10 transition-colors" />
                                
                                <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                                    <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#13365E] flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                                        {section.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-black text-[#1a2355] dark:text-white mb-4 tracking-tight">
                                            {section.title}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-medium">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </PageContainer>
        </main>
    );
}
