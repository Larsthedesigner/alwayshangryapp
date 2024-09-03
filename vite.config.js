import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this directory matches your Netlify publish directory
    base: '/', // Use base '/' unless deploying to a subdirectory
  },
  server: {
    host: '0.0.0.0',
  },
  // Vite uses import.meta.env instead of process.env
  define: {
    'import.meta.env': process.env,
  }
});