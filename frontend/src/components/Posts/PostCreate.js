import React, { useState } from "react";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap"; // Add this if you want a spinner
import ErrorAlert from "./ErrorAlert";
const PostCreate = ({
  newPost,
  setNewPost,
  fetchPosts,
  setError,
  loading, // ? //
  setLoading,
  onClose,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: newPost.title || "",
    description: newPost.description || "",
    image: newPost.image || null,
    country: "",
    city: "",
  });

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
    } else {
      setLoading(true); // Show loading while retrieving location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false); // Stop loading after location is retrieved
        },
        (error) => {
          setError("Unable to retrieve your location.");
          setLoading(false);
        }
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    handleGeolocation(); // Request location when the user submits

    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("description", formData.description);
    if (formData.image) postData.append("image", formData.image);
    if (formData.country) postData.append("country", formData.country);
    if (formData.city) postData.append("city", formData.city);
    postData.append("latitude", location.latitude);
    postData.append("longitude", location.longitude);

    try {
      setLoading(true);
      await axiosInstance.post("posts/", postData);
      fetchPosts(); // Refresh posts after creation
      onClose(); // Close modal
    } catch (error) {
      setError("An error occurred while creating the post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      {loading && <Spinner animation="border" size="sm" />}{" "}
      {/* Spinner for feedback */}
      <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
        {loading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
};

export default PostCreate;
