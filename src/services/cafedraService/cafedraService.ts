import apiClient from "@/util/apiClient";

export interface CafedraInterface {
    cafedra_id: number;
    name: string;
    short_name: string;
    description: string;
    faculty_id: number;
    is_active: boolean;
    created_at: string;
}

export const getCafedras = async () => {
    try {
        const response = await apiClient.get('/api/cafedra/public/all');

        if (response.data.status_code === 200) {
            return response.data.cafedras;
        } else if (response.data.status_code === 204) {
            return "NO_CONTENT";
        }
    } catch (err: unknown) {
        return "ERROR";
    }
}
