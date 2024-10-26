// src/PrivateRoutes.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

// // src/components/PrivateRoute.js
// import React from "react";
// import { Route, Redirect } from "react-router-dom";
// import { connect } from "react-redux";

// const PrivateRoute = ({ component: Component, auth, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       auth.isAuthenticated === true ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps)(PrivateRoute);
