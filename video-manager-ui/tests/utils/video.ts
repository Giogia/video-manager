import { Page } from '@playwright/test'

import { getByName } from './components'

/**
 * Retrieves all videos from the page.
 *
 * @param page - The page to retrieve videos from.
 * @returns An array of video elements on the page.
 */
export function getVideos(page: Page) {
   return page.locator('#video').all()
}

/**
 * Retrieves a specific video from the page by its name.
 *
 * @param page - The page to retrieve the video from.
 * @param name - The name of the video to retrieve.
 * @returns The video element with the specified name, if found.
 */
export function getVideo(page: Page, name: string) {
   return page.locator('#video', { has: getByName(page, name) }).first()
}