import { Page } from '@playwright/test'

import { getByName } from './components'

export function getVideos(page: Page) {
   return page.locator('#video').all()
}

export function getVideo(page: Page, name: string) {
   return page.locator('#video', { has: getByName(page, name) }).first()
}