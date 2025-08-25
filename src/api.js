import axios from "axios";

// backend URL (change when you deploy)
const API = axios.create({ baseURL: "https://micro-service-4w8e.onrender.com/api/auth" });

// attach token automatically if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
