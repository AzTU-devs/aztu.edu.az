import apiClient from "@/util/apiClient";

export interface FacultyInterface {
    faculty_id: number;
    name: string;
    short_name: string;
    description: string;
    is_active: boolean;
    created_at: string;
}

export const getFaculties = async () => {
    try {
        const response = await apiClient.get('/api/faculty/public/all');

        if (response.data.status_code === 200) {
            return response.data.faculties;
        } else if (response.data.status_code === 204) {
            return "NO_CONTENT";
        }
    } catch (err: unknown) {
        return "ERROR";
    }
}
