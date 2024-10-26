// PrivateRoute.js
import React from "react";
import { Route, useNavigate } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("access_token");
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : navigate("/login")
      }
    />
  );
}

export default PrivateRoute;
