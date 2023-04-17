import { test, expect, Page } from "@playwright/test"

import { launch, reload, close } from "./utils/page"
import { dragToDeleteChip } from "./utils/drag"
import { uploadFile } from "./utils/buttons"
import { getByName } from "./utils/name"

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
  const videos = await getVideos()

  await uploadFile(page, "horizontal.mov")

  const newVideos = await getVideos()

  await expect(newVideos.length).toEqual(videos.length + 1)

  await reload(page)
  await expect(newVideos.length).toEqual(videos.length + 1)
})

test("delete video", async () => {

  const videos = await getVideos()

  const video = await page.locator("#video").last()
  await expect(video).toBeVisible()

  await expect(getByName(page, "horizontal.mov")).toBeVisible()

  await dragToDeleteChip(page, video)

  const newVideos = await getVideos()

  await expect(newVideos.length).toEqual(videos.length - 1)

  await page.reload()
  await expect(newVideos.length).toEqual(videos.length - 1)
})

async function getVideos() {
  return page.locator("#video").all()
}