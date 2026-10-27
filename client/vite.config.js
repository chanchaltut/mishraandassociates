import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { pathToFileURL } from 'node:url'
import { srcSetFor } from './src/lib/images.js'

// Preloads the home-page hero photo — whichever one is published from the admin panel.
function heroPreload() {
  return {
    name: 'hero-preload',
    async transformIndexHtml(html) {
      let src = '/images/hero-1600.webp'
      try {
        const url = pathToFileURL('./src/generated/snapshot.js').href + `?t=${Date.now()}`
        const snapshot = (await import(url)).default
        src = snapshot?.content?.home?.hero?.image?.src || src
      } catch {
        /* no snapshot yet — default photo */
      }
      const srcset = srcSetFor(src)
      const attrs = srcset
        ? `l.setAttribute('imagesrcset', ${JSON.stringify(srcset)}); l.setAttribute('imagesizes', '100vw');`
        : `l.href = ${JSON.stringify(src)};`
      const script = `<script>if (location.pathname === '/') { var l = document.createElement('link'); l.rel = 'preload'; l.as = 'image'; ${attrs} l.setAttribute('fetchpriority', 'high'); document.head.appendChild(l); }</script>`
      return html.replace('<!--hero-preload-->', script)
    },
  }
}

export default defineConfig({
  plugins: [react(), heroPreload()],
  server: {
    // Local API (npm run server) — same /api path the live site uses
    proxy: { '/api': 'http://localhost:4000' },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          seo: ['react-helmet-async'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
    },
    chunkSizeWarningLimit: 500,
  },
})
