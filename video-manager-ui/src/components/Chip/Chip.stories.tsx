import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Chip } from '.'
import { Chip as ChipComponent } from './Chip.ui'
import { composeError } from '../../utils/error'
import { formatName } from '../../utils/name'

const [{ description }] = Object.values(ChipComponent).slice(-1)

export default {
   title: 'Primary/Chip',
   component: Chip,
   parameters: {
      docs: {
         description: {
            component: description
         }
      }
   },
   argTypes: {
      action: { action: true },
      error: { type: 'string' }
   },
   args: {
      icon: 'delete',
      tooltip: 'Drag here an element to delete',
      ...Chip.defaultProps
   }
} as Meta<typeof Chip>

export const Playground: StoryFn<typeof Chip> = (args) =>
   <Chip {...args}
      error={composeError(args.error)}
   />

Playground.play = async ({ args, canvasElement }) => {

   const canvas = within(canvasElement)
   const name = formatName(args.icon)

   const chip = canvas.getByTestId(`${args.icon}-chip`)
   const icon = canvas.getByTestId(`${args.icon}-icon`)
   const title = canvas.getByText(name)

   expect(chip).toBeVisible()
   expect(icon).toBeVisible()
   expect(title).toBeVisible()

   if (!args.disabled) {

      if (args.tooltip) {
         await userEvent.hover(await chip)

         const tooltip = canvas.getByLabelText(args.tooltip)
         expect(tooltip).toBeVisible()
      }

      await userEvent.click(chip)
      expect(args.action).toHaveBeenCalledTimes(1)
   }
}
