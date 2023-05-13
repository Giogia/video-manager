import { expect, Page } from '@playwright/test'

export async function launch(page: Page) {
   await page.goto('')
   await expect(page).toHaveTitle(/Video Manager/)
}

export async function reload(page: Page) {
   await page.reload()
}

export async function close(page: Page) {
   await page.close()
}

export async function repeat(n: number, test: (args) => Promise<void>) {
   for await (const i of Array.from({ length: n }, (_, i) => i)) {
      await test(i)
   }
}