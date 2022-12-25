import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Name as NameComponent } from './Name.ui'

export default {
  title: 'Primary/Name',
  component: NameComponent,
  args: { ...NameComponent.defaultProps }
} as ComponentMeta<typeof NameComponent>

const Template: ComponentStory<typeof NameComponent> = (args) => <NameComponent {...args} />

export const Name = Template.bind({})
