import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

export const API_BASE = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;
    const refresh =
      localStorage.getItem("refresh") || sessionStorage.getItem("refresh");

    if (
      error.response?.status !== 401 ||
      !refresh ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/api/token/refresh/")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const response = await axios.post(`${API_BASE}/api/token/refresh/`, {
        refresh,
      });
      const token = response.data.access;

      localStorage.setItem("token", token);
      sessionStorage.setItem("token", token);
      originalRequest.headers.Authorization = `Bearer ${token}`;

      return api(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("refresh");
      sessionStorage.removeItem("user");
      return Promise.reject(refreshError);
    }
  },
);

export default api;