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
      // Prioritize GEMINI_API_KEY as requested, fallback to API_KEY, then empty string
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.API_KEY || '')
    }
  };
});