import apiClient, { API_BASE_URL } from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";
import type { ResearchProject } from "@/types/researchProject";

export function getImageUrl(path?: string | null): string | undefined {
    if (!path) return undefined;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const base = (API_BASE_URL ?? "").replace(/\/$/, "");
    const cleanPath = path.replace(/^\//, "");
    if (cleanPath.startsWith("static/") || cleanPath.startsWith("media/")) {
        return `${base}/${cleanPath}`;
    }
    return `${base}/static/${cleanPath}`;
}

interface ApiResearchProject {
    id: number;
    project_code: string;
    image: string | null;
    project_url: string | null;
    name: string | null;
    project_type: string | null;
    duration: string | null;
    leader_name: string | null;
    budget: string | null;
    about_html: string | null;
    members: string[] | null;
}

const toProject = (item: ApiResearchProject): ResearchProject => ({
    id: item.id,
    project_code: item.project_code,
    image_url: item.image,
    project_url: item.project_url,
    name: item.name ?? "",
    type: item.project_type ?? "",
    duration: item.duration ?? "",
    leader: item.leader_name ?? "",
    amount: item.budget ?? "",
    about: item.about_html ?? "",
    team: item.members ?? [],
});

/**
 * Returns an empty list when the API is unreachable or has no records — the
 * page renders its own empty state rather than surfacing an error.
 */
export const getResearchProjects = async (
    params: { start?: number; end?: number; lang?: Lang } = {},
): Promise<ResearchProject[]> => {
    const { start = 0, end = 50, lang = "az" } = params;

    try {
        const response = await apiClient.get(
            `/api/research-project/public/all?start=${start}&end=${end}&lang=${lang}`,
            { headers: { "Accept-Language": lang } },
        );

        if (response.data?.status_code === 200) {
            return ((response.data.projects ?? []) as ApiResearchProject[]).map(toProject);
        }
        return [];
    } catch {
        return [];
    }
};
