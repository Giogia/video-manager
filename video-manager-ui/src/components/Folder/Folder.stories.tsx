import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import { Folder } from '.'
import { composeError } from '../../utils/error'

export default {
   title: 'Composed/Folder',
   component: Folder,
   argTypes: {
      error: { type: 'string' }
   },
   args: { ...Folder.defaultProps }
} as Meta<typeof Folder>

export const Playground: StoryFn<typeof Folder> = (args) => (
   <Folder {...args}
      error={composeError(args.error)}
   />
)