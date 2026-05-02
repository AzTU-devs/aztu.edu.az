import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aztu.edu.az";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/_next/",
                    "/admin/",
                    "/*.json$",
                    "/*?*utm_",
                ],
            },
            {
                userAgent: ["GPTBot", "ChatGPT-User", "CCBot", "Google-Extended", "anthropic-ai", "Claude-Web"],
                disallow: "/",
            },
        ],
        sitemap: [
            `${SITE_URL}/sitemap.xml`,
            `${SITE_URL}/news-sitemap.xml`,
        ],
        host: SITE_URL,
    };
}
