import type { MetadataRoute } from "next";
import { STATIC_FACULTIES, STATIC_CAFEDRAS } from "@/data/staticFaculties";
import { newsSlug, announcementSlug } from "@/util/slugify";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aztu.edu.az";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://api-aztu.karamshukurlu.site";

// Real, flat routes that exist in the App Router. The site serves both AZ and EN
// content from the same URL via LanguageContext, so there is no /az or /en prefix.
// Each entry is the actual path Google should crawl.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },

    // About / haqqimizda
    { path: "/haqqimizda", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about/history-of-aztu", priority: 0.7, changeFrequency: "yearly" },
    { path: "/about/vision-mission", priority: 0.7, changeFrequency: "yearly" },
    { path: "/about/rankings", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about/leadership-and-management/rector", priority: 0.8, changeFrequency: "yearly" },
    { path: "/about/leadership-and-management/rectors-office", priority: 0.7, changeFrequency: "yearly" },
    { path: "/about/leadership-and-management/vice-rector", priority: 0.7, changeFrequency: "yearly" },
    { path: "/about/leadership-and-management/scientific-board", priority: 0.6, changeFrequency: "yearly" },
    { path: "/about/leadership-and-management/former-rectors", priority: 0.5, changeFrequency: "yearly" },

    // Internationalization
    { path: "/beynelmilellesme", priority: 0.8, changeFrequency: "monthly" },
    { path: "/beynelxalq", priority: 0.8, changeFrequency: "monthly" },

    // Education / students / research
    { path: "/tehsil", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tedqiqat", priority: 0.8, changeFrequency: "monthly" },

    // Community + sosial
    { path: "/community", priority: 0.6, changeFrequency: "monthly" },
    { path: "/sosial", priority: 0.6, changeFrequency: "monthly" },

    // News / announcements / media listings
    { path: "/news", priority: 0.9, changeFrequency: "daily" },
    { path: "/announcements", priority: 0.8, changeFrequency: "daily" },
    { path: "/media", priority: 0.6, changeFrequency: "weekly" },

    // Top-level standalone
    { path: "/faculties", priority: 0.9, changeFrequency: "monthly" },
    { path: "/cafedras", priority: 0.8, changeFrequency: "monthly" },
    { path: "/elaqe", priority: 0.7, changeFrequency: "yearly" },
    { path: "/kts", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
    { path: "/niye-aztu", priority: 0.7, changeFrequency: "yearly" },
    { path: "/projects", priority: 0.6, changeFrequency: "monthly" },
    { path: "/virtual-tour", priority: 0.6, changeFrequency: "yearly" },
    { path: "/struktur", priority: 0.5, changeFrequency: "yearly" },
    { path: "/idareetme", priority: 0.5, changeFrequency: "yearly" },
    { path: "/administration", priority: 0.5, changeFrequency: "yearly" },
    { path: "/sustainability", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms-conditions", priority: 0.3, changeFrequency: "yearly" },
];

interface NewsListLite {
    news_id: number;
    title: string;
    created_at?: string;
}

interface AnnouncementListLite {
    announcement_id?: number;
    id?: number;
    title: string;
    created_at?: string;
    published_date?: string;
}

async function safeFetchJson<T = unknown>(url: string): Promise<T | null> {
    try {
        const res = await fetch(url, { next: { revalidate: 600 } });
        if (!res.ok) return null;
        return (await res.json()) as T;
    } catch {
        return null;
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();
    const entries: MetadataRoute.Sitemap = [];

    // Static routes
    for (const r of STATIC_ROUTES) {
        entries.push({
            url: `${SITE_URL}${r.path}`,
            lastModified: now,
            changeFrequency: r.changeFrequency,
            priority: r.priority,
        });
    }

    // Faculty detail pages
    for (const faculty of STATIC_FACULTIES) {
        entries.push({
            url: `${SITE_URL}/faculties/${faculty.faculty_id}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        });
    }

    // Cafedra detail pages (nested under faculty)
    for (const cafedra of STATIC_CAFEDRAS) {
        entries.push({
            url: `${SITE_URL}/faculties/${cafedra.faculty_id}/kafedralar/${cafedra.cafedra_id}`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
        });
    }

    // News detail pages — fetch from API
    const newsRes = await safeFetchJson<{ news?: NewsListLite[] }>(
        `${API_BASE}/api/news/public/all?start=0&end=10000&lang=az`
    );
    for (const n of newsRes?.news ?? []) {
        if (!n?.news_id || !n?.title) continue;
        const slug = newsSlug(n.news_id, n.title);
        entries.push({
            url: `${SITE_URL}/news/${slug}`,
            lastModified: n.created_at ? new Date(n.created_at) : now,
            changeFrequency: "weekly",
            priority: 0.8,
        });
    }

    // Announcement detail pages — fetch from API
    const annRes = await safeFetchJson<{ announcements?: AnnouncementListLite[] }>(
        `${API_BASE}/api/announcement/public/all?start=0&end=10000&lang=az`
    );
    for (const a of annRes?.announcements ?? []) {
        const id = a.announcement_id ?? a.id;
        if (!id) continue;
        entries.push({
            url: `${SITE_URL}/announcements/${announcementSlug(id, a.title ?? "")}`,
            lastModified: a.published_date
                ? new Date(a.published_date)
                : a.created_at
                ? new Date(a.created_at)
                : now,
            changeFrequency: "weekly",
            priority: 0.7,
        });
    }

    return entries;
}
