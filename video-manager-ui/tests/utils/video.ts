import { Page } from '@playwright/test'

export function getVideo(page: Page) {
   return page.locator('#video-button')
}

export function getFirstVideo(page: Page) {
   return getVideo(page).first()
}

export function getLastVideo(page: Page) {
   return getVideo(page).last()
}

export function getVideos(page: Page) {
   return getVideo(page).all()
}