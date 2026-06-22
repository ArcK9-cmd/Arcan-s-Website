import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes all asset links relative, so it works both locally
// and on GitHub Pages (where your site lives under /your-repo-name/).
export default defineConfig({
  base: './',
  plugins: [react()],
})
