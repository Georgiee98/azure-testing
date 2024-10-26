import React from "react";
import { Card, Button } from "react-bootstrap";
import defaultImage from "./image.jpeg";
const PostCard = ({ post, currentUser, onOpenDeleteModal }) => {
  return (
    <Card className="mb-4">
      {post.image_url && (
        // <Card.Img variant="top" src={post.image_url} alt={post.title} />
        <Card.Img
          variant="top"
          src={post.image_url || defaultImage}
          alt={post.title}
        />
      )}
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.description}</Card.Text>
        <Card.Text className="text-muted">
          By {post.author} on {new Date(post.timestamp).toLocaleString()}
        </Card.Text>

        {/* Buttons for like, comment, and share would go here */}
        {currentUser && (
          <div className="d-flex flex-wrap">
            {/* Replace with actual implementations for liking, commenting, etc. */}
            <Button
              variant="outline-danger"
              onClick={() => onOpenDeleteModal(post.id)}
            >
              Delete
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
