"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ConstructionIcon from "@mui/icons-material/Construction";
import AzTULogo from "@/../public/logo/aztu-logo-light.png";

type Bilingual = { az: string; en: string };

type SectionCopy = {
    badge: Bilingual;
    title: Bilingual;
    description: Bilingual;
    parentLabel?: Bilingual;
    parentHrefAz?: string;
    parentHrefEn?: string;
};

const DEFAULT_COPY: SectionCopy = {
    badge: { az: "Hazırlanır", en: "Under construction" },
    title: { az: "Səhifə hazırlanır", en: "Page is being prepared" },
    description: {
        az: "Axtardığınız səhifə hazırlanır və ya köçürülüb. Tezliklə xidmətinizdə olacaq.",
        en: "The page you are looking for is being prepared or has been moved. We will be back online very soon.",
    },
};

const SECTION_MAP: Record<string, SectionCopy> = {
    about: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Haqqımızda bölməsi hazırlanır", en: "About section is being prepared" },
        description: {
            az: "Universitet tarixi, missiya, vizyon və rəhbərlik üzrə məzmun hazırlanır. Tezliklə xidmətinizdə olacaq.",
            en: "Content for university history, mission, vision and leadership is being prepared. It will be available soon.",
        },
        parentLabel: { az: "Haqqımızda", en: "About" },
        parentHrefAz: "/haqqimizda",
        parentHrefEn: "/about",
    },
    haqqimizda: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Haqqımızda bölməsi hazırlanır", en: "About section is being prepared" },
        description: {
            az: "Universitet tarixi, missiya, vizyon və rəhbərlik üzrə məzmun hazırlanır. Tezliklə xidmətinizdə olacaq.",
            en: "Content for university history, mission, vision and leadership is being prepared. It will be available soon.",
        },
        parentLabel: { az: "Haqqımızda", en: "About" },
        parentHrefAz: "/haqqimizda",
        parentHrefEn: "/about",
    },
    tehsil: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Təhsil bölməsi hazırlanır", en: "Education section is being prepared" },
        description: {
            az: "Bakalavr, magistratura, kredit sistemi və tədris proqramları üzrə məzmun hazırlanır.",
            en: "Content for bachelor's, master's, credit system and curricula is being prepared.",
        },
        parentLabel: { az: "Təhsil", en: "Education" },
        parentHrefAz: "/tehsil",
        parentHrefEn: "/tehsil",
    },
    faculties: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Fakültə səhifəsi hazırlanır", en: "Faculty page is being prepared" },
        description: {
            az: "Fakültə, kafedra və ixtisaslar üzrə məzmun hazırlanır. Tezliklə yenilənəcək.",
            en: "Content for faculties, departments and specialties is being prepared. It will be updated soon.",
        },
        parentLabel: { az: "Fakültələr", en: "Faculties" },
        parentHrefAz: "/faculties",
        parentHrefEn: "/faculties",
    },
    fakulteler: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Fakültə səhifəsi hazırlanır", en: "Faculty page is being prepared" },
        description: {
            az: "Fakültə, kafedra və ixtisaslar üzrə məzmun hazırlanır. Tezliklə yenilənəcək.",
            en: "Content for faculties, departments and specialties is being prepared. It will be updated soon.",
        },
        parentLabel: { az: "Fakültələr", en: "Faculties" },
        parentHrefAz: "/faculties",
        parentHrefEn: "/faculties",
    },
    news: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Xəbər tapılmadı", en: "News article not found" },
        description: {
            az: "Axtardığınız xəbər mövcud deyil və ya hazırlanır. Bütün xəbərlər bölməsinə baxa bilərsiniz.",
            en: "The news article you are looking for does not exist or is being prepared. You can browse all news.",
        },
        parentLabel: { az: "Bütün xəbərlər", en: "All news" },
        parentHrefAz: "/news",
        parentHrefEn: "/news",
    },
    announcement: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Elan tapılmadı", en: "Announcement not found" },
        description: {
            az: "Axtardığınız elan mövcud deyil və ya hazırlanır.",
            en: "The announcement you are looking for does not exist or is being prepared.",
        },
        parentLabel: { az: "Elanlar", en: "Announcements" },
        parentHrefAz: "/announcement",
        parentHrefEn: "/announcement",
    },
    media: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Media bölməsi hazırlanır", en: "Media section is being prepared" },
        description: {
            az: "Media qalereya və materiallar hazırlanır. Tezliklə yenilənəcək.",
            en: "Media gallery and materials are being prepared. It will be updated soon.",
        },
        parentLabel: { az: "Media", en: "Media" },
        parentHrefAz: "/media",
        parentHrefEn: "/media",
    },
    tedqiqat: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Tədqiqat bölməsi hazırlanır", en: "Research section is being prepared" },
        description: {
            az: "Elmi jurnallar, konfranslar, tədqiqat fəaliyyəti və nəşrlər üzrə məzmun hazırlanır.",
            en: "Content for scientific journals, conferences, research activity and publications is being prepared.",
        },
        parentLabel: { az: "Tədqiqat", en: "Research" },
        parentHrefAz: "/tedqiqat",
        parentHrefEn: "/research",
    },
    research: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Tədqiqat bölməsi hazırlanır", en: "Research section is being prepared" },
        description: {
            az: "Elmi jurnallar, konfranslar, tədqiqat fəaliyyəti və nəşrlər üzrə məzmun hazırlanır.",
            en: "Content for scientific journals, conferences, research activity and publications is being prepared.",
        },
        parentLabel: { az: "Tədqiqat", en: "Research" },
        parentHrefAz: "/tedqiqat",
        parentHrefEn: "/research",
    },
    beynelmillesme: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Beynəlmiləlləşmə bölməsi hazırlanır", en: "Internationalization section is being prepared" },
        description: {
            az: "Mübadilə proqramları, xarici tələbələr və beynəlxalq tərəfdaşlıq üzrə məzmun hazırlanır.",
            en: "Content for exchange programs, international students and partnerships is being prepared.",
        },
        parentLabel: { az: "Beynəlmiləlləşmə", en: "Internationalization" },
        parentHrefAz: "/beynelmillesme",
        parentHrefEn: "/internationalization",
    },
    beynelxalq: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Beynəlxalq əməkdaşlıq səhifəsi hazırlanır", en: "International cooperation page is being prepared" },
        description: {
            az: "Beynəlxalq əməkdaşlıq və tərəfdaşlıq üzrə məzmun hazırlanır.",
            en: "Content for international cooperation and partnerships is being prepared.",
        },
    },
    community: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "İcma bölməsi hazırlanır", en: "Community section is being prepared" },
        description: {
            az: "Tələbə təşkilatları, kampus həyatı və fəxri doktorlar üzrə məzmun hazırlanır.",
            en: "Content for student organizations, campus life and honorary doctors is being prepared.",
        },
        parentLabel: { az: "İcma", en: "Community" },
        parentHrefAz: "/icma",
        parentHrefEn: "/community",
    },
    icma: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "İcma bölməsi hazırlanır", en: "Community section is being prepared" },
        description: {
            az: "Tələbə təşkilatları, kampus həyatı və fəxri doktorlar üzrə məzmun hazırlanır.",
            en: "Content for student organizations, campus life and honorary doctors is being prepared.",
        },
        parentLabel: { az: "İcma", en: "Community" },
        parentHrefAz: "/icma",
        parentHrefEn: "/community",
    },
    idareetme: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "İdarəetmə bölməsi hazırlanır", en: "Management section is being prepared" },
        description: {
            az: "Struktur bölmələr, ofislər və mərkəzlər üzrə məzmun hazırlanır.",
            en: "Content for structural units, offices and centers is being prepared.",
        },
        parentLabel: { az: "İdarəetmə", en: "Management" },
        parentHrefAz: "/idareetme",
        parentHrefEn: "/management",
    },
    administration: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "İdarəetmə bölməsi hazırlanır", en: "Administration section is being prepared" },
        description: {
            az: "Universitet idarəetməsi üzrə məzmun hazırlanır.",
            en: "Content for university administration is being prepared.",
        },
    },
    struktur: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Struktur səhifəsi hazırlanır", en: "Structure page is being prepared" },
        description: {
            az: "Struktur bölmələr üzrə məzmun hazırlanır. Tezliklə yenilənəcək.",
            en: "Content for structural units is being prepared. It will be updated soon.",
        },
    },
    "niye-aztu": {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Niyə AzTU bölməsi hazırlanır", en: "Why AzTU section is being prepared" },
        description: {
            az: "Universitetimizin üstünlükləri və imkanları haqqında məlumat hazırlanır.",
            en: "Information about our university's advantages and opportunities is being prepared.",
        },
        parentLabel: { az: "Niyə AzTU", en: "Why AzTU" },
        parentHrefAz: "/niye-aztu",
        parentHrefEn: "/niye-aztu",
    },
    sosial: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Sosial bölməsi hazırlanır", en: "Social section is being prepared" },
        description: {
            az: "Sosial xidmətlər və imkanlar üzrə məzmun hazırlanır.",
            en: "Content for social services and opportunities is being prepared.",
        },
    },
    kts: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Keyfiyyət Təminatı Sistemi hazırlanır", en: "Quality Assurance System is being prepared" },
        description: {
            az: "Komitə, sənədlər, akkreditasiya və sorğular üzrə məzmun hazırlanır.",
            en: "Content for committees, documents, accreditation and surveys is being prepared.",
        },
        parentLabel: { az: "KTS", en: "QAS" },
        parentHrefAz: "/kts",
        parentHrefEn: "/kts",
    },
    projects: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Layihə tapılmadı", en: "Project not found" },
        description: {
            az: "Axtardığınız layihə mövcud deyil və ya hazırlanır.",
            en: "The project you are looking for does not exist or is being prepared.",
        },
        parentLabel: { az: "Layihələr", en: "Projects" },
        parentHrefAz: "/projects",
        parentHrefEn: "/projects",
    },
    sustainability: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Davamlılıq bölməsi hazırlanır", en: "Sustainability section is being prepared" },
        description: {
            az: "Davamlı inkişaf və ekoloji təşəbbüslər üzrə məzmun hazırlanır.",
            en: "Content for sustainability and environmental initiatives is being prepared.",
        },
    },
    cafedras: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Kafedra səhifəsi hazırlanır", en: "Department page is being prepared" },
        description: {
            az: "Kafedra məzmunu hazırlanır. Tezliklə yenilənəcək.",
            en: "Department content is being prepared. It will be updated soon.",
        },
    },
    "virtual-tour": {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Virtual tur hazırlanır", en: "Virtual tour is being prepared" },
        description: {
            az: "Universitetin virtual turu hazırlanır. Tezliklə xidmətinizdə olacaq.",
            en: "The university's virtual tour is being prepared. It will be available soon.",
        },
    },
    elaqe: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "Əlaqə səhifəsi hazırlanır", en: "Contact page is being prepared" },
        description: {
            az: "Əlaqə məlumatları yenilənir.",
            en: "Contact information is being updated.",
        },
    },
    faq: {
        badge: { az: "Hazırlanır", en: "Under construction" },
        title: { az: "FAQ bölməsi hazırlanır", en: "FAQ section is being prepared" },
        description: {
            az: "Tez-tez verilən suallar bölməsi yenilənir.",
            en: "The frequently asked questions section is being updated.",
        },
    },
};

type Props = {
    section?: keyof typeof SECTION_MAP | string;
    title?: Bilingual;
    description?: Bilingual;
    badge?: Bilingual;
    parentLabel?: Bilingual;
    parentHrefAz?: string;
    parentHrefEn?: string;
};

function getLangFromPathname(pathname: string): "az" | "en" {
    const first = pathname.split("/").filter(Boolean)[0];
    return first === "en" ? "en" : "az";
}

function getSectionFromPathname(pathname: string): string | null {
    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0];
    if (first === "az" || first === "en") {
        return segments[1] ?? null;
    }
    return first ?? null;
}

export default function SectionUnderConstruction(props: Props) {
    const router = useRouter();
    const pathname = usePathname() ?? "/";
    const lang = getLangFromPathname(pathname);

    const inferredSection = props.section ?? getSectionFromPathname(pathname);
    const mapped = inferredSection ? SECTION_MAP[inferredSection] : undefined;
    const copy: SectionCopy = {
        badge: props.badge ?? mapped?.badge ?? DEFAULT_COPY.badge,
        title: props.title ?? mapped?.title ?? DEFAULT_COPY.title,
        description: props.description ?? mapped?.description ?? DEFAULT_COPY.description,
        parentLabel: props.parentLabel ?? mapped?.parentLabel,
        parentHrefAz: props.parentHrefAz ?? mapped?.parentHrefAz,
        parentHrefEn: props.parentHrefEn ?? mapped?.parentHrefEn,
    };

    const homeHref = lang === "en" ? "/en" : "/az";
    const parentHref = lang === "en" ? copy.parentHrefEn : copy.parentHrefAz;

    const labels = {
        home: { az: "Ana səhifə", en: "Home" },
        back: { az: "Geri qayıt", en: "Go back" },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0b1330] via-[#1a2355] to-[#13365E] flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-white/4 blur-3xl pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#3b82f6]/10 blur-3xl pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/2 blur-3xl pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center text-center max-w-xl gap-5">
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-20 h-20 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center backdrop-blur-sm"
                >
                    <ConstructionIcon sx={{ fontSize: 36, color: "#93c5fd" }} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/30 text-[#93c5fd] text-xs font-bold uppercase tracking-[0.12em]"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-60" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]" />
                    </span>
                    {copy.badge[lang]}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.25 }}
                    className="text-3xl md:text-5xl font-bold text-white leading-tight"
                >
                    {copy.title[lang]}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.35 }}
                    className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg"
                >
                    {copy.description[lang]}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.45 }}
                    className="flex flex-wrap items-center justify-center gap-3 mt-3"
                >
                    <Link
                        href={homeHref}
                        className="inline-flex items-center gap-2 bg-white text-[#1a2355] font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors duration-200 shadow-lg"
                    >
                        <HomeIcon sx={{ fontSize: 20 }} />
                        {labels.home[lang]}
                    </Link>
                    {parentHref && copy.parentLabel ? (
                        <Link
                            href={parentHref}
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200 border border-white/15"
                        >
                            <ArrowBackIcon sx={{ fontSize: 20 }} />
                            {copy.parentLabel[lang]}
                        </Link>
                    ) : (
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200 border border-white/15"
                        >
                            <ArrowBackIcon sx={{ fontSize: 20 }} />
                            {labels.back[lang]}
                        </button>
                    )}
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="absolute bottom-8 opacity-30"
            >
                <Image src={AzTULogo} alt="AzTU" width={72} priority />
            </motion.div>
        </div>
    );
}
