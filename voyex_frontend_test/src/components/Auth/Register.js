import React, { useState } from "react";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const navigate = useNavigate();
  const initialFormData = {
    email: "",
    username: "",
    password: "",
    password2: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [nonFieldError, setNonFieldError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    setErrors({
      ...errors,
      [e.target.name]: "", // Clear error message when user edits the field
    });
    setNonFieldError(""); // Clear non-field errors when user edits any field
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData); // Console log for debugging
    axiosInstance
      .post("JWT/register/", formData)
      .then((response) => {
        console.log("Registration successful:", response.data);
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error response:", error.response); // Console log for debugging
          if (error.response.data) {
            setErrors(error.response.data);
            if (error.response.data.non_field_errors) {
              setNonFieldError(error.response.data.non_field_errors.join(" "));
            }
          } else {
            setNonFieldError("An unexpected error occurred.");
          }
        } else {
          console.error("Error during registration:", error); // Console log for debugging
          setNonFieldError("Unable to connect to the server.");
        }
      });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
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
            value={formData.email}
            required
            placeholder="Enter your email"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Username Field */}
        <div className="form-group mb-3">
          <label>Username</label>
          <input
            type="text"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            name="username"
            onChange={handleChange}
            value={formData.username}
            required
            placeholder="Choose a username"
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group mb-3">
          <label>Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              placeholder="Enter a password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={toggleShowPassword}
              tabIndex="-1"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
        </div>

        {/* Repeat Password Field */}
        <div className="form-group mb-3">
          <label>Repeat Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              className={`form-control ${errors.password2 ? "is-invalid" : ""}`}
              name="password2"
              onChange={handleChange}
              value={formData.password2}
              required
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={toggleShowPassword}
              tabIndex="-1"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password2 && (
              <div className="invalid-feedback">{errors.password2}</div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
