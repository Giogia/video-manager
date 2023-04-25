import { test, expect, Page } from '@playwright/test'
import { lightTheme } from '../src/themes/light.theme'
import { darkTheme } from '../src/themes/dark.theme'

import { hexToRgb } from './utils/colors'
import { launch, close } from './utils/page'
import { getButton } from './utils/buttons'

let page: Page

test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({ browser }) => {

   page = await browser.newPage()

   launch(page)
})

test.beforeEach(async () => {
   await getButton(page, 'Home')
})

test.afterAll(async () => {
   await close(page)
})

test('switch to dark theme', async () => {
   const lightThemeButton = await getButton(page, 'Light Theme')
   await lightThemeButton.click()

   const darkThemeButton = await page.locator('#dark-theme-button')
   await expect(darkThemeButton).toBeVisible()

   await expect(page.locator('#app')).toHaveCSS(
      'background-color', hexToRgb(darkTheme.palette.background.default)
   )

   await expect(page.locator('#explorer')).toHaveCSS(
      'background-color', hexToRgb(darkTheme.palette.background.paper)
   )
})

test('switch to light theme', async () => {
   const darkThemeButton = await getButton(page, 'Dark Theme')
   await darkThemeButton.click()

   const lightThemeButton = await page.locator('#light-theme-button')
   await expect(lightThemeButton).toBeVisible()

   await expect(page.locator('#app')).toHaveCSS(
      'background-color', hexToRgb(lightTheme.palette.background.default)
   )

   await expect(page.locator('#explorer')).toHaveCSS(
      'background-color', hexToRgb(lightTheme.palette.background.paper)
   )
})