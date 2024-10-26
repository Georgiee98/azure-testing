import React, { useState } from "react";
import MyMap from "./MyMap"; // Adjust the import path accordingly
import LocationForm from "./LocationForm"; // Assuming you have a separate form

function Map() {
  const [routeData, setRouteData] = useState(null);

  return (
    <div className="Map">
      {/* Place the LocationForm above or below the map */}
      <LocationForm />
      <MyMap routeData={routeData} />
    </div>
  );
}

export default Map;
