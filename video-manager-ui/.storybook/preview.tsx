import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/material-icons'

import { withMuiTheme } from './theming/Mui'
import { withDocsTheme } from './theming/Docs'
import { withRelayEnvironment } from './theming/Relay'
import { withRouter } from './theming/Router'
import { withDnd } from './theming/Dnd'
import { isBrowserTheme, Themes } from '../src/utils/theme'

export const decorators = [withMuiTheme, withRelayEnvironment, withRouter, withDnd]

export const globalTypes = {
  theme: {
    name: "Theme",
    title: "Theme",
    description: "Theme for your components",
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "light", icon: 'circlehollow', title: "Light Mode" },
        { value: "dark", icon: 'circle', title: "Dark Mode" },
      ],
    },
    defaultValue: isBrowserTheme(Themes.dark) ?
      Themes.dark :
      Themes.light
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
  docs: { container: withDocsTheme },
  viewMode: 'docs'
}