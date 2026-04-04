import api from "@/lib/axios";

export const registerUserAPI = (data) =>
  api.post("/api/auth/register", data);

export const loginUser = (data) =>
  api.post("/api/auth/login", data);

export const logoutUser = () =>
  api.post("/api/auth/logout");

export const refreshToken = () =>
  api.post("/api/auth/refresh");

export const getMe = () =>
  api.get("/api/auth/me");