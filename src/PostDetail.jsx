// src/PostDetail.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetail.css';

function PostDetail({ posts }) {
  const { id } = useParams();
  const post = posts?.find((p) => p.id === id);
  const navigate = useNavigate();

  if (!post) {
    return <div>Post not found</div>;
  }

  console.log('Post Data:', post); // Check the post data
  console.log('Images Array:', post.images); // Debug print for images array

  const renderImages = () => {
    if (Array.isArray(post.images) && post.images.length > 0) {
      return post.images.map((image, index) => (
        <div key={index} className="post-image-container">
          <img loading="lazy" src={image} alt={`Post ${index + 1}`} className="post-image" />
        </div>
      ));
    } else if (typeof post.image === 'string') {
      return (
        <div className="post-image-container">
          <img loading="lazy" src={post.image} alt="Post" className="post-image" />
        </div>
      );
    } else {
      return <p>No images available</p>;
    }
  };

  return (
    <div className="post-detail">
      <button className="back-button" onClick={() => navigate('/')}>Back to Timeline</button>
      <div className="post-content">
        {renderImages()}
        <p className="post-caption">{post.caption}</p>
      </div>
    </div>
  );
}

export default PostDetail;