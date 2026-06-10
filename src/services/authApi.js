import api from "./api";
export const authApi = {
    login: async (payload) => {
        const response = await api.post("/auth/login", payload);
        return response.data;
    },
    register: async (payload) => {
        const response = await api.post("/auth/register", payload);
        return response.data;
    },
    forgotPassword: async (email) => {
        const response = await api.post("/auth/forgot-password", { email });
        return response.data;
    },
    resetPassword: async (token, password) => {
        const response = await api.post("/auth/reset-password", {
            token,
            password,
        });
        return response.data;
    },
    me: async () => {
        const response = await api.get("/auth/profile");
        return response.data;
    },
    logout: async () => {
        const response = await api.post("/auth/logout");
        return response.data;
    },
};
