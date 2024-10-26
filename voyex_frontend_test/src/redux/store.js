// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  setCurrentUser,
  setAccessToken,
  setRefreshToken,
} from "./slices/Auth";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Hydrate state from localStorage
const accessToken = localStorage.getItem("access_token");
const refreshToken = localStorage.getItem("refresh_token");
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

if (accessToken) {
  store.dispatch(setAccessToken(accessToken));
}

if (refreshToken) {
  store.dispatch(setRefreshToken(refreshToken));
}

if (user) {
  store.dispatch(setCurrentUser(user));
}

export default store;
