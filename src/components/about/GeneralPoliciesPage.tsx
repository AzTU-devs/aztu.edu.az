"use client";

import AboutPageBanner from "@/components/about/AboutPageBanner";
import CmsDocumentsView from "@/components/about/CmsDocumentsView";
import { useLanguage } from "@/context/LanguageContext";

const PAGE_KEY = "policy-documents";

const COPY = {
    az: {
        eyebrow: "Normativ Sənədlər",
        title: "Ümumi Siyasətlər",
        subtitle:
            "Azərbaycan Texniki Universitetinin fəaliyyətini tənzimləyən əsas siyasət sənədləri.",
        breadcrumbAbout: "Haqqımızda",
        breadcrumbDocs: "Normativ Sənədlər",
        breadcrumbPage: "Ümumi Siyasətlər",
        hrefAbout: "/az/haqqimizda",
    },
    en: {
        eyebrow: "Regulatory Documents",
        title: "General Policies",
        subtitle:
            "The core policy documents that govern the operations of Azerbaijan Technical University.",
        breadcrumbAbout: "About",
        breadcrumbDocs: "Regulatory Documents",
        breadcrumbPage: "General Policies",
        hrefAbout: "/en/about",
    },
} as const;

export default function GeneralPoliciesPage() {
    const { lang } = useLanguage();
    const c = COPY[lang];

    return (
        <main className="min-h-screen bg-page">
            <AboutPageBanner
                eyebrow={c.eyebrow}
                title={c.title}
                subtitle={c.subtitle}
                breadcrumbs={[
                    { label: c.breadcrumbAbout, href: c.hrefAbout },
                    { label: c.breadcrumbDocs },
                    { label: c.breadcrumbPage },
                ]}
            />
            <CmsDocumentsView pageKey={PAGE_KEY} showCategories />
        </main>
    );
}
