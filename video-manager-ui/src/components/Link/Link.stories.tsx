import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Link as LinkComponent } from '.'
import { composeError } from '../../utils/error'

export default {
   title: 'Primary/Link',
   component: LinkComponent,
   argTypes: {
      error: { type: 'string' }
   },
   args: {
      name: 'link',
      href: '/href',
      ...LinkComponent.defaultProps,
   }
} as ComponentMeta<typeof LinkComponent>

const Template: ComponentStory<typeof LinkComponent> = (args) =>
   <LinkComponent {...args}
      error={composeError(args.error)}
   />

export const Link = Template.bind({})

