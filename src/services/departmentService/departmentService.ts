import apiClient, { API_BASE_URL, type Lang } from "@/util/apiClient";
import type { DepartmentSummary, DepartmentDetail } from "@/types/department";
import { slugify } from "@/util/slugify";

export function getImageUrl(path?: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = (API_BASE_URL ?? "").replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

// Maps for slug translation
// { [code]: { az: "slug-az", en: "slug-en" } }
const codeToSlugMap: Record<string, Record<string, string>> = {};
// { [slug]: code }
const slugToCodeMap: Record<string, string> = {};

let isCachePopulated = false;

export const getDepartments = async (params: { start?: number; end?: number; lang?: Lang } = {}) => {
  try {
    const { start = 0, end = 100, lang = "az" } = params;
    const response = await apiClient.get(`/api/department/public/all?start=${start}&end=${end}&lang=${lang}`, {
      headers: { "Accept-Language": lang },
    });

    if (response.data.status_code === 200) {
      const departments = response.data.departments as DepartmentSummary[];
      
      departments.forEach(d => {
        const slug = slugify(d.department_name);
        slugToCodeMap[slug] = d.department_code;
        
        if (!codeToSlugMap[d.department_code]) {
            codeToSlugMap[d.department_code] = {};
        }
        codeToSlugMap[d.department_code][lang] = slug;
      });

      // If we are populating for the first time, also populate the other language for cross-mapping
      if (!isCachePopulated) {
          isCachePopulated = true;
          const otherLang = lang === "az" ? "en" : "az";
          getDepartments({ start, end, lang: otherLang }); // fire and forget to populate cache
      }
      
      return departments;
    } else if (response.data.status_code === 204) {
      return [];
    }
    return "ERROR";
  } catch (error) {
    console.error("Error fetching departments:", error);
    return "ERROR";
  }
};

/**
 * Returns the slug for a department code in the specified language.
 * If not in cache, returns the code itself.
 */
export const getSlugByCode = (code: string, lang: Lang): string => {
    return codeToSlugMap[code]?.[lang] || code;
};

/**
 * Returns the code for a given slug.
 */
export const getCodeBySlug = (slug: string): string | undefined => {
    return slugToCodeMap[slug];
};

/**
 * Translates a slug from one language to another.
 *
 * Falls back to the original slug whenever the target-language slug is not
 * cached yet — this keeps the URL resolvable (the page resolver tolerates
 * cross-language slugs) instead of producing a URL containing the raw
 * department code.
 */
export const translateDepartmentSlug = (slug: string, toLang: Lang): string => {
    const code = slugToCodeMap[slug];
    if (!code) return slug;
    const targetSlug = codeToSlugMap[code]?.[toLang];
    return targetSlug || slug;
};

export const getDepartmentBySlug = async (slug: string, lang: Lang = "az") => {
    let code = slugToCodeMap[slug];

    if (!code) {
        // Try fetching the current language to populate cache
        await getDepartments({ start: 0, end: 100, lang });
        code = slugToCodeMap[slug];
    }

    if (!code) {
        // The URL slug may belong to the OTHER language (e.g. user navigated
        // /en/... using an AZ slug because the EN slug wasn't cached when the
        // language was switched). Populate the other language too.
        const otherLang: Lang = lang === "az" ? "en" : "az";
        await getDepartments({ start: 0, end: 100, lang: otherLang });
        code = slugToCodeMap[slug];
    }

    if (!code && codeToSlugMap[slug]) {
        // The slug is actually a department code — accept it.
        code = slug;
    }

    if (!code) {
        // Last resort: query directly by treating the slug as a code. The API
        // returns 200 only if it really is a code, otherwise null.
        return getDepartmentByCode(slug, lang);
    }

    return getDepartmentByCode(code, lang);
};

export const getDepartmentByCode = async (departmentCode: string, lang: Lang = "az") => {
  if (!departmentCode) return null;
  try {
    const response = await apiClient.get(`/api/department/${departmentCode}?lang=${lang}`, {
      headers: { "Accept-Language": lang },
    });
    if (response.data.status_code === 200) {
      const dept = response.data.department as DepartmentDetail;
      
      // Also update slug map from detail if possible
      const slug = slugify(dept.department_name);
      slugToCodeMap[slug] = dept.department_code;
      if (!codeToSlugMap[dept.department_code]) codeToSlugMap[dept.department_code] = {};
      codeToSlugMap[dept.department_code][lang] = slug;

      return dept;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching department ${departmentCode}:`, error);
    return null;
  }
};
