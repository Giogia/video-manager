import { test, Page } from '@playwright/test'
import { lightTheme } from '../src/themes/light.theme'
import { darkTheme } from '../src/themes/dark.theme'

import { launch, close } from './utils/page'
import { getButton } from './utils/components'
import { hasTheme } from './utils/theme'

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

   await getButton(page, 'Dark Theme')

   await hasTheme(page, darkTheme)
})

test('switch to light theme', async () => {

   const darkThemeButton = await getButton(page, 'Dark Theme')

   await darkThemeButton.click()

   await getButton(page, 'Light Theme')

   await hasTheme(page, lightTheme)
})