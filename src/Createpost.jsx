// src/CreatePost.jsx

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { storage } from './firebaseconfig';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';  // Import CSS for styling

function CreatePost() {
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState('');
  const [user, setUser] = useState(null);
  const [uploadProgress, setUploadProgress] = useState([]);
  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  // Monitor Authentication State
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });

  const onDrop = useCallback((acceptedFiles) => {
    setImages(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length === 0 || !caption || !user) return;

    const uploadPromises = images.map((image, index) => {
      return new Promise((resolve, reject) => {
        const imageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(imageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress((prevProgress) => {
              const newProgress = [...prevProgress];
              newProgress[index] = progress;
              return newProgress;
            });
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error('Error uploading image:', error);
            reject(error);
          },
          async () => {
            const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(imageUrl);
          }
        );
      });
    });

    const imageUrls = await Promise.all(uploadPromises);
    await addDoc(collection(db, 'posts'), {
      caption,
      images: imageUrls,
      createdAt: Timestamp.fromDate(new Date()),
      userId: user.uid,
    });

    // Clear form fields after upload
    setImages([]);
    setCaption('');
    setUploadProgress([]);
    navigate('/');
  };

  return (
    <div className="create-post">
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the images here ...</p> :
              <p>Drag 'n' drop some images here, or click to select files</p>
          }
        </div>
        <div className="image-previews">
          {images.map((file, index) => (
            <div key={index} className="image-preview">
              <img src={URL.createObjectURL(file)} alt={`preview ${index}`} />
            </div>
          ))}
        </div>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
        />
        <button type="submit">Submit Post</button>
      </form>
      {uploadProgress.length > 0 && uploadProgress.map((progress, index) => (
        <p key={index}>Upload {index + 1} is {progress}% done</p>
      ))}
      <button onClick={() => navigate('/')}>Back to Timeline</button>
    </div>
  );
}

export default CreatePost;