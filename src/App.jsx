// src/App.js

import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Timeline from './timeline.jsx';
import Login from './login.jsx';
// import SignUp from './signup.jsx'; // Comment out if not used
import CreatePost from './Createpost.jsx';
import PrivateRoute from './privateroute.jsx';
import avatar from './Images/avatar.jpeg'; // Import the image
import { AuthContext } from './authcontext.jsx'; // Import AuthContext

function App() {
  const [layout, setLayout] = useState('list'); // Add useState for layout
  const { user } = useContext(AuthContext); // Get the user from AuthContext

  return (
    <Router>
      <div className="App">
        <header className="profile-header">
          <div className="avatar-container">
            <img src={avatar} alt="Avatar" className="avatar" />
          </div>
          <div className="profile-info">
            <div className="profile-details">
              <h1>Lars</h1>
              <p>@alwayshangry</p>
              <p>no u r hangry</p>
            </div>
            <div className="profile-stats">
              <div className="stat">
                <p className="count">0</p>
                <p className="caption">Followers</p>
              </div>
              <div className="stat">
                <p className="count">0</p>
                <p className="caption">Following</p>
              </div>
              <div className="stat">
                <p className="count">789</p>
                <p className="caption">Posts</p>
              </div>
            </div>
          </div>
        </header>

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

        <section className={`timeline ${layout}`}>
          {/* Content for the timeline can be included here */}
        </section>

        <Routes>
          <Route path="/" element={<Timeline />} /> {/* Publicly accessible */}
          <Route path="/login" element={<Login />} />
          {/* Commented out SignUp route */}
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
