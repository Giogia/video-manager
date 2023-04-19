import { expect, Page } from "@playwright/test"
import { getButton } from "./buttons"

export async function launch(page: Page) {
    await page.goto("")

    await expect(page).toHaveTitle(/Video Manager/)
    await getButton(page, "Home")
}

export async function reload(page: Page) {
    await page.reload()
}

export async function close(page: Page) {
    await page.close()
}