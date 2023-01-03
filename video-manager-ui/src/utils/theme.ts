import { lightTheme } from '../themes/light.theme'
import { darkTheme } from '../themes/dark.theme'

export enum Themes {
    light = "light",
    dark = "dark"
}

export type Theme = keyof typeof Themes

export const isBrowserTheme = (theme: Theme) =>
    window.matchMedia(`(prefers-color-scheme: ${theme})`).matches

export const getBrowserTheme = () =>
    isBrowserTheme(Themes.dark) ?
        darkTheme :
        lightTheme

export const toggleMuiTheme = (theme: Theme) =>
    theme === Themes.dark ?
        lightTheme :
        darkTheme