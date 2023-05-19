import { expect, Page } from '@playwright/test'

/**
 * Retrieves an element by its name from the page.
 *
 * @param page - The page to search for the element.
 * @param name - The name of the element to retrieve.
 * @param options - Optional options for the search.
 * @returns The located element.
 */
export function getByName(page: Page, name: string, options = { exact: true }) {

   return page.getByText(name, options).first()
}

/**
 * Retrieves a button element from the page.
 *
 * @param page - The page to search for the button.
 * @param name - The name of the button to retrieve.
 * @returns The located button element.
 */
export async function getButton(page: Page, name: string) {

   const button = await page.locator(`#${name.toLowerCase().replace(' ', '-')}-button`).first()
   await expect(button).toBeVisible()
   await expect(button).toBeEnabled()
   
   await button.hover()
   await expect(page.getByRole('tooltip', { name })).toBeVisible()

   return button
}

/**
 * Retrieves a link element from the page.
 *
 * @param page - The page to search for the link.
 * @param name - The name of the link to retrieve.
 * @returns The located link element.
 */
export async function getLink(page: Page, name: string) {

   const link = page.getByRole('link', { name }).first()
   await expect(link).toBeVisible()

   return link
}

/**
 * Retrieves a chip element from the page.
 *
 * @param page - The page to search for the chip.
 * @param name - The name of the chip to retrieve.
 * @returns The located chip element.
 */
export async function getChip(page: Page, name: string) {

   const chipName = name.toLowerCase()

   const chip = await page.locator(`#${chipName}-chip`).first()
   await expect(chip).toBeVisible()

   await chip.hover()
   await expect(page.getByRole('tooltip', { name: `Drag here an element to ${chipName}` })).toBeVisible()

   return chip
}