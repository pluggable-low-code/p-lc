import { resolve } from 'path'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import { externalizeDeps } from 'vite-plugin-externalize-deps'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
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
    outDir: 'dist/cli',
    lib: {
      entry: resolve(__dirname, 'src/cli/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
  },
  define: Object.fromEntries(
    ['NODE_ENV', 'LC_LANGUAGE'].map((key) => [
      `process.env.${key}`,
      process.env[key] === undefined
        ? undefined
        : JSON.stringify(process.env[key]),
    ]),
  ),
})
