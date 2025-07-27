import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main/index.html'),
        profile: resolve(__dirname, 'src/profile/index.html'),
        signup: resolve(__dirname, 'src/signup/index.html'),
        search_posts: resolve(__dirname, 'src/search_posts/index.html'),
        search_users: resolve(__dirname, 'src/search_users/index.html'),
      },
    },
  },
});