import { Page } from '@playwright/test'
import { Options, getByName } from './name'

export function getFolders(page: Page) {
   return page.locator('#folder-button').all()
}

export function getFolder(page: Page, name: string, options?: Options) {
   return page.locator('#folder', { has: getByName(page, name, options) }).first()
}