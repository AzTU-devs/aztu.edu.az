import "server-only";
import type { NewsDetail, NewsListItem } from "@/types/news";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://api-aztu.karamshukurlu.site";

// Server-only API key. The backend's API-key middleware exempts requests whose
// Origin/Referer matches aztu.edu.az (i.e. real browser traffic). SSR fetches
// are server-to-server and don't carry those headers, so we attach the key
// here. Without `NEXT_PUBLIC_` prefix this never reaches the browser bundle.
const API_KEY = process.env.API_KEY ?? "";

function authHeaders(lang: Lang): Record<string, string> {
    const headers: Record<string, string> = { "Accept-Language": lang };
    if (API_KEY) headers["X-API-Key"] = API_KEY;
    return headers;
}

export type Lang = "az" | "en";

export interface AnnouncementDetail {
    announcement_id: number;
    title: string;
    html_content: string;
    image: string | null;
    display_order: number;
    is_active: boolean;
    created_at?: string;
    published_date?: string;
    updated_at?: string;
}

export interface AnnouncementListItem {
    id: number;
    announcement_id?: number;
    title: string;
    html_content: string;
    is_active: boolean;
    created_at: string;
    published_date?: string;
    display_order: number;
    image?: string | null;
}

interface NewsDetailWithDates extends NewsDetail {
    created_at?: string;
    updated_at?: string;
    published_date?: string;
}

/**
 * Server-side fetch for a single news article. Used by `generateMetadata`
 * AND by the page server component — Next.js dedupes the request automatically.
 */
export async function fetchNewsDetail(id: number, lang: Lang = "az"): Promise<NewsDetailWithDates | null> {
    if (!Number.isFinite(id)) return null;
    try {
        const res = await fetch(`${API_BASE}/api/news/${id}?lang=${lang}`, {
            headers: authHeaders(lang),
            next: { revalidate: 30, tags: [`news:${id}`] },
        });
        if (!res.ok) return null;
        const data = await res.json();
        if (data?.status_code !== 200) return null;
        return data.news as NewsDetailWithDates;
    } catch {
        return null;
    }
}

export interface NewsCategoryItem {
    category_id: number;
    title: string;
    news_count?: number;
}

export async function fetchNewsCategories(lang: Lang = "az"): Promise<NewsCategoryItem[]> {
    try {
        const res = await fetch(`${API_BASE}/api/news-category/all?lang=${lang}`, {
            headers: authHeaders(lang),
            next: { revalidate: 60, tags: ["news:categories"] },
        });
        if (!res.ok) return [];
        const data = await res.json();
        if (data?.status_code !== 200) return [];
        return (data.news_categories ?? data.categories ?? []) as NewsCategoryItem[];
    } catch {
        return [];
    }
}

export async function fetchNewsList(params: {
    start?: number;
    end?: number;
    lang?: Lang;
    categoryId?: string;
} = {}): Promise<NewsListItem[]> {
    const { start = 0, end = 12, lang = "az", categoryId } = params;
    const query = new URLSearchParams({
        start: String(start),
        end: String(end),
        lang,
    });
    if (categoryId) query.set("category_id", categoryId);
    try {
        const res = await fetch(`${API_BASE}/api/news/public/all?${query.toString()}`, {
            headers: authHeaders(lang),
            next: { revalidate: 30, tags: ["news:list"] },
        });
        if (!res.ok) return [];
        const data = await res.json();
        if (data?.status_code !== 200) return [];
        return (data.news ?? []) as NewsListItem[];
    } catch {
        return [];
    }
}

export async function fetchAnnouncementDetail(
    id: number | string,
    lang: Lang = "az"
): Promise<AnnouncementDetail | null> {
    try {
        const res = await fetch(`${API_BASE}/api/announcement/${id}?lang=${lang}`, {
            headers: authHeaders(lang),
            next: { revalidate: 30 },
        });
        if (!res.ok) return null;
        const data = await res.json();
        if (data?.status_code !== 200) return null;
        return data.announcement as AnnouncementDetail;
    } catch {
        return null;
    }
}

export async function fetchAnnouncementList(params: {
    start?: number;
    end?: number;
    lang?: Lang;
} = {}): Promise<AnnouncementListItem[]> {
    const { start = 0, end = 12, lang = "az" } = params;
    try {
        const res = await fetch(
            `${API_BASE}/api/announcement/public/all?start=${start}&end=${end}&lang=${lang}`,
            {
                headers: authHeaders(lang),
                next: { revalidate: 30 },
            }
        );
        if (!res.ok) return [];
        const data = await res.json();
        if (data?.status_code !== 200) return [];
        return (data.announcements ?? []) as AnnouncementListItem[];
    } catch {
        return [];
    }
}

