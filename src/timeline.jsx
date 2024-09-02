// src/timeline.jsx

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseconfig';
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
        setPosts(snapshot.docs.map(doc => doc.data()));
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

  return (
    <div className="timeline">
      {loading && <p>Loading posts...</p>}
      {error && <p>{error}</p>}
      <div className="posts">
        {posts.length === 0 && !loading && <p>No posts available</p>}
        {posts.map((post, index) => (
          <div key={index} className="post">
            {post.image && <img src={post.image} alt="Post" />}
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;

