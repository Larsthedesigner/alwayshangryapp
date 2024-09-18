import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, addDoc, onSnapshot, query, where, orderBy, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { AuthContext } from './authcontext'; // Import your authentication context
import { db } from './firebaseconfig';
import './PostDetail.css';

function PostDetail({ posts }) {
  const { id } = useParams();
  const post = posts?.find((p) => p.id === id);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Fetch the authenticated user
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isCommentFormVisible, setCommentFormVisible] = useState(false); // State to toggle comment form

  useEffect(() => {
    if (post) {
      const q = query(collection(db, 'comments'), where('postId', '==', post.id), orderBy('createdAt', 'asc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
      return () => unsubscribe();
    }
  }, [post]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !name.trim()) {
      setError('Name and comment cannot be empty.');
      return;
    }

    try {
      await addDoc(collection(db, 'comments'), {
        postId: post.id,
        name: name,
        content: comment,
        createdAt: Timestamp.now(),
      });
      setName('');
      setComment('');
      setError('');
      setCommentFormVisible(false); // Hide form after submission
    } catch (error) {
      console.error('Error adding comment: ', error);
      setError('Failed to add comment.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, 'comments', commentId));
    } catch (error) {
      console.error('Error deleting comment: ', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return date.toLocaleString('en-US', options);
  };

  if (!post) {
    return <div>Post not found</div>;
  }

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
      <button className="btn" onClick={() => navigate('/')}>Back to Timeline</button>
      <div className="post-content">
        {renderImages()}
        <p className="post-caption">{post.caption}</p>
      </div>

      <section className="comments-section">
        <div className="comments-header">
          <h2>Comments</h2>
          <button onClick={() => setCommentFormVisible(!isCommentFormVisible)} className="btn toggle-comment-form">
            {isCommentFormVisible ? 'Cancel' : 'Add Comment'}
          </button>
        </div>

        {isCommentFormVisible && (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              rows="4"
              required
            />
            <button type="submit" className="btn">Submit</button>
            {error && <p className="error">{error}</p>}
          </form>
        )}

        <div className="comments-list">
          {comments.length === 0 ? (
            <p>There haven't been any comments yet. Wanna leave a comment?</p>
          ) : (
            comments.map((comment, index) => (
              <React.Fragment key={comment.id}>
                <div className="comment">
                  <p className="comment-name"><strong>{comment.name}</strong></p>
                  <p className="comment-content">{comment.content}</p>
                  <p className="comment-date">{formatTimestamp(comment.createdAt)}</p>
                  {user && (
                    <button onClick={() => handleDeleteComment(comment.id)} className="btn comment-delete">Delete</button>
                  )}
                </div>
                {index < comments.length - 1 && <hr className="comment-divider" />}
              </React.Fragment>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default PostDetail;