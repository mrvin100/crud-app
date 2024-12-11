// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true, // Make `expect` and other globals available
    environment: 'jsdom',
  },
})