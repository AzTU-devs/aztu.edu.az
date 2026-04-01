import apiClient, { API_BASE_URL } from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";

export interface FacultySummary {
    id: number;
    faculty_code: string;
    title: string;
    cafedra_count?: number;
    deputy_dean_count?: number;
    created_at: string;
    updated_at?: string;
}

export interface WorkingHoursSlot {
    day: string;
    time_range: string;
}

export interface EducationEntry {
    degree?: string;
    university?: string;
    start_year?: string | number;
    end_year?: string | number;
}

export interface ScientificEvent {
    event_title?: string;
    event_description?: string;
}

export interface SectionItem {
    id?: number;
    title: string;
    description?: string;
}

export interface FacultyPerson {
    first_name?: string;
    last_name?: string;
    father_name?: string;
    scientific_degree?: string;
    /** Director uses scientific_title; deputy_deans & workers use scientific_name */
    scientific_title?: string;
    scientific_name?: string;
    /** bio is rich HTML (director only) */
    bio?: string;
    email?: string;
    phone?: string;
    room_number?: string;
    profile_image?: string;
    working_hours?: string | WorkingHoursSlot[];
    scientific_events?: ScientificEvent[];
    educations?: string[] | EducationEntry[];
    /** duty replaces position for deputy_deans, scientific_council and workers */
    duty?: string;
    /** kept for backwards compat */
    position?: string;
}

export interface DirectionOfAction {
    id?: number;
    title: string;
    description?: string;
}

export interface FacultyDetail {
    id?: number;
    faculty_code: string;
    title: string;
    html_content?: string;
    director?: FacultyPerson;
    laboratories?: SectionItem[];
    research_works?: SectionItem[];
    partner_companies?: SectionItem[];
    objectives?: SectionItem[];
    duties?: SectionItem[];
    projects?: SectionItem[];
    directions_of_action?: DirectionOfAction[];
    deputy_deans?: FacultyPerson[];
    scientific_council?: FacultyPerson[];
    workers?: FacultyPerson[];
}

export function getImageUrl(path?: string): string | undefined {
    if (!path) return undefined;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const base = (API_BASE_URL ?? "").replace(/\/$/, "");
    return `${base}/${path.replace(/^\//, "")}`;
}

export const getFaculties = async (params: { start?: number; end?: number; lang?: Lang } = {}) => {
    try {
        const { start = 0, end = 30, lang = "en" } = params;
        const response = await apiClient.get(`/api/faculty/public/all?start=${start}&end=${end}&lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });

        if (response.data.status_code === 200) {
            return response.data.faculties as FacultySummary[];
        } else if (response.data.status_code === 204) {
            return "NO_CONTENT";
        }
    } catch {
        return "ERROR";
    }
};

export const getFacultyByCode = async (facultyCode: string, lang: Lang = "en") => {
    try {
        const response = await apiClient.get(`/api/faculty/${facultyCode}?lang=${lang}`, {
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

export const getDirectionsOfAction = async (facultyCode: string, lang: Lang = "en") => {
    try {
        const response = await apiClient.get(`/api/faculty/${facultyCode}/directions-of-action?lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });
        if (response.data.status_code === 200) {
            return response.data.directions_of_action as DirectionOfAction[];
        }
        return [];
    } catch {
        return [];
    }
};
