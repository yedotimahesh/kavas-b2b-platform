import api from "@/lib/axios";

// ✅ Register
export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

// ✅ Login
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

// ✅ Refresh token
export const refreshToken = () => {
  return api.post("/auth/refresh");
};

// ✅ Logout
export const logoutUser = () => {
  return api.post("/auth/logout");
};

// ✅ Get user profile
export const getMe = () => {
  return api.get("/auth/me");
};