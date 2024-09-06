// src/CreatePost.jsx

import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { storage } from './firebaseconfig';
import imageCompression from 'browser-image-compression'; // Import browser-image-compression
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

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

    // Options for image compression
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      // Compress the image file
      const compressedFile = await imageCompression(image, options);

      // Upload the compressed image to Firebase Storage
      const imageRef = ref(storage, `images/${compressedFile.name}`);
      await uploadBytes(imageRef, compressedFile);
      const imageUrl = await getDownloadURL(imageRef);

      // Add the post details to Firestore
      await addDoc(collection(db, 'posts'), {
        caption,
        image: imageUrl,
        createdAt: Timestamp.fromDate(new Date()),
        userId: user.uid,
      });

      // Clear form fields after upload
      setImage(null);
      setCaption('');
      navigate('/'); // Navigate back to the timeline after posting

    } catch (error) {
      console.error('Error uploading image:', error);
    }
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
      <button onClick={() => navigate('/')}>Back to Timeline</button>
    </div>
  );
}

export default CreatePost;