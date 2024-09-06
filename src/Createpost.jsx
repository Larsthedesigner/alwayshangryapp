// src/CreatePost.jsx

import React, { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import uploadBytesResumable
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { storage } from './firebaseconfig';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [user, setUser] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0); // State for upload progress
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

    const imageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error('Error uploading image:', error);
      },
      async () => {
        // Handle successful uploads on complete
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, 'posts'), {
          caption,
          image: imageUrl,
          createdAt: Timestamp.fromDate(new Date()),
          userId: user.uid,
        });

        // Clear form fields after upload
        setImage(null);
        setCaption('');
        setUploadProgress(0); // Reset progress
        navigate('/'); // Navigate back to the timeline after posting
      }
    );
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
      {uploadProgress > 0 && <p>Upload is {uploadProgress}% done</p>}
      <button onClick={() => navigate('/')}>Back to Timeline</button>
    </div>
  );
}

export default CreatePost;