import { expect, Page } from '@playwright/test'

/**
 * Launches the page by navigating to a specified URL.
 *
 * @param page - The page to launch.
 */
export async function launch(page: Page) {
   await page.goto('')
   await expect(page).toHaveTitle(/Video Manager/)
}

/**
 * Reloads the page.
 *
 * @param page - The page to reload.
 */
export async function reload(page: Page) {
   await page.reload()
}

/**
 * Closes the page.
 *
 * @param page - The page to close.
 */
export async function close(page: Page) {
   await page.close()
}

/**
 * Executes a test function a specified number of times.
 *
 * @param n - The number of times to repeat the test.
 * @param test - The test function to execute.
 */
export async function repeat(n: number, test: (args) => Promise<void>) {
   for await (const i of Array.from({ length: n }, (_, i) => i)) {
      await test(i)
   }
}