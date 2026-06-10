import axios from "axios";
import { ENV } from "./env";
const api = axios.create({
    baseURL: ENV.API_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default api;
