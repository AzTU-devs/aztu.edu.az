"use client";

import AboutPageBanner from "@/components/about/AboutPageBanner";
import CmsDocumentsView from "@/components/about/CmsDocumentsView";
import { useLanguage } from "@/context/LanguageContext";

const PAGE_KEY = "sustainability-documents";

const COPY = {
    az: {
        eyebrow: "Normativ Sənədlər",
        title: "Davamlılıq Sənədləri",
        subtitle:
            "AzTU-nun davamlı inkişaf və iqlim tədbirləri çərçivəsində qəbul etdiyi əsas sənədlər.",
        crumbAbout: "Haqqımızda",
        crumbRegulatory: "Normativ Sənədlər",
        hrefAbout: "/az/haqqimizda",
        hrefRegulatory: "/az/haqqimizda/normativ-senedler",
    },
    en: {
        eyebrow: "Regulatory Documents",
        title: "Sustainability Documents",
        subtitle:
            "Core documents adopted by AzTU under its sustainable development and climate action commitments.",
        crumbAbout: "About",
        crumbRegulatory: "Regulatory Documents",
        hrefAbout: "/en/about",
        hrefRegulatory: "/en/about/regulatory-documents",
    },
} as const;

export default function SustainabilityDocumentsPage() {
    const { lang } = useLanguage();
    const c = COPY[lang];

    return (
        <main className="min-h-screen bg-page">
            <AboutPageBanner
                eyebrow={c.eyebrow}
                title={c.title}
                subtitle={c.subtitle}
                breadcrumbs={[
                    { label: c.crumbAbout, href: c.hrefAbout },
                    { label: c.crumbRegulatory, href: c.hrefRegulatory },
                    { label: c.title },
                ]}
            />
            <CmsDocumentsView pageKey={PAGE_KEY} />
        </main>
    );
}
