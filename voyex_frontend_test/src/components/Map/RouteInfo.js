// src/components/Map/RouteInfo.js
const RouteInfo = ({ routeData }) => {
  // Check if routeData exists and contains valid data
  if (!routeData || !routeData.distance || !routeData.duration) {
    return <div>No route data available.</div>;
  }

  const { distance, duration } = routeData;

  return (
    <div>
      <h3>Route Info</h3>
      <p>Distance: {distance || "N/A"}</p>
      <p>Time: {duration || "N/A"}</p>
    </div>
  );
};

export default RouteInfo;
