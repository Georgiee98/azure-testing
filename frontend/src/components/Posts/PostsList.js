import React from "react";
import { Card, Button } from "react-bootstrap";

const PostList = ({
  posts,
  currentUser,
  onOpenDeleteModal,
  handleLike,
  handleComment,
  handleShare,
}) => {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <Card key={post.id} className="mb-3">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
            <Card.Text>
              Location: {post.city || "Unknown City"},{" "}
              {post.state || "Unknown State"},{" "}
              {post.country || "Unknown Country"}
            </Card.Text>

            {/* Buttons for like, comment, and share */}
            <div className="d-flex justify-content-between">
              <Button
                variant="outline-primary"
                onClick={() => handleLike(post.id)}
              >
                👍 {post.likes_count}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => handleShare(post.id)}
              >
                🔄 {post.shares_count}
              </Button>
            </div>

            {/* Comment Section */}
            <div className="mt-3">
              <input type="text" placeholder="Write a comment..." />
              <Button
                variant="outline-success"
                onClick={() => handleComment(post.id, "Your comment")}
              >
                Comment
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
