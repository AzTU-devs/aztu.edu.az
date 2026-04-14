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
    // If path already contains 'static/', don't add it again
    const cleanPath = path.replace(/^\//, "");
    if (cleanPath.startsWith("static/")) {
        return `${base}/${cleanPath}`;
    }
    return `${base}/static/${cleanPath}`;
}

// Memory cache for slug to code mapping
const slugToCodeMap: Record<string, string> = {};

export const getFaculties = async (params: { start?: number; end?: number; lang?: Lang } = {}) => {
    try {
        const { start = 0, end = 30, lang = "az" } = params;
        const response = await apiClient.get(`/api/faculty/public/all?start=${start}&end=${end}&lang=${lang}`);

        let faculties: FacultySummary[] = [];

        if (response.data.status_code === 200 && Array.isArray(response.data.faculties)) {
            faculties = response.data.faculties;
        } else if (response.status === 200) {
            if (Array.isArray(response.data)) {
                faculties = response.data;
            } else if (response.data && Array.isArray(response.data.faculties)) {
                faculties = response.data.faculties;
            }
        }

        if (faculties.length > 0) {
            faculties.forEach(f => {
                if (f.title) slugToCodeMap[slugify(f.title)] = f.faculty_code;
            });
            return faculties;
        }

        if (response.status === 204 || response.data.status_code === 204) {
            return "NO_CONTENT";
        }
        return "ERROR";
    } catch (error) {
        console.error("Error fetching faculties:", error);
        return "ERROR";
    }
};

export const getFacultyBySlug = async (slug: string, lang: Lang = "az") => {
    // Try to find the code in cache first
    let code = slugToCodeMap[slug];
    
    if (!code) {
        // If not in cache, fetch all to populate cache
        await getFaculties({ start: 0, end: 100, lang });
        code = slugToCodeMap[slug];
    }

    // Fallback: If still not found, try using the slug directly (some backends might support it)
    return getFacultyByCode(code || slug, lang);
};

function flattenObject(obj: any, lang: Lang) {
    if (!obj) return obj;
    const localizedData = obj[lang] || {};
    return { ...obj, ...localizedData };
}

function flattenFacultyData(data: any, lang: Lang): FacultyDetail {
    if (!data) return data;

    // Flatten root level if needed
    let flattened = flattenObject(data, lang);

    // Flatten Director
    if (flattened.director) {
        flattened.director = flattenObject(flattened.director, lang);

        // Flatten Working Hours inside Director
        if (Array.isArray(flattened.director.working_hours)) {
            flattened.director.working_hours = flattened.director.working_hours.map((wh: any) => flattenObject(wh, lang));
        }

        // Flatten Educations inside Director
        if (Array.isArray(flattened.director.educations)) {
            flattened.director.educations = flattened.director.educations.map((edu: any) => flattenObject(edu, lang));
        }
    }

    // Flatten Content Sections (laboratories, objectives, etc.)
    const sectionKeys = [
        "laboratories", "research_works", "partner_companies", 
        "objectives", "duties", "projects", "directions_of_action"
    ];

    sectionKeys.forEach(key => {
        if (Array.isArray(flattened[key])) {
            flattened[key] = flattened[key].map((item: any) => flattenObject(item, lang));
        }
    });

    return flattened as FacultyDetail;
}

export const getFacultyByCode = async (facultyCode: string, lang: Lang = "az") => {
    try {
        const response = await apiClient.get(`/api/faculty/${facultyCode}?lang=${lang}`);
        
        if (response.status === 200) {
            let data = null;
            if (response.data && response.data.faculty_code) {
                data = response.data;
            } else if (response.data && response.data.faculty) {
                data = response.data.faculty;
            } else if (response.data.status_code === 200 && response.data.faculty_code) {
                data = response.data;
            }

            if (data) {
                return flattenFacultyData(data, lang);
            }
        }
        return null;
    } catch (error) {
        console.error(`Error fetching faculty by code ${facultyCode}:`, error);
        return null;
    }
};
