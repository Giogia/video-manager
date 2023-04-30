import React from "react"
import { Decorator } from '@storybook/react'
import { themes, Theme as StorybookTheme } from "@storybook/theming"
import { CssBaseline, Theme as MuiTheme, ThemeProvider } from "@mui/material"

import { baseTheme } from "./VideoManager"
import { lightTheme } from "../../src/themes/light.theme"
import { darkTheme } from "../../src/themes/dark.theme"

export const withMuiTheme: Decorator = (Story, context) => {
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

const createThemeFromMUITheme = (muiTheme: MuiTheme, ...baseThemes: Partial<StorybookTheme>[]) => {
  
  const {palette, shape} = muiTheme
  const [colorTheme, baseTheme] = baseThemes

  return {
    ...baseTheme,
    ...colorTheme,

    base: palette.mode,

    colorPrimary: palette.primary[palette.mode],
    colorSecondary: palette.primary[palette.mode],

    // UI
    appContentBg: palette.background.paper,
    appBorderRadius: shape.borderRadius,

    // Text colors
    textColor: palette.text.primary,
    textInverseColor: palette.text.secondary,

    // Toolbar default and active colors
    barTextColor: palette.text.primary,
    barSelectedColor: palette.primary[palette.mode],
    barBg: palette.background.paper,
  }
}

export const lightMuiTheme = createThemeFromMUITheme(lightTheme, themes.light, baseTheme)
export const darkMuiTheme = createThemeFromMUITheme(darkTheme, themes.dark, baseTheme)