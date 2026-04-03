import api from "@/lib/axios";

export const registerAdmin = (data) => {
  return api.post("/admin/auth/register", data);
};

export const loginAdmin = (data) => {
  return api.post("/admin/auth/login", data);
};

export const refreshAdminToken = () => {
  return api.post("/admin/auth/refresh");
};

export const logoutAdmin = () => {
  return api.post("/admin/auth/logout");
};

export const getAdminProfile = () => {
  return api.get("/admin/auth/me");
};