import { expect, Page } from '@playwright/test'

export function getByName(page: Page, name: string, options = { exact: true }) {

   return page.getByText(name, options).first()
}

export async function getButton(page: Page, name: string) {

   const button = await page.locator(`#${name.toLowerCase().replace(' ', '-')}-button`).first()
   await expect(button).toBeVisible()
   await expect(button).toBeEnabled()
   
   await button.hover()
   await expect(page.getByRole('tooltip', { name })).toBeVisible()

   return button
}

export async function getLink(page: Page, name: string) {

   const link = page.getByRole('link', { name }).first()
   await expect(link).toBeVisible()

   return link
}

export async function getChip(page: Page, name: string) {

   const chipName = name.toLowerCase()

   const chip = await page.locator(`#${chipName}-chip`).first()
   await expect(chip).toBeVisible()

   await chip.hover()
   await expect(page.getByRole('tooltip', { name: `Drag here an element to ${chipName}` })).toBeVisible()

   return chip
}