import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Icon } from '.'

export default {
   title: 'Primary/Icon',
   component: Icon,
   args: {
      id: 'folder'
   }
} as Meta<typeof Icon>

export const Playground: StoryFn<typeof Icon> = (args) => (
   <Icon {...args} />
)

Playground.play = async ({ args, canvasElement }) => {

   const canvas = within(canvasElement)

   const icon = canvas.getByTestId(`${args.id}-icon`)

   expect(icon).toBeVisible()
}