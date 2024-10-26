// src/components/Map/MyMap.js
import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import LocationButton from "./LocationButton";

function MyMap() {
  const mapboxToken =
    process.env.REACT_APP_MAPBOX_TOKEN ||
    "pk.eyJ1IjoiZ2lvOTgiLCJhIjoiY20xbjh2ajVsMHJwbjJqc2dwa20ycWgxdSJ9.HGPvSMZIdImD0pzCurj30g";

  const [map, setMap] = useState(null);
  const mapContainerRef = useRef(null);

  const handleLocationObtained = (lat, lon) => {
    console.log("Latitude:", lat, "Longitude:", lon);
    if (map) {
      map.flyTo({ center: [lon, lat], zoom: 12 });
    }
    // Optionally, send lat and lon to your backend here
  };

  useEffect(() => {
    if (!map) {
      mapboxgl.accessToken = mapboxToken;

      const initializeMap = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [8.5417, 47.3769], // Centered on Zurich by default
        zoom: 9,
      });

      // Add navigation controls to the map
      initializeMap.addControl(new mapboxgl.NavigationControl());

      // Add directions control to map
      const directions = new MapboxDirections({
        accessToken: mapboxToken,
        unit: "metric",
        profile: "mapbox/driving",
        alternatives: true,
        steps: true,
        interactive: false,
      });

      initializeMap.addControl(directions, "top-left");

      // Add geocoder control to the map
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxToken,
        mapboxgl: mapboxgl,
        placeholder: "Enter your city or address",
        countries: "", // Specify country or remove for worldwide
      });

      initializeMap.addControl(geocoder, "top-right");

      // Handle the geocoder result
      geocoder.on("result", (event) => {
        const lon = event.result.center[0];
        const lat = event.result.center[1];
        console.log("Selected Place:", event.result.place_name);
        console.log("Latitude:", lat, "Longitude:", lon);

        // Update the map center
        initializeMap.flyTo({ center: [lon, lat], zoom: 12 });

        // Optionally, send lat and lon to your backend here
      });

      setMap(initializeMap);
    }

    // Cleanup on unmount
    return () => map && map.remove();
  }, [map, mapboxToken]);

  return (
    <div>
      {/* Location Button to get user's current location */}
      <LocationButton onLocationObtained={handleLocationObtained} />

      {/* Map Container */}
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "500px" }}
      ></div>
    </div>
  );
}

export default MyMap;
