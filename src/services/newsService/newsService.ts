import apiClient, { Lang } from "@/util/apiClient";
import type { NewsListItem, NewsDetail } from "@/types/news";

export interface NewsCategoryItem {
    category_id: string;
    title: string;
}

export const getNewsCategories = async (lang: Lang = "az"): Promise<NewsCategoryItem[]> => {
    try {
        const response = await apiClient.get(`/api/news-category/all?lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });
        if (response.data.status_code === 200 && Array.isArray(response.data.categories)) {
            return response.data.categories as NewsCategoryItem[];
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
