import React from "react"
import { DocsContainer } from '@storybook/addon-docs'
import { themes } from '@storybook/theming'
import { useDarkMode } from 'storybook-dark-mode'

export const withDocsTheme = (props) => {
  const isDark = useDarkMode()

  const { id: storyId, storyById } = props.context
  const { parameters: { docs = {} } } = storyById(storyId)

  docs.theme = isDark ?
    themes.dark :
    themes.light

  return <DocsContainer {...props} />
}