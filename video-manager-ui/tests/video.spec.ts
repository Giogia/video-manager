import { test, expect, Page } from '@playwright/test'

import { launch, reload, close, repeat } from './utils/page'
import { addFolder, rename, uploadFile } from './utils/actions'
import { getButton, getChip, getLink } from './utils/components'
import { getVideo } from './utils/video'
import { getFolder } from './utils/folder'

const assets = ['horizontal.mov', 'vertical.mov']

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

test('upload videos', async () => {

   await repeat(assets.length, async (i: number) => {

      const videoName = assets[i]

      await getButton(page, 'Upload Video')

      await uploadFile(page, videoName)

      const video = await getVideo(page, videoName)

      await expect(video).toBeVisible({ timeout: 30000 })

      await reload(page)

      await expect(video).toBeVisible()
   })
})

test('rename videos', async () => {

   await repeat(assets.length, async (i: number) => {

      const name = assets[i]
      const newName = `test-${i}-${testId}`

      await rename(page, name, newName)

      await expect(getVideo(page, newName)).toBeVisible()

      await reload(page)

      await expect(getVideo(page, newName)).toBeVisible()
   })
})

test('move video down 1 level', async () => {

   await addFolder(page)

   const targetFolder = getFolder(page, 'New Folder')
   await expect(targetFolder).toBeVisible()

   await repeat(assets.length, async (i: number) => {

      const video = getVideo(page, `test-${i}-${testId}`)
      await expect(video).toBeVisible()

      await video.dragTo(targetFolder)

      await expect(video).not.toBeVisible()
      await expect(targetFolder).toBeVisible()

      await reload(page)

      await expect(video).not.toBeVisible()
      await expect(targetFolder).toBeVisible()
   })
})

test('move video up 1 level', async () => {

   const folder = await getFolder(page, 'New Folder')
   await expect(folder).toBeVisible()

   await folder.click()

   const homeButton = await getButton(page, 'Home')
   const link = await getLink(page, 'New Folder')

   await repeat(assets.length, async (i: number) => {

      const video = await getVideo(page, `test-${i}-${testId}`)
      await expect(video).toBeVisible()

      await video.dragTo(homeButton)

      await expect(link).toBeVisible()
      await expect(video).not.toBeVisible()

      await reload(page)

      await expect(link).toBeVisible()
      await expect(video).not.toBeVisible()
   })
})

test('delete videos', async () => {

   const homeButton = await getButton(page, 'Home')

   await homeButton.click()

   await repeat(assets.length, async (i: number) => {

      const video = await getVideo(page, `test-${i}-${testId}`)
      await expect(video).toBeVisible()

      const deleteChip = await getChip(page, 'Delete')

      await video.dragTo(deleteChip)

      await expect(video).not.toBeVisible()

      await page.reload()

      await expect(video).not.toBeVisible()
   })
})