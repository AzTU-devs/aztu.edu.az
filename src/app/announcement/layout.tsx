import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/util/seo";
import { fetchAnnouncementList } from "@/util/fetchers";
import { announcementSlug } from "@/util/slugify";

export const metadata: Metadata = buildMetadata({
    titleAz: "Elanlar",
    titleEn: "Announcements",
    descriptionAz:
        "AzTU-nun rəsmi elanları — qəbul, müsabiqələr, tədris cədvəlləri, akademik və idari bildirişlər. Vəzifə müsabiqələri və universitet xəbərləri.",
    descriptionEn:
        "Official announcements from Azerbaijan Technical University — admissions, competitions, academic schedules, administrative notices and vacancies.",
    pathAz: "/announcement",
    localeUrls: { az: "/az/announcement", en: "/en/announcement" },
    keywords: [
        "AzTU elanlar",
        "AzTU announcements",
        "qəbul elanı",
        "müsabiqə elanı",
        "vəzifə müsabiqəsi",
        "AzTU vakansiya",
        "universitet elanları",
    ],
});

export default async function AnnouncementsLayout({ children }: { children: React.ReactNode }) {
    const items = await fetchAnnouncementList({ start: 0, end: 20, lang: "az" });

    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "AzTU Elanları",
        numberOfItems: items.length,
        itemListElement: items.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/az/announcement/${announcementSlug((a.announcement_id ?? a.id) as number, a.title)}`,
            name: a.title,
        })),
    };

    const breadcrumb = breadcrumbJsonLd([
        { name: "Ana səhifə", path: "/az" },
        { name: "Elanlar", path: "/az/announcement" },
    ]);

    return (
        <>
            <Script
                id="ld-announcements-itemlist"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />
            <Script
                id="ld-announcements-breadcrumb"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            {children}
        </>
    );
}

export const revalidate = 600;
