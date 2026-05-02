import { fetchNewsList } from "@/util/fetchers";
import { newsSlug } from "@/util/slugify";
import { SITE_NAME_AZ } from "@/util/seo";

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
    const items = await fetchNewsList({ start: 0, end: 1000, lang: "az" });

    // Google News only accepts items <= 48h old.
    const cutoff = Date.now() - 48 * 60 * 60 * 1000;
    const recent = items.filter((n) => {
        if (!n.created_at) return false;
        const t = new Date(n.created_at).getTime();
        return Number.isFinite(t) && t >= cutoff;
    });

    const urls = recent.map((n) => {
        const loc = `${SITE_URL}/news/${newsSlug(n.news_id, n.title)}`;
        const date = new Date(n.created_at).toISOString();
        return `  <url>
    <loc>${loc}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SITE_NAME_AZ)}</news:name>
        <news:language>az</news:language>
      </news:publication>
      <news:publication_date>${date}</news:publication_date>
      <news:title>${escapeXml(n.title)}</news:title>
    </news:news>
  </url>`;
    }).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300",
        },
    });
}
