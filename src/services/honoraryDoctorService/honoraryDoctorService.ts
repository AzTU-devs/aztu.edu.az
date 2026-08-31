import apiClient from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";

export interface HonoraryDoctor {
    id: number;
    image: string | null;
    display_order: number;
    is_active: boolean;
    full_name: string | null;
    description: string | null;
}

/**
 * The honorary doctor roll, published from the admin dashboard.
 *
 * Returns `null` when the request fails, which the page uses to tell a failure
 * apart from an empty-but-successful roll — an empty array must render the
 * "nothing published yet" state, not a spinner that never resolves.
 */
export const getHonoraryDoctors = async (
    lang: Lang = "az"
): Promise<HonoraryDoctor[] | null> => {
    try {
        const response = await apiClient.get(`/api/honorary-doctor/public?lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });
        if (response.data?.status_code === 200 && Array.isArray(response.data.doctors)) {
            return response.data.doctors as HonoraryDoctor[];
        }
        return [];
    } catch {
        return null;
    }
};

/** Resolves a stored image path to a URL the browser can load. */
export const getHonoraryDoctorImageUrl = (path?: string | null): string | undefined => {
    if (!path) return undefined;
    if (/^https?:\/\//i.test(path)) return path;
    const base = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
    const clean = path.replace(/^\//, "");
    if (clean.startsWith("static/") || clean.startsWith("media/")) return `${base}/${clean}`;
    return `${base}/static/${clean}`;
};
