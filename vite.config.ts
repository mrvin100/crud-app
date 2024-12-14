import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test : {
    globals  : true,
    environment : 'jsdom',
    setupFiles : ['./src/__tests__/setup/setup.ts'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
})


