import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Button as ButtonComponent } from '.'

export default {
   title: 'Primary/Button',
   component: ButtonComponent,
   argTypes: {
      action: { action: true },
      error: { type: 'string' }
   },
   args: {
      ...ButtonComponent.defaultProps,
      icon: 'folder'
   }
} as ComponentMeta<typeof ButtonComponent>

const getError = (message?: string) => ({ source: { errors: [{ message }] } })

const Template: ComponentStory<typeof ButtonComponent> = (args) => <ButtonComponent {...args} error={getError(args?.error)} />

export const Button = Template.bind({})

Button.play = async ({ args, canvasElement }) => {
   const canvas = within(canvasElement)
   await userEvent.click(canvas.getByRole('button'))
   await expect(args.action).toHaveBeenCalled()
}

