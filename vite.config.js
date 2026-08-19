import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Default is production Cloud Run backend; overridden by .env (e.g. VITE_BACKEND_URL=http://localhost:8000)
  const backendUrl = env.VITE_BACKEND_URL || 'https://ai-interview-jmt3gxdwuq-el.a.run.app';

  return {
    plugins: [
      {
        name: 'html-backend-url-transform',
        transformIndexHtml(html) {
          return html.replaceAll('__VITE_BACKEND_URL__', JSON.stringify(backendUrl));
        }
      }
    ],
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
