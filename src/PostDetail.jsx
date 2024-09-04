// src/PostDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetail.css'; // Import CSS file for styling
function PostDetail({ posts }) {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);
  const navigate = useNavigate();
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className="post-detail">
      <button className="back-button" onClick={() => navigate('/')}>Back to Timeline</button>
      <div className="post-content">
        <img loading="lazy" src={post.image} alt={post.caption} className="post-image" />
        <p className="post-caption">{post.caption}</p>
      </div>
    </div>
  );
}
export default PostDetail;