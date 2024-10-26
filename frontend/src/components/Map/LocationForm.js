import React, { useState } from "react";

function LocationForm({ setRouteData }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to set route data based on origin and destination
    // This could involve using Mapbox Directions API to fetch route
    // and then passing it to the MyMap component via setRouteData
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <div>
        <label>Origin:</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Destination:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
      </div>
      <button type="submit">Get Directions</button>
    </form>
  );
}

export default LocationForm;

// // src/components/Map/LocationForm.js
// import React, { useState } from "react";
// import axios from "axios";

// function LocationForm({ setRouteData }) {
//   const [originCity, setOriginCity] = useState("");
//   const [destinationCity, setDestinationCity] = useState("");
//   const [airDistance, setAirDistance] = useState(null);
//   const [carDistanceMin, setCarDistanceMin] = useState(null);
//   const [carDistanceMax, setCarDistanceMax] = useState(null);
//   const [drivingTime, setDrivingTime] = useState(null);
//   const [directionsSteps, setDirectionsSteps] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const mapboxToken =
//     process.env.REACT_APP_MAPBOX_TOKEN ||
//     "pk.eyJ1IjoiZ2lvOTgiLCJhIjoiY20xbjh2ajVsMHJwbjJqc2dwa20ycWgxdSJ9.HGPvSMZIdImD0pzCurj30g";

//   // Function to get coordinates from city name
//   const getCoordinates = async (city) => {
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
//       city
//     )}.json?access_token=${mapboxToken}`;
//     try {
//       const response = await axios.get(url);
//       if (response.data.features.length === 0) {
//         throw new Error("No results found");
//       }
//       const coordinates = response.data.features[0].center;
//       return coordinates;
//     } catch (error) {
//       console.error("Error fetching coordinates:", error);
//       return null;
//     }
//   };

//   // Function to calculate air distance using Haversine formula
//   const calculateAirDistance = (originCoords, destinationCoords) => {
//     const [lng1, lat1] = originCoords;
//     const [lng2, lat2] = destinationCoords;

//     const toRadians = (degree) => (degree * Math.PI) / 180;
//     const R = 6371; // Radius of Earth in km
//     const dLat = toRadians(lat2 - lat1);
//     const dLon = toRadians(lng2 - lng1);
//     const lat1Rad = toRadians(lat1);
//     const lat2Rad = toRadians(lat2);

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1Rad) *
//         Math.cos(lat2Rad) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c;
//     setAirDistance(distance);
//   };

//   // Function to calculate driving distance and time
//   const calculateDrivingData = async (originCoords, destinationCoords) => {
//     const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoords[0]},${originCoords[1]};${destinationCoords[0]},${destinationCoords[1]}?access_token=${mapboxToken}&overview=full&alternatives=true&steps=true`;

//     try {
//       const response = await axios.get(directionsUrl);
//       const routes = response.data.routes;

//       if (routes.length > 0) {
//         // Find the shortest and longest routes
//         let shortestRoute = routes[0];
//         let longestRoute = routes[0];

//         routes.forEach((route) => {
//           if (route.distance < shortestRoute.distance) {
//             shortestRoute = route;
//           }
//           if (route.distance > longestRoute.distance) {
//             longestRoute = route;
//           }
//         });

//         const shortestDistance = shortestRoute.distance / 1000; // in km
//         const shortestDuration = shortestRoute.duration / 60; // in minutes

//         const longestDistance = longestRoute.distance / 1000; // in km
//         const longestDuration = longestRoute.duration / 60; // in minutes

//         setCarDistanceMin(shortestDistance.toFixed(2));
//         setCarDistanceMax(longestDistance.toFixed(2));
//         setDrivingTime(
//           `${Math.floor(shortestDuration)}h ${Math.round(
//             (shortestDuration % 1) * 60
//           )}min`
//         );

//         // Extract step-by-step directions from the shortest route
//         const steps = shortestRoute.legs[0].steps.map((step, index) => ({
//           instruction: step.maneuver.instruction,
//           distance: (step.distance / 1000).toFixed(2), // in km
//           duration: (step.duration / 60).toFixed(2), // in minutes
//         }));
//         setDirectionsSteps(steps);

//         // Pass route data to parent Map component for map display
//         setRouteData(shortestRoute);
//       } else {
//         console.error("No routes found");
//         setError("No routes found between the selected cities.");
//       }
//     } catch (error) {
//       console.error("Error calculating driving data:", error);
//       setError("Failed to calculate driving data. Please try again.");
//     }
//   };

//   // Handle reverse origin and destination
//   const handleReverse = () => {
//     if (originCity && destinationCity) {
//       const temp = originCity;
//       setOriginCity(destinationCity);
//       setDestinationCity(temp);
//     } else {
//       alert("Both origin and destination need to be filled to reverse.");
//     }
//   };

//   // Handle reset fields
//   const handleReset = () => {
//     setOriginCity("");
//     setDestinationCity("");
//     setAirDistance(null);
//     setCarDistanceMin(null);
//     setCarDistanceMax(null);
//     setDrivingTime(null);
//     setDirectionsSteps([]);
//     setRouteData(null);
//     setError(null);
//   };

//   // Handle calculate distances
//   const calculateDistances = async () => {
//     if (!originCity || !destinationCity) {
//       alert("Please enter both origin and destination cities.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     const originCoords = await getCoordinates(originCity);
//     const destinationCoords = await getCoordinates(destinationCity);

//     if (!originCoords || !destinationCoords) {
//       setError("Could not fetch coordinates for both cities.");
//       setLoading(false);
//       return;
//     }

//     calculateAirDistance(originCoords, destinationCoords);
//     await calculateDrivingData(originCoords, destinationCoords);

//     setLoading(false);
//   };

//   return (
//     <div className="distance-calculator card p-4 mb-4">
//       <h2 className="mb-4">Distance Calculator</h2>

//       {/* Origin City Input */}
//       <div className="mb-3">
//         <label htmlFor="origin" className="form-label">
//           Origin City:
//         </label>
//         <div className="input-group">
//           <input
//             type="text"
//             id="origin"
//             className="form-control"
//             value={originCity}
//             onChange={(e) => setOriginCity(e.target.value)}
//             placeholder="Enter origin city"
//           />
//           <button className="btn btn-danger" onClick={handleReset}>
//             Reset
//           </button>
//         </div>
//       </div>

//       {/* Destination City Input */}
//       <div className="mb-3">
//         <label htmlFor="destination" className="form-label">
//           Destination City:
//         </label>
//         <input
//           type="text"
//           id="destination"
//           className="form-control"
//           value={destinationCity}
//           onChange={(e) => setDestinationCity(e.target.value)}
//           placeholder="Enter destination city"
//         />
//       </div>

//       {/* Buttons */}
//       <div className="mb-4">
//         <button className="btn btn-secondary me-2" onClick={handleReverse}>
//           Reverse
//         </button>
//         <button
//           className="btn btn-primary"
//           onClick={calculateDistances}
//           disabled={loading}
//         >
//           {loading ? "Calculating..." : "Calculate Distances"}
//         </button>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="alert alert-danger" role="alert">
//           {error}
//         </div>
//       )}

//       {/* Results Display */}
//       <div className="results-section">
//         {airDistance !== null && drivingTime && (
//           <div className="card p-3 mb-4">
//             <h4 className="mb-3">Results:</h4>
//             <div className="mb-2">
//               <strong>Driving Time:</strong> {drivingTime}
//             </div>
//             <div className="mb-2">
//               <strong>Car Distance:</strong>{" "}
//               {carDistanceMin && carDistanceMax
//                 ? `${carDistanceMin} km - ${carDistanceMax} km`
//                 : "Calculating..."}
//             </div>
//             <div className="mb-2">
//               <strong>Air Distance:</strong> {airDistance.toFixed(2)} km
//             </div>
//           </div>
//         )}

//         {/* Directions Display */}
//         {directionsSteps.length > 0 && (
//           <div className="card p-3">
//             <h4 className="mb-3">Step-by-Step Directions:</h4>
//             <ol className="list-group list-group-numbered">
//               {directionsSteps.map((step, index) => (
//                 <li key={index} className="list-group-item">
//                   <strong>Step {index + 1}:</strong> {step.instruction} (
//                   {step.distance} km, {step.duration} min)
//                 </li>
//               ))}
//             </ol>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default LocationForm;
