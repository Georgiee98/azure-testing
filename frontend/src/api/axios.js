import axios from "axios";
import store from "../redux/store";
import { setAccessToken, logout } from "../redux/slices/Auth";

// Create an Axios instance without default headers
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8001/api/",
  timeout: 5000,
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token refresh on 401 error
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      error.response.data.code === "token_not_valid"
    ) {
      originalRequest._retry = true;

      const state = store.getState();
      const refresh_token = state.auth.refreshToken;

      if (refresh_token) {
        try {
          const response = await axios.post(
            "http://localhost:8001/api/JWT/token/refresh/",
            { refresh: refresh_token }
          );
          const { access } = response.data;

          // Update access token in Redux store and localStorage
          store.dispatch(setAccessToken(access));
          localStorage.setItem("access_token", access);

          // Update headers
          axiosInstance.defaults.headers["Authorization"] = "Bearer " + access;
          originalRequest.headers["Authorization"] = "Bearer " + access;

          return axiosInstance(originalRequest);
        } catch (err) {
          localStorage.clear();
          store.dispatch(logout());
          window.location.href = "/login/";
          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;

export const fetchRoute = async (startLat, startLng, endLat, endLng, mode) => {
  try {
    const response = await axios.get(
      `/api/routes/?start_lat=${startLat}&start_lng=${startLng}&end_lat=${endLat}&end_lng=${endLng}&mode=${mode}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching route:", error);
    return null;
  }
};
