import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { srcSetFor } from './src/lib/images.js'
import { defaultSeoTags, organizationLd } from './src/lib/site-head.js'

// Preloads the home-page hero photo — whichever one is published from the admin panel.
function heroPreload() {
  return {
    name: 'hero-preload',
    async transformIndexHtml(html) {
      let src = '/images/hero-1600.webp'
      try {
        const url = new URL('./src/generated/snapshot.js', import.meta.url).href + `?t=${Date.now()}`
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

// Fills the site-wide <head> tags from Site settings, so the domain, contact details
// and share image always match what is published from the admin panel.
function siteHead() {
  return {
    name: 'site-head',
    transformIndexHtml(html) {
      return html.replace('<!--site-seo-->', defaultSeoTags()).replace('<!--site-ld-->', organizationLd())
    },
  }
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), heroPreload(), siteHead()],
  server: {
    // Local API (npm run server) — same /api path the live site uses
    proxy: { '/api': 'http://localhost:4000' },
    // The content model lives in ../shared, outside this folder
    fs: { allow: ['..'] },
  },
  // CommonJS package: bundle it into the prerender build instead of importing it from Node
  ssr: { noExternal: ['react-helmet-async'] },
  build: {
    rollupOptions: {
      output: {
        // The prerender bundle (scripts/prerender.mjs) keeps dependencies external
        manualChunks: isSsrBuild
          ? undefined
          : {
              vendor: ['react', 'react-dom'],
              router: ['react-router-dom'],
              seo: ['react-helmet-async'],
            },
      },
    },
    minify: isSsrBuild ? false : 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
    },
    chunkSizeWarningLimit: 500,
  },
}))
