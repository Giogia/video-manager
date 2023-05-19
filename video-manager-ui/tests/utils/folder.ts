import { Page } from '@playwright/test'

import { getByName } from './components'

/**
 * Retrieves all folder elements from the page.
 *
 * @param page - The page to search for the folder elements.
 * @returns An array of located folder elements.
 */
export function getFolders(page: Page) {
   return page.locator('#folder-button').all()
}

/**
 * Retrieves a folder element from the page by its name.
 *
 * @param page - The page to search for the folder element.
 * @param name - The name of the folder to retrieve.
 * @returns The located folder element.
 */
export function getFolder(page: Page, name: string) {
   return page.locator('#folder', { has: getByName(page, name) }).first()
}