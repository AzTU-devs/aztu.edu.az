import apiClient from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";

export interface CollaborationItem {
    id: number;
    collaboration_id: number;
    logo: string;
    website_url: string;
    display_order: number;
    name: string;
    created_at: string;
}

export const getCollaborations = async (params: { start?: number; end?: number; lang?: Lang } = {}) => {
    try {
        const { start = 0, end = 30, lang = "az" } = params;
        const response = await apiClient.get(`/api/collaboration/all?start=${start}&end=${end}&lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });

        if (response.data.status_code === 200) {
            return { collaborations: response.data.collaborations as CollaborationItem[], total: response.data.total as number };
        } else if (response.data.status_code === 204) {
            return "NO_CONTENT";
        }
    } catch {
        return "ERROR";
    }
};
