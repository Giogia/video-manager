import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import { Breadcrumbs } from './Breadcrumbs.ui'

export default {
   title: 'Composed/Breadcrumbs',
   component: Breadcrumbs,
   args: {
      path: '/Home/Giovanni/Developer/Video%20Manager'
   }
} as Meta<typeof Breadcrumbs>

export const Playground: StoryFn<typeof Breadcrumbs> = (args) => (
   <Breadcrumbs {...args} />
)
