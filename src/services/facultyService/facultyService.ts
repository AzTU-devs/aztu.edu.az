import apiClient, { API_BASE_URL } from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";
import type { FacultyDetail } from "@/types/faculty";
import { slugify } from "@/util/slugify";

export interface FacultySummary {
    id: number;
    faculty_code: string;
    title: string;
    cafedra_count?: number;
    deputy_dean_count?: number;
    created_at: string;
    updated_at?: string;
}

export function getImageUrl(path?: string | null): string | undefined {
    if (!path) return undefined;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const base = (API_BASE_URL ?? "").replace(/\/$/, "");
    return `${base}/static/${path.replace(/^\//, "")}`;
}

// Memory cache for slug to code mapping
const slugToCodeMap: Record<string, string> = {};

export const getFaculties = async (params: { start?: number; end?: number; lang?: Lang } = {}) => {
    try {
        const { start = 0, end = 30, lang = "az" } = params;
        const response = await apiClient.get(`/api/faculty/public/all?start=${start}&end=${end}`, {
            headers: { "Accept-Language": lang },
        });

        if (response.data.status_code === 200) {
            const faculties = response.data.faculties as FacultySummary[];
            // Update cache
            faculties.forEach(f => {
                slugToCodeMap[slugify(f.title)] = f.faculty_code;
            });
            return faculties;
        } else if (response.data.status_code === 204) {
            return "NO_CONTENT";
        }
    } catch {
        return "ERROR";
    }
};

export const getFacultyBySlug = async (slug: string, lang: Lang = "az") => {
    // If we don't have the code in cache, we need to fetch all and find it
    if (!slugToCodeMap[slug]) {
        await getFaculties({ start: 0, end: 100, lang });
    }

    const code = slugToCodeMap[slug] || slug; // Fallback to slug itself if not found
    return getFacultyByCode(code, lang);
};

export const getFacultyByCode = async (facultyCode: string, lang: Lang = "az") => {
    try {
        const response = await apiClient.get(`/api/faculty/${facultyCode}`, {
            headers: { "Accept-Language": lang },
        });
        if (response.data.status_code === 200) {
            return response.data.faculty as FacultyDetail;
        }
        return null;
    } catch {
        return null;
    }
};
