import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import { Caption } from '.'

export default {
   title: 'Primary/Caption',
   component: Caption,
   args: { ...Caption.defaultProps }
} as Meta<typeof Caption>

export const Playground: StoryFn<typeof Caption> = (args: any) => (
   <Caption {...args} />
)