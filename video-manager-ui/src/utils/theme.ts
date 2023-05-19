import { lightTheme } from '../themes/light.theme'
import { darkTheme } from '../themes/dark.theme'

export enum Themes {
    light = 'light',
    dark = 'dark'
}

export type Theme = keyof typeof Themes

/**
 * Checks if the browser's current theme matches the specified theme.
 *
 * @param theme - The theme to check against the browser's preferred color scheme.
 * @returns A boolean value indicating whether the browser's current theme matches the specified theme.
 */
export const isBrowserTheme = (theme: Theme) =>
   window.matchMedia(`(prefers-color-scheme: ${theme})`).matches

/**
* Retrieves the MUI theme based on the browser's preferred color scheme.
*
* @returns The MUI theme (either darkTheme or lightTheme) based on the browser's preferred color scheme.
*/
export const getBrowserTheme = () =>
   isBrowserTheme(Themes.dark) ?
      darkTheme :
      lightTheme

/**
* Toggles the MUI theme between dark and light based on the current theme.
*
* @param theme - The current theme to toggle.
* @returns The toggled MUI theme (either lightTheme or darkTheme).
*/
export const toggleMuiTheme = (theme: Theme) =>
   theme === Themes.dark ?
      lightTheme :
      darkTheme