import { test, expect, Page } from "@playwright/test"

test.describe("App", () => {

  test.beforeAll(async ({ page }) => {
    
    await page.goto("")
    
    await expect(page).toHaveTitle(/Video Manager/)
  })
  
  test("switches theme correctly", async ({ page }) => {
    
    clickThemeButton(page)
    
  })
  
  test("add folder", ({ page }) => {
    
  })
  
  test("move into folder", ({ page }) => {
    
  })
  
  test("move folder in home folder", ({ page }) => {
    
  })
  
  test("add folder into folder", ({ page }) => {
    
  })
  
  test("move folder into child folder", ({ page }) => {
    
  })
  
  test("move into child folder", ({ page }) => {
    
  })
  
  test("move folder into parent folder", ({ page }) => {
    
  })
})
  
async function clickThemeButton(page: Page) {
  await page
    .locator("button")
    .first()
    .click()
}