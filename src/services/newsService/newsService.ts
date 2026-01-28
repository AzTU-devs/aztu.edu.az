import apiClient from "@/util/apiClient";

export interface NewsInterface {
    news_id: number;
    cateogry_id: number;
    display_order: number;
    is_active: boolean;
    title: string;
    html_content: string;
}

export const getNews = async (start: number, end: number) => {
    try {
        const response = await apiClient.get(`/api/news/public/all?start=${start}&en=${end}`);

        if (response.data.status_code === 200) {
            return response.data.news;
        } else if (response.data.status_code === 204) {
            return "NO_CONTENT";
        }
    } catch (err: any) {
        return "ERROR";
    }
}