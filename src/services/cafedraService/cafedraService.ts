import apiClient from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";
import type { CafedraSummary, CafedraDetail } from "@/types/cafedra";

export interface LaboratoryObjectiveItem {
    id: number;
    title: string | null;
}

export interface LaboratoryGalleryImageItem {
    id: number;
    image_url: string;
}

export interface ResearchLaboratory {
    id: number;
    cafedra_code: string;
    title: string | null;
    html_content: string | null;
    image_url: string | null;
    room_number: string | null;
    authorized_person: string | null;
    email: string | null;
    phone_number: string | null;
    objectives: LaboratoryObjectiveItem[];
    gallery_images: LaboratoryGalleryImageItem[];
}

export const getCafedras = async (params: { facultyCode?: string; start?: number; end?: number; lang?: Lang } = {}) => {
    try {
        const { facultyCode, start = 0, end = 50, lang = "az" } = params;
        const query = new URLSearchParams();
        query.set("start", String(start));
        query.set("end", String(end));
        query.set("lang", lang);
        if (facultyCode) query.set("faculty_code", facultyCode);

        const response = await apiClient.get(`/api/cafedra/public/all?${query.toString()}`, {
            headers: { "Accept-Language": lang },
        });

        if (response.data.status_code === 200) {
            return response.data.cafedras as CafedraSummary[];
        } else if (response.data.status_code === 204) {
            return "NO_CONTENT";
        }
    } catch {
        return "ERROR";
    }
};

export const getCafedraByCode = async (cafedraCode: string, lang: Lang = "az") => {
    try {
        const response = await apiClient.get(`/api/cafedra/${cafedraCode}?lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });
        if (response.data.status_code === 200) {
            return response.data.cafedra as CafedraDetail;
        }
        return null;
    } catch {
        return null;
    }
};

export const getLaboratories = async (
    params: { lang?: Lang; start?: number; end?: number } = {}
) => {
    try {
        const { lang = "az", start = 0, end = 200 } = params;
        const query = new URLSearchParams();
        query.set("start", String(start));
        query.set("end", String(end));
        query.set("lang", lang);

        const response = await apiClient.get(`/api/cafedra/laboratories/all?${query.toString()}`, {
            headers: { "Accept-Language": lang },
        });

        if (response.data.status_code === 200) {
            return response.data.laboratories as ResearchLaboratory[];
        }
        return "ERROR";
    } catch {
        return "ERROR";
    }
};

export const getLaboratoryById = async (id: number | string, lang: Lang = "az") => {
    try {
        const response = await apiClient.get(`/api/cafedra/laboratories/${id}?lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });
        if (response.data.status_code === 200) {
            return response.data.laboratory as ResearchLaboratory;
        }
        return null;
    } catch {
        return null;
    }
};
