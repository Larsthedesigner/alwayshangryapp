// src/Timeline.js

import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from './firebaseconfig';

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
      {posts.map((post, index) => (
        <div key={index} className="post">
          <img src={post.image} alt="Post" />
          <p>{post.caption}</p>
        </div>
      ))}
    </div>
  );
}

export default Timeline;

