import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Chip as ChipComponent } from './Chip.ui'

export default {
  title: 'Primary/Chip',
  component: ChipComponent,
  args: {
    icon: 'delete',
    tooltip: 'Drag here an element to delete'
  }
} as ComponentMeta<typeof ChipComponent>

const Template: ComponentStory<typeof ChipComponent> = (args) => <ChipComponent {...args} />

export const Chip = Template.bind({})
