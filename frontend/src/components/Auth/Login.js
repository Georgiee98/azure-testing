// src/components/Login/Login.js

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setAccessToken,
  setRefreshToken,
  setCurrentUser,
} from "../../redux/slices/Auth"; // Import setCurrentUser

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css"; // Assuming you have a CSS file for custom styles
import axiosInstance from "../../api/axios"; // Import axiosInstance for API calls

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [nonFieldError, setNonFieldError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value.trim());
    } else if (name === "password") {
      setPassword(value.trim());
    }

    setErrors({
      ...errors,
      [name]: "",
    });
    setNonFieldError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8001/api/JWT/login/";

    const jsBody = {
      email,
      password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsBody),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);

        // Store tokens with consistent keys
        localStorage.setItem("access_token", data.access);
        dispatch(setAccessToken(data.access));

        if (data.refresh) {
          localStorage.setItem("refresh_token", data.refresh);
          dispatch(setRefreshToken(data.refresh));
        }

        // Fetch current user data
        const userResponse = await axiosInstance.get("JWT/profile/"); // Update the endpoint as per Django URLs
        const userData = userResponse.data;

        // Store user data in Redux and localStorage
        dispatch(setCurrentUser(userData));
        localStorage.setItem("user", JSON.stringify(userData));

        console.log("User data set:", userData);

        navigate("/about");
      } else {
        const errorData = await response.json();
        setNonFieldError(errorData.detail || "Login failed");
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-lg">
        {/* Display non-field errors */}
        {nonFieldError && (
          <div className="alert alert-danger" role="alert">
            {nonFieldError}
          </div>
        )}

        {/* Email Field */}
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            onChange={handleChange}
            value={email}
            required
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group mb-3">
          <label>Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              onChange={handleChange}
              value={password}
              required
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={toggleShowPassword}
              tabIndex="-1"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <div className="invalid-feedback d-block">{errors.password}</div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      <div className="text-center mt-3">
        <NavLink to="/register">Don't have an account? Register here.</NavLink>
      </div>
    </div>
  );
}

export default Login;
