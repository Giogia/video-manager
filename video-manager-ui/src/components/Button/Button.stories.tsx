import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Button as ButtonComponent } from '.'

export default {
  title: 'Fundamentals/Button',
  component: ButtonComponent,
  argTypes: {
    action: { action: true }
  }
} as ComponentMeta<typeof ButtonComponent>

const Template: ComponentStory<typeof ButtonComponent> = (args) => <ButtonComponent {...args} />

export const Button = Template.bind({})

Button.args = {
  icon: 'folder'
}

Button.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole('button'))
  await expect(args.action).toHaveBeenCalled()
}

