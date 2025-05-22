import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Remove this - we can't use hooks here

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Add request interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export default apiClient;