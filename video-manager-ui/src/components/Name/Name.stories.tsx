import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Name as NameComponent } from './Name.ui'
import { Name } from '.'
import { composeError } from '../../utils/error'

const [{ description }] = Object.values(NameComponent).slice(-1)

export default {
   title: 'Primary/Name',
   component: Name,
   parameters: {
      docs: {
         description: {
            component: description
         }
      }
   },
   argTypes: {
      error: { type: 'string' }
   },
   args: { ...Name.defaultProps }
} as Meta<typeof Name>

export const Playground: StoryFn<typeof Name> = (args) => (
   <Name {...args}
      error={composeError(args.error)}
   />
)

Playground.play = async ({ args, canvasElement }) => {

   const canvas = within(canvasElement)

   if (!args.loading) {

      const name = canvas.getByText(args.name)
      expect(name).toBeVisible()

      if (args.editable) {

         userEvent.click(name)

         const input = await canvas.findByRole('input')
         userEvent.clear(input)
         userEvent.type(input, 'Edited Name')
         userEvent.keyboard('{Enter}')

         expect(args.onChange).toHaveBeenCalledTimes(1)
         expect(args.onChange).toHaveBeenCalledWith('Edited Name', args.name)
      }
   }
}