
// src/App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Timeline from './timeline.jsx';
import Login from './login.jsx';
import Signup from './signup';
import CreatePost from './Createpost.jsx';
import PrivateRoute from './privateroute.jsx';
import avatar from './Images/avatar.jpeg'; // Import the image


function App() {
  const [layout, setLayout] = useState('list'); // Add useState for layout

  return (
    <Router>
      <div className="App">
        <header className="profile-header">
          <div className="avatar-container">
            <img src={avatar} alt="Avatar" className="avatar" /> {/* Use the imported image */}
          </div>
          <div className="profile-info">
            <div className="profile-details">
              <h1>Lars <i className="fas fa-check-circle verified-icon"></i></h1> {/* Verified checkmark */}
              <p>@yalwayshangry</p>
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

        <div className="view-toggle">
          <button onClick={() => setLayout('grid')}>
            <i className="fas fa-th"></i> {/* Grid view icon */}
          </button>
          <button onClick={() => setLayout('list')}>
            <i className="fas fa-list"></i> {/* List view icon */}
          </button>
        </div>

        <section className={`timeline ${layout}`}>
          <h2>My Timeline</h2>
          {/* Timeline posts will go here */}
        </section>

        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-post" element={<PrivateRoute><CreatePost /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
