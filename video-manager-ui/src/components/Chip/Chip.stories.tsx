import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Chip } from '.'
import { composeError } from '../../utils/error'
import { formatName } from '../../utils/name'

export default {
   title: 'Primary/Chip',
   component: Chip,
   argTypes: {
      action: { action: true },
      error: { type: 'string' }
   },
   args: {
      icon: 'delete',
      tooltip: 'Drag here an element to delete'
   }
} as Meta<typeof Chip>

export const Playground: StoryFn<typeof Chip> = (args) =>
   <Chip {...args}
      error={composeError(args.error)}
   />

Playground.play = async ({ args, canvasElement }) => {

   const canvas = within(canvasElement)
   const name = formatName(args.icon)
   const iconName = `${args.icon}-icon`

   const chip = canvas.getByRole('button')
   const icon = canvas.getByTestId(iconName)
   const title = canvas.getByText(name)

   expect(chip.id).toEqual(`${args.icon}-chip`)
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
