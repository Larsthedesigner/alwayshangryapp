// src/Timeline.jsx

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseconfig';
import { Link } from 'react-router-dom';
import './timeline.css'; // Ensure you import your CSS file

function Timeline() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))); // Include document ID
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching posts: ", error);
        setError("Error fetching posts. Please try again later.");
        setLoading(false);
      }
    );
    return () => unsubscribe(); // Clean up the listener
  }, []);

  const getImageUrl = (post) => {
    if (Array.isArray(post.images) && post.images.length > 0) {
      return post.images[0]; // Return the first image URL if images is an array
    }
    return post.image || ''; // Return the single image URL or an empty string if no image
  };

  return (
    <div className="timeline">
      {loading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      <div className="posts">
        {posts.length === 0 && !loading && <p>No posts available</p>}
        {posts.map((post) => (
          <div key={post.id} className="post">
            <Link to={`/posts/${post.id}`}>
              {getImageUrl(post) && <img loading="lazy" src={getImageUrl(post)} alt="Post" />}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;