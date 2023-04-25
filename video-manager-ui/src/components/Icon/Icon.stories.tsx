import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import { Icon } from '.'

export default {
   title: 'Primary/Icon',
   component: Icon,
   args: {
      id: 'folder'
   }
} as Meta<typeof Icon>

export const Playground: StoryFn<typeof Icon> = (args) => (
   <Icon {...args} />
)