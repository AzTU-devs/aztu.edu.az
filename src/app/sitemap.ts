import type { MetadataRoute } from "next";
import { STATIC_FACULTIES, STATIC_CAFEDRAS } from "@/data/staticFaculties";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aztu.edu.az";

// Bilingual paths: AZ slug → EN slug. Both languages get an entry; we point each
// at its localised URL and emit hreflang `alternates.languages` so Google knows
// they are translations of the same page.
const ROUTES: { az: string; en: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { az: "", en: "", priority: 1.0, changeFrequency: "daily" },

    // About / haqqimizda
    { az: "haqqimizda", en: "about", priority: 0.9, changeFrequency: "monthly" },
    { az: "haqqimizda/aztu-nun-tarixi", en: "about/history-of-aztu", priority: 0.7, changeFrequency: "yearly" },
    { az: "haqqimizda/vizyon-ve-missiya", en: "about/vision-mission", priority: 0.7, changeFrequency: "yearly" },
    { az: "haqqimizda/vizyon-ve-missiya/vizyon-missiya-meqsed", en: "about/vision-mission/vizion-mission-goal", priority: 0.6, changeFrequency: "yearly" },
    { az: "haqqimizda/reytinqler", en: "about/rankings", priority: 0.7, changeFrequency: "monthly" },
    { az: "haqqimizda/rehbetlik-ve-idareetme/rektor", en: "about/leadership-and-management/rector", priority: 0.8, changeFrequency: "yearly" },
    { az: "haqqimizda/rehbetlik-ve-idareetme/rektoratliq", en: "about/leadership-and-management/rectors-office", priority: 0.7, changeFrequency: "yearly" },
    { az: "haqqimizda/rehbetlik-ve-idareetme/prorektor", en: "about/leadership-and-management/vice-rector", priority: 0.7, changeFrequency: "yearly" },
    { az: "haqqimizda/rehbetlik-ve-idareetme/elmi-sura", en: "about/leadership-and-management/scientific-board", priority: 0.6, changeFrequency: "yearly" },

    // Internationalization
    { az: "beynelmillesme", en: "internationalization", priority: 0.8, changeFrequency: "monthly" },
    { az: "beynelmillesme/beynelxalq-terefdasliq/terefdas-universitetler", en: "internationalization/international-partnership/partner-universities", priority: 0.7, changeFrequency: "monthly" },
    { az: "beynelmillesme/beynelxalq-terefdasliq/ikili-diplom-proqramlari", en: "internationalization/international-partnership/double-degree-programs", priority: 0.7, changeFrequency: "monthly" },
    { az: "beynelmillesme/beynelxalq-terefdasliq/beynelxalq-layiheler", en: "internationalization/international-partnership/international-projects", priority: 0.7, changeFrequency: "monthly" },
    { az: "beynelmillesme/beynelxalq-terefdasliq/elaqe", en: "internationalization/international-partnership/contact", priority: 0.6, changeFrequency: "yearly" },
    { az: "beynelmillesme/xarici-telebeler/qebul", en: "internationalization/foreign-students/admission", priority: 0.8, changeFrequency: "monthly" },
    { az: "beynelmillesme/xarici-telebeler/yerlesme", en: "internationalization/foreign-students/accommodation", priority: 0.7, changeFrequency: "yearly" },
    { az: "beynelmillesme/xarici-telebeler/viza-ve-miqrasiya", en: "internationalization/foreign-students/visa-and-migration", priority: 0.7, changeFrequency: "yearly" },
    { az: "beynelmillesme/xarici-telebeler/teqaud-imkanlari", en: "internationalization/foreign-students/scholarship-opportunities", priority: 0.8, changeFrequency: "monthly" },
    { az: "beynelmillesme/xarici-telebeler/hazirliq-proqrami", en: "internationalization/foreign-students/foundation-program", priority: 0.7, changeFrequency: "yearly" },
    { az: "beynelmillesme/mubadile-proqramlari/erasmus-mubadile", en: "internationalization/exchange-programs/erasmus-mobility", priority: 0.8, changeFrequency: "monthly" },
    { az: "beynelmillesme/mubadile-proqramlari/ikiterefli-mubadile", en: "internationalization/exchange-programs/bilateral-exchange", priority: 0.7, changeFrequency: "monthly" },
    { az: "beynelmillesme/mubadile-proqramlari/orhun-mubadile-proqrami", en: "internationalization/exchange-programs/orhun-exchange-program", priority: 0.7, changeFrequency: "monthly" },
    { az: "beynelmillesme/mubadile-proqramlari/terefdas-universitetler", en: "internationalization/exchange-programs/partner-universities", priority: 0.7, changeFrequency: "monthly" },

    // Education / students
    { az: "telebeler/qiymetlendirme-ve-imtahan-teskili-qaydalari", en: "students/assessment-rules", priority: 0.7, changeFrequency: "yearly" },
    { az: "telebeler/bakalavr-ve-magistratura-seviyyelerinde-kredit-sistemi", en: "students/credit-system", priority: 0.7, changeFrequency: "yearly" },
    { az: "telebeler/lms-telimatlari", en: "students/lms-guidelines", priority: 0.6, changeFrequency: "yearly" },
    { az: "telebeler/tedris-teqvimi-ve-qaydalar/2025-2026-tedris-ili-teqvimi", en: "students/academic-calendar-and-rules/academic-calendar-2025", priority: 0.6, changeFrequency: "yearly" },

    // Research
    { az: "tedqiqat", en: "research", priority: 0.8, changeFrequency: "monthly" },
    { az: "tedqiqat/tedqiqat-fealiyyeti", en: "research/research-activity", priority: 0.7, changeFrequency: "monthly" },
    { az: "tedqiqat/performans-ve-qiymetlendirme/daxili-qrant-proqramlari", en: "research/performance-and-evaluation/internal-grant-programs", priority: 0.7, changeFrequency: "monthly" },
    { az: "tedqiqat/konfranslar-ve-tedbirler/seminarlar-ve-telimler", en: "research/conferences-and-events/seminars-and-trainings", priority: 0.6, changeFrequency: "monthly" },

    // Community
    { az: "community/aztu-nun-fexrileri/honorary-doctors", en: "community/aztus-honors/honorary-doctors", priority: 0.5, changeFrequency: "yearly" },
    { az: "community/aztu-nun-fexrileri/our-heroes", en: "community/aztus-honors/our-heroes", priority: 0.5, changeFrequency: "yearly" },
    { az: "haqqimizda/rehbetlik-ve-idareetme/sabiq-rektorlarimiz", en: "about/leadership-and-management/former-rectors", priority: 0.5, changeFrequency: "yearly" },

    // News / Announcements / Media
    { az: "news", en: "news", priority: 0.9, changeFrequency: "daily" },
    { az: "announcements", en: "announcements", priority: 0.8, changeFrequency: "daily" },
    { az: "media", en: "media", priority: 0.6, changeFrequency: "weekly" },

    // Top-level standalone
    { az: "faculties", en: "faculties", priority: 0.9, changeFrequency: "monthly" },
    { az: "elaqe", en: "contact-us", priority: 0.7, changeFrequency: "yearly" },
    { az: "kts", en: "qa", priority: 0.6, changeFrequency: "monthly" },
    { az: "niye-aztu", en: "niye-aztu", priority: 0.7, changeFrequency: "yearly" },
    { az: "privacy-policy", en: "privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { az: "terms-conditions", en: "terms-conditions", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const entries: MetadataRoute.Sitemap = [];

    for (const r of ROUTES) {
        const azUrl = `${SITE_URL}/az${r.az ? `/${r.az}` : ""}`;
        const enUrl = `${SITE_URL}/en${r.en ? `/${r.en}` : ""}`;
        const alternates = {
            languages: {
                "az-AZ": azUrl,
                "en-US": enUrl,
                "x-default": azUrl,
            },
        };
        entries.push({ url: azUrl, lastModified: now, changeFrequency: r.changeFrequency, priority: r.priority, alternates });
        entries.push({ url: enUrl, lastModified: now, changeFrequency: r.changeFrequency, priority: r.priority, alternates });
    }

    // Faculty detail pages from static data
    for (const faculty of STATIC_FACULTIES) {
        const azFaculty = `${SITE_URL}/az/faculties/${faculty.faculty_id}`;
        const enFaculty = `${SITE_URL}/en/faculties/${faculty.faculty_id}`;
        const alt = {
            languages: {
                "az-AZ": azFaculty,
                "en-US": enFaculty,
                "x-default": azFaculty,
            },
        };
        entries.push({ url: azFaculty, lastModified: now, changeFrequency: "monthly", priority: 0.7, alternates: alt });
        entries.push({ url: enFaculty, lastModified: now, changeFrequency: "monthly", priority: 0.7, alternates: alt });
    }

    // Cafedra detail pages
    for (const cafedra of STATIC_CAFEDRAS) {
        const azCaf = `${SITE_URL}/az/faculties/${cafedra.faculty_id}/kafedralar/${cafedra.cafedra_id}`;
        const enCaf = `${SITE_URL}/en/faculties/${cafedra.faculty_id}/departments/${cafedra.cafedra_id}`;
        const altCaf = {
            languages: {
                "az-AZ": azCaf,
                "en-US": enCaf,
                "x-default": azCaf,
            },
        };
        entries.push({ url: azCaf, lastModified: now, changeFrequency: "monthly", priority: 0.6, alternates: altCaf });
        entries.push({ url: enCaf, lastModified: now, changeFrequency: "monthly", priority: 0.6, alternates: altCaf });
    }

    return entries;
}
