import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import dts from 'vite-plugin-dts'
import { externalizeDeps } from 'vite-plugin-externalize-deps'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        useFlatConfig: true,
      },
    }),
    externalizeDeps(),
  ],
  build: {
    target: 'es2022',
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
  },
  esbuild: {
    mangleProps: /^_[^_]*$/,
  },
})
