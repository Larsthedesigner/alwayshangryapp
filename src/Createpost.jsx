// src/CreatePost.jsx

import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { storage } from './firebaseconfig';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function CreatePost() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate(); // Initialize useNavigate

  // Check if the user is authenticated
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !caption || !user) return;

    // Upload image
    const imageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(imageRef, image);

    // Get image URL
    const imageUrl = await getDownloadURL(imageRef);

    // Add post to Firestore
    await addDoc(collection(db, 'posts'), {
      caption,
      image: imageUrl,
      createdAt: Timestamp.fromDate(new Date()),
      userId: user.uid,
    });

    // Clear form
    setImage(null);
    setCaption('');
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
        />
        <button type="submit">Submit Post</button>
      </form>
      <button onClick={() => navigate('/')}>Back to Timeline</button> {/* Back to Timeline button */}
    </div>
  );
}

export default CreatePost;
