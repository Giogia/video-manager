import { test, expect, Page } from "@playwright/test"

import { launch, reload, close } from "./utils/page"
import { dragToDeleteChip } from "./utils/drag"
import { uploadFile } from "./utils/buttons"
import { getByName } from "./utils/name"
import { getVideos, getLastVideo } from "./utils/video"

let page: Page

test.describe.configure({ mode: "serial" })

test.beforeAll(async ({ browser }) => {

  page = await browser.newPage()

  await launch(page)
})

test.afterAll(async () => {
  await close(page)
})

test("upload video", async () => {
  const videos = await getVideos(page)

  await uploadFile(page, "horizontal.mov")

  const newVideos = await getVideos(page)

  await expect(newVideos.length).toEqual(videos.length + 1)

  await reload(page)
  await expect(newVideos.length).toEqual(videos.length + 1)
})

test("delete video", async () => {

  const videos = await getVideos(page)

  const video = await getLastVideo(page)
  await expect(video).toBeVisible()

  await expect(getByName(page, "horizontal.mov")).toBeVisible()

  await dragToDeleteChip(page, video)

  const newVideos = await getVideos(page)

  await expect(newVideos.length).toEqual(videos.length - 1)

  await page.reload()
  await expect(newVideos.length).toEqual(videos.length - 1)
})