import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Icon as IconComponent } from '.'

export default {
  title: 'Primary/Icon',
  component: IconComponent,
  argTypes: {
    action: { action: true }
  },
  args: {
    id: 'folder'
  }
} as ComponentMeta<typeof IconComponent>

const Template: ComponentStory<typeof IconComponent> = (args) => <IconComponent {...args} />

export const Icon = Template.bind({})

