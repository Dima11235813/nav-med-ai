import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
      '@nav-med-ai/types': '../../packages/types/dist/index.js',
      '@nav-med-ai/ui': '../../packages/ui/dist/index.js',
      '@nav-med-ai/config': '../../packages/config/dist/index.js',
    },
  },
})
