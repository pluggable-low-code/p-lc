import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import checker from 'vite-plugin-checker'
import dts from 'vite-plugin-dts'

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
    ...(process.env.ANALYZE ? [analyzer()] : []),
  ],
  build: {
    target: 'es2022',
    sourcemap: true,
    outDir: 'dist/editor',
    rollupOptions: {
      onLog(level, log, handler) {
        if (
          log.cause &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (log.cause as any).message ===
            `Can't resolve original location of error.`
        ) {
          return
        }
        handler(level, log)
      },
    },
  },
  base: './',
  define: Object.fromEntries(
    ['NODE_ENV', 'LC_LANGUAGE'].map((key) => [
      `process.env.${key}`,
      process.env[key] === undefined
        ? undefined
        : JSON.stringify(process.env[key]),
    ]),
  ),
})
