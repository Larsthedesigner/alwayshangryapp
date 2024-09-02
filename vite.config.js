import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // This is the directory Netlify will publish
    base: '/', // Adjust if deploying to a subdirectory
  },
  server: {
    host: '0.0.0.0',
  }
});
