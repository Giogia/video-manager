import { expect, Page, Locator } from '@playwright/test'

export async function dragToDeleteChip(page: Page, locator: Locator) {
    
   const deleteChip = await page.locator('#delete-chip')
   await expect(deleteChip).toBeVisible()

   await deleteChip.hover()
   await expect(page.getByRole('tooltip', { name: 'Drag here an element to delete' })).toBeVisible()

   await locator.dragTo(deleteChip)
}