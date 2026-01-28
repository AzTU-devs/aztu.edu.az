import apiClient from "@/util/apiClient";

export interface AnnouncementInterface {
    announcement_id: number;
    display_order: number;
    title: string;
    html_content: string;
    is_active: boolean;
    created_at: string;
}

export const getAnnouncements = async (start: number, end: number) => {
    try {
        const response = await apiClient.get(`/api/announcement/public/all?start=${start}&end=${end}`);

        if (response.data.status_code === 200) {
            return response.data.announcements;
        } else if (response.data.status_code === 204) {
            return "NO_CONTENT";
        }
    } catch (err: any) {
        return "ERROR";
    }
}