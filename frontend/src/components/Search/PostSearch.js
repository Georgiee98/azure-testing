import React, { useState, useEffect } from "react";
import Select from "react-select";
import axiosInstance from "../../api/axios";

const PostSearch = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [city, setCity] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch countries data on mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get("posts/countries/"); // Adjust the endpoint if needed
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("Failed to fetch countries.");
      }
    };
    fetchCountries();
  }, []);

  // Update states when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find((c) => c.name === selectedCountry.value);
      setStates(country ? country.states : []);
    } else {
      setStates([]);
    }
    setSelectedState(null);
  }, [selectedCountry, countries]);

  const handleSearch = async () => {
    if (!selectedCountry) {
      setError("Please select a country.");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.get("posts/search-by-location/", {
        params: {
          country: selectedCountry ? selectedCountry.value : null,
          state: selectedState ? selectedState.value : null,
          city: city.trim() || null,
        },
      });
      setPosts(response.data);
      setError(null);
    } catch (error) {
      console.error("Error searching posts:", error);
      setError("Error searching for posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Search Posts by Location</h3>

      {/* Country Select */}
      <Select
        options={countries.map((country) => ({
          value: country.name,
          label: country.name,
        }))}
        onChange={(option) => setSelectedCountry(option)}
        value={selectedCountry}
        placeholder="Select a country"
      />

      {/* State Select */}
      <Select
        options={states.map((state) => ({
          value: state.name,
          label: state.name,
        }))}
        onChange={(option) => setSelectedState(option)}
        value={selectedState}
        placeholder="Select a state"
        isDisabled={!selectedCountry} // Disable state select if no country is selected
      />

      {/* City Input */}
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={!selectedState} // Disable city input if no state is selected
      />

      {/* Search Button */}
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {/* Error Display */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Posts Display */}
      {posts.length > 0 ? (
        <div>
          <h4>Results:</h4>
          {posts.map((post) => (
            <div key={post.id}>
              <h5>{post.title}</h5>
              <p>{post.description}</p>
              <p>
                City: {post.city}, State: {post.state}, Country: {post.country}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <div>No posts found.</div>
      )}
    </div>
  );
};

export default PostSearch;
