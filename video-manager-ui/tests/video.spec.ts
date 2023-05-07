import { test, expect, Page } from '@playwright/test'

import { launch, reload, close, repeat } from './utils/page'
import { getButton, uploadFile } from './utils/buttons'
import { getVideos, getVideo } from './utils/video'
import { getChip } from './utils/chips'

const assets = ['horizontal.mov', 'vertical.mov']

let page: Page

test.describe.configure({ mode: 'serial' })

test.beforeAll(async ({ browser }) => {

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

   await repeat(assets.length, async (i) => {

      const videoName = assets[i]

      await getButton(page, 'Upload Video')

      const videos = await getVideos(page)

      await uploadFile(page, videoName)

      const video = await getVideo(page, videoName)
      const newVideos = await getVideos(page)

      await expect(video).toBeVisible()
      await expect(newVideos.length).toEqual(videos.length + 1)

      await reload(page)

      await expect(video).toBeVisible()
      await expect(newVideos.length).toEqual(videos.length + 1)
   })
})

test('delete videos', async () => {

   await repeat(assets.length, async (i) => {

      const videoName = assets[i]

      const video = await getVideo(page, videoName)
      await expect(video).toBeVisible()
      
      const videos = await getVideos(page)

      const deleteChip = await getChip(page, 'Delete')

      await video.dragTo(deleteChip)

      const newVideos = await getVideos(page)
      console.log('🚀 ~ file: video.spec.ts:71 ~ awaitrepeat ~ newVideos:', newVideos)

      await expect(video).not.toBeVisible()
      await expect(newVideos.length).toEqual(videos.length - 1)

      await page.reload()

      await expect(video).not.toBeVisible()
      await expect(newVideos.length).toEqual(videos.length - 1)
   })
})