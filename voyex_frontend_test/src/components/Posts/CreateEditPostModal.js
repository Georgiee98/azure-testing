import React from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

const CreateEditPostModal = ({ show, onHide, post, onSubmit, loading }) => {
  const [newPost, setNewPost] = React.useState({
    title: post ? post.title : "",
    description: post ? post.description : "",
    image: null,
  });

  const handleSubmit = () => {
    onSubmit(newPost);
    setNewPost({ title: "", description: "", image: null });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{post ? "Edit Post" : "Create New Post"}</Modal.Title>
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
            {post && (
              <Form.Text className="text-muted">
                Upload a new image to replace the existing one.
              </Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
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
          ) : post ? (
            "Save Changes"
          ) : (
            "Create Post"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateEditPostModal;
