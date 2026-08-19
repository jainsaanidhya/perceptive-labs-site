import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  // Production build defaults to Cloud Run backend; Dev mode defaults to localhost
  const defaultUrl = mode === 'production'
    ? 'https://ai-interview-jmt3gxdwuq-el.a.run.app'
    : 'http://localhost:8000';

  const backendUrl = env.VITE_BACKEND_URL || defaultUrl;

  return {
    define: {
      '__VITE_BACKEND_URL__': JSON.stringify(backendUrl),
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          careers: resolve(__dirname, 'careers/index.html'),
          admin: resolve(__dirname, 'admin.html'),
        },
      },
    },
  };
});
