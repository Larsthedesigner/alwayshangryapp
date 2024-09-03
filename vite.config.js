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
    'import.meta.env': process.env,
  }
});