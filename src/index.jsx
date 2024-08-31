// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from './authcontext.jsx'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>
);


