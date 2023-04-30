import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Caption } from '.'

export default {
   title: 'Primary/Caption',
   component: Caption,
   args: { ...Caption.defaultProps }
} as Meta<typeof Caption>

export const Playground: StoryFn<typeof Caption> = (args: any) => (
   <Caption {...args} />
)

Playground.play = async ({ args, canvasElement }) => {
   const canvas = within(canvasElement)

   if (!args.loading) {
      const caption = canvas.getByText(args.text)
      expect(caption).toBeVisible()
   }
}