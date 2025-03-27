import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',              // ensure relative paths, e.g. in index.html
  plugins: [react()],
  build: {
      outDir: 'dist',      // gets deployed to github pages
      assetsDir: 'assets', // static assets (images, js, css, etc.)
  },
  });

