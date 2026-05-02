import type { Metadata } from "next";
import Script from "next/script";
import { parseNewsSlug } from "@/util/slugify";
import { buildMetadata, breadcrumbJsonLd, stripHtml, SITE_URL, SITE_NAME_AZ } from "@/util/seo";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://api-aztu.karamshukurlu.site";

interface NewsDetail {
    news_id: number;
    az_title: string;
    az_html_content: string;
    en_title: string;
    en_html_content: string;
    category_id: string;
    cover_image: string;
    gallery_images?: { image: string }[];
}

async function fetchNews(id: number, lang: "az" | "en"): Promise<NewsDetail | null> {
    try {
        const res = await fetch(`${API_BASE}/api/news/${id}?lang=${lang}`, {
            headers: { "Accept-Language": lang },
            next: { revalidate: 600 },
        });
        if (!res.ok) return null;
        const data = await res.json();
        if (data?.status_code !== 200) return null;
        return data.news as NewsDetail;
    } catch {
        return null;
    }
}

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
    const [az, en] = await Promise.all([fetchNews(id, "az"), fetchNews(id, "en")]);
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

    return buildMetadata({
        titleAz,
        titleEn,
        descriptionAz: descAz,
        descriptionEn: descEn,
        pathAz: `/news/${slug}`,
        pathEn: `/news/${slug}`,
        image: detail.cover_image,
        type: "article",
        section: detail.category_id,
        keywords: [
            "AzTU xəbər",
            "AzTU news",
            detail.category_id,
            titleAz,
            "Azərbaycan Texniki Universiteti",
        ],
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
    const detail = Number.isFinite(id) ? await fetchNews(id, "az") : null;

    const articleJsonLd = detail
        ? {
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "@id": `${SITE_URL}/az/news/${slug}#article`,
              headline: detail.az_title,
              alternativeHeadline: detail.en_title,
              description: stripHtml(detail.az_html_content),
              image: [
                  detail.cover_image,
                  ...(detail.gallery_images?.map((g) => g.image) ?? []),
              ].filter(Boolean),
              mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/az/news/${slug}` },
              articleSection: detail.category_id,
              inLanguage: "az-AZ",
              isAccessibleForFree: true,
              publisher: { "@id": `${SITE_URL}/#organization` },
              author: { "@id": `${SITE_URL}/#organization` },
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
export const revalidate = 600;
// suppress unused
void SITE_NAME_AZ;
