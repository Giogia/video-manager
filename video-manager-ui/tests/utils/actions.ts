import { expect, Page } from '@playwright/test'

import { getButton, getByName } from './components'

/**
 * Adds a folder on the page.
 *
 * @param page - The page to perform the action on.
 */
export async function addFolder(page: Page) {

   const addFolderButton = await getButton(page, 'Add Folder')
   await addFolderButton.click()

   await getButton(page, 'Add Folder')
}

/**
 * Uploads a file on the page.
 *
 * @param page - The page to perform the action on.
 * @param filename - The name of the file to upload.
 */
export async function uploadFile(page: Page, filename: string) {

   const uploadVideoButton = await getButton(page, 'Upload Video')

   const fileChooserPromise = page.waitForEvent('filechooser')

   await uploadVideoButton.click()

   const fileChooser = await fileChooserPromise
   await fileChooser.setFiles(`./tests/__assets__/${filename}`)
}

/**
 * Renames an element on the page.
 *
 * @param page - The page to perform the action on.
 * @param name - The name of the element to rename.
 * @param newName - The new name to set for the element.
 */
export async function rename(page: Page, name: string, newName: string) {

   const nameInput = await getByName(page, name)

   await expect(nameInput).toBeVisible()

   await nameInput.dblclick()

   await page.getByRole('textbox').first().fill(newName)
   await page.keyboard.press('Enter')
}