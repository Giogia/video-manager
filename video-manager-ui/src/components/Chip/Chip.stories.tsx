import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Chip as ChipComponent } from './Chip.ui'

export default {
  title: 'Fundamentals/Chip',
  component: ChipComponent,
  args: {
    icon: 'delete'
  }
} as ComponentMeta<typeof ChipComponent>

const Template: ComponentStory<typeof ChipComponent> = (args) => <ChipComponent {...args} />

export const Chip = Template.bind({})
