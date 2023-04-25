import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Header } from './Header.ui'

export default {
   title: 'Application/Header',
   component: Header,
   args: {
      ...Header.defaultProps,
      theme: 'light',
      handleTheme: action('change theme')
   }
} as Meta<typeof Header>

export const Playground: StoryFn<typeof Header> = (args) => (
   <Header {...args} />
)