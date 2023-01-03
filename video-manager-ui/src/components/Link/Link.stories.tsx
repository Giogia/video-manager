import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Link as LinkComponent } from './Link.ui'

export default {
  title: 'Primary/Link',
  component: LinkComponent,
  args: {
    name: 'link',
    href: '/href',
    ...LinkComponent.defaultProps,
  }
} as ComponentMeta<typeof LinkComponent>

const Template: ComponentStory<typeof LinkComponent> = (args) => <LinkComponent {...args} />

export const Link = Template.bind({})

