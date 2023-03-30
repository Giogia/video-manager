/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect, Page } from "@playwright/test"
import { lightTheme } from "../src/themes/light.theme"
import { darkTheme } from "../src/themes/dark.theme"

let page: Page

test.describe.configure({ mode: "serial" })

test.beforeAll(async ({ browser }) => {

  page = await browser.newPage()

  await page.goto("")

  await expect(page).toHaveTitle(/Video Manager/)
})

test.afterAll(async () => {
  await page.close()
})

test("switch to dark theme", async () => {
  const lightThemeButton = await page.locator('#light-theme-button')

  await lightThemeButton.hover()
  await expect(page.getByRole('tooltip', { name: 'Light Theme' })).toBeVisible()

  await lightThemeButton.click()

  const darkThemeButton = await page.locator('#dark-theme-button')
  await expect(darkThemeButton).toBeVisible()

  expect(await page.locator("#app")).toHaveCSS(
    "background-color", hexToRgb(darkTheme.palette.background.default)
  )

  expect(await page.locator("#explorer")).toHaveCSS(
    "background-color", hexToRgb(darkTheme.palette.background.paper)
  )
})

test("switch to light theme", async () => {
  const darkThemeButton = await page.locator('#dark-theme-button')

  await darkThemeButton.hover()
  await expect(page.getByRole('tooltip', { name: 'Dark Theme' })).toBeVisible()

  await darkThemeButton.click()

  const lightThemeButton = await page.locator('#light-theme-button')
  await expect(lightThemeButton).toBeVisible()

  expect(await page.locator("#app")).toHaveCSS(
    "background-color", hexToRgb(lightTheme.palette.background.default)
  )

  expect(await page.locator("#explorer")).toHaveCSS(
    "background-color", hexToRgb(lightTheme.palette.background.paper)
  )
})


function hexToRgb(hex: string): string {
  hex = hex.replace(/^#/, "")

  if (hex.length === 3) hex = hex.replace(/(.)/g, "$1$1")

  const red = parseInt(hex.substring(0, 2), 16)
  const green = parseInt(hex.substring(2, 4), 16)
  const blue = parseInt(hex.substring(4, 6), 16)

  return `rgb(${red}, ${green}, ${blue})`
}