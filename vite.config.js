import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const isDebug = process.env.NODE_ENV === 'development' || mode === 'development';
  const isLib = process.env.BUILD_LIB === 'true';

  if (isLib) {
    return {
      root: resolve(__dirname, 'src'),
      build: {
        lib: {
          entry: resolve(__dirname, 'api/main/fastify.ts'),
          name: 'Backend',
          formats: ['es'],
          fileName: 'backend-bundle',
        },
        target: 'es2022',
        outDir: resolve(__dirname, 'dist-api'),
        rollupOptions: {
          external: [
            'path', 'url',
            ...Object.keys(require('./package.json').dependencies || {})
          ],
        },
        emptyOutDir: true,
        minify: !isDebug,
      },
    }
  } else {
    return {
      root: resolve(__dirname, 'src'),
      build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'src/main/index.html'),
            user: resolve(__dirname, 'src/user/index.html'),
            register: resolve(__dirname, 'src/register/index.html'),
            login: resolve(__dirname, 'src/login/index.html'),
            search_posts: resolve(__dirname, 'src/search_posts/index.html'),
            search_users: resolve(__dirname, 'src/search_users/index.html'),
          },
        },
        outDir: resolve(__dirname, 'dist'),
        emptyOutDir: true,
        minify: !isDebug,
      },
    };
  }
});
