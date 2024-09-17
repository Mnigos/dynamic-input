/// <reference types="vitest" />

import { mergeConfig } from 'vite'
import { defineConfig } from 'vitest/config'

import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      resolveSnapshotPath: (testPath, snapshotExtension) =>
        `./tests/snapshots/${testPath.split('/').at(-1)}${snapshotExtension}`,
      globals: true,
      environment: 'happy-dom',
      setupFiles: './tests/setup.ts',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'lcov'],
        exclude: [
          '**/node_modules/**',
          '**/types/**',
          '**/constants/**',
          '**/tests/**',
          '**/index.ts',
          '**/*.config.ts',
          '**/*.config.js',
          'postcss.config.mjs',
          '**/*.d.ts',
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/storybook-static/**',
          '**/src/components/ui/**',
          '.eslintrc.cjs',
          'env.ts',
          './src/main.tsx',
          './src/app.tsx',
        ],
        all: true,
      },
      exclude: ['**/tests/**', '**/node_modules/**'],
    },
  })
)
