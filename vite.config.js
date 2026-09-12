import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    react(),
  ],
  // ponytail: emptyOutDir false because dist/ is locked by an external
  // process on this machine (same EPERM family as .git/index lock).
  // CI/Vercel builds are unaffected. Remove locally when lock is gone.
  build: { emptyOutDir: false },
})
