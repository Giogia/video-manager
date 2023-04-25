import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import { Chip } from '.'
import { composeError } from '../../utils/error'

export default {
   title: 'Primary/Chip',
   component: Chip,
   argTypes: {
      error: { type: 'string' }
   },
   args: {
      icon: 'delete',
      tooltip: 'Drag here an element to delete'
   },
   decorators: [
      
   ]
} as Meta<typeof Chip>

export const Playground: StoryFn<typeof Chip> = (args) =>
   <Chip {...args}
      error={composeError(args.error)}
   />