import { Page } from "@playwright/test"

export function getFolder(page: Page) {
    return page.locator("#folder-button")
}

export function getFirstFolder(page: Page) {
    return getFolder(page).first()
}

export function getLastFolder(page: Page) {
    return getFolder(page).last()
}

export function getFolders(page: Page) {
    return getFolder(page).all()
}