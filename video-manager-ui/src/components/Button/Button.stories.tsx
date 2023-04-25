import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Button } from '.'
import { composeError } from '../../utils/error'

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
   await userEvent.click(canvas.getByRole('button'))
   await expect(args.action).toHaveBeenCalled()
}

