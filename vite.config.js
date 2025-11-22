import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/panic-relief/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
