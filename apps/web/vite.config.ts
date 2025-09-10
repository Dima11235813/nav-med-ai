import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': '/src',
      '@nav-med-ai/types': path.resolve(__dirname, '../../packages/types/dist/index.js'),
      '@nav-med-ai/ui': path.resolve(__dirname, '../../packages/ui/dist/index.js'),
    },
  },
})
