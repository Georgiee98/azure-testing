// src/components/LocationButton.js
import React, { useState } from "react";

function LocationButton({ onLocationObtained }) {
  const [error, setError] = useState(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationObtained(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (err) => {
          setError("Unable to retrieve your location.");
        }
      );
    }
  };

  return (
    <div>
      <button onClick={handleGetLocation}>Use My Current Location</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default LocationButton;
