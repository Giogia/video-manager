import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Button } from '.'
import { composeError } from '../../utils/error'
import { formatName } from '../../utils/name'

export default {
   title: 'Primary/Button',
   component: Button,
   argTypes: {
      action: { action: true },
      error: { type: 'string' }
   },
   args: {
      ...Button.defaultProps,
      icon: 'folder'
   }
} as Meta<typeof Button>

export const Playground: StoryFn<typeof Button> = (args) => (
   <Button {...args}
      error={composeError(args?.error)}
   />
)

Playground.play = async ({ args, canvasElement }) => {

   const canvas = within(canvasElement)
   const name = formatName(args.icon)
   const iconName = `${args.icon}-icon`

   const button = canvas.getByRole('button')
   const icon = canvas.getByTestId(iconName)

   expect(button.id).toEqual(`${args.icon}-button`)
   expect(icon).toBeVisible()

   if (!args.disabled) {

      if (args.tooltip) {
         await userEvent.hover(button)

         const tooltip = canvas.getByLabelText(name)
         expect(tooltip).toBeVisible()
      }

      await userEvent.click(button)
      expect(args.action).toHaveBeenCalledTimes(1)
   }
}

