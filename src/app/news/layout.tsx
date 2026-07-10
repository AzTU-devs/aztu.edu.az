import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/util/seo";
import { fetchNewsList } from "@/util/fetchers";
import { newsSlug } from "@/util/slugify";

export const metadata: Metadata = buildMetadata({
    titleAz: "Xəbərlər",
    titleEn: "News",
    descriptionAz:
        "Azərbaycan Texniki Universitetinin son xəbərləri, akademik və beynəlxalq tədbirləri, elmi nailiyyətləri və universitet həyatına dair yeniliklər.",
    descriptionEn:
        "Latest news from Azerbaijan Technical University — academic events, international cooperation, scientific achievements and university life updates.",
    pathAz: "/news",
    localeUrls: { az: "/az/news", en: "/en/news" },
    keywords: [
        "AzTU xəbərlər",
        "AzTU news",
        "university news Azerbaijan",
        "Azərbaycan Texniki Universiteti xəbərləri",
        "Bakı universitet xəbərləri",
        "elmi xəbərlər",
        "akademik xəbərlər",
    ],
});

export default async function NewsLayout({ children }: { children: React.ReactNode }) {
    // Server-fetch first page of items for ItemList JSON-LD (helps Google
    // discover individual articles even before they index the sitemap).
    const items = await fetchNewsList({ start: 0, end: 20, lang: "az" });

    const itemListJsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "AzTU Xəbərləri",
        numberOfItems: items.length,
        itemListElement: items.map((n, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE_URL}/az/news/${newsSlug(n.news_id, n.title)}`,
            name: n.title,
        })),
    };

    const breadcrumb = breadcrumbJsonLd([
        { name: "Ana səhifə", path: "/az" },
        { name: "Xəbərlər", path: "/az/news" },
    ]);

    return (
        <>
            <Script
                id="ld-news-itemlist"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />
            <Script
                id="ld-news-breadcrumb"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            {children}
        </>
    );
}

export const revalidate = 600;
