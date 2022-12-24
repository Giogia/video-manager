import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/material-icons'

import { withMuiTheme, lightMuiTheme, darkMuiTheme } from './theming/Mui'
import { withRelayEnvironment } from './theming/Relay'
import { withRouter } from './theming/Router'
import { withDnd } from './theming/Dnd'

export const decorators = [withMuiTheme, withRelayEnvironment, withRouter, withDnd]

export const globalTypes = {
  theme: {
    name: "Theme",
    title: "Theme",
    description: "Theme for your components",
    defaultValue: "light",
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "light", icon: 'circlehollow', title: "Light Mode" },
        { value: "dark", icon: 'circle', title: "Dark Mode" },
      ],
    },
  },
}

export const parameters = {
  backgrounds: { disable: true },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewMode: 'docs',
  darkMode: {
    current: 'light',
    light: lightMuiTheme,
    dark: darkMuiTheme
  }
}