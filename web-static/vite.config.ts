import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@common': resolve(__dirname, 'src/components/common'),
      '@NavigationBarLinksComponents': resolve(
        __dirname,
        'src/components/NavigationBarLinksComponents'
      ),
    },
  },
  server: {
    host: true,
  },
});
