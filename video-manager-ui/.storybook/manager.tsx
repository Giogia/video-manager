import { addons } from '@storybook/addons'
import { darkMuiTheme, lightMuiTheme } from './theming/Mui'

import { isBrowserTheme, Themes } from './../src/utils/theme'

addons.setConfig({
    isFullscreen: false,
    showNav: true,
    showPanel: true,
    panelPosition: 'right',
    enableShortcuts: true,
    showToolbar: true,
    selectedPanel: undefined,
    initialActive: 'sidebar',
    sidebar: {
        showRoots: true,
        collapsedRoots: ['other'],
    },
    toolbar: {
        title: { hidden: false },
        zoom: { hidden: false },
        eject: { hidden: false },
        copy: { hidden: false },
        fullscreen: { hidden: false },
    },
    theme: isBrowserTheme(Themes.dark) ?
        darkMuiTheme :
        lightMuiTheme
})