import { Theme } from "@storybook/theming"
import { isBrowserTheme, Themes } from "../../src/utils/theme"

export const baseTheme: Partial<Theme> = {
    brandTitle: 'Video Manager',
    brandTarget: '_self',
    brandImage: isBrowserTheme(Themes.dark) ?
        'image-dark.svg' :
        'image-light.svg'
}