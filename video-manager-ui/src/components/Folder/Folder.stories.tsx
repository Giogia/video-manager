import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Folder } from '.'
import { composeError } from '../../utils/error'

export default {
   title: 'Composed/Folder',
   component: Folder,
   argTypes: {
      error: { type: 'string' }
   },
   args: { ...Folder.defaultProps }
} as Meta<typeof Folder>

export const Playground: StoryFn<typeof Folder> = (args) => (
   <Folder {...args}
      error={composeError(args.error)}
   />
)

Playground.play = async ({ args, canvasElement }) => {
   const canvas = within(canvasElement)

   const button = canvas.getByTestId('folder-button')
   expect(button).toBeVisible()

   if (!args.loading) {
      expect(canvas.getByText(args.name)).toBeVisible()
      expect(canvas.getByText(args.count || /no/)).toBeVisible()
      expect(canvas.getByText(/item/)).toBeVisible()

      if (!args.selected) {
         await userEvent.click(button)
         expect(args.onClick).toHaveBeenCalledTimes(1)
      }
   }
}