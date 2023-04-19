import { test, expect, Page } from "@playwright/test"

import { dragToDeleteChip } from "./utils/drag"
import { launch, reload, close } from "./utils/page"
import { addFolder } from "./utils/buttons"
import { getByName, rename } from "./utils/name"
import { getFolders, getLastFolder } from "./utils/folders"

let page: Page

test.describe.configure({ mode: "serial" })

test.beforeAll(async ({ browser }) => {
  
  page = await browser.newPage()

  await launch(page)
})

test.afterAll(async () => {
  await close(page)
})

test("add folder", async () => {

  const folders = await getFolders(page)

  await addFolder(page)

  const newFolders = await getFolders(page)

  await expect(newFolders.length).toEqual(folders.length + 1)

  await reload(page)
  await expect(newFolders.length).toEqual(folders.length + 1)
})

test("rename folder", async () => {

  const folder = await getLastFolder(page)
  await expect(folder).toBeVisible()

  const newName = `test-${Date.now().toString().slice(-4)}`

  await rename(page, "New Folder", newName)

  await expect(getByName(page, newName)).toBeVisible()

  await reload(page)
  await expect(getByName(page, newName)).toBeVisible()
})

test("delete folder", async () => {

  const folders = await getFolders(page)
  const folderName = getByName(page, "test", { exact: false })

  await expect(folderName).toBeVisible()

  await dragToDeleteChip(page, folderName)

  const newFolders = await getFolders(page)

  await expect(newFolders.length).toEqual(folders.length - 1)

  await reload(page)
  await expect(newFolders.length).toEqual(folders.length - 1)
})