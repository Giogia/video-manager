/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect, Page } from "@playwright/test"

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

test("add folder", async () => {
  const addFolderButton = await page.locator('#add-folder-button')

  await addFolderButton.hover()
  await expect(page.getByRole('tooltip', { name: 'Add Folder' })).toBeVisible()

  const folders = await page.locator("#folder-button").all()

  await addFolderButton.click()
  const newFolders = await page.locator("#folder-button").all()

  await expect(newFolders.length).toEqual(folders.length + 1)

  await page.reload()
  await expect(newFolders.length).toEqual(folders.length + 1)
})

test("rename folder", async () => {

  const folder = await page.locator("#folder-button").last()
  await expect(folder).toBeVisible()

  const folderName = page.getByText("New Folder", { exact: false }).last()
  await expect(folderName).toBeVisible()

  const newName = `test-${Date.now().toString().slice(-4)}`

  await folderName.dblclick()
  await page.getByRole('textbox').nth(1).fill(newName)
  await page.keyboard.press('Enter')

  await expect(page.getByText(newName, { exact: true }).first()).toBeVisible()

  await page.reload()
  await expect(page.getByText(newName, { exact: true }).first()).toBeVisible()
})

test("delete folder", async () => {

  const folders = await page.locator("#folder-button").all()
  const folder = await page.locator("#folder-button").first()
  await expect(folder).toBeVisible()

  const folderName = page.getByText("test", { exact: false }).first()
  await expect(folderName).toBeVisible()

  const deleteChip = await page.locator('#delete-chip')
  await expect(deleteChip).toBeVisible()

  await deleteChip.hover()
  await expect(page.getByRole('tooltip', { name: 'Drag here an element to delete' })).toBeVisible()

  await folder.dragTo(deleteChip)

  const newFolders = await page.locator("#folder-button").all()

  await expect(newFolders.length).toEqual(folders.length - 1)

  await page.reload()
  await expect(newFolders.length).toEqual(folders.length - 1)
})