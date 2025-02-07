import { useSessionStore } from "@/store/sessionStore";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

const authInterceptor = (req: InternalAxiosRequestConfig) => {
  if (!req.headers["Content-Type"]) req.headers["Content-Type"] = "application/json";

  const { token } = useSessionStore.getState();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
};

api.interceptors.request.use(authInterceptor);


