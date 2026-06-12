import apiClient, { Lang } from "@/util/apiClient";
import type { NewsListItem, NewsDetail } from "@/types/news";

export interface NewsCategoryItem {
    category_id: number;
    title: string;
    news_count?: number;
}

export const getNewsCategories = async (lang: Lang = "az"): Promise<NewsCategoryItem[]> => {
    try {
        const response = await apiClient.get(`/api/news-category/all?lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });
        if (response.data.status_code === 200) {
            const list = response.data.news_categories ?? response.data.categories;
            if (Array.isArray(list)) return list as NewsCategoryItem[];
        }
        return [];
    } catch {
        return [];
    }
};

export const getNewsList = async (
    params: {
        categoryId?: string;
        start?: number;
        end?: number;
        lang?: Lang;
    } = {}
): Promise<NewsListItem[]> => {
    const { categoryId, start = 0, end = 10, lang = "az" } = params;

    const query = new URLSearchParams();
    if (categoryId) query.set("category_id", categoryId);
    query.set("start", String(start));
    query.set("end", String(end));
    query.set("lang", lang);

    const response = await apiClient.get(`/api/news/public/all?${query.toString()}`, {
        headers: { "Accept-Language": lang },
    });

    if (response.data.status_code === 200) {
        return response.data.news as NewsListItem[];
    }
    return [];
};

/**
 * Same request as getNewsList, but returns the total count alongside the page
 * so callers can implement append-based pagination ("Load More").
 */
export const getNewsListPage = async (
    params: {
        categoryId?: string;
        start?: number;
        end?: number;
        lang?: Lang;
    } = {}
): Promise<{ news: NewsListItem[]; total: number }> => {
    const { categoryId, start = 0, end = 10, lang = "az" } = params;

    const query = new URLSearchParams();
    if (categoryId) query.set("category_id", categoryId);
    query.set("start", String(start));
    query.set("end", String(end));
    query.set("lang", lang);

    const response = await apiClient.get(`/api/news/public/all?${query.toString()}`, {
        headers: { "Accept-Language": lang },
    });

    if (response.data.status_code === 200) {
        const news = (response.data.news ?? []) as NewsListItem[];
        const total = typeof response.data.total === "number" ? response.data.total : news.length;
        return { news, total };
    }
    return { news: [], total: 0 };
};

export const getNewsByFaculty = async (
    facultyCode: string,
    params: { start?: number; end?: number; lang?: Lang } = {}
): Promise<NewsListItem[]> => {
    const { start = 0, end = 10, lang = "az" } = params;
    const query = new URLSearchParams({
        start: String(start),
        end: String(end),
        lang,
    });
    try {
        const response = await apiClient.get(
            `/api/news/public/faculty/${encodeURIComponent(facultyCode)}?${query.toString()}`,
            { headers: { "Accept-Language": lang } }
        );
        if (response.data.status_code === 200) {
            return response.data.news as NewsListItem[];
        }
        return [];
    } catch {
        return [];
    }
};

export const getNewsByCafedra = async (
    cafedraCode: string,
    params: { start?: number; end?: number; lang?: Lang } = {}
): Promise<NewsListItem[]> => {
    const { start = 0, end = 10, lang = "az" } = params;
    const query = new URLSearchParams({
        start: String(start),
        end: String(end),
        lang,
    });
    try {
        const response = await apiClient.get(
            `/api/news/public/cafedra/${encodeURIComponent(cafedraCode)}?${query.toString()}`,
            { headers: { "Accept-Language": lang } }
        );
        if (response.data.status_code === 200) {
            return response.data.news as NewsListItem[];
        }
        return [];
    } catch {
        return [];
    }
};

export const getNewsById = async (
    id: number,
    lang: Lang = "az"
): Promise<NewsDetail | null> => {
    const response = await apiClient.get(`/api/news/${id}?lang=${lang}`, {
        headers: { "Accept-Language": lang },
    });

    if (response.data.status_code === 200) {
        return response.data.news as NewsDetail;
    }
    return null;
};
