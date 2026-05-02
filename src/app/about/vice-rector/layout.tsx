import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Prorektorlar | Azərbaycan Texniki Universiteti",
    titleEn: "Vice-Rectors | Azerbaijan Technical University",
    descriptionAz:
        "AzTU-nun prorektorları — tədris, elm, beynəlxalq əlaqələr və ümumi məsələlər üzrə prorektorlar haqqında məlumat.",
    descriptionEn:
        "Vice-Rectors of AzTU — academic affairs, science, international relations and general affairs vice-rectors.",
    pathAz: "/haqqimizda/rehbetlik-ve-idareetme/prorektor",
    pathEn: "/about/leadership-and-management/vice-rector",
    keywords: [
        "AzTU prorektor",
        "AzTU vice-rector",
        "AzTU vice rector",
        "AzTU rəhbərlik",
    ],
});

const breadcrumb = breadcrumbJsonLd([
    { name: "Ana səhifə", path: "/az" },
    { name: "Haqqımızda", path: "/az/haqqimizda" },
    { name: "Rəhbərlik və idarəetmə", path: "/az/haqqimizda/rehbetlik-ve-idareetme" },
    { name: "Prorektor", path: "/az/haqqimizda/rehbetlik-ve-idareetme/prorektor" },
]);

export default function ViceRectorLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Script
                id="ld-breadcrumb-vice-rector"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            {children}
        </>
    );
}

void SITE_URL;
