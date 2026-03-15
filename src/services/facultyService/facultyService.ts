import apiClient from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";

export interface FacultyInterface {
    id: number;
    faculty_code: string;
    faculty_name: string;
    created_at: string;
}

export const getFaculties = async (params: { start?: number; end?: number; lang?: Lang } = {}) => {
    try {
        const { start = 0, end = 30, lang = "az" } = params;
        const response = await apiClient.get(`/api/faculty/public/all?start=${start}&end=${end}&lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });

        if (response.data.status_code === 200) {
            return response.data.faculties as FacultyInterface[];
        } else if (response.data.status_code === 204) {
            return "NO_CONTENT";
        }
    } catch {
        return "ERROR";
    }
};

export const getFacultyByCode = async (facultyCode: string, lang: Lang = "az") => {
    try {
        const response = await apiClient.get(`/api/faculty/${facultyCode}?lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });
        if (response.data.status_code === 200) {
            return response.data.faculty as FacultyInterface;
        }
        return null;
    } catch {
        return null;
    }
};
