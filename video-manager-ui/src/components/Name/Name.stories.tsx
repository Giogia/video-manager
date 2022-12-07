import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Name as NameComponent } from './'

export default {
  title: 'Name',
  component: NameComponent,
} as ComponentMeta<typeof NameComponent>

const Template: ComponentStory<typeof NameComponent> = (args) => <NameComponent {...args} />

export const Name = Template.bind({})
