import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Caption } from '.'
import { Caption as CaptionComponent } from './Caption.ui'

const [{ description }] = Object.values(CaptionComponent).slice(-1)

export default {
   title: 'Primary/Caption',
   component: Caption,
   parameters: {
      docs: {
         description: {
            component: description
         }
      }
   },
   args: {
      ...Caption.defaultProps
   }
} as Meta<typeof Caption>

export const Playground: StoryFn<typeof Caption> = (args) => (
   <Caption {...args} />
)

Playground.play = async ({ args, canvasElement }) => {
   const canvas = within(canvasElement)

   if (!args.loading) {
      const caption = canvas.getByText(args.text)
      expect(caption).toBeVisible()
   }
}