import axios from "axios";

// ✅ fallback if env not set
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api-gateway-thj7.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const setupInterceptors = (store) => {
  // ✅ REQUEST INTERCEPTOR
  api.interceptors.request.use(
    (config) => {
      const token = store.getState().auth?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // ✅ RESPONSE INTERCEPTOR
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          // ✅ FIXED (no extra /api)
          const res = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          );

          const newAccessToken = res.data?.accessToken;

          // ✅ save new token
          store.dispatch({
            type: "auth/setToken",
            payload: newAccessToken,
          });

          // ✅ retry original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);

        } catch (refreshError) {
          store.dispatch({ type: "auth/logout" });
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default api;