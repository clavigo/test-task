import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/unauthorized";
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // токен після логіну
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
