import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type Lang = "az" | "en";

let _defaultLang: Lang = "az";

export function setDefaultLang(lang: Lang) {
    _defaultLang = lang;
}

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
    (config) => {
        if (!config.headers["Accept-Language"]) {
            config.headers["Accept-Language"] = _defaultLang;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
