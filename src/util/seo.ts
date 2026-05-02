import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aztu.edu.az";
export const SITE_NAME_AZ = "Azərbaycan Texniki Universiteti";
export const SITE_NAME_EN = "Azerbaijan Technical University";
export const DEFAULT_OG_IMAGE = "/aztu.png";

export type Lang = "az" | "en";

export interface SeoInput {
    titleAz: string;
    titleEn?: string;
    descriptionAz: string;
    descriptionEn?: string;
    pathAz: string;
    pathEn?: string;
    keywords?: string[];
    image?: string;
    type?: "website" | "article" | "profile";
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
    noindex?: boolean;
}

export function buildMetadata(input: SeoInput): Metadata {
    const {
        titleAz,
        titleEn,
        descriptionAz,
        descriptionEn,
        pathAz,
        pathEn,
        keywords,
        image = DEFAULT_OG_IMAGE,
        type = "website",
        publishedTime,
        modifiedTime,
        authors,
        section,
        noindex,
    } = input;

    const azPath = pathAz.startsWith("/") ? pathAz : `/${pathAz}`;
    const enPath = (pathEn ?? pathAz).startsWith("/") ? (pathEn ?? pathAz) : `/${pathEn ?? pathAz}`;
    const azCanonical = `/az${azPath === "/" ? "" : azPath}`;
    const enCanonical = `/en${enPath === "/" ? "" : enPath}`;

    return {
        title: titleAz,
        description: descriptionAz,
        keywords,
        alternates: {
            canonical: azCanonical,
            languages: {
                "az-AZ": azCanonical,
                "en-US": enCanonical,
                "x-default": azCanonical,
            },
        },
        openGraph: {
            type: type === "profile" ? "profile" : type,
            locale: "az_AZ",
            alternateLocale: ["en_US"],
            url: azCanonical,
            siteName: SITE_NAME_AZ,
            title: titleAz,
            description: descriptionAz,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: titleAz,
                },
            ],
            ...(type === "article"
                ? {
                      publishedTime,
                      modifiedTime,
                      authors,
                      section,
                  }
                : {}),
        },
        twitter: {
            card: "summary_large_image",
            title: titleEn ?? titleAz,
            description: descriptionEn ?? descriptionAz,
            images: [image],
        },
        robots: noindex
            ? { index: false, follow: false }
            : {
                  index: true,
                  follow: true,
                  googleBot: {
                      index: true,
                      follow: true,
                      "max-image-preview": "large",
                      "max-snippet": -1,
                      "max-video-preview": -1,
                  },
              },
    };
}

export function breadcrumbJsonLd(
    items: { name: string; path: string }[]
): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: item.name,
            item: `${SITE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
        })),
    };
}

export function stripHtml(html: string, max = 160): string {
    if (!html) return "";
    const text = html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();
    if (text.length <= max) return text;
    return text.slice(0, max - 1).trimEnd() + "…";
}
