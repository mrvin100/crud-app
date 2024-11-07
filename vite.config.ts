import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/': resolve(__dirname, 'src/'),
      '@/components': resolve(__dirname, 'src/components/'),
      '@/utils': resolve(__dirname, 'src/lib/utils/'),
      '@/ui': resolve(__dirname, 'src/components/ui/'),
      '@/lib': resolve(__dirname, 'src/lib/'),
      '@/hooks': resolve(__dirname, 'src/hooks/'),
      '@/context': resolve(__dirname, 'src/context/'),
      '@/pages': resolve(__dirname, 'src/pages/'),
      '@/features': resolve(__dirname, 'src/features/')
    },
  },
})
