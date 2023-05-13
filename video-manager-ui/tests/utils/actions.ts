import { expect, Page } from '@playwright/test'

import { getButton, getByName } from './components'

export async function addFolder(page: Page) {

   const addFolderButton = await getButton(page, 'Add Folder')
   await addFolderButton.click()

   await getButton(page, 'Add Folder')
}

export async function uploadFile(page: Page, filename: string) {

   const uploadVideoButton = await getButton(page, 'Upload Video')

   const fileChooserPromise = page.waitForEvent('filechooser')

   await uploadVideoButton.click()

   const fileChooser = await fileChooserPromise
   await fileChooser.setFiles(`./tests/__assets__/${filename}`)
}

export async function rename(page: Page, name: string, newName: string) {

   const nameInput = await getByName(page, name)

   await expect(nameInput).toBeVisible()

   await nameInput.dblclick()

   await page.getByRole('textbox').first().fill(newName)
   await page.keyboard.press('Enter')
}