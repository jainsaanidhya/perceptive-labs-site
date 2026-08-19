import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendUrl = env.VITE_BACKEND_URL || 'http://localhost:8000';

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
