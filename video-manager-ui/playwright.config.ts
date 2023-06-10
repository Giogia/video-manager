import { defineConfig, devices } from '@playwright/test'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
   testDir: './tests',
   /* Run tests in files in serial mode */
   workers: 1,
   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
   reporter: 'html',
   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
   use: {
      /* Base URL to use in actions like `await page.goto('/')`. */
      baseURL: 'http://localhost:3000',

      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      trace: 'on-first-retry',
   },

   /* Configure projects for major browsers */
   projects: [

      /* Test against branded browsers. */
      {
         name: 'Chrome',
         use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      },

      /* Test against mobile viewports. */
      {
         name: 'Mobile Chrome',
         use: { ...devices['Pixel 5'] },
      }
   ]
})
