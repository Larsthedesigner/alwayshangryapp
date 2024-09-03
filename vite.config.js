import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this directory matches your Netlify publish directory
    base: '/', // Adjust if deploying to a subdirectory
  },
  server: {
    host: '0.0.0.0',
  },
  // Use import.meta.env to properly handle environment variables in Vite
    define: {
      'import.meta.env': {
        VITE_REACT_APP_API_KEY: JSON.stringify(process.env.VITE_REACT_APP_API_KEY),
        VITE_REACT_APP_AUTH_DOMAIN: JSON.stringify(process.env.VITE_REACT_APP_AUTH_DOMAIN),
        VITE_REACT_APP_PROJECT_ID: JSON.stringify(process.env.VITE_REACT_APP_PROJECT_ID),
        VITE_REACT_APP_STORAGE_BUCKET: JSON.stringify(process.env.VITE_REACT_APP_STORAGE_BUCKET),
        VITE_REACT_APP_MESSAGING_SENDER_ID: JSON.stringify(process.env.VITE_REACT_APP_MESSAGING_SENDER_ID),
        VITE_REACT_APP_APP_ID: JSON.stringify(process.env.VITE_REACT_APP_APP_ID),
        VITE_REACT_APP_MEASUREMENT_ID: JSON.stringify(process.env.VITE_REACT_APP_MEASUREMENT_ID),
  }
});