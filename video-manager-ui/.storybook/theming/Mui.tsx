import React from "react"
import { DecoratorFn } from '@storybook/react'
import { CssBaseline, ThemeProvider } from "@mui/material"

import { baseTheme } from "./VideoManager"
import { lightTheme } from "../../src/themes/light.theme"
import { darkTheme } from "../../src/themes/dark.theme"

export const withMuiTheme: DecoratorFn = (Story, context) => {
  const { theme: themeKey } = context.globals

  const theme = themeKey == 'dark' ?
    darkTheme :
    lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  )
}

const createThemeFromMUITheme = (muiTheme, baseTheme) => {
  const {palette, shape, typography} = muiTheme

  return {
    base: palette.mode,

    colorSecondary: palette.primary.main,

    // UI
    appBg: palette.background.paper,
    appContentBg: palette.background.default,
    appBorderColor: palette.background.paper,
    appBorderRadius: shape.borderRadius,

    // Typography
    fontBase: typography.fontFamily,
    fontCode: 'monospace',

    // Text colors
    textColor: palette.text.primary,
    textInverseColor: palette.text.secondary,

    // Toolbar default and active colors
    barTextColor: palette.text.primary,
    barSelectedColor: palette.primary.main,
    barBg: palette.background.default,

    ...baseTheme
  }
}

export const lightMuiTheme = createThemeFromMUITheme(lightTheme, baseTheme)
export const darkMuiTheme = createThemeFromMUITheme(darkTheme, baseTheme)