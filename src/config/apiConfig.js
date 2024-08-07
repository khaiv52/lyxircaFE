import axios from "axios";

export const API_BASE_URL = "https://lyxrica-be.onrender.com";

// Lấy JWT từ localStorage
const jwt = localStorage.getItem("jwt");

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Authorization": jwt ? `Bearer ${jwt}` : undefined, // Thêm JWT vào headers
    'Content-Type': "application/json"
  },
});

// Middleware để thêm JWT vào headers cho các yêu cầu
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
