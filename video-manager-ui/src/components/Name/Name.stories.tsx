import React from 'react'
import { StoryFn, Meta } from '@storybook/react'

import { Name } from '.'
import { composeError } from '../../utils/error'

export default {
   title: 'Primary/Name',
   component: Name,
   argTypes: {
      error: { type: 'string' }
   },
   args: { ...Name.defaultProps }
} as Meta<typeof Name>

export const Playground: StoryFn<typeof Name> = (args) => (
   <Name {...args}
      error={composeError(args.error)}
   />
)