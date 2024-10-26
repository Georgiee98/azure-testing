// src/redux/localStorage.js

// Function to load state from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) {
      return undefined; // No state found, use reducer's default
    }
    return JSON.parse(serializedState); // Return parsed state
  } catch (e) {
    console.error("Could not load state from localStorage:", e);
    return undefined; // In case of error, ignore persisted state
  }
};

// Function to save state to localStorage
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("authState", serializedState); // Save serialized state
  } catch (e) {
    console.error("Could not save state to localStorage:", e);
    // Handle write errors if necessary
  }
};
