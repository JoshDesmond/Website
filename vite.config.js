// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Exclude backend files just like in your Snowpack config
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    open: true
  },
  // Explicitly tell Vite to ignore the backend directory
  optimizeDeps: {
    exclude: ['backend']
  }
});
