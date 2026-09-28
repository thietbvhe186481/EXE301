import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'node:os';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  // Relative assets work at both the GitHub Pages project URL and the custom domain.
  base: process.env.VITE_BASE_PATH || './',
  cacheDir: path.join(os.tmpdir(), 'portfolio-career-vite-cache')
});
