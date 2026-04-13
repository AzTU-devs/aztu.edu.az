import apiClient, { API_BASE_URL } from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";
import type { ResearchInstituteDetail, ResearchInstituteSummary } from "@/types/researchInstitute";
import { slugify } from "@/util/slugify";

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

// Maps for slug translation
const codeToSlugMap: Record<string, Record<string, string>> = {};
const slugToCodeMap: Record<string, string> = {};

let isCachePopulated = false;

export const getResearchInstitutes = async (params: { start?: number; end?: number; lang?: Lang } = {}) => {
    try {
        const { start = 0, end = 100, lang = "az" } = params;
        const response = await apiClient.get(`/api/research-institute/public/all?start=${start}&end=${end}&lang=${lang}`);

        if (response.data.status_code === 200) {
            const institutes = response.data.data as ResearchInstituteSummary[];
            
            institutes.forEach(i => {
                const slug = slugify(i.name);
                slugToCodeMap[slug] = i.institute_code;
                
                if (!codeToSlugMap[i.institute_code]) {
                    codeToSlugMap[i.institute_code] = {};
                }
                codeToSlugMap[i.institute_code][lang] = slug;
            });

            if (!isCachePopulated) {
                isCachePopulated = true;
                const otherLang = lang === "az" ? "en" : "az";
                getResearchInstitutes({ start, end, lang: otherLang });
            }
            
            return institutes;
        } else if (response.data.status_code === 204) {
            return "NO_CONTENT";
        }
        return "ERROR";
    } catch {
        return "ERROR";
    }
};

/**
 * Translates an institute slug from one language to another.
 */
export const translateInstituteSlug = (slug: string, toLang: Lang): string => {
    const code = slugToCodeMap[slug];
    if (!code) return slug;
    return codeToSlugMap[code]?.[toLang] || slug;
};

export const getResearchInstituteBySlug = async (slug: string, lang: Lang = "az") => {
    let code = slugToCodeMap[slug];
    
    if (!code) {
        await getResearchInstitutes({ start: 0, end: 100, lang });
        code = slugToCodeMap[slug] || slug;
    }

    return getResearchInstituteByCode(code, lang);
};

export const getResearchInstituteByCode = async (instituteCode: string, lang: Lang = "az") => {
    try {
        const response = await apiClient.get(`/api/research-institute/${instituteCode}?lang=${lang}`);
        if (response.data.status_code === 200) {
            const data = response.data.data as ResearchInstituteDetail;
            
            // Populate mapping
            const slug = slugify(data.name);
            slugToCodeMap[slug] = data.institute_code;
            if (!codeToSlugMap[data.institute_code]) codeToSlugMap[data.institute_code] = {};
            codeToSlugMap[data.institute_code][lang] = slug;

            return data;
        }
        return null;
    } catch {
        return null;
    }
};
