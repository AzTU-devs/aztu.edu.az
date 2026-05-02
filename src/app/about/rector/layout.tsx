import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Rektor — Vilayət Vəliyev | Azərbaycan Texniki Universiteti",
    titleEn: "Rector — Vilayet Valiyev | Azerbaijan Technical University",
    descriptionAz:
        "Azərbaycan Texniki Universitetinin rektoru — texnika elmləri doktoru, professor Vilayət Vəliyev. Tərcümeyi-hal, akademik nailiyyətlər və əlaqə məlumatları.",
    descriptionEn:
        "Rector of Azerbaijan Technical University — Doctor of Technical Sciences, Professor Vilayet Valiyev. Biography, academic achievements and contact information.",
    pathAz: "/haqqimizda/rehbetlik-ve-idareetme/rektor",
    pathEn: "/about/leadership-and-management/rector",
    keywords: [
        "AzTU rektor",
        "AzTU rector",
        "Vilayət Vəliyev",
        "Vilayet Valiyev",
        "AzTU rəhbərlik",
        "Rector Azerbaijan Technical University",
    ],
    image: "/vilayet_veliyev.jpg",
    type: "profile",
});

const rectorJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/az/haqqimizda/rehbetlik-ve-idareetme/rektor#person`,
    name: "Vilayət Vəliyev",
    alternateName: "Vilayet Valiyev",
    jobTitle: "Rektor",
    description:
        "Azərbaycan Texniki Universitetinin rektoru — texnika elmləri doktoru, professor.",
    image: `${SITE_URL}/vilayet_veliyev.jpg`,
    email: "rector@aztu.edu.az",
    worksFor: { "@id": `${SITE_URL}/#organization` },
    affiliation: { "@id": `${SITE_URL}/#organization` },
    honorificPrefix: "Prof. Dr.",
    hasOccupation: {
        "@type": "Occupation",
        name: "Rector",
        occupationLocation: { "@id": `${SITE_URL}/#organization` },
    },
    knowsLanguage: ["az", "en", "ru"],
};

const breadcrumb = breadcrumbJsonLd([
    { name: "Ana səhifə", path: "/az" },
    { name: "Haqqımızda", path: "/az/haqqimizda" },
    { name: "Rəhbərlik və idarəetmə", path: "/az/haqqimizda/rehbetlik-ve-idareetme" },
    { name: "Rektor", path: "/az/haqqimizda/rehbetlik-ve-idareetme/rektor" },
]);

export default function RectorLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Script
                id="ld-rector"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(rectorJsonLd) }}
            />
            <Script
                id="ld-breadcrumb-rector"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            {children}
        </>
    );
}
