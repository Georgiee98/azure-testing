// src/App.js

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken } from "./redux/slices/Auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./PrivateRoutes";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Logout from "./components/Auth/Logout";
import NavigationBar from "./components/Navbar/Navbar";
import Posts from "./components/Posts/Posts";
import HomePage from "./components/Home/Home";
// import PostDetails from "./components/Posts/PostDetails";
// import PostCreate from "./components/Posts/PostCreate"; // Import PostCreate
// import PostModal from "./components/Posts/PostEdit"; // Import PostEdit
import "leaflet/dist/leaflet.css";
import Chat from "./chat-frontend/Chat";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load tokens from localStorage and rehydrate Redux state
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (accessToken) {
      dispatch(setAccessToken(accessToken));
    }
    if (refreshToken) {
      dispatch(setRefreshToken(refreshToken));
    }
  }, [dispatch]);

  return (
    <Router>
      {/* Render the NavigationBar component here */}
      <NavigationBar />

      <Routes>
        <Route exact path="/home" element={<HomePage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        {/* <Route exact path="/chat" element={<Chat />} /> */}

        {/* Protected Routes */}
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/posts/create"
          element={<ProtectedRoute>{/* <PostCreate /> */}</ProtectedRoute>}
        />
        <Route
          path="/posts/:id/edit"
          element={<ProtectedRoute>{/* <PostModal /> */}</ProtectedRoute>}
        />
        <Route
          path="/posts/:id"
          element={<ProtectedRoute>{/* <PostDetails /> */}</ProtectedRoute>}
        />

        {/* Public Routes */}
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/posts" element={<Posts />} />

        {/* Fallback Route */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
