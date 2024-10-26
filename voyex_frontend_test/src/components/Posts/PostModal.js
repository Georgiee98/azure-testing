import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import Select from "react-select"; // To make dropdowns searchable
import axiosInstance from "../../api/axios"; // Adjust the path if necessary

const PostModal = ({
  show,
  onClose,
  newPost,
  setNewPost,
  editingPostId,
  fetchPosts,
  setError,
  loading,
  setLoading,
}) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch country and location data
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await axiosInstance.get("posts/countries/");
        setCountries(response.data);
      } catch (error) {
        setError("Error loading countries.");
      }
    };
    loadCountries();
  }, [setError]);

  const handleCountryChange = (selectedOption) => {
    const selectedCountry = selectedOption.value;
    setNewPost({ ...newPost, country: selectedCountry, state: "", city: "" }); // Reset state and city
    const countryData = countries.find((c) => c.name === selectedCountry);
    if (countryData) {
      setStates(countryData.states || []);
    } else {
      setStates([]);
    }
    setCities([]); // Reset cities when country changes
  };

  const handleStateChange = (selectedOption) => {
    const selectedState = selectedOption.value;
    setNewPost({ ...newPost, state: selectedState, city: "" }); // Reset city
    const stateData = states.find((s) => s.name === selectedState);
    if (stateData) {
      setCities(stateData.cities || []);
    } else {
      setCities([]); // Reset cities if no valid state is selected
    }
  };

  // Handle form submission for creating or updating a post
  const handleSubmitPost = async () => {
    if (!newPost.title.trim() || !newPost.description.trim()) {
      alert("Title and Description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("description", newPost.description);

    // Append country, state, and city only if they exist
    if (newPost.country) {
      formData.append("country", newPost.country);
    }
    if (newPost.state) {
      formData.append("state", newPost.state);
    }
    if (newPost.city) {
      formData.append("city", newPost.city);
    }

    // Add zip code
    if (newPost.zip_code) {
      formData.append("zip_code", newPost.zip_code);
    }

    if (newPost.image) {
      formData.append("image", newPost.image);
    }

    try {
      setLoading(true);
      if (editingPostId) {
        await axiosInstance.put(`posts/${editingPostId}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.post("posts/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      await fetchPosts();
      onClose();
      setNewPost({
        title: "",
        description: "",
        image: null,
        country: "",
        state: "",
        city: "",
        zip_code: "", // Reset zip code after submission
      });
    } catch (error) {
      setError("Error submitting the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {editingPostId ? "Edit Post" : "Create New Post"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              placeholder="Enter post title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newPost.description}
              onChange={(e) =>
                setNewPost({ ...newPost, description: e.target.value })
              }
              placeholder="Enter post description"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Select
              options={countries.map((country) => ({
                value: country.name,
                label: country.name,
              }))}
              onChange={handleCountryChange}
              value={
                newPost.country
                  ? { value: newPost.country, label: newPost.country }
                  : null
              }
              placeholder="Select Country"
            />
          </Form.Group>

          {states.length > 0 && (
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Select
                options={states.map((state) => ({
                  value: state.name,
                  label: state.name,
                }))}
                onChange={handleStateChange}
                value={
                  newPost.state
                    ? { value: newPost.state, label: newPost.state }
                    : null
                }
                placeholder="Select State"
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={newPost.city || ""}
              onChange={(e) => setNewPost({ ...newPost, city: e.target.value })}
              placeholder="Enter City"
            />
          </Form.Group>

          {/* Zip Code Field */}
          <Form.Group className="mb-3">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              value={newPost.zip_code || ""}
              onChange={(e) =>
                setNewPost({ ...newPost, zip_code: e.target.value })
              }
              placeholder="Enter Zip Code"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewPost({ ...newPost, image: e.target.files[0] })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmitPost} disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Saving...
            </>
          ) : editingPostId ? (
            "Save Changes"
          ) : (
            "Create Post"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PostModal;
