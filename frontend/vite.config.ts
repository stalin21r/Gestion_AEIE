import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://asoelectronicaepn.netlify.app',
      exclude: ['/login', '/admin', '/admin/*'],
      dynamicRoutes: ['/', '/casilleros', '/tienda']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
