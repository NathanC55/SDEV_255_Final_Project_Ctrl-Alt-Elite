import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: './frontend/src',  
  build: {
    outDir: '../../dist',  
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, 
      }
    }
  }
});
