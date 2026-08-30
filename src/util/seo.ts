import type { Metadata } from "next";

import { LANG_HEADER } from "@/util/langHeader";

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

/**
 * Build the metadata for one page in one language.
 *
 * `lang` defaults to Azerbaijani so the existing synchronous call sites keep
 * their current behaviour; pages that want per-request localisation go through
 * {@link createMetadata} instead.
 */
export function buildMetadata(input: SeoInput, lang: Lang = "az"): Metadata {
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
    const isEn = lang === "en";
    // Fall back to the Azerbaijani copy rather than emitting an empty tag when a
    // page has not been given English strings yet.
    const title = (isEn ? titleEn : titleAz) || titleAz;
    const description = (isEn ? descriptionEn : descriptionAz) || descriptionAz;
    const siteName = isEn ? SITE_NAME_EN : SITE_NAME_AZ;

    // Canonical points at the URL for the language actually being served, so the
    // English tree stops declaring the Azerbaijani page as its canonical.
    const canonical = localeUrls
        ? withSlash(isEn ? localeUrls.en : localeUrls.az)
        : prefixless;
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

    // The root layout's title template is Azerbaijani ("%s | Azərbaycan Texniki
    // Universiteti"), so an English title has to be absolute or it ends up
    // half-translated. The site name is appended only when the page has not
    // already put a brand in its own title.
    const brandedTitle =
        /aztu|azerbaijan technical university/i.test(title) ? title : `${title} | ${SITE_NAME_EN}`;

    // The root layout appends the site name through its title template. A page
    // whose own title already carries a brand must therefore be absolute, or the
    // name is printed twice ("Haqqımızda | Azərbaycan Texniki Universiteti |
    // Azərbaycan Texniki Universiteti").
    const alreadyBranded = new RegExp(`aztu|${SITE_NAME_AZ}|${SITE_NAME_EN}`, "i").test(title);

    return {
        title: isEn ? { absolute: brandedTitle } : alreadyBranded ? { absolute: title } : title,
        description,
        keywords,
        alternates: {
            canonical,
            languages,
        },
        openGraph: {
            type: type === "profile" ? "profile" : type,
            locale: isEn ? "en_US" : "az_AZ",
            alternateLocale: [isEn ? "az_AZ" : "en_US"],
            url: canonical,
            siteName,
            title: isEn ? brandedTitle : title,
            description,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
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
            title: isEn ? brandedTitle : title,
            description,
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

/**
 * The locale of the request currently being rendered, as passed through by the
 * middleware. Server-only — `headers()` is unavailable during static rendering,
 * so anything that cannot resolve a locale falls back to Azerbaijani, which is
 * the site default.
 */
export async function resolveRequestLang(): Promise<Lang> {
    try {
        const { headers } = await import("next/headers");
        const store = await headers();
        return store.get(LANG_HEADER) === "en" ? "en" : "az";
    } catch {
        return "az";
    }
}

/**
 * Locale-aware companion to {@link buildMetadata}.
 *
 * Both language trees rewrite onto the same routes, so a statically exported
 * `metadata` object can only ever describe one of them — which is why every
 * English page used to ship an Azerbaijani `<title>` and `<meta description>`.
 * This returns a `generateMetadata` function instead, so each request gets the
 * copy for its own language:
 *
 *     export const generateMetadata = createMetadata({ … });
 *
 * The English strings are optional; a page that has not supplied them keeps the
 * Azerbaijani text rather than rendering an empty tag.
 */
export function createMetadata(input: SeoInput): () => Promise<Metadata> {
    return async function generateMetadata(): Promise<Metadata> {
        const lang = await resolveRequestLang();
        return buildMetadata(input, lang);
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
