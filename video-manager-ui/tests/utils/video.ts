import { Page } from '@playwright/test'
import { Options, getByName } from './name'

export function getVideos(page: Page) {
   return page.locator('#video').all()
}

export function getVideo(page: Page, name: string, options?: Options) {
   return page.locator('#video', { has: getByName(page, name, options) }).first()
}