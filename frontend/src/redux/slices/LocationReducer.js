const initialState = {
  currentLocation: { latitude: null, longitude: null },
  destination: { latitude: null, longitude: null },
  routes: [],
};

export const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_LOCATION":
      return { ...state, currentLocation: action.payload };
    case "SET_DESTINATION":
      return { ...state, destination: action.payload };
    case "SET_ROUTES":
      return { ...state, routes: action.payload };
    default:
      return state;
  }
};

// Actions to set data
export const setCurrentLocation = (location) => ({
  type: "SET_CURRENT_LOCATION",
  payload: location,
});

export const setDestination = (location) => ({
  type: "SET_DESTINATION",
  payload: location,
});
