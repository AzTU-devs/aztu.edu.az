import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata, breadcrumbJsonLd, stripHtml, SITE_URL } from "@/util/seo";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://api-aztu.karamshukurlu.site";

interface AnnouncementDetail {
    announcement_id: number;
    title: string;
    html_content: string;
    image: string | null;
    published_date?: string;
    created_at?: string;
    is_active: boolean;
}

async function fetchAnnouncement(id: string, lang: "az" | "en"): Promise<AnnouncementDetail | null> {
    try {
        const res = await fetch(`${API_BASE}/api/announcement/${id}?lang=${lang}`, {
            headers: { "Accept-Language": lang },
            next: { revalidate: 600 },
        });
        if (!res.ok) return null;
        const data = await res.json();
        if (data?.status_code !== 200) return null;
        return data.announcement as AnnouncementDetail;
    } catch {
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const [az, en] = await Promise.all([fetchAnnouncement(id, "az"), fetchAnnouncement(id, "en")]);
    const detail = az ?? en;
    if (!detail) {
        return buildMetadata({
            titleAz: "Elan tapılmadı",
            descriptionAz: "Bu elan tapılmadı.",
            pathAz: `/announcements/${id}`,
            noindex: true,
        });
    }

    const titleAz = az?.title ?? detail.title;
    const titleEn = en?.title ?? detail.title;
    const descAz = stripHtml(az?.html_content ?? detail.html_content);
    const descEn = stripHtml(en?.html_content ?? detail.html_content);

    return buildMetadata({
        titleAz,
        titleEn,
        descriptionAz: descAz,
        descriptionEn: descEn,
        pathAz: `/announcements/${id}`,
        pathEn: `/announcements/${id}`,
        image: detail.image || undefined,
        type: "article",
        section: "Announcements",
        keywords: [
            "AzTU elan",
            "AzTU announcement",
            titleAz,
            "Azərbaycan Texniki Universiteti",
        ],
    });
}

export default async function AnnouncementDetailLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const detail = await fetchAnnouncement(id, "az");

    const announcementJsonLd = detail
        ? {
              "@context": "https://schema.org",
              "@type": "Article",
              "@id": `${SITE_URL}/az/announcements/${id}#announcement`,
              headline: detail.title,
              description: stripHtml(detail.html_content),
              ...(detail.image ? { image: [detail.image] } : {}),
              datePublished: detail.published_date ?? detail.created_at,
              dateModified: detail.published_date ?? detail.created_at,
              mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/az/announcements/${id}` },
              inLanguage: "az-AZ",
              isAccessibleForFree: true,
              publisher: { "@id": `${SITE_URL}/#organization` },
              author: { "@id": `${SITE_URL}/#organization` },
          }
        : null;

    const breadcrumb = breadcrumbJsonLd([
        { name: "Ana səhifə", path: "/az" },
        { name: "Elanlar", path: "/az/announcements" },
        { name: detail?.title ?? "Elan", path: `/az/announcements/${id}` },
    ]);

    return (
        <>
            {announcementJsonLd && (
                <Script
                    id={`ld-announcement-${id}`}
                    type="application/ld+json"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(announcementJsonLd) }}
                />
            )}
            <Script
                id={`ld-breadcrumb-announcement-${id}`}
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
