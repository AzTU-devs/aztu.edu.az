import apiClient, { API_BASE_URL, type Lang } from "@/util/apiClient";
import type { DepartmentSummary, DepartmentDetail } from "@/types/department";

export function getImageUrl(path?: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = (API_BASE_URL ?? "").replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

export const getDepartments = async (params: { start?: number; end?: number; lang?: Lang } = {}) => {
  try {
    const { start = 0, end = 50, lang = "az" } = params;
    const response = await apiClient.get(`/api/department/public/all?start=${start}&end=${end}`, {
      headers: { "Accept-Language": lang },
    });

    if (response.data.status_code === 200) {
      return response.data.departments as DepartmentSummary[];
    } else if (response.data.status_code === 204) {
      return [];
    }
    return "ERROR";
  } catch (error) {
    console.error("Error fetching departments:", error);
    return "ERROR";
  }
};

export const getDepartmentByCode = async (departmentCode: string, lang: Lang = "az") => {
  try {
    const response = await apiClient.get(`/api/department/${departmentCode}`, {
      headers: { "Accept-Language": lang },
    });
    if (response.data.status_code === 200) {
      return response.data.department as DepartmentDetail;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching department ${departmentCode}:`, error);
    return null;
  }
};
