import { Page } from '@playwright/test'

import { getByName } from './components'

export function getFolders(page: Page) {
   return page.locator('#folder-button').all()
}

export function getFolder(page: Page, name: string) {
   return page.locator('#folder', { has: getByName(page, name) }).first()
}