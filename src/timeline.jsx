import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from './firebaseconfig';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Timeline() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  return (
    <div className="timeline">
      <h1>My Timeline</h1>
      <Link to="/create-post">
        <button>Create Post</button>
      </Link>
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <img src={post.image} alt="Post" />
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;


