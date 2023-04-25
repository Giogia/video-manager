import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Chip as ChipComponent } from '.'
import { composeError } from '../../utils/error'

export default {
   title: 'Primary/Chip',
   component: ChipComponent,
   argTypes: {
      error: { type: 'string' }
   },
   args: {
      icon: 'delete',
      tooltip: 'Drag here an element to delete'
   }
} as ComponentMeta<typeof ChipComponent>

const Template: ComponentStory<typeof ChipComponent> = (args) =>
   <ChipComponent {...args}
      error={composeError(args.error)}
   />

export const Chip = Template.bind({})
