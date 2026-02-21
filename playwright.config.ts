import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './src/test',
  testMatch: '**/*.spec.ts',
  timeout: 30000,
  use: {
    headless: true,
    baseURL: 'http://localhost:5177',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
})
