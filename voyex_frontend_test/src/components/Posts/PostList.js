import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";

const PostList = ({
  posts,
  currentUser,
  onOpenDeleteModal,
  handleLike,
  handleComment,
  handleShare,
}) => {
  const [newComment, setNewComment] = useState("");

  return (
    <div className="post-list">
      {posts.map((post) => (
        <Card key={post.id} className="mb-4">
          {post.image_url && (
            <Card.Img variant="" src={post.image_url} alt={post.title} />
          )}
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
            {post.country && (
              <Card.Text className="text-muted">
                Country: {post.country}
              </Card.Text>
            )}
            {/* City only PRIVATE */}
            {post.city && (
              <Card.Text className="text-muted">City: {post.city}</Card.Text>
            )}
            <Card.Text className="text-muted">
              By {post.author} on {new Date(post.timestamp).toLocaleString()}
            </Card.Text>

            {/* Like, Comment, Share Buttons */}
            {currentUser && (
              <div className="d-flex flex-wrap">
                <Button
                  variant="outline-success"
                  className="me-2 mb-2"
                  onClick={() => handleLike(post.id)}
                >
                  Like ({post.likes_count})
                </Button>

                <Button
                  variant="outline-primary"
                  className="me-2 mb-2"
                  onClick={() => {
                    const comment = prompt("Enter your comment");
                    if (comment) {
                      handleComment(post.id, comment);
                    }
                  }}
                >
                  Comment ({post.comments_count})
                </Button>

                <Button
                  variant="outline-secondary"
                  className="me-2 mb-2"
                  onClick={() => handleShare(post.id)}
                >
                  Share ({post.shares_count})
                </Button>

                {Number(currentUser.id) === Number(post.author) && (
                  <Button
                    variant="outline-warning"
                    className="me-2 mb-2"
                    onClick={() => onOpenDeleteModal(post.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            )}

            {/* Comments Section */}
            {post.comments && post.comments.length > 0 && (
              <div className="mt-3">
                <h6>Comments:</h6>
                {post.comments.map((comment) => (
                  <Card.Text key={comment.id} className="text-muted">
                    {comment.content} - <em>{comment.author}</em>
                  </Card.Text>
                ))}
              </div>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default PostList;
