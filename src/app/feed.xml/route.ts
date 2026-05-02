import { fetchNewsList } from "@/util/fetchers";
import { newsSlug } from "@/util/slugify";
import { stripHtml, SITE_NAME_AZ } from "@/util/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aztu.edu.az";

export const revalidate = 600;

function escapeXml(s: string) {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export async function GET() {
    const items = await fetchNewsList({ start: 0, end: 50, lang: "az" });

    const lastBuild = items[0]?.created_at
        ? new Date(items[0].created_at).toUTCString()
        : new Date().toUTCString();

    const itemsXml = items.map((n) => {
        const link = `${SITE_URL}/news/${newsSlug(n.news_id, n.title)}`;
        const desc = stripHtml(n.html_content ?? "", 500);
        const pub = n.created_at ? new Date(n.created_at).toUTCString() : lastBuild;
        return `    <item>
      <title>${escapeXml(n.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pub}</pubDate>
      <description>${escapeXml(desc)}</description>
      ${n.cateogry_id ? `<category>${escapeXml(n.cateogry_id)}</category>` : ""}
    </item>`;
    }).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME_AZ)} — Xəbərlər</title>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Azərbaycan Texniki Universitetinin son xəbərləri.</description>
    <language>az-AZ</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
        },
    });
}
