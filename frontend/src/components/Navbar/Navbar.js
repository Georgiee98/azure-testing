import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAccessToken } from "../../redux/slices/Auth"; // Ensure the correct import
import "./Navbar.css"; // Import your CSS file for styles

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the accessToken from the Redux store
  const accessToken = useSelector((state) => state.auth?.accessToken);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token"); // Clear the refresh token as well, if needed

    // Dispatch the action to reset the accessToken in Redux
    dispatch(setAccessToken(null));

    // Navigate to the login page
    navigate("/login");
  };

  // Check if the user is authenticated
  const isAuthenticated = useSelector((state) => !!state.auth.accessToken);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-title">
          VOYEX
        </Link>
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/Posts">Posts</Link>
            <Link to="/profile">My Profile</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/Posts">Posts</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
