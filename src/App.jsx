import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Timeline from './timeline.jsx';
import Login from './login.jsx';
import CreatePost from './Createpost.jsx';
import PrivateRoute from './privateroute.jsx';
import PostDetail from './PostDetail.jsx';
import { AuthContext } from './authcontext.jsx';
import avatar from './Images/avatar.jpeg';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebaseconfig';
import './index.css'; // Ensure this correctly references index.css

function App() {
  const [layout, setLayout] = useState('grid');
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribePosts = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setPostCount(snapshot.size);
    });

    const unsubscribeComments = onSnapshot(collection(db, 'comments'), (snapshot) => {
      setCommentCount(snapshot.size);
    });

    return () => {
      unsubscribePosts();
      unsubscribeComments();
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="App">
      <header className="profile-header">
        <div className="avatar-container">
          <img loading="lazy" src={avatar} alt="Avatar" className="avatar" />
        </div>
        <div className="profile-info">
          <div className="profile-details">
            <div className="profile-header-row">
              <h1>@AlmostHangry</h1>
              <div className="counters">
                <div className="counter">
                  <strong>{postCount}</strong>
                  <span>posts</span>
                </div>
                <div className="counter">
                  <strong>{commentCount}</strong>
                  <span>comments</span>
                </div>
              </div>
            </div>
            <p>Lars is a premiere Kansas City food critic exploring flavors across the U.S. and beyond 🌎🍴</p>
            <a href="https://forms.gle/mpQgjbkxdZZxAqFZ8" target="_blank" rel="noopener noreferrer">📝 Suggest a Restaurant to Visit</a>
          </div>
          <div className="nav-links">
            {user ? (
              <>
                <button onClick={handleLogout}>Logout</button>
                <Link to="/create-post">
                  <button>Create Post</button>
                </Link>
              </>
            ) : (
              <Link to="/login">
                <button>Login</button>
              </Link>
            )}
          </div>
        </div>
      </header>
      <section className={`timeline ${layout}`}>
        <Routes>
          <Route path="/" element={<Timeline posts={posts} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
          <Route path="/posts/:id" element={<PostDetail posts={posts} />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;