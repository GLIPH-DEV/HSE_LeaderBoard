import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    cors: true,
    proxy: {
      '/google-api': {
        target: 'https://script.googleusercontent.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/google-api/, ''),
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    cors: true,
  },
})
