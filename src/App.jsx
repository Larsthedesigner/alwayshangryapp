import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Timeline from './timeline.jsx';
import Login from './login.jsx';
import CreatePost from './Createpost.jsx';
import PrivateRoute from './privateroute.jsx';
import PostDetail from './PostDetail.jsx';
import { AuthContext } from './authcontext.jsx';
import avatar from './Images/avatar.jpeg';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebaseconfig';
function App() {
  const [layout, setLayout] = useState('list');
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      },
      (error) => console.error("Error fetching posts: ", error)
    );
    return () => unsubscribe();
  }, []);
  return (
    <Router>
      <div className="App">
        <header className="profile-header">
          <div className="avatar-container">
            <img loading="lazy" src={avatar} alt="Avatar" className="avatar" />
          </div>
          <div className="profile-info">
            <div className="profile-details">
              <h1>@AlmostHangry</h1>
              <p>Lars is a premiere Kansas City food critic exploring flavors across the U.S. and beyond 🌎🍴</p>
              <a href="https://forms.gle/mpQgjbkxdZZxAqFZ8" target="_blank" rel="noopener noreferrer">📝 Suggest a Restaurant to Visit</a>
            </div>
            <div className="nav-links">
              <Link to="/login">
                <button>Login</button>
              </Link>
              {user && (
                <Link to="/create-post">
                  <button>Create Post</button>
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
    </Router>
  );
}
export default App;
              