import React from "react"
import { DocsContainer } from '@storybook/addon-docs'
import { themes } from '@storybook/theming'

import { isBrowserTheme, Themes } from "../../src/utils/theme"

export const withDocsTheme = (props) => {

  const { id: storyId, storyById } = props.context
  const { parameters: { docs = {} } } = storyById(storyId)

  docs.theme = isBrowserTheme(Themes.dark) ?
    themes.dark :
    themes.light

  return <DocsContainer {...props} />
}