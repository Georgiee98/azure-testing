import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import axiosInstance from "../../api/axios"; // Adjust the path if necessary

const DeleteConfirmationModal = ({
  show,
  onClose,
  editingPostId,
  fetchPosts,
  setError,
  loading,
  setLoading,
}) => {
  const handleDeletePost = async () => {
    if (!editingPostId) return;

    try {
      setLoading(true);
      await axiosInstance.delete(`posts/${editingPostId}/`);
      await fetchPosts(); // Refresh posts after successful deletion
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete the post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this post? This action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeletePost} disabled={loading}>
          {loading ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            "Delete"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
