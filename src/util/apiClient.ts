import axios from "axios"

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const apiClient = axios.create({
    baseURL: API_BASE_URL,
})

apiClient.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => Promise.reject(error)
)

export default apiClient
