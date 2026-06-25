import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Honor the PORT env var (used by the preview harness' autoPort) so the dev
  // server binds the port the previewer expects. Falls back to Vite's default.
  server: {
    port: Number(process.env.PORT) || 5173,
  },
})
