import apiClient from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";

export interface ProjectItem {
    id: number;
    project_id: number;
    display_order: number;
    title: string;
    description: string;
    html_content: string;
    created_at: string;
}

export interface ProjectDetail {
    id: number;
    bg_image: string;
    title: string;
    description: string;
    html_content: string;
    display_order: number;
    created_at: string;
    updated_at: string | null;
}

export const getProjects = async (params: { start?: number; end?: number; lang?: Lang } = {}) => {
    try {
        const { start = 0, end = 10, lang = "az" } = params;
        const response = await apiClient.get(`/api/project/all?start=${start}&end=${end}&lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });

        if (response.data.status_code === 200) {
            return { projects: response.data.projects as ProjectItem[], total: response.data.total as number };
        } else if (response.data.status_code === 204) {
            return "NO_CONTENT";
        }
    } catch {
        return "ERROR";
    }
};

export const getProjectById = async (projectId: string | number, lang: Lang = "az") => {
    try {
        const response = await apiClient.get(`/api/project/${projectId}?lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });

        if (response.data.status_code === 200) {
            return response.data.project as ProjectDetail;
        }
        return null;
    } catch {
        return null;
    }
};
