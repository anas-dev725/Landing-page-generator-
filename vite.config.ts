import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    server: {
      port: 3000
    },
    define: {
      // Fallback to empty string if undefined to prevent build errors, though app needs key to work
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    }
  };
});