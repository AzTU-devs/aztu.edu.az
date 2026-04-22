"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import { useLanguage } from "@/context/LanguageContext";
import SecurityIcon from "@mui/icons-material/Security";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GavelIcon from "@mui/icons-material/Gavel";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

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
        title: "Məxfilik Siyasəti",
        description: "Azərbaycan Texniki Universiteti (AzTU) istifadəçilərin fərdi məlumatlarının məxfiliyinə və təhlükəsizliyinə böyük önəm verir.",
        breadcrumb: "Məxfilik Siyasəti",
        lastUpdated: "Son yenilənmə: 22 Aprel, 2026",
        sections: [
            {
                title: "Məlumatların toplanması",
                icon: <VisibilityIcon />,
                content: "Biz yalnız veb-saytımızdan istifadə zamanı təqdim etdiyiniz zəruri məlumatları toplayırıq. Bura əlaqə formaları vasitəsilə göndərilən ad, soyad, e-poçt ünvanı və digər könüllü məlumatlar daxildir."
            },
            {
                title: "Məlumatların istifadəsi",
                icon: <SecurityIcon />,
                content: "Toplanmış məlumatlar yalnız sorğularınızın cavablandırılması, tədris xidmətlərinin keyfiyyətinin artırılması və universitet yenilikləri haqqında sizi məlumatlandırmaq məqsədilə istifadə olunur."
            },
            {
                title: "Üçüncü tərəflərlə paylaşım",
                icon: <GavelIcon />,
                content: "AzTU fərdi məlumatlarınızı heç bir halda üçüncü tərəflərə satmır və ya ötürmür. Məlumatlar yalnız qanunvericiliklə nəzərdə tutulmuş hallarda dövlət orqanlarına təqdim oluna bilər."
            },
            {
                title: "Təhlükəsizlik tədbirləri",
                icon: <VerifiedUserIcon />,
                content: "Məlumatlarınızın icazəsiz girişdən, dəyişdirilmədən və ya məhv edilmədən qorunması üçün ən müasir texniki və təşkilati təhlükəsizlik tədbirləri tətbiq olunur."
            }
        ]
    },
    en: {
        eyebrow: "Legal Information",
        title: "Privacy Policy",
        description: "Azerbaijan Technical University (AzTU) is committed to protecting the privacy and security of its users' personal information.",
        breadcrumb: "Privacy Policy",
        lastUpdated: "Last updated: April 22, 2026",
        sections: [
            {
                title: "Data Collection",
                icon: <VisibilityIcon />,
                content: "We only collect necessary information provided during your use of our website. This includes name, email address, and other voluntary information sent through contact forms."
            },
            {
                title: "Use of Information",
                icon: <SecurityIcon />,
                content: "Collected data is used solely to respond to your inquiries, improve educational services, and keep you informed about university updates."
            },
            {
                title: "Sharing with Third Parties",
                icon: <GavelIcon />,
                content: "AzTU does not sell or transfer your personal data to third parties under any circumstances. Information may only be provided to state authorities in cases provided by law."
            },
            {
                title: "Security Measures",
                icon: <VerifiedUserIcon />,
                content: "Modern technical and organizational security measures are implemented to protect your data from unauthorized access, alteration, or destruction."
            }
        ]
    },
};

export default function PrivacyPolicyPage() {
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
