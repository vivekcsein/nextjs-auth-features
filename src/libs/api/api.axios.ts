import axios from "axios";
import { toast } from "sonner";

const baseURL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:7164/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<(token?: string) => void> = [];

const processQueue = () => {
  failedQueue.forEach((cb) => cb());
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // Prevent retrying the refresh endpoint itself
    const isRefreshCall = originalRequest.url?.includes("/auth/refresh", {
      remember: localStorage.getItem("rememberme"),
    });

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshCall
    ) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedQueue.push(() => resolve(axiosInstance(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // console.log("🔄 Attempting token refresh...");
        await axiosInstance.post("/auth/refresh", {
          remember: localStorage.getItem("rememberme"),
        }); // Refresh token via cookie
        processQueue();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        if (process.env.NODE_ENV === "development") {
          console.error("❌ Refresh failed:", refreshError);
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

type AuthErrorResponse = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export const handleErrorMessage = (error: unknown): string => {
  const maybeResponse = error as AuthErrorResponse;
  toast.error(
    maybeResponse?.response?.data?.message ?? "Unexpected error occurred"
  );
  return maybeResponse?.response?.data?.message ?? "Unexpected error occurred";
};

export default axiosInstance;
