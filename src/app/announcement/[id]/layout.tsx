import type { Metadata } from "next";
import Script from "next/script";
import {
    buildMetadata,
    breadcrumbJsonLd,
    stripHtml,
    SITE_URL,
    SITE_NAME_AZ,
    PUBLISHER_JSONLD,
    absUrl,
} from "@/util/seo";
import { fetchAnnouncementDetail, fetchAnnouncementList } from "@/util/fetchers";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const [az, en] = await Promise.all([
        fetchAnnouncementDetail(id, "az"),
        fetchAnnouncementDetail(id, "en"),
    ]);
    const detail = az ?? en;
    if (!detail) {
        return buildMetadata({
            titleAz: "Elan tapılmadı",
            descriptionAz: "Bu elan tapılmadı.",
            pathAz: `/announcement/${id}`,
            noindex: true,
        });
    }

    const titleAz = az?.title ?? detail.title;
    const titleEn = en?.title ?? detail.title;
    const descAz = stripHtml(az?.html_content ?? detail.html_content);
    const descEn = stripHtml(en?.html_content ?? detail.html_content);

    // Pull dates from list endpoint if detail endpoint omits them
    const numericId = parseInt(id, 10);
    let publishedTime = detail.published_date ?? detail.created_at;
    if (!publishedTime && Number.isFinite(numericId)) {
        const list = await fetchAnnouncementList({ start: 0, end: 200, lang: "az" });
        const entry = list.find((a) => (a.announcement_id ?? a.id) === numericId);
        publishedTime = entry?.published_date ?? entry?.created_at;
    }
    const modifiedTime = detail.updated_at ?? publishedTime;

    return buildMetadata({
        titleAz,
        titleEn,
        descriptionAz: descAz,
        descriptionEn: descEn,
        pathAz: `/announcement/${id}`,
        image: absUrl(detail.image),
        type: "article",
        section: "Announcements",
        publishedTime,
        modifiedTime,
        keywords: [
            "AzTU elan",
            "AzTU announcement",
            titleAz,
            "Azərbaycan Texniki Universiteti",
        ].filter(Boolean),
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
    const detail = await fetchAnnouncementDetail(id, "az");

    let datePublished: string | undefined;
    let dateModified: string | undefined;
    if (detail) {
        datePublished = detail.published_date ?? detail.created_at;
        if (!datePublished) {
            const numericId = parseInt(id, 10);
            const list = await fetchAnnouncementList({ start: 0, end: 200, lang: "az" });
            const entry = list.find((a) => (a.announcement_id ?? a.id) === numericId);
            datePublished = entry?.published_date ?? entry?.created_at;
        }
        dateModified = detail.updated_at ?? datePublished;
    }

    const announcementJsonLd = detail
        ? {
              "@context": "https://schema.org",
              "@type": "Article",
              "@id": `${SITE_URL}/announcement/${id}#announcement`,
              headline: detail.title,
              description: stripHtml(detail.html_content),
              ...(detail.image ? { image: [absUrl(detail.image)] } : { image: [absUrl(null)] }),
              datePublished,
              dateModified,
              mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/announcement/${id}` },
              inLanguage: "az-AZ",
              isAccessibleForFree: true,
              author: {
                  "@type": "Organization",
                  name: SITE_NAME_AZ,
                  url: SITE_URL,
              },
              publisher: PUBLISHER_JSONLD,
          }
        : null;

    const breadcrumb = breadcrumbJsonLd([
        { name: "Ana səhifə", path: "/" },
        { name: "Elanlar", path: "/announcement" },
        { name: detail?.title ?? "Elan", path: `/announcement/${id}` },
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
export const revalidate = 30;
