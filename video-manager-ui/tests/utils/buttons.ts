import { expect, Page } from '@playwright/test'
import { getByName } from './name'

export async function getButton(page: Page, name: string){

   const button = await page.locator(`#${name.toLowerCase().replace(' ', '-')}-button`)

   await button.hover()
   await expect(page.getByRole('tooltip', { name })).toBeVisible()

   return button
}

export async function addFolder(page: Page) {
    
   const addFolderButton = await getButton(page, 'Add Folder')
   await addFolderButton.click()
}

export async function uploadFile(page: Page, filename: string) {

   await expect(getByName(page, filename)).not.toBeVisible()

   const uploadVideoButton = await getButton(page, 'Upload Video')

   const fileChooserPromise = page.waitForEvent('filechooser')

   await uploadVideoButton.click()

   const fileChooser = await fileChooserPromise
   await fileChooser.setFiles(`./tests/__assets__/${filename}`)

   await expect(page.getByText(filename)).toBeVisible()
}