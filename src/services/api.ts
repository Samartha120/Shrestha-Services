import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  // Send/receive the httpOnly session + csrf cookies alongside requests.
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const readCookie = (name: string): string | undefined =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Double-submit CSRF: echo the readable csrf cookie on state-changing
    // requests so cookie-authenticated writes are accepted by the server.
    const method = (config.method || "get").toLowerCase();
    if (!["get", "head", "options"].includes(method)) {
      const csrf = readCookie("csrf_token");
      if (csrf) config.headers["X-CSRF-Token"] = csrf;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Surface the backend's actual error ("Invalid or expired OTP") instead of
    // axios's generic "Request failed with status code 400".
    const serverMessage =
      error.response?.data?.message || error.response?.data?.error;
    if (serverMessage) {
      error.message = serverMessage;
    }
    return Promise.reject(error);
  }
);

export default api;