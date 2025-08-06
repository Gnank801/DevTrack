
import axios from "axios";
const api = axios.create({ baseURL: "/" });
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
export const authAPI = api;
export const projectAPI = api;
export const issueAPI = api;
export const analyticsAPI = api;
// This line was missing
export const baseURL = "/";

