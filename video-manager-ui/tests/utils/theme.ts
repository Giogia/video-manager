import { Page, expect } from '@playwright/test'
import { Theme } from '@mui/material'

export function hexToRgb(hex: string): string {
   hex = hex.replace(/^#/, '')

   if (hex.length === 3) hex = hex.replace(/(.)/g, '$1$1')

   const red = parseInt(hex.substring(0, 2), 16)
   const green = parseInt(hex.substring(2, 4), 16)
   const blue = parseInt(hex.substring(4, 6), 16)

   return `rgb(${red}, ${green}, ${blue})`
}

export async function hasTheme(page: Page, theme: Theme) {

   await expect(page.locator('#app')).toHaveCSS(
      'background-color', hexToRgb(theme.palette.background.default)
   )

   await expect(page.locator('#explorer')).toHaveCSS(
      'background-color', hexToRgb(theme.palette.background.paper)
   )
}