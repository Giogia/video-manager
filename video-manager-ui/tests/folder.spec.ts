import { test, expect, Page } from '@playwright/test'

import { launch, reload, close, repeat } from './utils/page'
import { addFolder, rename } from './utils/actions'
import { getFolder, getFolders } from './utils/folder'
import { getButton, getChip, getLink } from './utils/components'

let testId: string

let page: Page

test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({ browser }) => {

   testId = Date.now().toString().slice(-4)

   page = await browser.newPage()

   await launch(page)
})

test.beforeEach(async () => {
   await getButton(page, 'Home')
})

test.afterAll(async () => {
   await close(page)
})

test('add folders', async () => {

   await repeat(2, async (i: number) => {

      await getButton(page, 'Add Folder')

      const folders = await getFolders(page)

      await addFolder(page)

      const folder = getFolder(page, `New Folder${i == 0 ? '' : ` ${i}`}`)
      await expect(folder).toBeVisible()

      const newFolders = await getFolders(page)
      await expect(newFolders.length).toEqual(folders.length + 1)

      await reload(page)

      await expect(folder).toBeVisible()
      await expect(newFolders.length).toEqual(folders.length + 1)
   })
})

test('rename folders', async () => {

   await repeat(2, async (i: number) => {

      const name = `New Folder${i == 0 ? '' : ` ${i}`}`
      const newName = `test-${i}-${testId}`

      await rename(page, name, newName)

      await expect(getFolder(page, newName)).toBeVisible()

      await reload(page)
      await expect(getFolder(page, newName)).toBeVisible()
   })
})

test('move folder down 1 level', async () => {

   const folder = getFolder(page, `test-0-${testId}`)
   const targetFolder = getFolder(page, `test-1-${testId}`)

   await expect(folder).toBeVisible()
   await expect(targetFolder).toBeVisible()

   await folder.dragTo(targetFolder)

   await expect(folder).not.toBeVisible()
   await expect(targetFolder).toBeVisible()

   await reload(page)

   await expect(folder).not.toBeVisible()
   await expect(targetFolder).toBeVisible()
})

test('open folder', async () => {

   const folder = getFolder(page, `test-1-${testId}`)
   await expect(folder).toBeVisible()

   await folder.click()

   const link = await getLink(page, `test-1-${testId}`)
   const subFolder = await getFolder(page, `test-0-${testId}`)

   await expect(link).toBeVisible()
   await expect(subFolder).toBeVisible()

   await reload(page)

   await expect(link).toBeVisible()
   await expect(subFolder).toBeVisible()
})

test('move folder up 1 level', async () => {

   const homeButton = await getButton(page, 'Home')
   const link = await getLink(page, `test-1-${testId}`)

   const folder = await getFolder(page, `test-0-${testId}`)
   await expect(folder).toBeVisible()

   await folder.dragTo(homeButton)

   await expect(link).toBeVisible()
   await expect(folder).not.toBeVisible()

   await reload(page)

   await expect(link).toBeVisible()
   await expect(folder).not.toBeVisible()
})

test('move up 1 level', async () => {

   const homeButton = await getButton(page, 'Home')

   await homeButton.click()

   await repeat(2, async (i: number) => {

      const folder = getFolder(page, `test-${i}-${testId}`)
      await expect(folder).toBeVisible()
   })
})

test('delete folders', async () => {

   await repeat(2, async (i: number) => {

      await getChip(page, 'Delete')

      const folder = await getFolder(page, `test-${i}-${testId}`)
      await expect(folder).toBeVisible()

      const deleteChip = await getChip(page, 'Delete')

      await folder.dragTo(deleteChip)

      await expect(folder).not.toBeVisible()

      await reload(page)

      await expect(folder).not.toBeVisible()
   })
})