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
    /** Canonical path used as the real URL (no locale prefix). Must start with `/`. */
    pathAz: string;
    /** Optional alternate path. Currently unused (the site does not have separate localized URLs). Reserved for future `[lang]` migration. */
    pathEn?: string;
    /**
     * Real, locale-prefixed URLs that actually return 200 (e.g. `/az/news/…`,
     * `/en/news/…`). The site is served under `/az` and `/en` prefixes (the
     * middleware 307-redirects prefix-less paths), so when these are provided the
     * canonical, hreflang and og:url point at the non-redirecting `/az` URL with a
     * proper `/en` alternate — instead of a prefix-less URL that redirects.
     */
    localeUrls?: { az: string; en: string };
    keywords?: string[];
    image?: string;
    type?: "website" | "article" | "profile";
    publishedTime?: string;
    modifiedTime?: string;
    authors?: string[];
    section?: string;
    noindex?: boolean;
}

/**
 * Resolve any image path to an absolute URL suitable for OG/Twitter/JSON-LD.
 * - Already absolute (http/https) → returned as-is.
 * - Site-relative (starts with `/`) → prepended with SITE_URL.
 * - Bare path → prepended with API base.
 * - Empty/null → falls back to default OG image on SITE_URL.
 */
export function absUrl(path: string | null | undefined): string {
    if (!path) return `${SITE_URL}${DEFAULT_OG_IMAGE}`;
    if (/^https?:\/\//i.test(path)) return path;
    if (path.startsWith("/")) return `${SITE_URL}${path}`;
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? SITE_URL;
    return `${apiBase.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export function buildMetadata(input: SeoInput): Metadata {
    const {
        titleAz,
        titleEn,
        descriptionAz,
        descriptionEn,
        pathAz,
        keywords,
        image,
        type = "website",
        publishedTime,
        modifiedTime,
        authors,
        section,
        noindex,
        localeUrls,
    } = input;

    const path = pathAz.startsWith("/") ? pathAz : `/${pathAz}`;
    const prefixless = path === "/" ? "/" : path;
    const withSlash = (p: string) => (p.startsWith("/") ? p : `/${p}`);

    // When real /az + /en URLs are supplied, canonical/hreflang/og:url use the
    // non-redirecting /az URL with a proper /en alternate. Otherwise fall back to
    // the prefix-less path (legacy behaviour).
    const canonical = localeUrls ? withSlash(localeUrls.az) : prefixless;
    const languages = localeUrls
        ? {
              "az-AZ": withSlash(localeUrls.az),
              "en-US": withSlash(localeUrls.en),
              "x-default": withSlash(localeUrls.az),
          }
        : {
              "az-AZ": prefixless,
              "en-US": prefixless,
              "x-default": prefixless,
          };
    const ogImage = absUrl(image);

    return {
        title: titleAz,
        description: descriptionAz,
        keywords,
        alternates: {
            canonical,
            languages,
        },
        openGraph: {
            type: type === "profile" ? "profile" : type,
            locale: "az_AZ",
            alternateLocale: ["en_US"],
            url: canonical,
            siteName: SITE_NAME_AZ,
            title: titleAz,
            description: descriptionAz,
            images: [
                {
                    url: ogImage,
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
            images: [ogImage],
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

/**
 * Organization publisher block reused across article-type JSON-LD.
 * Matches the @id from the root CollegeOrUniversity in app/layout.tsx.
 */
export const PUBLISHER_JSONLD = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME_AZ,
    url: SITE_URL,
    logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo/aztu-logo-light.png`,
    },
} as const;
