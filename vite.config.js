import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import * as path from 'path';

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

export default defineConfig({
  base: '/fatestapi-cinema-app/',
  plugins: [
    vue(),
    eslint({
      fix: true,
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
    },

    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
});
