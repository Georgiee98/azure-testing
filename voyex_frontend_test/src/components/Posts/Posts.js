// src/components/Posts/Posts.jsx

import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import PostList from "./PostList";
import PostModal from "./PostModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import ErrorAlert from "./ErrorAlert";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import PostSearch from "../Search/PostSearch";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    image: null,
    country: null,
    state: null,
    city: "",
  });
  const [editingPostId, setEditingPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currentUser = useSelector((state) => state.auth.currentUser);

  // Fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("posts/");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts. Please try again later.");
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axiosInstance.post(`posts/${postId}/like/`);
      await fetchPosts();
    } catch (error) {
      console.error("Error liking post:", error);
      setError("Failed to like the post.");
    }
  };

  const handleComment = async (postId, comment) => {
    if (!comment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      await axiosInstance.post(`posts/${postId}/comment/`, {
        content: comment,
      });
      await fetchPosts();
    } catch (error) {
      console.error("Error commenting on post:", error);
      setError("Failed to comment on the post.");
    }
  };

  const handleShare = async (postId) => {
    try {
      await axiosInstance.post(`posts/${postId}/share/`);
      await fetchPosts();
    } catch (error) {
      console.error("Error sharing post:", error);
      setError("Failed to share the post.");
    }
  };

  const handleOpenCreateModal = () => {
    setNewPost({
      title: "",
      description: "",
      image: null,
      country: null,
      state: null,
      city: "",
    });
    setEditingPostId(null);
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setEditingPostId(null);
    setError(null); // Clear error when closing modal
  };

  const handleOpenDeleteModal = (postId) => {
    setEditingPostId(postId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setEditingPostId(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Posts</h2>

      {currentUser && (
        <div className="text-center mb-4">
          <Button variant="primary" onClick={handleOpenCreateModal}>
            Create New Post
          </Button>
        </div>
      )}

      {/* Display errors if they exist */}
      <ErrorAlert error={error} />

      <PostSearch />

      <PostList
        posts={posts}
        currentUser={currentUser}
        onOpenDeleteModal={handleOpenDeleteModal}
        handleLike={handleLike}
        handleComment={handleComment}
        handleShare={handleShare}
      />

      <PostModal
        show={showCreateModal}
        onClose={handleCloseCreateModal}
        newPost={newPost}
        setNewPost={setNewPost}
        editingPostId={editingPostId}
        fetchPosts={fetchPosts}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        editingPostId={editingPostId}
        fetchPosts={fetchPosts}
        setError={setError}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default Posts;
