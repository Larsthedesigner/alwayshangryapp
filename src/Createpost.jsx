// src/CreatePost.js

import React, { useState } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from './firebaseconfig';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'posts'), {
        image,
        caption,
        createdAt: new Date(),
      });
      navigate('/'); // Redirect to the homepage after creating the post
    } catch (err) {
      console.error("Error adding post: ", err);
    }
  };

  return (
    <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleCreatePost}>
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <input type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
