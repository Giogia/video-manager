import { expect, Page } from '@playwright/test'

export async function getChip(page: Page, name: string) {

   const chipName = name.toLowerCase()

   const chip = await page.locator(`#${chipName}-chip`).first()
   await expect(chip).toBeVisible()

   await chip.hover()
   await expect(page.getByRole('tooltip', { name: `Drag here an element to ${chipName}` })).toBeVisible()

   return chip
}