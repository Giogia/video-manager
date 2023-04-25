
import { expect, Page, Locator } from '@playwright/test'

type Options = { exact: boolean } 

export function getByName(page: Page, name: string, options: Options = { exact: true } ): Locator {
   return page.getByText(name, options).first()
}

export async function rename(page: Page, name: string, newName: string, options: Options = { exact: true }) {

   const locator = await getByName(page, name, options)
   await expect(locator).toBeVisible()
    
   await locator.dblclick()

   await page.getByRole('textbox').nth(1).fill(newName)
   await page.keyboard.press('Enter')
}