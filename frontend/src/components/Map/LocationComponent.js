import React, { useState, useEffect } from "react";

function LocationComponent() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setErrorMsg("Unable to retrieve your location");
          console.error(error);
        }
      );
    }
  }, []);

  if (errorMsg) return <div>{errorMsg}</div>;
  if (!location.latitude) return <div>Loading...</div>;

  return (
    <div>
      <h3>Your Location:</h3>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
}

export default LocationComponent;
