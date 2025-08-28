import axios from "axios";

// backend URL (change when you deploy)
export const authAPI = axios.create({ baseURL: "https://micro-service-4w8e.onrender.com/api/auth" });
export const api = axios.create({ baseURL: "https://micro-service-4w8e.onrender.com/api" });

// attach token automatically if exists
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


