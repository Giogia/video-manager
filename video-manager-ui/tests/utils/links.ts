import { Page } from '@playwright/test'

export function getLink(page: Page, name: string) {
   return page.getByRole('link', { name }).first()
}