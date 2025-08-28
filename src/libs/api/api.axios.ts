import axios from "axios";

// Replace with actual backend URL
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:7164/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Send cookies cross-origin
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to prevent infinite refresh loops
let isRefreshing = false;
let failedQueue: Array<() => void> = [];

const processQueue = () => {
  failedQueue.forEach((cb) => cb());
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedQueue.push(() => resolve(axiosInstance(originalRequest)));
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post("/auth/profile"); // Refresh token via cookie
        processQueue();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
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
