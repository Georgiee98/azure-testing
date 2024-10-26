// src/components/Logout/Logout.js

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/Auth"; // Import the logout action
import axiosInstance from "../../api/axios";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the Redux logout action to clear tokens and user state
    dispatch(logout());
    console.log("Logged out");

    // Remove authorization header from Axios
    delete axiosInstance.defaults.headers["Authorization"];
    console.log("Authorization header removed from Axios");

    // Navigate to the login page
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="btn btn-secondary">
      Logout
    </button>
  );
}

export default Logout;
