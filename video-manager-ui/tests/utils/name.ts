
import { expect, Page, Locator } from "@playwright/test"

export function getByName(page: Page, name: string, options: { exact: boolean } = { exact: true }): Locator {
    return page.getByText(name, options).first()
}

export async function rename(page: Page, name: string, newName: string) {

    const locator = page.getByText(name, { exact: false }).first()
    await expect(locator).toBeVisible()
    await locator.dblclick()

    await page.getByRole('textbox').nth(1).fill(newName)
    await page.keyboard.press('Enter')
}