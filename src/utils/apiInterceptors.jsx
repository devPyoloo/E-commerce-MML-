import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }

    try {
      const { refreshToken, setAuth } = useAuthStore();
      const response = axios.post(
        "http://localhost:8080/api/v1/public/refresh-token",
        { refreshToken }
      );

      const newAccessToken = response.data.accessToken;
      setAuth((prevData) => ({
        ...prevData, accessToken: newAccessToken,
      }));

      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      console.error("Refresh token expired or invalid", refreshError);
      const { clearAuth } = useAuthStore.getState();
      clearAuth();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;