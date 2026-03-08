import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type Lang = "az" | "en";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
    (config) => {
        // Default language is az; can be overridden per-request via params or header
        if (!config.headers["Accept-Language"]) {
            config.headers["Accept-Language"] = "az";
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
