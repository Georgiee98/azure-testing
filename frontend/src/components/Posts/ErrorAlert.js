// import React from "react";
// import { Alert } from "react-bootstrap";

// const ErrorAlert = ({ error }) => {
//   if (!error) return null;

//   return (
//     <Alert variant="danger" className="text-center">
//       {error}
//     </Alert>
//   );
// };

// export default ErrorAlert;
import React from "react";
import "./posts.css";

const ErrorAlert = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="alert-error">
      <span>Error: {error}</span>
      <button className="close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default ErrorAlert;
