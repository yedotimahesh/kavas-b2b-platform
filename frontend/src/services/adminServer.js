import api from "@/lib/axios";

export const registerAdminAPI = (data) =>
  api.post("/api/admin/auth/register", data);

export const loginAdminAPI = (data) =>
  api.post("/api/admin/auth/login", data);

export const logoutAdminAPI = () =>
  api.post("/api/admin/auth/logout");

export const getAdminProfile = () =>
  api.get("/api/admin/auth/me");