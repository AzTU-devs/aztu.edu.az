import apiClient from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";
import type { CafedraSummary, CafedraDetail } from "@/types/cafedra";

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
