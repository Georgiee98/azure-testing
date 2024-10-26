// src/components/Map/RouteMap.js
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useEffect } from "react";
import { axiosInstance, fetchRoute } from "../../api/axios";

function RouteMap({ start, end, mode, setRouteData }) {
  useEffect(() => {
    const getRoute = async () => {
      const data = await fetchRoute(
        start.latitude,
        start.longitude,
        end.latitude,
        end.longitude,
        mode
      );
      setRouteData(data); // Set route data in HomePage
    };
    getRoute();
  }, [start, end, mode, setRouteData]);

  return (
    <MapContainer
      center={start}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={start} />
      <Marker position={end} />
    </MapContainer>
  );
}

export default RouteMap;

// import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
// import { useState, useEffect } from "react";
// import fetchRoute from "../../api/axios"; // Your function to fetch routes
// import RouteInfo from "./RouteInfo"; // Ensure you import this

// function RouteMap({ start, end, mode }) {
//   const [routeData, setRouteData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getRoute = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await fetchRoute(
//           start.latitude,
//           start.longitude,
//           end.latitude,
//           end.longitude,
//           mode
//         );
//         if (data) {
//           setRouteData(data);
//         } else {
//           setError("No route data found");
//         }
//       } catch (error) {
//         setError("Failed to load route");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getRoute();
//   }, [start, end, mode]);

//   if (loading) return <p>Loading route...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <>
//       <MapContainer
//         center={start}
//         zoom={13}
//         style={{ height: "400px", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//         />
//         <Marker position={start} />
//         <Marker position={end} />
//         {routeData && <Polyline positions={routeData.polyline} color="blue" />}
//       </MapContainer>

//       {/* Only render RouteInfo if routeData exists */}
//       {routeData && (
//         <RouteInfo
//           distance={routeData.distance}
//           duration={routeData.duration}
//         />
//       )}
//     </>
//   );
// }

// export default RouteMap;
