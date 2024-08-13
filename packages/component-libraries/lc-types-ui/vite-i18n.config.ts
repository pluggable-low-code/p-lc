import { resolve } from 'path'
import { defineConfig } from 'vite'
import { externalizeDeps } from 'vite-plugin-externalize-deps'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [externalizeDeps()],
  build: {
    outDir: resolve(__dirname, 'dist/i18n'),
    target: 'es2022',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/i18n/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
  },
  esbuild: {
    mangleProps: /^_[^_]*$/,
  },
})
