import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7164/api";

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
    const isRefreshCall = originalRequest.url?.includes("/auth/profile", {
      remember: localStorage.getItem("remember"),
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
          remember: localStorage.getItem("remember"),
        }); // Refresh token via cookie
        processQueue();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh failed:", refreshError);
        window.location.href = "/signin"; // Optional: redirect to login
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
