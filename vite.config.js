import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import os from 'node:os';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  // GitHub's project URL uses /EXE301/; a custom domain serves the app at /.
  base: process.env.VITE_BASE_PATH || '/EXE301/',
  cacheDir: path.join(os.tmpdir(), 'portfolio-career-vite-cache')
});
