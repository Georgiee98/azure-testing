// src/redux/slices/Auth.js

import { createSlice } from "@reduxjs/toolkit";

// Load tokens and user from localStorage if available
const accessTokenFromStorage = localStorage.getItem("access_token");
const refreshTokenFromStorage = localStorage.getItem("refresh_token");
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    registerEmail: undefined,
    currentUser: userFromStorage || null,
    accessToken: accessTokenFromStorage || null, // Load from localStorage
    refreshToken: refreshTokenFromStorage || null, // Load from localStorage
    isInputValid: true,
    // Location
  },

  reducers: {
    setRegisterEmail: (state, action) => {
      state.registerEmail = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload)); // Persist user
      } else {
        localStorage.removeItem("user"); // Remove user if null
      }
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      if (action.payload) {
        localStorage.setItem("access_token", action.payload); // Persist token
      } else {
        localStorage.removeItem("access_token"); // Remove token if null
      }
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      if (action.payload) {
        localStorage.setItem("refresh_token", action.payload); // Persist refresh token
      } else {
        localStorage.removeItem("refresh_token"); // Remove token if null
      }
    },
    setIsInputValid: (state, action) => {
      state.isInputValid = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    },
  },
});

export const selectIsInputValid = (state) => state.auth.isInputValid;

export const {
  setRegisterEmail,
  setCurrentUser,
  setAccessToken,
  setRefreshToken,
  setIsInputValid,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
