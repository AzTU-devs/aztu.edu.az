import type { Metadata } from "next";
import Script from "next/script";
import { parseNewsSlug } from "@/util/slugify";
import {
    buildMetadata,
    breadcrumbJsonLd,
    stripHtml,
    SITE_URL,
    SITE_NAME_AZ,
    PUBLISHER_JSONLD,
    absUrl,
} from "@/util/seo";
import { fetchNewsDetail, fetchNewsList } from "@/util/fetchers";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id: slug } = await params;
    const id = parseNewsSlug(slug);
    if (!Number.isFinite(id)) {
        return buildMetadata({
            titleAz: "Xəbər tapılmadı",
            descriptionAz: "Bu xəbər tapılmadı.",
            pathAz: `/news/${slug}`,
            noindex: true,
        });
    }
    const [az, en] = await Promise.all([fetchNewsDetail(id, "az"), fetchNewsDetail(id, "en")]);
    const detail = az ?? en;
    if (!detail) {
        return buildMetadata({
            titleAz: "Xəbər tapılmadı",
            descriptionAz: "Bu xəbər tapılmadı.",
            pathAz: `/news/${slug}`,
            noindex: true,
        });
    }

    const titleAz = detail.az_title || detail.en_title;
    const titleEn = detail.en_title || detail.az_title;
    const descAz = stripHtml(detail.az_html_content || detail.en_html_content);
    const descEn = stripHtml(detail.en_html_content || detail.az_html_content);

    // Dates may not be on the detail endpoint — fall back to the list endpoint which has created_at.
    const list = await fetchNewsList({ start: 0, end: 200, lang: "az" });
    const listEntry = list.find((n) => n.news_id === id);
    const publishedTime = detail.published_date ?? detail.created_at ?? listEntry?.created_at;
    const modifiedTime = detail.updated_at ?? publishedTime;

    return buildMetadata({
        titleAz,
        titleEn,
        descriptionAz: descAz,
        descriptionEn: descEn,
        pathAz: `/news/${slug}`,
        localeUrls: { az: `/az/news/${slug}`, en: `/en/news/${slug}` },
        image: absUrl(detail.cover_image),
        type: "article",
        section: detail.category_id,
        publishedTime,
        modifiedTime,
        keywords: [
            "AzTU xəbər",
            "AzTU news",
            detail.category_id,
            titleAz,
            "Azərbaycan Texniki Universiteti",
        ].filter(Boolean),
    });
}

export default async function NewsDetailLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const { id: slug } = await params;
    const id = parseNewsSlug(slug);
    const detail = Number.isFinite(id) ? await fetchNewsDetail(id, "az") : null;

    let datePublished: string | undefined;
    let dateModified: string | undefined;
    if (detail) {
        const list = await fetchNewsList({ start: 0, end: 200, lang: "az" });
        const listEntry = list.find((n) => n.news_id === id);
        datePublished = detail.published_date ?? detail.created_at ?? listEntry?.created_at;
        dateModified = detail.updated_at ?? datePublished;
    }

    const articleJsonLd = detail
        ? {
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "@id": `${SITE_URL}/az/news/${slug}#article`,
              headline: detail.az_title,
              alternativeHeadline: detail.en_title,
              description: stripHtml(detail.az_html_content),
              image: [
                  absUrl(detail.cover_image),
                  ...(detail.gallery_images?.map((g) => absUrl(g.image)) ?? []),
              ].filter(Boolean),
              mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/az/news/${slug}` },
              articleSection: detail.category_id,
              inLanguage: "az-AZ",
              isAccessibleForFree: true,
              datePublished,
              dateModified,
              author: {
                  "@type": "Organization",
                  name: SITE_NAME_AZ,
                  url: SITE_URL,
              },
              publisher: PUBLISHER_JSONLD,
          }
        : null;

    const breadcrumb = breadcrumbJsonLd([
        { name: "Ana səhifə", path: "/az" },
        { name: "Xəbərlər", path: "/az/news" },
        { name: detail?.az_title ?? "Xəbər", path: `/az/news/${slug}` },
    ]);

    return (
        <>
            {articleJsonLd && (
                <Script
                    id={`ld-news-${id}`}
                    type="application/ld+json"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
                />
            )}
            <Script
                id={`ld-breadcrumb-news-${id}`}
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            {children}
        </>
    );
}

export const dynamicParams = true;
export const revalidate = 30;
// suppress unused
void SITE_NAME_AZ;
